package com.aiapp.service;

import com.aiapp.model.ChatMessage;
import com.aiapp.model.ChatSession;
import com.aiapp.repository.ChatSessionRepository;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.anthropic.AnthropicChatModel;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.service.AiServices;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class ChatService {
    
    @Inject
    ChatSessionRepository sessionRepository;
    
    @ConfigProperty(name = "openai.api.key")
    Optional<String> openaiApiKey;
    
    @ConfigProperty(name = "anthropic.api.key")
    Optional<String> anthropicApiKey;
    
    @ConfigProperty(name = "chat.default.model", defaultValue = "gpt-3.5-turbo")
    String defaultModel;
    
    private ChatLanguageModel getChatModel(String modelName) {
        if (modelName.startsWith("gpt") && openaiApiKey.isPresent()) {
            return OpenAiChatModel.builder()
                    .apiKey(openaiApiKey.get())
                    .modelName(modelName)
                    .temperature(0.7)
                    .build();
        } else if (modelName.startsWith("claude") && anthropicApiKey.isPresent()) {
            return AnthropicChatModel.builder()
                    .apiKey(anthropicApiKey.get())
                    .modelName(modelName)
                    .temperature(0.7)
                    .build();
        }
        
        throw new IllegalArgumentException("Unsupported model or missing API key: " + modelName);
    }
    
    @Transactional
    public ChatMessage sendMessage(String content, String sessionId, String modelName) {
        ChatSession session = getOrCreateSession(sessionId);
        
        // Add user message to session
        ChatMessage userMessage = new ChatMessage(ChatMessage.MessageRole.USER, content);
        userMessage.setSession(session);
        session.getMessages().add(userMessage);
        
        // Get chat model
        ChatLanguageModel chatModel = getChatModel(modelName != null ? modelName : defaultModel);
        
        // Convert session messages to LangChain4j format
        List<dev.langchain4j.data.message.ChatMessage> chatMessages = session.getMessages().stream()
                .map(this::convertToLangChainMessage)
                .collect(Collectors.toList());
        
        // Generate response
        dev.langchain4j.model.output.Response<AiMessage> response = chatModel.generate(chatMessages);
        
        // Create assistant message
        ChatMessage assistantMessage = new ChatMessage(
                ChatMessage.MessageRole.ASSISTANT, 
                response.content().text()
        );
        assistantMessage.setSession(session);
        session.getMessages().add(assistantMessage);
        
        // Update session
        session.setUpdatedAt(java.time.LocalDateTime.now());
        sessionRepository.persist(session);
        
        return assistantMessage;
    }
    
    private ChatSession getOrCreateSession(String sessionId) {
        if (sessionId != null) {
            return sessionRepository.findById(sessionId);
        }
        
        ChatSession newSession = new ChatSession();
        newSession.setTitle("New Chat");
        sessionRepository.persist(newSession);
        return newSession;
    }
    
    private dev.langchain4j.data.message.ChatMessage convertToLangChainMessage(ChatMessage message) {
        return switch (message.getRole()) {
            case USER -> UserMessage.from(message.getContent());
            case ASSISTANT -> AiMessage.from(message.getContent());
            case SYSTEM -> SystemMessage.from(message.getContent());
        };
    }
    
    public List<ChatSession> getUserSessions() {
        return sessionRepository.listAll();
    }
    
    public ChatSession getSession(String sessionId) {
        return sessionRepository.findById(sessionId);
    }
    
    @Transactional
    public void deleteSession(String sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}

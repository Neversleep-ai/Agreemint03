package com.aiapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private ChatSession session;
    
    @Enumerated(EnumType.STRING)
    private MessageRole role;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ElementCollection
    @CollectionTable(name = "message_metadata")
    private Map<String, String> metadata;
    
    // Constructors
    public ChatMessage() {
        this.createdAt = LocalDateTime.now();
    }
    
    public ChatMessage(MessageRole role, String content) {
        this();
        this.role = role;
        this.content = content;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public ChatSession getSession() { return session; }
    public void setSession(ChatSession session) { this.session = session; }
    
    public MessageRole getRole() { return role; }
    public void setRole(MessageRole role) { this.role = role; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Map<String, String> getMetadata() { return metadata; }
    public void setMetadata(Map<String, String> metadata) { this.metadata = metadata; }
    
    public enum MessageRole {
        USER, ASSISTANT, SYSTEM
    }
}

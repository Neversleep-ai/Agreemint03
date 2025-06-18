package com.aiapp.resource;

import com.aiapp.dto.ChatRequest;
import com.aiapp.dto.ChatResponse;
import com.aiapp.model.ChatMessage;
import com.aiapp.model.ChatSession;
import com.aiapp.service.ChatService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/chat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatResource {
    
    @Inject
    ChatService chatService;
    
    @POST
    @Path("/message")
    public Response sendMessage(ChatRequest request) {
        try {
            ChatMessage response = chatService.sendMessage(
                    request.getMessage(),
                    request.getSessionId(),
                    request.getModel()
            );
            
            ChatResponse chatResponse = new ChatResponse();
            chatResponse.setMessage(response);
            chatResponse.setSessionId(response.getSession().getId());
            
            return Response.ok(chatResponse).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error processing message: " + e.getMessage())
                    .build();
        }
    }
    
    @GET
    @Path("/sessions")
    public List<ChatSession> getSessions() {
        return chatService.getUserSessions();
    }
    
    @GET
    @Path("/sessions/{sessionId}")
    public Response getSession(@PathParam("sessionId") String sessionId) {
        ChatSession session = chatService.getSession(sessionId);
        if (session != null) {
            return Response.ok(session).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
    
    @DELETE
    @Path("/sessions/{sessionId}")
    public Response deleteSession(@PathParam("sessionId") String sessionId) {
        chatService.deleteSession(sessionId);
        return Response.noContent().build();
    }
}

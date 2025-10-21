package com.guardrails.controller;

import org.springframework.web.bind.annotation.*;
import com.guardrails.service.GuardrailsApiService;
import com.guardrails.model.ModerationResponse;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
 
public class ApiController {

    private final GuardrailsApiService guardrailsApiService;
    public ApiController(GuardrailsApiService guardrailsApiService) {
        this.guardrailsApiService = guardrailsApiService;
    }

    @GetMapping("/templates")
    public List<Map<String, String>> templates() {
        return List.of(
            Map.of("title", "Career Coach", "desc", "Personalized career advice"),
            Map.of("title", "Customer Insights Assistant", "desc", "Help team get insights"),
            Map.of("title", "Idea Coach", "desc", "Brainstorming helper")
        );
    }

    @PostMapping("/message")
    public ModerationResponse message(@RequestBody Map<String,String> payload) {
        String message = payload.getOrDefault("message", "");
        return guardrailsApiService.checkText(message);
    }
}

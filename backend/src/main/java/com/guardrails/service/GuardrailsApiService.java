package com.guardrails.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.guardrails.model.ModerationRequest;
import com.guardrails.model.ModerationResponse;

@Service
public class GuardrailsApiService {
    private final RestTemplate rest = new RestTemplate();
    private final String FASTAPI_URL = "http://localhost:8001/query";

    public ModerationResponse checkText(String text) {
        ModerationRequest r = new ModerationRequest(text);
        try {
            ModerationResponse resp = rest.postForObject(FASTAPI_URL, r, ModerationResponse.class);
            if (resp == null) return new ModerationResponse(false, "no-response", "No response from FastAPI");
            return resp;
        } catch (Exception ex) {
            return new ModerationResponse(false, "service-unavailable", "FastAPI service unavailable");
        }
    }
}

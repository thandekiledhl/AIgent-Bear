package com.guardrails.model;

public class ModerationRequest {
    private String text;
    public ModerationRequest() {}
    public ModerationRequest(String text) { this.text = text; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}

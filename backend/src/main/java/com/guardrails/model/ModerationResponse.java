package com.guardrails.model;

public class ModerationResponse {
    private boolean flagged;
    private String reason;
    private String answer;
    public ModerationResponse() {}
    public ModerationResponse(boolean flagged, String reason, String answer) {
        this.flagged = flagged; this.reason = reason; this.answer = answer;
    }
    public boolean isFlagged() { return flagged; }
    public void setFlagged(boolean flagged) { this.flagged = flagged; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}

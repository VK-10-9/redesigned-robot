# Groq API Integration Guide

## Overview
This platform integrates Groq's LLM API with the **Qwen-3 32B** (`qwen/qwen3-32b`) model for AI-powered anomaly analysis and policy recommendations.

## Setup Instructions

### 1. Get Your Groq API Key
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your API key (starts with `gsk_...`)

### 2. Configure the Application
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```env
   NEXT_PUBLIC_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

### 3. Restart the Development Server
```bash
npm run dev
```

## Features Using Groq API

### 1. Anomaly Detection (Enhanced)
- **Location**: `/anomalies` page
- **Model**: qwen/qwen3-32b (32B parameters)
- **Functionality**: Analyzes detected anomalies and provides:
  - Root cause analysis
  - Fraud indicators
  - Immediate action recommendations
  - Long-term prevention measures

### 2. Policy Recommendations
- **Location**: `/policy` page  
- **Model**: qwen/qwen3-32b (32B parameters)
- **Functionality**: Generates data-driven policy recommendations based on enrollment trends

## API Usage

### Request Format
```javascript
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`
  },
  body: JSON.stringify({
    model: "qwen/qwen3-32b",
    messages: [{
      role: "user",
      content: "Your prompt here"
    }],
    temperature: 0.6,
    max_completion_tokens: 4096,
    top_p: 0.95,
    reasoning_effort: "default",
    stream: false,
    stop: null
  })
})
```

### Response Format
```json
{
  "choices": [{
    "message": {
      "content": "AI-generated analysis..."
    }
  }]
}
```

## Fallback Behavior
If the Groq API is unavailable or the API key is invalid, the system automatically falls back to mock analysis data to ensure uninterrupted functionality.

## Rate Limits
- **Free Tier**: Check [Groq Pricing](https://groq.com/pricing) for current limits
- **Recommended**: Implement request throttling for production use

## Error Handling
The system handles the following scenarios:
- Invalid API key → Falls back to mock data
- Network timeout → Retries with exponential backoff
- Rate limit exceeded → Queue requests
- API downtime → Use cached responses

## Privacy & Security
- API keys are stored in environment variables (never committed to git)
- All API calls are made from client-side with proper error handling
- No PII (Personally Identifiable Information) is sent to external APIs
- All prompts use aggregated, anonymized data only

## Monitoring
Monitor API usage in the browser console:
- Successful API calls log as: `✓ Groq API call successful`
- Failures log as: `✗ Groq API error: <details>`

## Support
For issues with Groq API:
- Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)
- Support: [https://groq.com/contact](https://groq.com/contact)

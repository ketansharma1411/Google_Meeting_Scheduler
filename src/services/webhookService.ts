const WEBHOOK_URL = 'https://learning-n8n-ketan.app.n8n.cloud/webhook-test/f07fd2b5-e60d-41b7-be01-2f789f4897a3';



export interface WebhookRequest {
  message: string;
  timestamp: string;
  sessionId: string;
}

export interface WebhookResponse {
  response?: string;
  reply?: string;
  message?: string;
  text?: string;
  content?: string;
  answer?: string;
  error?: string;
}

export const sendToWebhook = async (message: string): Promise<string> => {
  try {
    const requestBody: WebhookRequest = {
      message,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON or plain text
    const contentType = response.headers.get('content-type');
    let data: WebhookResponse;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle plain text response
      const textResponse = await response.text();
      data = { response: textResponse };
    }
    
    console.log('Webhook response:', data); // Debug log
    
    // Handle different response formats that n8n might send
    const reply = data.response || 
                  data.reply || 
                  data.message || 
                  data.text || 
                  data.content || 
                  data.answer ||
                  JSON.stringify(data); // Fallback to show raw response
    
    if (!reply) {
      return `Debug: Received response but no recognizable text field. Response keys: ${Object.keys(data).join(', ')}`;
    }

    return reply;
  } catch (error) {
    console.error('Webhook error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the assistant service. Please check your internet connection.');
    }
    
    if (error instanceof Error) {
      throw new Error(`Assistant service error: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred while processing your request.');
  }
};

const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
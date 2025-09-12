export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  error?: boolean;
  meetingDetails?: {
    title?: string;
    date?: string;
    time?: string;
    duration?: string;
    attendees?: string[];
    status?: 'scheduled' | 'pending' | 'failed';
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
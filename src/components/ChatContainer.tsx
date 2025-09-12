import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../types/chat';
import { sendToWebhook } from '../services/webhookService';
import { Calendar, Clock, Users, Sparkles, Lightbulb, MessageSquare } from 'lucide-react';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Meeting Scheduler AI Assistant. I can help you schedule meetings on Google Calendar. Just tell me the meeting details like title, date, time, duration, and attendees, and I'll take care of the rest!",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: `loading_${Date.now()}`,
      text: '',
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const response = await sendToWebhook(messageText);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => prev.slice(0, -1).concat(assistantMessage));
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: error instanceof Error ? error.message : 'An unexpected error occurred.',
        sender: 'assistant',
        timestamp: new Date(),
        error: true,
      };

      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="flex items-center justify-center py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Calendar className="w-8 h-8 text-green-600" />
            <Sparkles className="w-3 h-3 text-green-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Meeting Scheduler AI</h1>
            <p className="text-sm text-gray-500">Schedule meetings on Google Calendar</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-6 ml-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-green-500" />
            <span>Quick Scheduling</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Multi-attendee Support</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
      
      {/* Helpful Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-medium text-gray-700">How to schedule meetings:</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-xs text-gray-600">
            <div className="flex items-start space-x-2">
              <MessageSquare className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Include meeting title, date, time, and duration in your message</span>
            </div>
            <div className="flex items-start space-x-2">
              <Users className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Add attendee emails separated by commas</span>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Use natural language like "tomorrow at 2 PM" or "next Monday"</span>
            </div>
            <div className="flex items-start space-x-2">
              <Calendar className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>Example: "Schedule team standup tomorrow 9 AM for 30 minutes"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
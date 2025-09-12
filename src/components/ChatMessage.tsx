import React from 'react';
import { Message } from '../types/chat';
import { Bot, User, AlertCircle, Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-green-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Calendar className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : message.error 
              ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-md'
              : 'bg-green-50 text-green-900 border border-green-200 rounded-bl-md'
        }`}>
          {message.isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-green-600">Scheduling your meeting...</span>
            </div>
          ) : (
            <div>
              <div className="flex items-start space-x-2">
                {message.error && (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              </div>
              
              {/* Meeting Details Card */}
              {message.meetingDetails && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Meeting Details
                    </h4>
                    {message.meetingDetails.status && (
                      <span className={`flex items-center text-xs px-2 py-1 rounded-full ${
                        message.meetingDetails.status === 'scheduled' 
                          ? 'bg-green-100 text-green-700' 
                          : message.meetingDetails.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {message.meetingDetails.status === 'scheduled' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {message.meetingDetails.status === 'failed' && <XCircle className="w-3 h-3 mr-1" />}
                        {message.meetingDetails.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {message.meetingDetails.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    {message.meetingDetails.title && (
                      <div><strong>Title:</strong> {message.meetingDetails.title}</div>
                    )}
                    {message.meetingDetails.date && (
                      <div><strong>Date:</strong> {message.meetingDetails.date}</div>
                    )}
                    {message.meetingDetails.time && (
                      <div><strong>Time:</strong> {message.meetingDetails.time}</div>
                    )}
                    {message.meetingDetails.duration && (
                      <div><strong>Duration:</strong> {message.meetingDetails.duration}</div>
                    )}
                    {message.meetingDetails.attendees && message.meetingDetails.attendees.length > 0 && (
                      <div className="flex items-start">
                        <strong className="mr-1">Attendees:</strong>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {message.meetingDetails.attendees.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <span className="text-xs text-gray-500 mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
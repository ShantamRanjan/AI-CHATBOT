
import React from 'react';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: string;
  isBot: boolean;
  timestamp: Date;
};

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 break-words",
        isBot 
          ? "bg-white border border-gray-200 text-gray-800 rounded-bl-none" 
          : "bg-blue-500 text-white rounded-br-none"
      )}>
        <p>{message}</p>
        <p className={cn(
          "text-xs mt-1 text-right",
          isBot ? "text-gray-500" : "text-blue-100"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

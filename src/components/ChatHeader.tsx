
import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="bg-white border-b p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Bot className="h-5 w-5 text-blue-500" />
      </div>
      <div>
        <h2 className="font-medium text-gray-800">AI Assistant</h2>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;

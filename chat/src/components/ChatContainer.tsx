
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newUserMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };
  
  const getBotResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello! How can I assist you today?";
    } else if (lowerCaseMessage.includes('help')) {
      return "I'm here to help! Please let me know what you need assistance with.";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes('bye')) {
      return "Goodbye! Have a great day!";
    } else if (lowerCaseMessage.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (lowerCaseMessage.includes('who are you')) {
      return "I'm a simple AI chatbot built to demonstrate React capabilities.";
    } else {
      return "I understand you're saying something about " + message.split(' ').slice(0, 3).join(' ') + "... Could you provide more details so I can assist you better?";
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-md overflow-hidden bg-gray-50">
      <ChatHeader />
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;

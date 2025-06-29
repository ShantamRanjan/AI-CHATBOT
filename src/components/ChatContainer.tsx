
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  meetingLinks?: MeetingLink[];
};

type MeetingLink = {
  platform: string;
  url: string;
  title?: string;
};

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your AI assistant. I can help you with tasks and meeting links. How can I help you today?",
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

  const detectMeetingLinks = (text: string): MeetingLink[] => {
    const meetingLinks: MeetingLink[] = [];
    
    // Google Meet detection
    const googleMeetRegex = /https?:\/\/meet\.google\.com\/[a-zA-Z0-9-_]+/g;
    const googleMeetMatches = text.match(googleMeetRegex);
    if (googleMeetMatches) {
      googleMeetMatches.forEach(url => {
        meetingLinks.push({ platform: 'Google Meet', url, title: 'Join Google Meet' });
      });
    }

    // Zoom detection
    const zoomRegex = /https?:\/\/[a-zA-Z0-9.-]*zoom\.us\/[a-zA-Z0-9/]+/g;
    const zoomMatches = text.match(zoomRegex);
    if (zoomMatches) {
      zoomMatches.forEach(url => {
        meetingLinks.push({ platform: 'Zoom', url, title: 'Join Zoom Meeting' });
      });
    }

    // Microsoft Teams detection
    const teamsRegex = /https?:\/\/teams\.microsoft\.com\/[a-zA-Z0-9/._-]+/g;
    const teamsMatches = text.match(teamsRegex);
    if (teamsMatches) {
      teamsMatches.forEach(url => {
        meetingLinks.push({ platform: 'Microsoft Teams', url, title: 'Join Teams Meeting' });
      });
    }

    return meetingLinks;
  };

  const handleSendMessage = (text: string) => {
    const detectedLinks = detectMeetingLinks(text);
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date(),
      meetingLinks: detectedLinks
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        meetingLinks: botResponse.meetingLinks
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  
  const getBotResponse = (message: string): { text: string; meetingLinks?: MeetingLink[] } => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('task') || lowerCaseMessage.includes('meeting') || lowerCaseMessage.includes('schedule')) {
      const sampleMeetingLinks: MeetingLink[] = [
        {
          platform: 'Google Meet',
          url: 'https://meet.google.com/abc-defg-hij',
          title: 'Project Review Meeting'
        },
        {
          platform: 'Zoom',
          url: 'https://zoom.us/j/1234567890',
          title: 'Team Standup'
        }
      ];
      
      return {
        text: "I can help you with tasks and meetings! Here are some upcoming meeting links I found:",
        meetingLinks: sampleMeetingLinks
      };
    }
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return { text: "Hello! How can I assist you with your tasks and meetings today?" };
    } else if (lowerCaseMessage.includes('help')) {
      return { text: "I'm here to help! I can assist with tasks, detect meeting links (Google Meet, Zoom, Teams), and more. What do you need?" };
    } else if (lowerCaseMessage.includes('thank')) {
      return { text: "You're welcome! Is there anything else I can help you with regarding your tasks or meetings?" };
    } else if (lowerCaseMessage.includes('bye')) {
      return { text: "Goodbye! Have a great day and successful meetings!" };
    } else {
      return { text: `I understand you're mentioning "${message.split(' ').slice(0, 3).join(' ')}"... Could you provide more details so I can help you better with tasks or meeting links?` };
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
            meetingLinks={message.meetingLinks}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;

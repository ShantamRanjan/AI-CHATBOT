
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Video, Users } from 'lucide-react';

type MeetingLink = {
  platform: string;
  url: string;
  title?: string;
};

type ChatMessageProps = {
  message: string;
  isBot: boolean;
  timestamp: Date;
  meetingLinks?: MeetingLink[];
};

const ChatMessage = ({ message, isBot, timestamp, meetingLinks }: ChatMessageProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google meet':
        return <Video className="h-4 w-4 text-green-600" />;
      case 'zoom':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'microsoft teams':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google meet':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'zoom':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'microsoft teams':
        return 'border-purple-200 bg-purple-50 hover:bg-purple-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

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
        
        {meetingLinks && meetingLinks.length > 0 && (
          <div className="mt-3 space-y-2">
            {meetingLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md border transition-colors text-sm",
                  getPlatformColor(link.platform),
                  isBot ? "text-gray-700" : "text-gray-800"
                )}
              >
                {getPlatformIcon(link.platform)}
                <div className="flex-1">
                  <div className="font-medium">{link.platform}</div>
                  {link.title && (
                    <div className="text-xs opacity-75">{link.title}</div>
                  )}
                </div>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            ))}
          </div>
        )}
        
        <p className={cn(
          "text-xs mt-2 text-right",
          isBot ? "text-gray-500" : "text-blue-100"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;


import React from 'react';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col h-[90vh]">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Chatbot</h1>
          <p className="text-gray-600">Ask me anything and I'll do my best to help!</p>
        </header>
        
        <div className="flex-1">
          <ChatContainer />
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 AI Chatbot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

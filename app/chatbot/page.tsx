'use client';

import TryYourChatbot from "@/components/TryYourChatbot";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChatbotContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('apiKey') || '';
  const description = searchParams.get('description') || '';

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-white text-5xl mb-4">Try Your Chat Bot</h1>
      <TryYourChatbot apiKey={apiKey} description={description} />
    </div>
  );
}

export default function Chatbot() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatbotContent />
    </Suspense>
  );
}
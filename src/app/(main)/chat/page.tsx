"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatInterface />
        <TextToSpeech />
      </div>
    </div>
  );
}

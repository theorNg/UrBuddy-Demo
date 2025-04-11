"use client";

import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <TextToSpeech />
      <NotificationCenter />
    </div>
  );
}

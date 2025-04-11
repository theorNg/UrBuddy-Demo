import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useChat } from "ai/react";
import { FaMicrophone, FaStop } from "react-icons/fa";

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setTranscript(transcript);
      };
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    handleInputChange({ target: { value: transcript } } as any);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto p-4">
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === "assistant"
                ? "bg-blue-100 p-2 rounded-lg"
                : "bg-gray-100 p-2 rounded-lg"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
        <Button
          type="button"
          variant={isRecording ? "destructive" : "secondary"}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </Button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function TextToSpeech() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();

      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Voice Assistant</CardTitle>
          <CardDescription>
            Use voice commands or convert text to speech
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? (
                <>
                  <Square className="w-4 h-4 mr-2" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" /> Start Recording
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => speak(text)}
              disabled={!text}
            >
              Read Text
            </Button>
          </div>
          <Textarea
            placeholder="Your text will appear here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
          />
        </CardContent>
      </Card>
    </div>
  );
}

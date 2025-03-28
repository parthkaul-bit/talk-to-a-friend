"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizontal, Loader2, Square } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    const newController = new AbortController();
    setController(newController);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        signal: newController.signal,
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Streaming not supported");

      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        for (const char of chunk) {
          accumulatedText += char;
          await new Promise((res) => setTimeout(res, 20));
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              role: "assistant",
              content: accumulatedText,
            };
            return updatedMessages;
          });
        }
      }
    } catch (error: unknown) {
      console.error("Error receiving message:", error);
    } finally {
      setIsLoading(false);
      setController(null);
    }
  };

  const handleStop = () => {
    if (controller) {
      controller.abort();
      setIsLoading(false);
      setController(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-2xl flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth h-[500px]">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-500">
              Start a conversation...
            </div>
          )}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </CardContent>
        <form onSubmit={handleSubmit} className="p-4 bg-background flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || input.trim() === ""}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
          {isLoading && (
            <Button onClick={handleStop} size="icon" variant="default">
              <Square className="h-4 w-4" />
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizontal, Loader2, Square } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const BOT_NAME = "Meheco";
  // const { user } = useUser();
  // const userProfilePic = user?.imageUrl || "/default-avatar.png"; // Fallback image
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! How can I help you? What happened today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
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
      <Card className="w-full max-w-2xl flex flex-col h-[90vh]">
        {/* Bot Header with Online/Typing Indicator */}
        <div className="flex items-center justify-between bg-muted p-3 border-b  border-border/30">
          <div className="flex items-center gap-2">
            <Image
              src="/bot-avatar.avif"
              alt="Bot"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">{BOT_NAME}</h2>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Typing..." : "🟢 Online"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* {message.role === "assistant" && (
                <img
                  src="/bot-avatar.avif"
                  alt="Assistant"
                  className="w-8 h-8 rounded-full"
                />
              )} */}

              <div
                className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {message.content}
              </div>

              {/* {message.role === "user" && (
                <img
                  src={userProfilePic}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              )} */}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Fixed Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 bg-background z-10 p-4 flex items-center gap-2"
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 h-12 px-4 text-base"
          />
          <Button
            type="submit"
            disabled={isLoading || input.trim() === ""}
            size="icon"
            className="h-12 w-12 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
          </Button>
          {isLoading && (
            <Button
              onClick={handleStop}
              size="icon"
              variant="default"
              className="h-12 w-12 flex items-center justify-center"
            >
              <Square className="h-5 w-5" />
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
}

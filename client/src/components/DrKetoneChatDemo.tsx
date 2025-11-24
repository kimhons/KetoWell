import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

const conversationScript: Omit<Message, "id" | "timestamp">[] = [
  {
    text: "Hi Dr. Ketone! I just had breakfast.",
    sender: "user",
  },
  {
    text: "Good morning! 🌅 I'd love to help you log that. What did you have for breakfast?",
    sender: "assistant",
  },
  {
    text: "2 eggs scrambled with butter, 3 strips of bacon, and half an avocado",
    sender: "user",
  },
  {
    text: "Excellent choice! Let me calculate the macros for you:\n\n🥚 2 eggs: 12g protein, 10g fat\n🥓 3 bacon strips: 9g protein, 12g fat\n🥑 Half avocado: 2g protein, 11g fat, 6g net carbs\n\n✅ Total: 23g protein, 33g fat, 6g net carbs\n\nYou're at 73% fat, 21% protein, 6% carbs - perfect ketogenic ratios! This meal will keep you in ketosis. How are you feeling?",
    sender: "assistant",
  },
  {
    text: "Feeling good! A bit tired though.",
    sender: "user",
  },
  {
    text: "That's completely normal during the adaptation phase. Based on your profile (Day 8 of keto), you're in the \"Early Adaptation\" period.\n\n💡 Quick tip: Your tiredness might be from electrolyte depletion. Try adding:\n• 1/4 tsp sea salt to water\n• A magnesium supplement (400mg)\n• Potassium-rich foods (spinach, salmon)\n\nThis should help within 30-60 minutes. Would you like me to add an electrolyte reminder to your daily checklist?",
    sender: "assistant",
  },
  {
    text: "Yes please!",
    sender: "user",
  },
  {
    text: "✅ Done! I've added \"Electrolyte check-in\" to your 10 AM and 3 PM reminders.\n\nYour ketone levels yesterday were 1.2 mmol/L - you're solidly in nutritional ketosis! Keep up the great work. 🎉\n\nAnything else I can help with today?",
    sender: "assistant",
  },
];

export default function DrKetoneChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now(),
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const resetDemo = () => {
    setMessages([]);
    setCurrentMessageIndex(0);
    setIsPlaying(true);
    setIsTyping(false);
  };

  useEffect(() => {
    if (!isPlaying || currentMessageIndex >= conversationScript.length) {
      return;
    }

    const currentScript = conversationScript[currentMessageIndex];
    const isAssistantMessage = currentScript.sender === "assistant";
    
    // Delay before showing next message
    const messageDelay = currentMessageIndex === 0 ? 1000 : isAssistantMessage ? 2000 : 1500;
    
    const timer = setTimeout(() => {
      if (isAssistantMessage) {
        setIsTyping(true);
        // Typing duration based on message length
        const typingDuration = Math.min(currentScript.text.length * 20, 2000);
        
        setTimeout(() => {
          setIsTyping(false);
          addMessage(currentScript);
          setCurrentMessageIndex((prev) => prev + 1);
        }, typingDuration);
      } else {
        addMessage(currentScript);
        setCurrentMessageIndex((prev) => prev + 1);
      }
    }, messageDelay);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, isPlaying]);

  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col bg-background shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-hero">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">Dr. Ketone</h3>
          <p className="text-xs text-white/80">Your AI Health Coach</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={resetDemo}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Demo Badge */}
      <div className="p-3 border-t bg-muted/30 text-center">
        <p className="text-xs text-muted-foreground">
          ✨ Interactive Demo - Experience Dr. Ketone in action
        </p>
      </div>
    </Card>
  );
}

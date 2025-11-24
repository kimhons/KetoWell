import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trackCustomEvent } from "@/lib/analytics";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            text: "Hi! 👋 I'm here to help you learn about KetoWell. How can I assist you today?",
            sender: "agent",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackCustomEvent("chat_opened", { source: "chat_widget" });
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if email is needed
    if (!email && messages.length > 2) {
      setShowEmailCapture(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    trackCustomEvent("chat_message_sent", { message_length: inputMessage.length });

    // Simulate typing
    setIsTyping(true);

    // Auto-response (in production, this would connect to a real chat service)
    setTimeout(() => {
      setIsTyping(false);
      const response = getAutoResponse(inputMessage);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1500);
  };

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setShowEmailCapture(false);
    trackCustomEvent("chat_email_captured", { email });
    toast.success("Thanks! We'll get back to you soon.");
  };

  const getAutoResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return "KetoWell offers three tiers: Free (basic tracking), Premium ($9.99/mo with unlimited Dr. Ketone), and Clinical ($19.99/mo with provider portal). Check out our Pricing page for details!";
    }

    if (lowerMessage.includes("safe") || lowerMessage.includes("safety") || lowerMessage.includes("side effect")) {
      return "Safety is our top priority! KetoWell includes medical screening for contraindications, SGLT2 inhibitor detection, and proactive side effect management. We recommend consulting your doctor before starting any new diet.";
    }

    if (lowerMessage.includes("dr. ketone") || lowerMessage.includes("dr ketone") || lowerMessage.includes("ai")) {
      return "Dr. Ketone is your autonomous AI health agent! It proactively monitors your progress, predicts challenges, logs meals via natural language, and provides evidence-based guidance 24/7. Think of it as your personal keto coach.";
    }

    if (lowerMessage.includes("research") || lowerMessage.includes("evidence") || lowerMessage.includes("study")) {
      return "KetoWell is built on 12+ peer-reviewed studies from 2024-2025. Our Research page has detailed evidence on metabolic health, cardiovascular benefits, and neurological outcomes. All claims are backed by science!";
    }

    if (lowerMessage.includes("diabetes") || lowerMessage.includes("medication") || lowerMessage.includes("drug")) {
      return "KetoWell has special safety protocols for diabetes and medications. We screen for SGLT2 inhibitors (which can increase ketoacidosis risk) and provide medication adjustment guidance. Always consult your healthcare provider.";
    }

    if (lowerMessage.includes("download") || lowerMessage.includes("app") || lowerMessage.includes("get started")) {
      return "The KetoWell app will be available soon on iOS and Android! Join our newsletter to be notified at launch and get exclusive early access. You can sign up at the bottom of the homepage.";
    }

    if (lowerMessage.includes("provider") || lowerMessage.includes("doctor") || lowerMessage.includes("clinician")) {
      return "Healthcare providers can access our Clinical tier for patient monitoring, progress tracking, and EHR integration. Visit our For Providers page to learn more and request a demo!";
    }

    // Default response
    return "Great question! For detailed information, check out our website or leave your email and our team will get back to you within 24 hours. You can also explore our FAQ section for quick answers!";
  };

  const quickReplies = [
    "How does Dr. Ketone work?",
    "Is keto safe for me?",
    "What's the pricing?",
    "Show me the research",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-cta rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-none px-1.5 py-0.5 text-xs">
          1
        </Badge>
      </button>
    );
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 z-50 w-96 shadow-2xl transition-all ${
        isMinimized ? "h-16" : "h-[600px]"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-cta text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-white">KetoWell Support</h4>
            <p className="text-xs text-white/80">We typically reply instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleChat}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px] bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-background border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t space-y-2">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => {
                      setInputMessage(reply);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email Capture Modal */}
          {showEmailCapture && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="space-y-4 w-full">
                <h4 className="font-semibold">Stay in touch</h4>
                <p className="text-sm text-muted-foreground">
                  Leave your email and we'll get back to you within 24 hours!
                </p>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
                <div className="flex gap-2">
                  <Button onClick={handleEmailSubmit} className="flex-1">
                    Submit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowEmailCapture(false)}
                  >
                    Skip
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const DEMO_CONVERSATIONS = [
  {
    trigger: "What should I eat for breakfast?",
    response:
      "Great question! For a keto breakfast, focus on high-fat, moderate-protein options. Try:\n\n• 3 eggs cooked in butter with avocado\n• Greek yogurt (full-fat) with nuts and seeds\n• Bulletproof coffee with MCT oil\n\nAim for 70-75% fat, 20-25% protein, and under 5% carbs. Would you like a specific meal plan?",
  },
  {
    trigger: "Why am I not losing weight?",
    response:
      "Let's troubleshoot together! Common reasons for weight plateaus on keto:\n\n1. **Hidden carbs** - Check sauces, dressings, processed foods\n2. **Too much protein** - Excess converts to glucose via gluconeogenesis\n3. **Not enough fat** - Your body needs fat for fuel\n4. **Stress/sleep** - Cortisol affects ketone production\n\nCan you share your typical daily meals? I'll help identify the issue.",
  },
  {
    trigger: "Is keto safe for diabetics?",
    response:
      "Excellent question! Research shows keto can be very effective for Type 2 diabetes:\n\n✅ **Benefits:**\n• HbA1c reduction: -0.29% (meta-analysis)\n• Improved insulin sensitivity\n• Reduced medication needs\n\n⚠️ **Important:**\n• Consult your doctor FIRST\n• Monitor blood sugar closely\n• Medication adjustments may be needed\n• SGLT2 inhibitors + keto = DKA risk\n\nI can help you track, but always work with your healthcare team!",
  },
];

export default function DrKetoneDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Dr. Ketone, your AI-powered metabolic health companion. I provide personalized guidance, answer your questions 24/7, and help you understand your body's response to keto. Try asking me a question!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleDemoQuestion = (question: string) => {
    const conversation = DEMO_CONVERSATIONS.find((c) => c.trigger === question);
    if (!conversation) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: conversation.response },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const resetDemo = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm Dr. Ketone, your AI-powered metabolic health companion. I provide personalized guidance, answer your questions 24/7, and help you understand your body's response to keto. Try asking me a question!",
      },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-4 border-b flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
              🧬
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Dr. Ketone
              <Sparkles className="h-4 w-4 text-primary" />
            </h3>
            <p className="text-sm text-muted-foreground">
              AI Health Companion • Always Online
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={resetDemo}>
            Reset Demo
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                    🧬
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 border border-primary/30">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                  🧬
                </AvatarFallback>
              </Avatar>
              <div className="bg-background border shadow-sm rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Question Buttons */}
        <div className="p-4 border-t bg-background space-y-2">
          <p className="text-xs text-muted-foreground mb-2">
            Try these demo questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_CONVERSATIONS.map((conv, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleDemoQuestion(conv.trigger)}
                disabled={isTyping}
                className="text-xs"
              >
                <Send className="h-3 w-3 mr-1" />
                {conv.trigger}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            💡 This is a demo. The real Dr. Ketone in the app provides personalized,
            context-aware guidance based on your health data and goals.
          </p>
        </div>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";
import { OnboardingLayout } from "./OnboardingLayout";

interface BrandVoiceProps {
  onContinue: (voice: VoiceType) => void;
  onBack: () => void;
}

type VoiceType = "friendly" | "professional" | "playful" | "minimal";

const voiceOptions = [
  {
    id: "friendly" as const,
    icon: "👋",
    name: "Friendly",
    description: "Warm & approachable",
    useCase: "Lifestyle brands, small businesses",
  },
  {
    id: "professional" as const,
    icon: "💼",
    name: "Professional",
    description: "Polished & trustworthy",
    useCase: "B2B, premium brands",
  },
  {
    id: "playful" as const,
    icon: "🎉",
    name: "Playful",
    description: "Fun & energetic",
    useCase: "Youth brands, entertainment",
  },
  {
    id: "minimal" as const,
    icon: "✨",
    name: "Minimal",
    description: "Clean & direct",
    useCase: "Tech brands, modern aesthetics",
  },
];

const emailPreviews: Record<VoiceType, {
  subject: string;
  greeting: string;
  body: string;
  items: string[];
  cta: string;
  closing: string;
  signature: string;
}> = {
  friendly: {
    subject: "We noticed you left something behind! 🛒",
    greeting: "Hi Sarah!",
    body: "We noticed you left some awesome items in your cart. No pressure, but we wanted to make sure you didn't forget!",
    items: ["Classic White T-Shirt - $29.00", "Running Shoes - $89.00"],
    cta: "Complete Your Order",
    closing: "Cheers,",
    signature: "The Team",
  },
  professional: {
    subject: "Your Cart Awaits Your Return",
    greeting: "Dear Sarah,",
    body: "We noticed you have items awaiting purchase in your shopping cart. We wanted to remind you that these items are still available.",
    items: ["Classic White T-Shirt - $29.00", "Running Shoes - $89.00"],
    cta: "Complete Your Order",
    closing: "Best regards,",
    signature: "Customer Service Team",
  },
  playful: {
    subject: "Oops! Your cart is feeling lonely! 🎉",
    greeting: "Hey Sarah! 👋",
    body: "Your cart is sitting there like \"um, hello? remember me?\" 😅 Those items are TOTALLY waiting for you!",
    items: ["Classic White T-Shirt - $29.00", "Running Shoes - $89.00"],
    cta: "Come Back & Shop!",
    closing: "You rock! ✨",
    signature: "The Team",
  },
  minimal: {
    subject: "Cart Reminder",
    greeting: "Sarah,",
    body: "Items in your cart:",
    items: ["Classic White T-Shirt - $29.00", "Running Shoes - $89.00"],
    cta: "Complete Order",
    closing: "",
    signature: "Thanks",
  },
};

export function BrandVoice({ onContinue, onBack }: BrandVoiceProps) {
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>("friendly");

  const preview = emailPreviews[selectedVoice];

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={3}
      title="Define Your Brand Voice"
      subtitle="Choose how Yona communicates with your customers"
    >
      <div className="space-y-8">
        {/* Voice Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {voiceOptions.map((voice) => (
            <Card
              key={voice.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg text-center ${
                selectedVoice === voice.id
                  ? "border-2 border-emerald-500 shadow-lg bg-emerald-50"
                  : "border-2 border-gray-200 hover:border-emerald-300"
              }`}
              onClick={() => setSelectedVoice(voice.id)}
            >
              <div className="text-4xl mb-3">{voice.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{voice.name}</h3>
              <p className="text-xs text-gray-600 mb-3">{voice.description}</p>
              <p className="text-xs text-gray-500 mb-4">{voice.useCase}</p>
              
              {selectedVoice === voice.id && (
                <div className="flex items-center justify-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-semibold">SELECTED</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Live Email Preview */}
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Live Email Preview</h3>
            <Badge variant="outline" className="ml-auto">
              {voiceOptions.find(v => v.id === selectedVoice)?.name} Voice
            </Badge>
          </div>

          {/* Email Preview Content */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            {/* Email Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Subject:</p>
              <p className="font-semibold text-gray-900">{preview.subject}</p>
            </div>

            {/* Email Body */}
            <div className="space-y-4">
              <p className="text-gray-900">{preview.greeting}</p>
              
              <p className="text-gray-700">{preview.body}</p>

              {preview.body !== "Items in your cart:" && (
                <div className="pt-2">
                  <p className="text-gray-900 font-medium mb-2">
                    {selectedVoice === "playful" ? "What you left behind:" : "Your items are waiting for you:"}
                  </p>
                  <ul className="space-y-1">
                    {preview.items.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {preview.body === "Items in your cart:" && (
                <ul className="space-y-1">
                  {preview.items.map((item, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  {preview.cta}
                </button>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-gray-100">
                {preview.closing && <p className="text-gray-700">{preview.closing}</p>}
                <p className="text-gray-900 font-medium">{preview.signature}</p>
              </div>
            </div>
          </div>

          {/* Preview Note */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            This is a preview of how your cart abandonment emails will look. All content is AI-personalized for each customer.
          </p>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={() => onContinue(selectedVoice)}
            className="bg-emerald-600 hover:bg-emerald-700 px-8"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}

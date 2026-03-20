/**
 * Multi-step Onboarding Flow for Yona AI Revenue Agent
 * 
 * This component manages a 3-step onboarding experience:
 * 1. Plan Selection - Choose between Starter ($29) and Growth ($79) plans
 * 2. Brand Voice - Select communication tone (Friendly, Professional, Playful, Minimal)
 * 3. AI Activation - Review setup and activate the AI agent
 * 
 * Features:
 * - Progressive disclosure with step indicators
 * - ROI calculator on plan selection
 * - Live email preview for brand voice
 * - Smooth transitions between steps
 * - Back/forward navigation
 * 
 * Usage:
 * ```tsx
 * <Onboarding onComplete={(data) => {
 *   console.log('Plan:', data.plan);
 *   console.log('Voice:', data.voice);
 *   // Save to backend and redirect to dashboard
 * }} />
 * ```
 */

import { useState } from "react";
import { PlanSelection } from "./onboarding/PlanSelection";
import { BrandVoice } from "./onboarding/BrandVoice";
import { AIActivation } from "./onboarding/AIActivation";

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  plan: "starter" | "growth";
  voice: "friendly" | "professional" | "playful" | "minimal";
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const handlePlanSelection = (plan: "starter" | "growth") => {
    setOnboardingData(prev => ({ ...prev, plan }));
    setStep(2);
  };

  const handleBrandVoiceSelection = (voice: "friendly" | "professional" | "playful" | "minimal") => {
    setOnboardingData(prev => ({ ...prev, voice }));
    setStep(3);
  };

  const handleActivation = () => {
    if (onboardingData.plan && onboardingData.voice) {
      onComplete({
        plan: onboardingData.plan,
        voice: onboardingData.voice,
      });
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  return (
    <>
      {step === 1 && (
        <PlanSelection
          onContinue={handlePlanSelection}
        />
      )}
      {step === 2 && (
        <BrandVoice
          onContinue={handleBrandVoiceSelection}
          onBack={handleBack}
        />
      )}
      {step === 3 && onboardingData.plan && onboardingData.voice && (
        <AIActivation
          onActivate={handleActivation}
          onBack={handleBack}
          selectedPlan={onboardingData.plan}
          selectedVoice={onboardingData.voice}
        />
      )}
    </>
  );
}

/**
 * Multi-step Onboarding Flow for Yona AI Revenue Agent
 * 
 * This component manages a 4-step onboarding experience:
 * 1. Plan Selection - Choose between Starter ($29) and Growth ($79) plans
 * 2. Brand Voice - Select communication tone (Friendly, Professional, Playful, Minimal)
 * 3. System Check - Verify checkout configuration (Email Collection & Marketing Opt-in)
 * 4. AI Activation - Review setup and activate the AI agent
 * 
 * Features:
 * - Progressive disclosure with step indicators
 * - ROI calculator on plan selection
 * - Live email preview for brand voice
 * - Checkout configuration validation via API
 * - Smooth transitions between steps
 * - Back/forward navigation
 * 
 * Usage:
 * ```tsx
 * <Onboarding onComplete={(data) => {
 *   console.log('Plan:', data.plan);
 *   console.log('Voice:', data.voice);
 *   console.log('Checkout Ready:', data.checkoutReady);
 *   // Save to backend and redirect to dashboard
 * }} />
 * ```
 */

import { useState } from "react";
import { PlanSelection } from "./onboarding/PlanSelection";
import { BrandVoice } from "./onboarding/BrandVoice";
import { SystemCheck } from "./onboarding/SystemCheck";
import { AIActivation } from "./onboarding/AIActivation";

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  shopDomain?: string;
}

export interface OnboardingData {
  plan: "starter" | "growth";
  voice: "friendly" | "professional" | "playful" | "minimal";
  checkoutReady: boolean;
}

export function Onboarding({ onComplete, shopDomain }: OnboardingProps) {
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

  const handleSystemCheck = (checkoutReady: boolean) => {
    setOnboardingData(prev => ({ ...prev, checkoutReady }));
    setStep(4);
  };

  const handleActivation = () => {
    if (onboardingData.plan && onboardingData.voice) {
      onComplete({
        plan: onboardingData.plan,
        voice: onboardingData.voice,
        checkoutReady: onboardingData.checkoutReady ?? false,
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
      {step === 3 && (
        <SystemCheck
          onContinue={handleSystemCheck}
          onBack={handleBack}
          shopDomain={shopDomain}
        />
      )}
      {step === 4 && onboardingData.plan && onboardingData.voice && (
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

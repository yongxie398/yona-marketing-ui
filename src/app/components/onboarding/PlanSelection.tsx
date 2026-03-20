import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Check, DollarSign, TrendingUp, Shield, Zap } from "lucide-react";
import { OnboardingLayout } from "./OnboardingLayout";

interface PlanSelectionProps {
  onContinue: (plan: "starter" | "growth") => void;
  onBack?: () => void;
}

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    price: 29,
    description: "Perfect for growing stores",
    recommended: false,
    features: [
      "Up to 500 orders/month",
      "Basic analytics dashboard",
      "Email support",
      "Standard email templates",
      "Cart abandonment recovery",
    ],
  },
  {
    id: "growth" as const,
    name: "Growth",
    price: 79,
    description: "Best for scaling businesses",
    recommended: true,
    features: [
      "Unlimited orders",
      "Advanced analytics & insights",
      "Priority support",
      "Custom email templates",
      "All recovery campaigns",
      "A/B testing",
      "Advanced AI personalization",
    ],
  },
];

export function PlanSelection({ onContinue, onBack }: PlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth">("growth");
  const [projectedRevenue, setProjectedRevenue] = useState("2000");

  const revenue = parseFloat(projectedRevenue) || 0;
  const potentialRecovery = Math.round(revenue * 0.30);
  const recommendedPlan = revenue < 1000 ? "starter" : "growth";

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={4}
      title="Choose Your Plan"
      subtitle="Select the plan that fits your business needs"
    >
      <div className="space-y-8">
        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === plan.id
                  ? "border-2 border-emerald-500 shadow-lg"
                  : "border-2 border-gray-200 hover:border-emerald-300"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="flex justify-end mb-2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600">
                    ⭐ RECOMMENDED
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <Button
                className={`w-full ${
                  selectedPlan === plan.id
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                }}
              >
                {selectedPlan === plan.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  `Select ${plan.name}`
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Savings Calculator */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Savings Calculator</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projected Monthly Revenue
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={projectedRevenue}
                  onChange={(e) => setProjectedRevenue(e.target.value)}
                  className="pl-8 text-lg font-semibold"
                  placeholder="2,000"
                />
              </div>
            </div>

            {revenue > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-600">Potential Monthly Recovery</p>
                    <p className="text-2xl font-bold text-emerald-900">
                      ${potentialRecovery.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Based on 30% recovery rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <Zap className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Recommended Plan</p>
                    <p className="text-2xl font-bold text-blue-900 capitalize">
                      {recommendedPlan}
                    </p>
                    <p className="text-xs text-gray-500">Optimized for your volume</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Billed through Shopify</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>No long-term contract</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {onBack ? (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={() => onContinue(selectedPlan)}
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

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle2, Circle, Zap, TrendingUp, Mail, BarChart3, Clock } from "lucide-react";
import { OnboardingLayout } from "./OnboardingLayout";

interface AIActivationProps {
  onActivate: () => void;
  onBack: () => void;
  selectedPlan: string;
  selectedVoice: string;
}

export function AIActivation({ onActivate, onBack, selectedPlan, selectedVoice }: AIActivationProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = async () => {
    setIsActivating(true);
    // Simulate activation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    onActivate();
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={3}
      title="Your AI is Ready! 🎉"
      subtitle="Review your setup and activate your revenue agent"
    >
      <div className="space-y-8">
        {/* Setup Status */}
        <Card className="p-6 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Setup Status</h3>
          </div>

          <div className="space-y-4">
            {/* Data Synced */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Data Synced</h4>
                <p className="text-sm text-gray-600">Your store data has been imported and analyzed</p>
              </div>
            </div>

            {/* Plan Selected */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Plan Selected</h4>
                <p className="text-sm text-gray-600 capitalize">{selectedPlan} plan activated</p>
              </div>
            </div>

            {/* Brand Voice Set */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Brand Voice Set</h4>
                <p className="text-sm text-gray-600 capitalize">{selectedVoice} tone selected</p>
              </div>
            </div>

            {/* AI Activation Pending */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center mt-0.5">
                <Circle className="w-3 h-3 fill-blue-600 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">AI Activation Pending</h4>
                <p className="text-sm text-blue-700">Click "Activate AI" below to start monitoring</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What Happens Next */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">What Happens Next</h3>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">1. AI Starts Monitoring</h4>
                <p className="text-sm text-gray-600">
                  Yona begins tracking abandoned carts, checkouts, and customer behavior patterns in real-time
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">2. Automatic Personalized Messages</h4>
                <p className="text-sm text-gray-600">
                  AI-generated emails sent at optimal times based on customer behavior and engagement patterns
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-700" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">3. Revenue Recovery</h4>
                <p className="text-sm text-gray-600">
                  Recovered sales automatically appear in your dashboard with full attribution tracking
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-amber-700" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">4. Continuous Optimization</h4>
                <p className="text-sm text-gray-600">
                  AI runs A/B tests and learns from results to improve performance automatically
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Expected Timeline */}
        <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <Clock className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Expected first action: Within 24 hours</p>
            <p className="text-xs text-blue-700">First recovered sale typically within 3-7 days</p>
          </div>
        </div>

        {/* Set it and Forget it Message */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Set It and Forget It</h3>
            <p className="text-gray-700 max-w-md mx-auto">
              Your AI Revenue Agent works autonomously 24/7. No manual intervention needed. 
              Just monitor results and watch your revenue grow.
            </p>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onBack} disabled={isActivating}>
            Back
          </Button>
          <Button
            onClick={handleActivate}
            disabled={isActivating}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8"
            size="lg"
          >
            {isActivating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Activating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Activate AI
              </>
            )}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}

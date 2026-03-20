import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw, 
  Shield, 
  Mail, 
  MessageSquare,
  Loader2
} from "lucide-react";
import { OnboardingLayout } from "./OnboardingLayout";

interface SystemCheckProps {
  onContinue: (checkoutReady: boolean) => void;
  onBack: () => void;
  shopDomain?: string;
}

interface CheckStatus {
  emailCollection: "checking" | "pass" | "fail";
  marketingConsent: "checking" | "pass" | "fail";
}

interface CheckoutReadiness {
  email_collection: boolean;
  marketing_consent: boolean;
  is_ready: boolean;
}

// Simulated API call - in production, this would call your FastAPI backend
async function fetchCheckoutReadiness(shopDomain: string): Promise<CheckoutReadiness> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulated response - in production, this calls:
  // GET /api/shops/{shop_domain}/checkout-readiness
  // Which uses: get_checkout_readiness(shop_data)
  return {
    email_collection: Math.random() > 0.3, // 70% chance of passing for demo
    marketing_consent: Math.random() > 0.4, // 60% chance of passing for demo
    is_ready: false, // Will be calculated based on above
  };
}

export function SystemCheck({ onContinue, onBack, shopDomain = "your-store" }: SystemCheckProps) {
  const [checkStatus, setCheckStatus] = useState<CheckStatus>({
    emailCollection: "checking",
    marketingConsent: "checking",
  });
  const [isRechecking, setIsRechecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const runChecks = async () => {
    setCheckStatus({
      emailCollection: "checking",
      marketingConsent: "checking",
    });
    setIsRechecking(true);

    try {
      const result = await fetchCheckoutReadiness(shopDomain);
      
      setCheckStatus({
        emailCollection: result.email_collection ? "pass" : "fail",
        marketingConsent: result.marketing_consent ? "pass" : "fail",
      });
      setHasChecked(true);
    } catch {
      setCheckStatus({
        emailCollection: "fail",
        marketingConsent: "fail",
      });
    } finally {
      setIsRechecking(false);
    }
  };

  useEffect(() => {
    runChecks();
  }, []);

  const allChecksPassed = checkStatus.emailCollection === "pass" && checkStatus.marketingConsent === "pass";
  const anyCheckFailed = checkStatus.emailCollection === "fail" || checkStatus.marketingConsent === "fail";
  const isChecking = checkStatus.emailCollection === "checking" || checkStatus.marketingConsent === "checking";

  const shopifySettingsUrl = `https://${shopDomain}.myshopify.com/admin/settings/checkout`;

  const getStatusIcon = (status: "checking" | "pass" | "fail") => {
    switch (status) {
      case "checking":
        return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
      case "pass":
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case "fail":
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getStatusBadge = (status: "checking" | "pass" | "fail") => {
    switch (status) {
      case "checking":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            Checking...
          </Badge>
        );
      case "pass":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            Pass
          </Badge>
        );
      case "fail":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
            Action Required
          </Badge>
        );
    }
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      title="System Check"
      subtitle="Verify your store is ready to recover revenue with AI"
    >
      <div className="space-y-8">
        {/* Warning Banner - Show when checks fail */}
        {anyCheckFailed && hasChecked && (
          <Card className="p-6 border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-1">
                  Action Required: Prepare your store for AI
                </h3>
                <p className="text-sm text-amber-800">
                  To recover revenue, Shopify needs to collect customer emails and marketing consent. 
                  Please update the settings below before activating your AI agent.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Success Banner - Show when all checks pass */}
        {allChecksPassed && hasChecked && (
          <Card className="p-6 border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900 mb-1">
                  Your Store is Ready!
                </h3>
                <p className="text-sm text-emerald-800">
                  All system checks passed. Your store is configured correctly to recover revenue with Yona AI.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Checklist Card */}
        <Card className="p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Checkout Configuration</h3>
                <p className="text-sm text-gray-500">Required for AI email recovery</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={runChecks}
              disabled={isRechecking}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRechecking ? "animate-spin" : ""}`} />
              Recheck
            </Button>
          </div>

          <div className="space-y-4">
            {/* Email Collection Check */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-colors ${
              checkStatus.emailCollection === "pass" 
                ? "bg-emerald-50 border-emerald-200" 
                : checkStatus.emailCollection === "fail"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}>
              <div className="mt-0.5">
                {getStatusIcon(checkStatus.emailCollection)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    Email Collection
                  </h4>
                  {getStatusBadge(checkStatus.emailCollection)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Customer email must be required at checkout to enable recovery emails.
                </p>
                {checkStatus.emailCollection === "fail" && (
                  <p className="text-sm text-red-700 font-medium">
                    Currently set to Phone Only or Optional
                  </p>
                )}
              </div>
            </div>

            {/* Marketing Consent Check */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-colors ${
              checkStatus.marketingConsent === "pass" 
                ? "bg-emerald-50 border-emerald-200" 
                : checkStatus.marketingConsent === "fail"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}>
              <div className="mt-0.5">
                {getStatusIcon(checkStatus.marketingConsent)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    Marketing Opt-in
                  </h4>
                  {getStatusBadge(checkStatus.marketingConsent)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Marketing consent option must be visible at checkout for compliant email sending.
                </p>
                {checkStatus.marketingConsent === "fail" && (
                  <p className="text-sm text-red-700 font-medium">
                    Currently hidden at checkout
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fix in Shopify Settings Button */}
          {anyCheckFailed && hasChecked && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                size="lg"
              >
                <a href={shopifySettingsUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                  Fix in Shopify Settings
                </a>
              </Button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Opens your Shopify checkout settings in a new tab. After making changes, click "Recheck" above.
              </p>
            </div>
          )}
        </Card>

        {/* Why This Matters Card */}
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Why This Matters</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-700">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Email Required for Recovery</h4>
                <p className="text-sm text-gray-600">
                  Without customer emails, Yona cannot send personalized recovery messages to abandoned shoppers.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-purple-700">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Legal Compliance</h4>
                <p className="text-sm text-gray-600">
                  Marketing consent ensures all emails are GDPR/CAN-SPAM compliant and customers have opted in.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-emerald-700">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Maximum Revenue Recovery</h4>
                <p className="text-sm text-gray-600">
                  Proper setup means more abandoned carts can be recovered, maximizing your ROI.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onBack} disabled={isChecking}>
            Back
          </Button>
          <div className="flex items-center gap-3">
            {anyCheckFailed && hasChecked && (
              <p className="text-sm text-amber-700 font-medium">
                You can continue, but recovery will be limited
              </p>
            )}
            <Button
              onClick={() => onContinue(allChecksPassed)}
              disabled={isChecking}
              className={`px-8 ${
                allChecksPassed 
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              }`}
              size="lg"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Checking...
                </>
              ) : allChecksPassed ? (
                "Continue to Activation"
              ) : (
                "Continue Anyway"
              )}
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}

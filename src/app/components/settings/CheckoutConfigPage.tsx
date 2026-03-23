"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { 
  ArrowLeft, 
  Settings,
  Shield,
  Mail,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Save
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export function CheckoutConfigPage() {
  const navigate = useNavigate();
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [marketingConfirmed, setMarketingConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const canProceed = emailConfirmed && marketingConfirmed;
  const shopDomain = "your-store"; // In real app, get from context/API
  const shopifySettingsUrl = `https://${shopDomain}.myshopify.com/admin/settings/checkout`;

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Navigate back to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mimics SettingsPage */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-600" />
                <h1 className="text-2xl font-bold text-gray-900">Configure Agent</h1>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Configure Your Shopify Checkout
                </h3>
                <p className="text-sm text-gray-600">
                  To recover revenue, your Shopify store needs to collect customer emails and marketing consent. 
                  Follow the steps below to configure your checkout settings.
                </p>
              </div>
            </div>
          </Card>

          {/* Setup Checklist */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Setup Checklist</h2>
                <p className="text-sm text-gray-500">Complete both steps to enable full AI recovery</p>
              </div>
            </div>

            {/* Open Shopify Settings Button - Always visible until complete */}
            {!canProceed && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Open your Shopify settings</p>
                      <p className="text-xs text-gray-500">Settings &gt; Checkout &gt; Customer contact method</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="sm"
                  >
                    <a href={shopifySettingsUrl} target="_blank" rel="noopener noreferrer">
                      Open Shopify Settings
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Collection Confirmation */}
              <div 
                className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                  emailConfirmed 
                    ? "bg-emerald-50 border-emerald-300" 
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <Checkbox 
                      id="email-confirmed" 
                      checked={emailConfirmed} 
                      onCheckedChange={(checked) => setEmailConfirmed(checked === true)}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label 
                        htmlFor="email-confirmed" 
                        className="font-semibold text-gray-900 flex items-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-gray-600" />
                        I have set &quot;Customer Contact Method&quot; to Email
                      </label>
                      <Badge 
                        variant={emailConfirmed ? "default" : "outline"}
                        className={emailConfirmed 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : "text-gray-500"
                        }
                      >
                        {emailConfirmed ? "Confirmed" : "Required"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Go to <span className="font-medium">Settings &gt; Checkout &gt; Customer contact method</span> and select 
                      <span className="font-medium"> &quot;Email&quot;</span> as the required contact method.
                    </p>
                    {emailConfirmed && (
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Email collection enabled</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Marketing Consent Confirmation */}
              <div 
                className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                  marketingConfirmed 
                    ? "bg-emerald-50 border-emerald-300" 
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <Checkbox 
                      id="marketing-confirmed" 
                      checked={marketingConfirmed} 
                      onCheckedChange={(checked) => setMarketingConfirmed(checked === true)}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label 
                        htmlFor="marketing-confirmed" 
                        className="font-semibold text-gray-900 flex items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                        I have enabled &quot;Marketing Opt-in&quot; at checkout
                      </label>
                      <Badge 
                        variant={marketingConfirmed ? "default" : "outline"}
                        className={marketingConfirmed 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : "text-gray-500"
                        }
                      >
                        {marketingConfirmed ? "Confirmed" : "Required"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Go to <span className="font-medium">Settings &gt; Checkout &gt; Marketing options</span> and enable 
                      <span className="font-medium"> &quot;Show email marketing opt-in at checkout&quot;</span>.
                    </p>
                    {marketingConfirmed && (
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Marketing consent enabled</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {canProceed && (
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Your Store is Ready!</p>
                    <p className="text-sm text-emerald-700">All settings confirmed. Your AI agent can now operate at full capacity.</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Why This Matters Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Why This Matters</h2>
                <p className="text-sm text-gray-500">Understanding the importance of these settings</p>
              </div>
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
                    Marketing consent ensures all emails are GDPR/CAN-SPAM compliant. By confirming this, you certify compliance with anti-spam laws.
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
                    Proper setup means more abandoned carts can be recovered, maximizing your ROI with Yona AI.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

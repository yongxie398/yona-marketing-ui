"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { 
  ArrowLeft, 
  ShieldCheck,
  Mail,
  Megaphone,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export function CheckoutConfigPage() {
  const navigate = useNavigate();
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [marketingConfirmed, setMarketingConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const allConfirmed = emailConfirmed && marketingConfirmed;
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
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h1 className="text-2xl font-bold text-gray-900">Configure Agent</h1>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isSaving || !allConfirmed}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Save & Continue
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Introduction Card */}
          <Card className="p-6 border-amber-200 bg-amber-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Action Required: Prepare Your Store for AI</h2>
                <p className="text-sm text-gray-600 mt-1">
                  To recover revenue, Shopify needs to collect customer emails and marketing consent. 
                  Please confirm the settings below to enable full AI functionality.
                </p>
                <a
                  href={shopifySettingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Open Shopify Checkout Settings
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>

          {/* Email Collection Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Email Collection</h2>
                    <p className="text-sm text-gray-500 mt-1">Required for sending recovery emails</p>
                  </div>
                  {emailConfirmed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      Action Required
                    </span>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">How to configure in Shopify:</h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">1</span>
                      <span>Go to <strong>Settings &gt; Checkout</strong> in your Shopify admin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">2</span>
                      <span>Under <strong>Customer contact method</strong>, select <strong>&quot;Email&quot;</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">3</span>
                      <span>Click <strong>Save</strong> to apply changes</span>
                    </li>
                  </ol>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Checkbox
                    id="emailConfirmed"
                    checked={emailConfirmed}
                    onCheckedChange={(checked) => setEmailConfirmed(checked === true)}
                  />
                  <label 
                    htmlFor="emailConfirmed" 
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    I have set Customer Contact Method to Email
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Marketing Opt-in Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Marketing Opt-in</h2>
                    <p className="text-sm text-gray-500 mt-1">Required for marketing compliance</p>
                  </div>
                  {marketingConfirmed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      Action Required
                    </span>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">How to configure in Shopify:</h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">1</span>
                      <span>Go to <strong>Settings &gt; Checkout</strong> in your Shopify admin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">2</span>
                      <span>Scroll down to <strong>Marketing options</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">3</span>
                      <span>Enable <strong>&quot;Show email marketing opt-in at checkout&quot;</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">4</span>
                      <span>Click <strong>Save</strong> to apply changes</span>
                    </li>
                  </ol>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Checkbox
                    id="marketingConfirmed"
                    checked={marketingConfirmed}
                    onCheckedChange={(checked) => setMarketingConfirmed(checked === true)}
                  />
                  <label 
                    htmlFor="marketingConfirmed" 
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    I have enabled Marketing Opt-in at checkout
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Summary */}
          <Card className={`p-6 ${allConfirmed ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {allConfirmed ? (
                  <>
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-900">All Requirements Met</h3>
                      <p className="text-sm text-emerald-700">Your store is ready for full AI functionality</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Configuration Incomplete</h3>
                      <p className="text-sm text-gray-500">Please confirm all settings above to continue</p>
                    </div>
                  </>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving || !allConfirmed}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

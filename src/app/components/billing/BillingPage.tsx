import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  HelpCircle,
  Check,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Link } from "react-router";

// Mock data structure based on PRD
interface BillingDashboard {
  plan: {
    name: string;
    type: string;
    price_monthly: number;
    revenue_share_percentage: number;
    first_month_free: boolean;
  };
  billing_period: {
    first_month_free_active: boolean;
    first_month_days_remaining: number;
  };
  metrics: {
    recovered_revenue: number;
    billable_revenue: number;
    estimated_fee: number;
    base_monthly_fee: number;
  };
  show_upgrade_banner: boolean;
}

// Mock data - In production, this would come from API
const mockBillingData: BillingDashboard = {
  plan: {
    name: "Starter",
    type: "starter",
    price_monthly: 0,
    revenue_share_percentage: 8,
    first_month_free: true,
  },
  billing_period: {
    first_month_free_active: true,
    first_month_days_remaining: 22,
  },
  metrics: {
    recovered_revenue: 847.50,
    billable_revenue: 847.50,
    estimated_fee: 0, // Free during first month
    base_monthly_fee: 0,
  },
  show_upgrade_banner: true, // Show when recovered > $500
};

export function BillingPage() {
  const [billingData] = useState<BillingDashboard>(mockBillingData);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUpgrading(false);
    // In production, redirect to Shopify billing confirmation
  };

  const calculateSavings = (revenue: number) => {
    const starterCost = billingData.plan.price_monthly + (revenue * 0.08);
    const growthCost = 39 + (revenue * 0.05);
    return starterCost - growthCost;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upgrade Banner */}
        {billingData.show_upgrade_banner && billingData.plan.type === "starter" && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upgrade to Save More
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  You've recovered <span className="font-bold text-emerald-600">
                    ${billingData.metrics.recovered_revenue.toFixed(2)}
                  </span> this month. Upgrade to Growth and pay less per dollar recovered.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Save ${calculateSavings(billingData.metrics.recovered_revenue).toFixed(2)} with Growth plan</span>
                </div>
              </div>
              <Button 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 whitespace-nowrap"
              >
                {isUpgrading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Upgrading...
                  </>
                ) : (
                  "Upgrade to Growth"
                )}
              </Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Current Plan Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                <p className="text-sm text-gray-500">Your subscription details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {billingData.plan.name}
                  </span>
                  {billingData.plan.type === "starter" && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Free Tier
                    </Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${billingData.plan.price_monthly}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Revenue Share
                  </span>
                  <span className="text-lg font-bold text-emerald-600">
                    {billingData.plan.revenue_share_percentage}%
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Applied to recovered revenue
                </p>
              </div>

              {/* First Month Free Indicator */}
              {billingData.billing_period.first_month_free_active && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎉</span>
                    <span className="font-semibold text-emerald-700">
                      First Month Free!
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-emerald-600">
                      {billingData.billing_period.first_month_days_remaining} days
                    </span>{" "}
                    remaining in your free trial
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* This Month Metrics Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">This Month</h2>
                <p className="text-sm text-gray-500">Current billing period</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Recovered Revenue */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Recovered Revenue
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                        How we calculate <HelpCircle className="w-3 h-3" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Revenue Attribution</DialogTitle>
                        <DialogDescription>
                          How we track revenue recovered by your AI agent
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              Customer clicked an AI email
                            </p>
                            <p className="text-sm text-gray-500">
                              We track every click from your AI-generated campaigns
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              Purchased within 7 days
                            </p>
                            <p className="text-sm text-gray-500">
                              Attribution window from click to purchase
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              AI email was the last marketing touch
                            </p>
                            <p className="text-sm text-gray-500">
                              Last-touch attribution model ensures fair tracking
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${billingData.metrics.recovered_revenue.toFixed(2)}
                </div>
              </div>

              {/* Base Monthly Fee */}
              {billingData.plan.price_monthly > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Base Monthly Fee
                    </span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ${billingData.plan.price_monthly.toFixed(2)}
                  </div>
                </div>
              )}

              {/* Revenue Share Fee */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Revenue Share Fee ({billingData.plan.revenue_share_percentage}%)
                  </span>
                </div>
                {billingData.billing_period.first_month_free_active ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-emerald-600">
                      FREE
                    </span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      First Month
                    </Badge>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-gray-900">
                    ${(billingData.metrics.recovered_revenue * (billingData.plan.revenue_share_percentage / 100)).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Total Estimated */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Total Estimated
                  </span>
                </div>
                {billingData.billing_period.first_month_free_active ? (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-emerald-600">
                      $0.00
                    </span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      🎉 Free
                    </Badge>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    ${(billingData.metrics.base_monthly_fee + billingData.metrics.estimated_fee).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Plan Comparison */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Plan Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Starter Plan */}
            <div className={`p-6 rounded-lg border-2 ${
              billingData.plan.type === "starter" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"
            }`}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  + 8% of recovered revenue
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Up to 500 orders/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Basic analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Email support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Cart abandonment recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-emerald-600">First month free</span>
                </li>
              </ul>
            </div>

            {/* Growth Plan */}
            <div className={`p-6 rounded-lg border-2 ${
              billingData.plan.type === "growth" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"
            }`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold text-gray-900">Growth</h3>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                    ⭐ POPULAR
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  + 5% of recovered revenue
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Unlimited orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Advanced analytics & insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">All recovery campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">A/B testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Advanced AI personalization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Billed through Shopify</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>No long-term contract</span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

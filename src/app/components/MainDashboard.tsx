import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { StatusCard } from "./StatusCard";
import { MetricsGrid } from "./MetricsGrid";
import { ActivityFeed } from "./ActivityFeed";
import { AIControls } from "./AIControls";
import { PerformanceChart } from "./PerformanceChart";
import { InsightsPanel } from "./InsightsPanel";
import { CampaignPerformance } from "./CampaignPerformance";
import { ABTestingOverview } from "./ABTestingOverview";
import { Onboarding, OnboardingData } from "./Onboarding";
import { FirstSaleCelebration } from "./onboarding/FirstSaleCelebration";
import { RestrictedModeBanner } from "./RestrictedModeBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export type TimeRange = "today" | "7days" | "30days";

export function MainDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [aiStatus, setAiStatus] = useState<"active" | "paused">("active");
  
  // Onboarding state - set to false to show onboarding, true to show dashboard
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  
  // Checkout readiness state - tracks if merchant's checkout is properly configured
  const [checkoutReady, setCheckoutReady] = useState(true);
  
  // First sale celebration - can be triggered from dashboard
  const [showFirstSale, setShowFirstSale] = useState(false);

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log("Onboarding completed:", data);
    setOnboardingComplete(true);
    setCheckoutReady(data.checkoutReady);
    // In real app, save to backend
  };

  // For demo: simulate first sale after 5 seconds on dashboard
  // Remove this in production
  useState(() => {
    if (onboardingComplete) {
      const timer = setTimeout(() => {
        setShowFirstSale(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  // Show onboarding if not complete
  if (!onboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restricted Mode Banner - Shows when checkout is not properly configured */}
      {!checkoutReady && (
        <RestrictedModeBanner 
          shopDomain="your-store"
          onDismiss={() => setCheckoutReady(true)}
        />
      )}

      {/* Demo Controls - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setOnboardingComplete(false)}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        >
          Reset to Onboarding
        </button>
        <button
          onClick={() => setShowFirstSale(true)}
          className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-amber-700 transition-colors"
        >
          Show First Sale
        </button>
        <button
          onClick={() => setCheckoutReady(prev => !prev)}
          className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-orange-700 transition-colors"
        >
          Toggle Restricted Mode
        </button>
      </div>

      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusCard aiStatus={aiStatus} />
        
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="abtesting">A/B Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setTimeRange("today")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "today"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeRange("7days")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "7days"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                7 days
              </button>
              <button
                onClick={() => setTimeRange("30days")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "30days"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                30 days
              </button>
            </div>

            <MetricsGrid timeRange={timeRange} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PerformanceChart timeRange={timeRange} />
                <ActivityFeed aiStatus={aiStatus} />
              </div>
              
              <div className="space-y-6">
                <AIControls aiStatus={aiStatus} setAiStatus={setAiStatus} />
                <InsightsPanel timeRange={timeRange} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-6">
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              <button
                onClick={() => setTimeRange("today")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "today"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeRange("7days")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "7days"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                7 days
              </button>
              <button
                onClick={() => setTimeRange("30days")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === "30days"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                30 days
              </button>
            </div>
            <CampaignPerformance timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="abtesting" className="mt-6">
            <ABTestingOverview timeRange={timeRange} />
          </TabsContent>
        </Tabs>
      </main>

      {/* First Sale Celebration Modal */}
      <FirstSaleCelebration
        open={showFirstSale}
        onClose={() => setShowFirstSale(false)}
        saleAmount={127.50}
        customerName="Sarah Johnson"
        recoveryTime="2 hours 34 minutes"
        campaign="Cart Abandonment"
      />
    </div>
  );
}

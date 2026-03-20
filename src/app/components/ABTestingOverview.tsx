import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, TrendingUp, PlayCircle, PauseCircle, CheckCircle, Archive, Activity } from "lucide-react";
import { TimeRange } from "../App";
import { useState } from "react";
import { ExperimentCard } from "./ExperimentCard";
import { CreateExperimentDialog } from "./CreateExperimentDialog";
import { ExperimentResults } from "./ExperimentResults";

interface ABTestingOverviewProps {
  timeRange: TimeRange;
}

export type ExperimentStatus = "draft" | "running" | "paused" | "completed" | "archived";

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: ExperimentStatus;
  targetEvent: string;
  trafficAllocation: number;
  startDate: string;
  endDate?: string;
  primaryMetric: "revenue" | "conversion_rate" | "aov";
  control: {
    users: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
    revenuePerUser: number;
  };
  treatment: {
    users: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
    revenuePerUser: number;
  };
  statistics: {
    lift: number;
    pValue: number;
    confidenceLevel: number;
    isSignificant: boolean;
  };
  daysRunning: number;
}

const mockExperiments: Experiment[] = [
  {
    id: "1",
    name: "AI Personalized Subject Lines",
    description: "Testing AI-generated personalized subject lines vs standard templates",
    status: "running",
    targetEvent: "cart_abandonment",
    trafficAllocation: 50,
    startDate: "2026-02-26",
    primaryMetric: "revenue",
    control: {
      users: 1247,
      conversions: 283,
      revenue: 8621.50,
      conversionRate: 22.7,
      revenuePerUser: 6.91,
    },
    treatment: {
      users: 1256,
      conversions: 389,
      revenue: 12896.00,
      conversionRate: 31.0,
      revenuePerUser: 10.27,
    },
    statistics: {
      lift: 36.5,
      pValue: 0.003,
      confidenceLevel: 99.7,
      isSignificant: true,
    },
    daysRunning: 7,
  },
  {
    id: "2",
    name: "Dynamic Discount Optimization",
    description: "AI-calculated optimal discount % vs fixed 10% discount",
    status: "running",
    targetEvent: "checkout_abandonment",
    trafficAllocation: 50,
    startDate: "2026-02-28",
    primaryMetric: "conversion_rate",
    control: {
      users: 892,
      conversions: 267,
      revenue: 11234.00,
      conversionRate: 29.9,
      revenuePerUser: 12.59,
    },
    treatment: {
      users: 901,
      conversions: 358,
      revenue: 13877.00,
      conversionRate: 39.7,
      revenuePerUser: 15.40,
    },
    statistics: {
      lift: 32.8,
      pValue: 0.001,
      confidenceLevel: 99.9,
      isSignificant: true,
    },
    daysRunning: 5,
  },
  {
    id: "3",
    name: "Send Time Optimization",
    description: "AI-predicted optimal send time vs immediate send",
    status: "completed",
    targetEvent: "browse_abandonment",
    trafficAllocation: 50,
    startDate: "2026-02-15",
    endDate: "2026-02-28",
    primaryMetric: "conversion_rate",
    control: {
      users: 2134,
      conversions: 256,
      revenue: 5891.00,
      conversionRate: 12.0,
      revenuePerUser: 2.76,
    },
    treatment: {
      users: 2187,
      conversions: 394,
      revenue: 9234.00,
      conversionRate: 18.0,
      revenuePerUser: 4.22,
    },
    statistics: {
      lift: 50.0,
      pValue: 0.0001,
      confidenceLevel: 99.99,
      isSignificant: true,
    },
    daysRunning: 13,
  },
  {
    id: "4",
    name: "Product Recommendation Engine",
    description: "AI product recommendations vs most popular items",
    status: "paused",
    targetEvent: "post_purchase",
    trafficAllocation: 30,
    startDate: "2026-03-01",
    primaryMetric: "aov",
    control: {
      users: 234,
      conversions: 23,
      revenue: 1234.00,
      conversionRate: 9.8,
      revenuePerUser: 5.27,
    },
    treatment: {
      users: 98,
      conversions: 12,
      revenue: 678.00,
      revenuePerUser: 6.92,
      conversionRate: 12.2,
    },
    statistics: {
      lift: 31.3,
      pValue: 0.234,
      confidenceLevel: 76.6,
      isSignificant: false,
    },
    daysRunning: 4,
  },
];

export function ABTestingOverview({ timeRange }: ABTestingOverviewProps) {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const runningExperiments = mockExperiments.filter(e => e.status === "running");
  const completedExperiments = mockExperiments.filter(e => e.status === "completed");

  const totalRevenueLift = mockExperiments
    .filter(e => e.status === "running" || e.status === "completed")
    .reduce((sum, e) => sum + (e.treatment.revenue - e.control.revenue), 0);

  const avgLift = mockExperiments
    .filter(e => e.statistics.isSignificant)
    .reduce((sum, e) => sum + e.statistics.lift, 0) / 
    mockExperiments.filter(e => e.statistics.isSignificant).length;

  if (selectedExperiment) {
    return (
      <ExperimentResults 
        experiment={selectedExperiment} 
        onBack={() => setSelectedExperiment(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Active Tests</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{runningExperiments.length}</div>
          <p className="text-xs text-gray-500 mt-1">Currently running</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Completed</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{completedExperiments.length}</div>
          <p className="text-xs text-gray-500 mt-1">With significant results</p>
        </Card>

        <Card className="p-5 border-2 border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Revenue Impact</span>
          </div>
          <div className="text-3xl font-bold text-emerald-900">
            ${totalRevenueLift.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-700 mt-1">Incremental lift detected</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Avg Lift</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">+{avgLift.toFixed(1)}%</div>
          <p className="text-xs text-gray-500 mt-1">AI improvement rate</p>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Experiments</h2>
            <p className="text-sm text-gray-500 mt-1">
              Scientifically measure AI impact with statistical rigor
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Experiment
          </Button>
        </div>

        {/* Running Experiments */}
        {runningExperiments.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Running</h3>
              <Badge className="bg-green-600">{runningExperiments.length}</Badge>
            </div>
            <div className="space-y-4">
              {runningExperiments.map(experiment => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onClick={() => setSelectedExperiment(experiment)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Experiments */}
        {completedExperiments.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
              <Badge variant="outline">{completedExperiments.length}</Badge>
            </div>
            <div className="space-y-4">
              {completedExperiments.map(experiment => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onClick={() => setSelectedExperiment(experiment)}
                />
              ))}
            </div>
          </div>
        )}

        {mockExperiments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experiments yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Start testing AI improvements with statistical rigor
            </p>
            <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create First Experiment
            </Button>
          </div>
        )}
      </Card>

      <CreateExperimentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}

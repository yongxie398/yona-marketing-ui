import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, AlertCircle, CheckCircle2 } from "lucide-react";
import { Experiment, ExperimentStatus } from "./ABTestingOverview";

interface ExperimentCardProps {
  experiment: Experiment;
  onClick: () => void;
}

function getStatusBadge(status: ExperimentStatus) {
  switch (status) {
    case "running":
      return <Badge className="bg-green-600">Running</Badge>;
    case "paused":
      return <Badge className="bg-yellow-600">Paused</Badge>;
    case "completed":
      return <Badge className="bg-blue-600">Completed</Badge>;
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "archived":
      return <Badge variant="secondary">Archived</Badge>;
  }
}

function getConfidenceColor(confidenceLevel: number) {
  if (confidenceLevel >= 95) return "text-green-700 bg-green-50 border-green-200";
  if (confidenceLevel >= 80) return "text-yellow-700 bg-yellow-50 border-yellow-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function getMetricLabel(metric: string) {
  switch (metric) {
    case "revenue":
      return "Revenue per User";
    case "conversion_rate":
      return "Conversion Rate";
    case "aov":
      return "Avg Order Value";
    default:
      return metric;
  }
}

export function ExperimentCard({ experiment, onClick }: ExperimentCardProps) {
  const isPositiveLift = experiment.statistics.lift > 0;
  const needsMoreData = experiment.daysRunning < 7 || 
    (experiment.control.conversions + experiment.treatment.conversions) < 200;

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{experiment.name}</h3>
              {getStatusBadge(experiment.status)}
            </div>
            <p className="text-sm text-gray-600">{experiment.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span>Target: {experiment.targetEvent.replace(/_/g, " ")}</span>
              <span>•</span>
              <span>Split: {experiment.trafficAllocation}/{100 - experiment.trafficAllocation}</span>
              <span>•</span>
              <span>{experiment.daysRunning} days running</span>
            </div>
          </div>

          {/* Lift Badge */}
          <div className={`px-4 py-3 rounded-lg text-center min-w-[120px] ${
            experiment.statistics.isSignificant 
              ? isPositiveLift ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"
              : "bg-gray-50 border-2 border-gray-200"
          }`}>
            <div className="flex items-center justify-center gap-1 mb-1">
              {isPositiveLift ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-2xl font-bold ${
                experiment.statistics.isSignificant
                  ? isPositiveLift ? "text-green-900" : "text-red-900"
                  : "text-gray-700"
              }`}>
                {isPositiveLift ? "+" : ""}{experiment.statistics.lift.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-gray-600 font-medium">Lift</div>
          </div>
        </div>

        {/* Metrics Comparison */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {/* Control */}
          <div>
            <div className="text-xs font-medium text-gray-500 mb-3">CONTROL</div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500 mb-1">{getMetricLabel(experiment.primaryMetric)}</div>
                <div className="text-lg font-bold text-gray-900">
                  {experiment.primaryMetric === "revenue" || experiment.primaryMetric === "aov"
                    ? `$${experiment.control.revenuePerUser.toFixed(2)}`
                    : `${experiment.control.conversionRate.toFixed(1)}%`}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users className="w-3 h-3" />
                  {experiment.control.users.toLocaleString()} users
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <Target className="w-3 h-3" />
                  {experiment.control.conversions.toLocaleString()} conversions
                </div>
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div>
            <div className="text-xs font-medium text-gray-500 mb-3">TREATMENT (AI)</div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500 mb-1">{getMetricLabel(experiment.primaryMetric)}</div>
                <div className="text-lg font-bold text-blue-900">
                  {experiment.primaryMetric === "revenue" || experiment.primaryMetric === "aov"
                    ? `$${experiment.treatment.revenuePerUser.toFixed(2)}`
                    : `${experiment.treatment.conversionRate.toFixed(1)}%`}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users className="w-3 h-3" />
                  {experiment.treatment.users.toLocaleString()} users
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <Target className="w-3 h-3" />
                  {experiment.treatment.conversions.toLocaleString()} conversions
                </div>
              </div>
            </div>
          </div>

          {/* Statistical Significance */}
          <div>
            <div className="text-xs font-medium text-gray-500 mb-3">STATISTICAL CONFIDENCE</div>
            <div className={`p-3 rounded-lg border ${getConfidenceColor(experiment.statistics.confidenceLevel)}`}>
              <div className="flex items-center gap-2 mb-2">
                {experiment.statistics.isSignificant ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="font-bold text-lg">
                  {experiment.statistics.confidenceLevel.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs mb-2">
                {experiment.statistics.isSignificant ? "Significant" : "Not significant"}
              </div>
              <div className="text-xs opacity-80">
                p-value: {experiment.statistics.pValue.toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Warning if needs more data */}
        {needsMoreData && experiment.status === "running" && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-xs text-amber-900">
              <span className="font-semibold">Collecting data:</span> Need 
              {experiment.daysRunning < 7 && ` ${7 - experiment.daysRunning} more days`}
              {experiment.daysRunning < 7 && (experiment.control.conversions + experiment.treatment.conversions) < 200 && " and"}
              {(experiment.control.conversions + experiment.treatment.conversions) < 200 && 
                ` ${200 - (experiment.control.conversions + experiment.treatment.conversions)} more conversions`} 
              {" "}for reliable results
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

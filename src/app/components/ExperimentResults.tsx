import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, TrendingUp, Users, DollarSign, Target, 
  AlertCircle, CheckCircle2, BarChart3, Calendar, Pause, Play, StopCircle 
} from "lucide-react";
import { Experiment } from "./ABTestingOverview";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ExperimentResultsProps {
  experiment: Experiment;
  onBack: () => void;
}

// Mock time series data
const generateTimeSeriesData = () => {
  const days = 7;
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    control_revenue: Math.random() * 2000 + 1000,
    treatment_revenue: Math.random() * 2500 + 1500,
    control_conversions: Math.floor(Math.random() * 50 + 30),
    treatment_conversions: Math.floor(Math.random() * 60 + 40),
  }));
};

const timeSeriesData = generateTimeSeriesData();

export function ExperimentResults({ experiment, onBack }: ExperimentResultsProps) {
  const revenueDiff = experiment.treatment.revenue - experiment.control.revenue;
  const isPositiveLift = experiment.statistics.lift > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{experiment.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{experiment.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {experiment.status === "running" && (
            <>
              <Button variant="outline" size="sm" className="gap-2">
                <Pause className="w-4 h-4" />
                Pause
              </Button>
              <Button variant="destructive" size="sm" className="gap-2">
                <StopCircle className="w-4 h-4" />
                Stop
              </Button>
            </>
          )}
          {experiment.status === "paused" && (
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Resume
            </Button>
          )}
        </div>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`p-5 border-2 ${
          experiment.statistics.isSignificant
            ? isPositiveLift ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
            : "border-gray-300"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isPositiveLift ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
            )}
            <span className="text-sm font-medium text-gray-700">Lift</span>
          </div>
          <div className={`text-4xl font-bold ${
            experiment.statistics.isSignificant
              ? isPositiveLift ? "text-green-900" : "text-red-900"
              : "text-gray-700"
          }`}>
            {isPositiveLift ? "+" : ""}{experiment.statistics.lift.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {experiment.statistics.isSignificant ? "Statistically significant" : "Not yet significant"}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Revenue Impact</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {revenueDiff >= 0 ? "+" : ""}${revenueDiff.toLocaleString()}
          </div>
          <p className="text-xs text-gray-600 mt-2">Incremental revenue</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Confidence</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {experiment.statistics.confidenceLevel.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600 mt-2">
            p-value: {experiment.statistics.pValue.toFixed(4)}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Sample Size</span>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {(experiment.control.users + experiment.treatment.users).toLocaleString()}
          </div>
          <p className="text-xs text-gray-600 mt-2">Total users in test</p>
        </Card>
      </div>

      {/* Stopping Rules Check */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Experiment Validity Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            {experiment.daysRunning >= 7 ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-medium text-gray-900">Minimum Runtime</div>
              <div className="text-xs text-gray-600 mt-1">
                {experiment.daysRunning} / 7 days
                {experiment.daysRunning >= 7 && " ✓"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {(experiment.control.conversions + experiment.treatment.conversions) >= 200 ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-medium text-gray-900">Sample Size</div>
              <div className="text-xs text-gray-600 mt-1">
                {experiment.control.conversions + experiment.treatment.conversions} / 200 conversions
                {(experiment.control.conversions + experiment.treatment.conversions) >= 200 && " ✓"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {experiment.statistics.pValue < 0.05 ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-medium text-gray-900">Statistical Significance</div>
              <div className="text-xs text-gray-600 mt-1">
                p &lt; 0.05 {experiment.statistics.pValue < 0.05 && "✓"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Group */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Control Group</h3>
            <Badge variant="outline">Baseline</Badge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Users</div>
                <div className="text-2xl font-bold text-gray-900">
                  {experiment.control.users.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Conversions</div>
                <div className="text-2xl font-bold text-gray-900">
                  {experiment.control.conversions.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs text-blue-700 mb-1">Conversion Rate</div>
              <div className="text-3xl font-bold text-blue-900">
                {experiment.control.conversionRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="text-xs text-emerald-700 mb-1">Total Revenue</div>
              <div className="text-3xl font-bold text-emerald-900">
                ${experiment.control.revenue.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-xs text-purple-700 mb-1">Revenue per User</div>
              <div className="text-3xl font-bold text-purple-900">
                ${experiment.control.revenuePerUser.toFixed(2)}
              </div>
            </div>
          </div>
        </Card>

        {/* Treatment Group */}
        <Card className="p-6 border-2 border-blue-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Treatment Group</h3>
            <Badge className="bg-blue-600">AI Enhanced</Badge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700 mb-1">Users</div>
                <div className="text-2xl font-bold text-blue-900">
                  {experiment.treatment.users.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700 mb-1">Conversions</div>
                <div className="text-2xl font-bold text-blue-900">
                  {experiment.treatment.conversions.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
              <div className="text-xs text-blue-700 mb-1">Conversion Rate</div>
              <div className="text-3xl font-bold text-blue-900">
                {experiment.treatment.conversionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {isPositiveLift ? "+" : ""}{(experiment.treatment.conversionRate - experiment.control.conversionRate).toFixed(1)}% vs control
              </div>
            </div>
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-lg">
              <div className="text-xs text-emerald-700 mb-1">Total Revenue</div>
              <div className="text-3xl font-bold text-emerald-900">
                ${experiment.treatment.revenue.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                {revenueDiff >= 0 ? "+" : ""}${revenueDiff.toLocaleString()} vs control
              </div>
            </div>
            <div className="p-4 bg-purple-100 border-2 border-purple-300 rounded-lg">
              <div className="text-xs text-purple-700 mb-1">Revenue per User</div>
              <div className="text-3xl font-bold text-purple-900">
                ${experiment.treatment.revenuePerUser.toFixed(2)}
              </div>
              <div className="text-xs text-purple-700 mt-1">
                {isPositiveLift ? "+" : ""}${(experiment.treatment.revenuePerUser - experiment.control.revenuePerUser).toFixed(2)} vs control
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="control_revenue" 
                stroke="#6B7280" 
                strokeWidth={2}
                name="Control"
              />
              <Line 
                type="monotone" 
                dataKey="treatment_revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Treatment (AI)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversions Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="control_conversions" fill="#6B7280" name="Control" />
              <Bar dataKey="treatment_conversions" fill="#3B82F6" name="Treatment (AI)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Statistical Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistical Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Methodology</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Test Type:</span>
                <span className="font-medium text-gray-900">Two-sample t-test</span>
              </div>
              <div className="flex justify-between">
                <span>Significance Level:</span>
                <span className="font-medium text-gray-900">α = 0.05</span>
              </div>
              <div className="flex justify-between">
                <span>Traffic Split:</span>
                <span className="font-medium text-gray-900">{experiment.trafficAllocation}/{100 - experiment.trafficAllocation}</span>
              </div>
              <div className="flex justify-between">
                <span>Bucketing:</span>
                <span className="font-medium text-gray-900">Hash-based deterministic</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Results</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>P-value:</span>
                <span className="font-medium text-gray-900">{experiment.statistics.pValue.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence Level:</span>
                <span className="font-medium text-gray-900">{experiment.statistics.confidenceLevel.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Effect Size:</span>
                <span className="font-medium text-gray-900">{experiment.statistics.lift.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Conclusion:</span>
                <span className={`font-medium ${experiment.statistics.isSignificant ? "text-green-700" : "text-amber-700"}`}>
                  {experiment.statistics.isSignificant ? "Significant" : "Inconclusive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

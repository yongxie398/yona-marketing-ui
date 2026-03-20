import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { AlertCircle, Lightbulb } from "lucide-react";

interface CreateExperimentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateExperimentDialog({ open, onOpenChange }: CreateExperimentDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetEvent, setTargetEvent] = useState("");
  const [trafficAllocation, setTrafficAllocation] = useState("50");
  const [primaryMetric, setPrimaryMetric] = useState("");

  const handleCreate = () => {
    // In real app, this would create the experiment
    console.log("Creating experiment:", { name, description, targetEvent, trafficAllocation, primaryMetric });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
          <DialogDescription>
            Design a statistically rigorous A/B test to measure AI impact
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Best Practice Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <div className="font-semibold mb-1">Experiment Design Best Practices</div>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Run for minimum 7 days to account for weekly patterns</li>
                  <li>Collect at least 100 conversions per variant for statistical power</li>
                  <li>Don't peek at results before minimum runtime is met</li>
                  <li>Use hash-based bucketing for deterministic assignment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experiment Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Experiment Name *</Label>
            <Input
              id="name"
              placeholder="e.g., AI Personalized Subject Lines"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-xs text-gray-500">Clear, descriptive name for your hypothesis</p>
          </div>

          {/* Description / Hypothesis */}
          <div className="space-y-2">
            <Label htmlFor="description">Hypothesis</Label>
            <Textarea
              id="description"
              placeholder="e.g., AI-generated personalized subject lines will increase email open rates and conversion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-gray-500">What are you testing and why?</p>
          </div>

          {/* Target Event */}
          <div className="space-y-2">
            <Label>Target Event *</Label>
            <Select value={targetEvent} onValueChange={setTargetEvent}>
              <SelectTrigger>
                <SelectValue placeholder="Select target event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cart_abandonment">Cart Abandonment</SelectItem>
                <SelectItem value="checkout_abandonment">Checkout Abandonment</SelectItem>
                <SelectItem value="browse_abandonment">Browse Abandonment</SelectItem>
                <SelectItem value="post_purchase">Post-Purchase</SelectItem>
                <SelectItem value="repeat_purchase">Repeat Purchase</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Which campaign will this test apply to?</p>
          </div>

          {/* Primary Metric */}
          <div className="space-y-2">
            <Label>Primary Success Metric *</Label>
            <Select value={primaryMetric} onValueChange={setPrimaryMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue per User</SelectItem>
                <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
                <SelectItem value="aov">Average Order Value</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Main metric you want to improve</p>
          </div>

          {/* Traffic Allocation */}
          <div className="space-y-2">
            <Label htmlFor="traffic">Treatment Traffic Allocation *</Label>
            <div className="flex items-center gap-4">
              <input
                id="traffic"
                type="range"
                min="10"
                max="90"
                step="10"
                value={trafficAllocation}
                onChange={(e) => setTrafficAllocation(e.target.value)}
                className="flex-1"
              />
              <div className="w-20 text-center">
                <div className="text-2xl font-bold text-blue-600">{trafficAllocation}%</div>
                <div className="text-xs text-gray-500">Treatment</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Control: {100 - parseInt(trafficAllocation)}%</span>
              <span>Treatment: {trafficAllocation}%</span>
            </div>
            <p className="text-xs text-gray-500">
              Most experiments use 50/50 split for equal statistical power
            </p>
          </div>

          {/* Control vs Treatment Preview */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">What will be tested?</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-gray-600 mb-2">Control Group</div>
                <div className="text-sm text-gray-700">Baseline logic (no AI enhancement)</div>
              </div>
              <div>
                <div className="text-xs font-medium text-blue-700 mb-2">Treatment Group</div>
                <div className="text-sm text-blue-900 font-medium">AI-enhanced decision making</div>
              </div>
            </div>
          </div>

          {/* Stopping Rules Info */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-900">
                <div className="font-semibold mb-1">Automatic Stopping Rules</div>
                <div className="text-xs">
                  Experiment must run for minimum 7 days and collect 100+ conversions per variant 
                  before results are considered reliable. Early stopping can lead to false positives.
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!name || !targetEvent || !primaryMetric}
          >
            Create Experiment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

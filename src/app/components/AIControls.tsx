import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Settings, Play, Pause, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AIControlsProps {
  aiStatus: "active" | "paused";
  setAiStatus: (status: "active" | "paused") => void;
}

export function AIControls({ aiStatus, setAiStatus }: AIControlsProps) {
  const [brandVoice, setBrandVoice] = useState("friendly");
  const [dailyFrequencyCap, setDailyFrequencyCap] = useState("1");
  const [weeklyFrequencyCap, setWeeklyFrequencyCap] = useState("3");

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Agent Controls</h3>
          <p className="text-sm text-gray-500 mt-1">Minimal settings, maximum autonomy</p>
        </div>
        <Badge variant={aiStatus === "active" ? "default" : "secondary"} className="bg-emerald-600">
          {aiStatus === "active" ? "Working" : "Paused"}
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Main Power Control */}
        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <label className="text-sm font-semibold text-gray-900">AI Agent Status</label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {aiStatus === "active" 
                  ? "Autonomously monitoring and recovering revenue" 
                  : "All revenue recovery paused"}
              </p>
            </div>
            <Button
              size="lg"
              variant={aiStatus === "active" ? "destructive" : "default"}
              onClick={() => setAiStatus(aiStatus === "active" ? "paused" : "active")}
              className="gap-2 ml-4"
            >
              {aiStatus === "active" ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause Agent
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Resume Agent
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Settings Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Settings className="w-4 h-4" />
              Configure Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agent Configuration</DialogTitle>
              <DialogDescription>
                Set guardrails and brand preferences for your AI agent
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Brand Voice</Label>
                <Select value={brandVoice} onValueChange={setBrandVoice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">AI adapts messaging tone to match your brand</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Frequency Guardrails</h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Max messages per customer / day</Label>
                    <Select value={dailyFrequencyCap} onValueChange={setDailyFrequencyCap}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 message</SelectItem>
                        <SelectItem value="2">2 messages</SelectItem>
                        <SelectItem value="3">3 messages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Max messages per customer / 7 days</Label>
                    <Select value={weeklyFrequencyCap} onValueChange={setWeeklyFrequencyCap}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 messages</SelectItem>
                        <SelectItem value="3">3 messages</SelectItem>
                        <SelectItem value="5">5 messages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-900">
                    💡 AI respects these caps automatically and pauses messaging when limits are reached
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Agent Performance</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="text-xs text-emerald-700 font-medium">Decision Speed</div>
              <div className="text-xl font-bold text-emerald-900 mt-1">1.2s</div>
              <div className="text-xs text-emerald-600 mt-1">Avg response time</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs text-blue-700 font-medium">Learning Rate</div>
              <div className="text-xl font-bold text-blue-900 mt-1">+18%</div>
              <div className="text-xs text-blue-600 mt-1">Improvement/week</div>
            </div>
          </div>
        </div>

        {/* Attribution Info */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Attribution Model</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>• Last AI-touch attribution</div>
            <div>• 7-day conversion window</div>
            <div>• Revenue = incremental only</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
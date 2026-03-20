import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { 
  ArrowLeft, 
  Settings as SettingsIcon,
  Bell,
  Mail,
  Palette,
  Shield,
  Save
} from "lucide-react";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Brand Settings
    brandName: "My Store",
    brandColor: "#10b981",
    logoUrl: "",
    
    // Email Settings
    emailFrequency: "optimal",
    enableABTesting: true,
    
    // Notifications
    emailNotifications: true,
    performanceAlerts: true,
    weeklyReports: true,
    
    // AI Settings
    aiAutonomy: "full",
    riskTolerance: "balanced",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
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
                <SettingsIcon className="w-5 h-5 text-emerald-600" />
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
          {/* Brand Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Brand Settings</h2>
                <p className="text-sm text-gray-500">Customize how your brand appears in AI campaigns</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  value={settings.brandName}
                  onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                  placeholder="Your store name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="brandColor">Brand Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="brandColor"
                    type="color"
                    value={settings.brandColor}
                    onChange={(e) => setSettings({...settings, brandColor: e.target.value})}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.brandColor}
                    onChange={(e) => setSettings({...settings, brandColor: e.target.value})}
                    placeholder="#10b981"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This color will be used in your AI-generated emails
                </p>
              </div>
            </div>
          </Card>

          {/* Email Campaign Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Email Campaign Settings</h2>
                <p className="text-sm text-gray-500">Control how the AI sends recovery emails</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="emailFrequency">Email Frequency</Label>
                <Select 
                  value={settings.emailFrequency}
                  onValueChange={(value) => setSettings({...settings, emailFrequency: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative - Fewer emails, higher quality</SelectItem>
                    <SelectItem value="optimal">Optimal - AI-optimized balance (Recommended)</SelectItem>
                    <SelectItem value="aggressive">Aggressive - Maximum recovery attempts</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  The AI will adjust timing and frequency within this strategy
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="abTesting">A/B Testing</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Let the AI automatically test different email variants
                  </p>
                </div>
                <Switch
                  id="abTesting"
                  checked={settings.enableABTesting}
                  onCheckedChange={(checked) => setSettings({...settings, enableABTesting: checked})}
                />
              </div>
            </div>
          </Card>

          {/* AI Agent Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AI Agent Settings</h2>
                <p className="text-sm text-gray-500">Configure AI autonomy and risk preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="aiAutonomy">AI Autonomy Level</Label>
                <Select 
                  value={settings.aiAutonomy}
                  onValueChange={(value) => setSettings({...settings, aiAutonomy: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supervised">Supervised - Require approval for new strategies</SelectItem>
                    <SelectItem value="full">Full Autonomy - AI makes all decisions (Recommended)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Full autonomy enables the "set it and forget it" experience
                </p>
              </div>

              <div>
                <Label htmlFor="riskTolerance">Campaign Risk Tolerance</Label>
                <Select 
                  value={settings.riskTolerance}
                  onValueChange={(value) => setSettings({...settings, riskTolerance: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative - Safe, proven strategies only</SelectItem>
                    <SelectItem value="balanced">Balanced - Mix of proven and experimental (Recommended)</SelectItem>
                    <SelectItem value="aggressive">Aggressive - More experimental for higher potential</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Controls how willing the AI is to try new recovery strategies
                </p>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Choose what updates you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifs">Email Notifications</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Daily summary of AI agent activity
                  </p>
                </div>
                <Switch
                  id="emailNotifs"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="performanceAlerts">Performance Alerts</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Get notified when recovery rates drop or spike
                  </p>
                </div>
                <Switch
                  id="performanceAlerts"
                  checked={settings.performanceAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, performanceAlerts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Comprehensive weekly performance summary
                  </p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
                />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

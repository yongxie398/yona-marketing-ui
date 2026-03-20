import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Eye, ShoppingCart, CreditCard, Package, RefreshCw, TrendingUp } from "lucide-react";
import { TimeRange } from "../App";

interface CampaignPerformanceProps {
  timeRange: TimeRange;
}

interface Campaign {
  id: string;
  name: string;
  icon: React.ReactNode;
  trigger: string;
  status: "active" | "learning";
  sent: number;
  conversions: number;
  revenue: number;
  revenuePerRecipient: number;
}

function getCampaigns(timeRange: TimeRange): Campaign[] {
  const multiplier = timeRange === "today" ? 0.05 : timeRange === "7days" ? 1 : 4.2;
  
  return [
    {
      id: "cart",
      name: "Cart Abandonment",
      icon: <ShoppingCart className="w-5 h-5" />,
      trigger: "Cart created, not checked out",
      status: "active",
      sent: Math.round(156 * multiplier),
      conversions: Math.round(38 * multiplier),
      revenue: Math.round(4847 * multiplier),
      revenuePerRecipient: 31.07,
    },
    {
      id: "checkout",
      name: "Checkout Abandonment",
      icon: <CreditCard className="w-5 h-5" />,
      trigger: "Checkout started, not completed",
      status: "active",
      sent: Math.round(89 * multiplier),
      conversions: Math.round(34 * multiplier),
      revenue: Math.round(4236 * multiplier),
      revenuePerRecipient: 47.60,
    },
    {
      id: "browse",
      name: "Browse Abandonment",
      icon: <Eye className="w-5 h-5" />,
      trigger: "Product viewed 2+ times",
      status: "learning",
      sent: Math.round(64 * multiplier),
      conversions: Math.round(12 * multiplier),
      revenue: Math.round(1456 * multiplier),
      revenuePerRecipient: 22.75,
    },
    {
      id: "postpurchase",
      name: "Post-Purchase",
      icon: <Package className="w-5 h-5" />,
      trigger: "Order completed",
      status: "active",
      sent: Math.round(127 * multiplier),
      conversions: 0,
      revenue: 0,
      revenuePerRecipient: 0,
    },
    {
      id: "repeat",
      name: "Repeat Purchase",
      icon: <RefreshCw className="w-5 h-5" />,
      trigger: "X days after purchase",
      status: "learning",
      sent: Math.round(23 * multiplier),
      conversions: Math.round(4 * multiplier),
      revenue: Math.round(542 * multiplier),
      revenuePerRecipient: 23.57,
    },
  ];
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const conversionRate = campaign.sent > 0 
    ? ((campaign.conversions / campaign.sent) * 100).toFixed(1) 
    : "0.0";

  return (
    <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            {campaign.icon}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{campaign.trigger}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={campaign.status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-purple-50 text-purple-700 border-purple-200"}
        >
          {campaign.status === "active" ? "Active" : "Learning"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Revenue Recovered</div>
          <div className="text-2xl font-bold text-gray-900">
            ${campaign.revenue.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Per Recipient</div>
          <div className="text-2xl font-bold text-gray-900">
            ${campaign.revenuePerRecipient.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Conversion Rate</span>
            <span className="font-semibold text-gray-900">{conversionRate}%</span>
          </div>
          <Progress value={parseFloat(conversionRate)} className="h-2" />
        </div>

        <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500">Sent</div>
            <div className="font-semibold text-gray-900">{campaign.sent.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Conversions</div>
            <div className="font-semibold text-gray-900">{campaign.conversions.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampaignPerformance({ timeRange }: CampaignPerformanceProps) {
  const campaigns = getCampaigns(timeRange);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const avgRevenuePerRecipient = totalSent > 0 ? totalRevenue / totalSent : 0;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Autonomous Campaigns</h3>
        <p className="text-sm text-gray-500 mt-1">AI decides which campaign to trigger for each shopper</p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div>
          <div className="text-xs font-medium text-emerald-700 mb-1">TOTAL REVENUE</div>
          <div className="text-2xl font-bold text-emerald-900">${totalRevenue.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-emerald-700 mb-1">TOTAL SENT</div>
          <div className="text-2xl font-bold text-emerald-900">{totalSent.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-emerald-700 mb-1">AVG PER RECIPIENT</div>
          <div className="text-2xl font-bold text-emerald-900">${avgRevenuePerRecipient.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </Card>
  );
}

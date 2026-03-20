import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TimeRange } from "../App";

interface PerformanceChartProps {
  timeRange: TimeRange;
}

export function PerformanceChart({ timeRange }: PerformanceChartProps) {
  const getData = () => {
    switch (timeRange) {
      case "today":
        return [
          { time: "12am", revenue: 0, emails: 0 },
          { time: "4am", revenue: 0, emails: 0 },
          { time: "8am", revenue: 0, emails: 2 },
          { time: "12pm", revenue: 0, emails: 5 },
          { time: "4pm", revenue: 0, emails: 8 },
          { time: "8pm", revenue: 0, emails: 12 },
        ];
      case "7days":
        return [
          { time: "Mon", revenue: 28, emails: 42 },
          { time: "Tue", revenue: 45, emails: 51 },
          { time: "Wed", revenue: 52, emails: 48 },
          { time: "Thu", revenue: 38, emails: 45 },
          { time: "Fri", revenue: 61, emails: 67 },
          { time: "Sat", revenue: 72, emails: 58 },
          { time: "Sun", revenue: 51, emails: 48 },
        ];
      case "30days":
        return [
          { time: "Week 1", revenue: 182, emails: 248 },
          { time: "Week 2", revenue: 295, emails: 312 },
          { time: "Week 3", revenue: 387, emails: 358 },
          { time: "Week 4", revenue: 428, emails: 329 },
        ];
    }
  };

  const data = getData();

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        <p className="text-sm text-gray-500 mt-1">Revenue and email engagement trends</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
            name="Revenue ($)"
          />
          <Area 
            type="monotone" 
            dataKey="emails" 
            stroke="#8b5cf6" 
            fillOpacity={1}
            fill="url(#colorEmails)"
            strokeWidth={2}
            name="Emails Sent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

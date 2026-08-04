"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Activity,
  BarChart3,
} from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$128,450",
    change: "+12.5%",
    period: "This Month",
    icon: DollarSign,
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    title: "New Patients",
    value: "47",
    change: "+8.2%",
    period: "This Month",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-pale",
  },
  {
    title: "Appointments",
    value: "342",
    change: "+5.1%",
    period: "This Month",
    icon: Calendar,
    color: "text-accent-700",
    bg: "bg-accent-light",
  },
  {
    title: "Avg. Rating",
    value: "4.9",
    change: "+0.1",
    period: "All Time",
    icon: Activity,
    color: "text-warning",
    bg: "bg-warning-light",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold text-neutral-dark">
          Analytics
        </h1>
        <p className="text-sm text-neutral-mid mt-1">
          Track your clinic&apos;s performance and key metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-neutral-light uppercase tracking-wider">
                    {metric.title}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-lg ${metric.bg} flex items-center justify-center`}
                  >
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-neutral-dark">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-success font-medium">
                    {metric.change}
                  </span>
                  <span className="text-xs text-neutral-light">
                    {metric.period}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Revenue Trend
            </CardTitle>
            <CardDescription>
              Monthly revenue over the past 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Chart placeholder — integrate Recharts AreaChart
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Appointment Trends
            </CardTitle>
            <CardDescription>Daily appointment volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Chart placeholder — integrate Recharts BarChart
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Appointments by service category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Chart placeholder — integrate Recharts PieChart
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
            <CardDescription>Age and gender distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Chart placeholder — integrate Recharts BarChart
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

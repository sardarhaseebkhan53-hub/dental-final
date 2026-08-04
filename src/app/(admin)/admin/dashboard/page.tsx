"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-pale",
  },
  {
    title: "Today's Appointments",
    value: "24",
    change: "3 pending",
    trend: "neutral",
    icon: Calendar,
    color: "text-accent-700",
    bg: "bg-accent-light",
  },
  {
    title: "Monthly Revenue",
    value: formatCurrency(128450),
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    title: "Patient Satisfaction",
    value: "4.9/5",
    change: "+0.2",
    trend: "up",
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning-light",
  },
];

const recentAppointments = [
  {
    id: 1,
    patient: "Sarah Johnson",
    doctor: "Dr. Mitchell",
    time: "9:00 AM",
    service: "Cleaning",
    status: "CONFIRMED",
  },
  {
    id: 2,
    patient: "Michael Chen",
    doctor: "Dr. Chen",
    time: "10:00 AM",
    service: "Invisalign Check",
    status: "CHECKED_IN",
  },
  {
    id: 3,
    patient: "Emily Davis",
    doctor: "Dr. Rodriguez",
    time: "10:30 AM",
    service: "Filling",
    status: "IN_PROGRESS",
  },
  {
    id: 4,
    patient: "James Wilson",
    doctor: "Dr. Thompson",
    time: "11:00 AM",
    service: "Consultation",
    status: "SCHEDULED",
  },
  {
    id: 5,
    patient: "Lisa Brown",
    doctor: "Dr. Mitchell",
    time: "2:00 PM",
    service: "Whitening",
    status: "SCHEDULED",
  },
];

const alerts = [
  {
    type: "warning",
    message: "3 patients have overdue invoices",
    time: "10 min ago",
  },
  {
    type: "info",
    message: "Dr. Chen has updated their availability",
    time: "30 min ago",
  },
  {
    type: "success",
    message: "Monthly backup completed successfully",
    time: "1 hour ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-semibold text-neutral-dark">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-mid mt-1">
          Welcome back! Here&apos;s what&apos;s happening at Serene Dental
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-light uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-dark mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs mt-1 ${stat.trend === "up" ? "text-success" : "text-neutral-light"}`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today&apos;s Appointments</span>
              <Badge variant="primary">24 total</Badge>
            </CardTitle>
            <CardDescription>Manage today&apos;s schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-pale flex items-center justify-center text-sm font-semibold text-primary">
                      {apt.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-dark">
                        {apt.patient}
                      </p>
                      <p className="text-xs text-neutral-light">
                        {apt.doctor} • {apt.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-dark">
                      {apt.time}
                    </p>
                    <Badge
                      variant={
                        apt.status === "CONFIRMED"
                          ? "success"
                          : apt.status === "CHECKED_IN"
                            ? "info"
                            : apt.status === "IN_PROGRESS"
                              ? "warning"
                              : "muted"
                      }
                      className="text-[10px]"
                    >
                      {apt.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      alert.type === "warning"
                        ? "bg-warning-light"
                        : alert.type === "success"
                          ? "bg-success-light"
                          : "bg-info-light"
                    }`}
                  >
                    {alert.type === "warning" && (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    {alert.type === "success" && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    {alert.type === "info" && (
                      <Activity className="h-4 w-4 text-info" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-neutral-dark">{alert.message}</p>
                    <p className="text-xs text-neutral-light mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Revenue chart — integrate with Recharts
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Distribution</CardTitle>
            <CardDescription>By service category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface-muted rounded-lg">
              <p className="text-sm text-neutral-light">
                Distribution chart — integrate with Recharts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

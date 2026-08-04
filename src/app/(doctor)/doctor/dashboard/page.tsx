"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  Activity,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    title: "Today's Patients",
    value: "8",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-pale",
  },
  {
    title: "This Week",
    value: "32",
    icon: Calendar,
    color: "text-accent-700",
    bg: "bg-accent-light",
  },
  {
    title: "Active Treatments",
    value: "15",
    icon: Activity,
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    title: "Patient Rating",
    value: "4.9",
    icon: Star,
    color: "text-warning",
    bg: "bg-warning-light",
  },
];

const todaySchedule = [
  {
    id: 1,
    patient: "Sarah Johnson",
    time: "9:00 AM",
    service: "Routine Cleaning",
    status: "COMPLETED",
    initials: "SJ",
  },
  {
    id: 2,
    patient: "Michael Chen",
    time: "10:00 AM",
    service: "Cavity Filling",
    status: "IN_PROGRESS",
    initials: "MC",
  },
  {
    id: 3,
    patient: "Emily Davis",
    time: "11:00 AM",
    service: "Root Canal",
    status: "CHECKED_IN",
    initials: "ED",
  },
  {
    id: 4,
    patient: "James Wilson",
    time: "2:00 PM",
    service: "Consultation",
    status: "SCHEDULED",
    initials: "JW",
  },
  {
    id: 5,
    patient: "Lisa Brown",
    time: "3:00 PM",
    service: "Follow-up",
    status: "SCHEDULED",
    initials: "LB",
  },
  {
    id: 6,
    patient: "Robert Taylor",
    time: "4:00 PM",
    service: "Crown Placement",
    status: "SCHEDULED",
    initials: "RT",
  },
];

const pendingTasks = [
  {
    id: 1,
    task: "Review lab results for Michael Chen",
    priority: "HIGH",
    due: "Today",
  },
  {
    id: 2,
    task: "Complete treatment plan for Emily Davis",
    priority: "NORMAL",
    due: "Today",
  },
  {
    id: 3,
    task: "Follow up on prescription for Sarah Johnson",
    priority: "LOW",
    due: "Tomorrow",
  },
  {
    id: 4,
    task: "Sign off on dental X-rays",
    priority: "NORMAL",
    due: "Tomorrow",
  },
];

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Good morning, Dr. Mitchell! 👋
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            You have 6 appointments scheduled for today.
          </p>
        </div>
        <Button asChild>
          <Link href="/doctor/dashboard">
            <Calendar className="h-4 w-4" /> View Schedule
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-light uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-dark">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today&apos;s Schedule</span>
              <Badge variant="primary">Aug 3, 2026</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <div className="text-center w-16">
                    <p className="text-sm font-semibold text-neutral-dark">
                      {apt.time}
                    </p>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary-pale text-primary text-xs font-semibold">
                      {apt.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-dark">
                      {apt.patient}
                    </p>
                    <p className="text-xs text-neutral-light">{apt.service}</p>
                  </div>
                  <Badge
                    variant={
                      apt.status === "COMPLETED"
                        ? "success"
                        : apt.status === "IN_PROGRESS"
                          ? "warning"
                          : apt.status === "CHECKED_IN"
                            ? "info"
                            : "muted"
                    }
                  >
                    {apt.status.replace("_", " ")}
                  </Badge>
                  <Button variant="ghost" size="icon-sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-neutral-dark">{task.task}</p>
                    <Badge
                      variant={
                        task.priority === "HIGH"
                          ? "error"
                          : task.priority === "NORMAL"
                            ? "warning"
                            : "muted"
                      }
                      className="shrink-0"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-light mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Due: {task.due}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            This Month&apos;s Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Patients Seen", value: "89", change: "+12%" },
              { label: "Procedures Done", value: "124", change: "+8%" },
              { label: "Patient Satisfaction", value: "4.9/5", change: "+0.1" },
              { label: "Revenue Generated", value: "$45,200", change: "+15%" },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-bold text-neutral-dark">
                  {metric.value}
                </p>
                <p className="text-xs text-neutral-light mt-1">
                  {metric.label}
                </p>
                <p className="text-xs text-success mt-0.5">{metric.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

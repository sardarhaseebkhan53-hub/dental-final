"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  UserPlus,
  Calendar,
  CreditCard,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Today's Appointments",
    value: "24",
    icon: Calendar,
    color: "text-primary",
    bg: "bg-primary-pale",
  },
  {
    title: "Checked In",
    value: "12",
    icon: Users,
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    title: "In Queue",
    value: "5",
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning-light",
  },
  {
    title: "Walk-ins",
    value: "3",
    icon: UserPlus,
    color: "text-accent-700",
    bg: "bg-accent-light",
  },
];

const queue = [
  {
    id: 1,
    position: 1,
    patient: "Michael Chen",
    doctor: "Dr. Mitchell",
    waitTime: "15 min",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    position: 2,
    patient: "Emily Davis",
    doctor: "Dr. Chen",
    waitTime: "25 min",
    status: "CHECKED_IN",
  },
  {
    id: 3,
    position: 3,
    patient: "James Wilson",
    doctor: "Dr. Rodriguez",
    waitTime: "35 min",
    status: "CHECKED_IN",
  },
  {
    id: 4,
    position: 4,
    patient: "Lisa Brown",
    doctor: "Dr. Thompson",
    waitTime: "45 min",
    status: "WAITING",
  },
  {
    id: 5,
    position: 5,
    patient: "Robert Taylor",
    doctor: "Dr. Mitchell",
    waitTime: "55 min",
    status: "WAITING",
  },
];

export default function ReceptionDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Front Desk Dashboard
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage patient flow and front desk operations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="secondary">
            <Link href="/reception/dashboard">
              <UserPlus className="h-4 w-4" /> Register Walk-in
            </Link>
          </Button>
          <Button asChild>
            <Link href="/reception/dashboard">
              <Calendar className="h-4 w-4" /> View Schedule
            </Link>
          </Button>
        </div>
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
        {/* Patient Queue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Patient Queue
              </span>
              <Badge variant="warning">5 waiting</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-surface-alt transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary-pale flex items-center justify-center text-sm font-bold text-primary">
                    #{item.position}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-dark">
                      {item.patient}
                    </p>
                    <p className="text-xs text-neutral-light">
                      with {item.doctor} • Waiting: {item.waitTime}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.status === "IN_PROGRESS"
                        ? "warning"
                        : item.status === "CHECKED_IN"
                          ? "info"
                          : "muted"
                    }
                  >
                    {item.status.replace("_", " ")}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  label: "Register New Patient",
                  href: "/reception/register",
                  icon: UserPlus,
                },
                {
                  label: "Schedule Appointment",
                  href: "/reception/appointments",
                  icon: Calendar,
                },
                {
                  label: "Process Payment",
                  href: "/reception/billing",
                  icon: CreditCard,
                },
                {
                  label: "Check-in Patient",
                  href: "/reception/check-in",
                  icon: Users,
                },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    asChild
                    key={action.label}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href={action.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

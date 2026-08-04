"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  CreditCard,
  Pill,
  Clock,
  ArrowRight,
  Bell,
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

const quickActions = [
  {
    icon: Calendar,
    label: "Book Appointment",
    href: "/book-appointment",
    color: "bg-primary-pale text-primary",
  },
  {
    icon: FileText,
    label: "Medical Records",
    href: "/patient/medical-records",
    color: "bg-accent-light text-accent-700",
  },
  {
    icon: Pill,
    label: "Prescriptions",
    href: "/patient/prescriptions",
    color: "bg-success-light text-success",
  },
  {
    icon: CreditCard,
    label: "Make Payment",
    href: "/patient/payments",
    color: "bg-warning-light text-warning",
  },
];

const upcomingAppointments = [
  {
    id: "1",
    doctor: "Dr. Sarah Mitchell",
    specialization: "General Dentistry",
    date: "Aug 10, 2026",
    time: "10:00 AM",
    type: "IN_PERSON",
    status: "CONFIRMED",
    initials: "SM",
  },
  {
    id: "2",
    doctor: "Dr. James Chen",
    specialization: "Orthodontics",
    date: "Aug 24, 2026",
    time: "2:30 PM",
    type: "FOLLOW_UP",
    status: "SCHEDULED",
    initials: "JC",
  },
];

const recentPrescriptions = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    prescribedBy: "Dr. Mitchell",
    date: "Jul 15, 2026",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Ibuprofen 200mg",
    prescribedBy: "Dr. Mitchell",
    date: "Jul 15, 2026",
    status: "COMPLETED",
  },
];

const notifications = [
  {
    id: "1",
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Mitchell is tomorrow at 10:00 AM",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Prescription Ready",
    message: "Your prescription for Amoxicillin is ready for pickup",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Payment of $250 has been processed successfully",
    time: "3 days ago",
    read: true,
  },
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white">
        <h1 className="text-2xl font-display font-semibold">
          Welcome back, John! 👋
        </h1>
        <p className="text-white/80 mt-1">
          Here&apos;s your health overview. Stay on top of your dental care.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={action.href}>
                <Card className="hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-neutral-dark">
                      {action.label}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Upcoming Appointments</span>
              <Button asChild variant="ghost" size="sm">
                <Link href="/patient/dashboard">
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-surface-alt transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {apt.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-dark">
                      {apt.doctor}
                    </p>
                    <p className="text-xs text-neutral-light">
                      {apt.specialization}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-neutral-light" />
                      <span className="text-xs text-neutral-mid">
                        {apt.date} at {apt.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={apt.status === "CONFIRMED" ? "success" : "info"}
                    >
                      {apt.status}
                    </Badge>
                    <p className="text-xs text-neutral-light mt-1">
                      {apt.type.replace("_", " ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-lg ${notif.read ? "" : "bg-primary-pale/50"}`}
                >
                  <p className="text-sm font-medium text-neutral-dark">
                    {notif.title}
                  </p>
                  <p className="text-xs text-neutral-mid mt-0.5">
                    {notif.message}
                  </p>
                  <p className="text-xs text-neutral-light mt-1">
                    {notif.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions & Health Summary */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Your current and past medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success-light flex items-center justify-center">
                      <Pill className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-dark">
                        {rx.name}
                      </p>
                      <p className="text-xs text-neutral-light">
                        By {rx.prescribedBy} • {rx.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={rx.status === "ACTIVE" ? "success" : "muted"}>
                    {rx.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
            <CardDescription>Your dental health at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  label: "Last Cleaning",
                  value: "Jul 15, 2026",
                  status: "Good",
                },
                {
                  label: "Next Checkup",
                  value: "Aug 10, 2026",
                  status: "Upcoming",
                },
                {
                  label: "Active Treatments",
                  value: "1",
                  status: "In Progress",
                },
                { label: "Allergies", value: "Penicillin", status: "On File" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-neutral-mid">{item.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-neutral-dark">
                      {item.value}
                    </span>
                    <span className="text-xs text-neutral-light ml-2">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

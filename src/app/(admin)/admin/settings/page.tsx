"use client";

import React, { useState } from "react";
import { Save, Globe, Bell, Shield, CreditCard, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Settings
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage your clinic&apos;s configuration and preferences.
          </p>
        </div>
        <Button onClick={() => setSaving(true)} loading={saving}>
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-2" /> Payments
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" /> Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic clinic information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Clinic Name"
                  defaultValue="Serene Dental Clinic"
                />
                <Input label="Phone" defaultValue="(555) 123-4567" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  defaultValue="info@serenedental.com"
                  type="email"
                />
                <Input label="Emergency Phone" defaultValue="(555) 911-0000" />
              </div>
              <Textarea
                label="Address"
                defaultValue="123 Wellness Avenue, Suite 200, San Francisco, CA 94102"
                rows={2}
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="Weekday Hours" defaultValue="8:00 AM - 8:00 PM" />
                <Input
                  label="Saturday Hours"
                  defaultValue="9:00 AM - 5:00 PM"
                />
                <Input label="Sunday Hours" defaultValue="10:00 AM - 4:00 PM" />
              </div>
              <Input
                label="Google Maps API Key"
                placeholder="Enter your API key"
                type="password"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  desc: "Send email notifications to patients and staff",
                },
                {
                  label: "SMS Notifications",
                  desc: "Send text message reminders and alerts",
                },
                {
                  label: "Appointment Reminders",
                  desc: "Automated reminders before appointments",
                },
                {
                  label: "Follow-up Reminders",
                  desc: "Post-treatment follow-up notifications",
                },
                {
                  label: "Payment Reminders",
                  desc: "Reminders for outstanding payments",
                },
                {
                  label: "Newsletter",
                  desc: "Send periodic newsletters to subscribers",
                },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-dark">
                      {setting.label}
                    </p>
                    <p className="text-xs text-neutral-light">{setting.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security policies and access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Session Timeout (minutes)"
                  defaultValue="30"
                  type="number"
                />
                <Input
                  label="Max Login Attempts"
                  defaultValue="5"
                  type="number"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Lockout Duration (minutes)"
                  defaultValue="30"
                  type="number"
                />
                <Input
                  label="Password Min Length"
                  defaultValue="8"
                  type="number"
                />
              </div>
              {[
                {
                  label: "Require Two-Factor Authentication",
                  desc: "Enforce 2FA for all admin users",
                },
                {
                  label: "Force Password Change",
                  desc: "Require password change every 90 days",
                },
                { label: "Rate Limiting", desc: "Enable API rate limiting" },
                {
                  label: "Audit Logging",
                  desc: "Log all user actions for compliance",
                },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-dark">
                      {setting.label}
                    </p>
                    <p className="text-xs text-neutral-light">{setting.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and billing preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Currency" defaultValue="USD" />
              <Input label="Tax Rate (%)" defaultValue="8.5" type="number" />
              <Input label="Stripe Publishable Key" placeholder="pk_test_..." />
              <Input
                label="Stripe Secret Key"
                placeholder="sk_test_..."
                type="password"
              />
              <Input
                label="Cancellation Fee ($)"
                defaultValue="50"
                type="number"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email sending and templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="From Name" defaultValue="Serene Dental" />
              <Input
                label="From Email"
                defaultValue="noreply@serenedental.com"
                type="email"
              />
              <Input
                label="Resend API Key"
                placeholder="re_..."
                type="password"
              />
              <Input label="SMTP Host" placeholder="smtp.example.com" />
              <Input label="SMTP Port" placeholder="587" type="number" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

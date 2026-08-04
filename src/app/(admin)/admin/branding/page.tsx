"use client";

import React, { useState } from "react";
import { Save, Upload, Palette, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BrandingPage() {
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Branding
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Customize your clinic&apos;s visual identity.
          </p>
        </div>
        <Button onClick={() => setSaving(true)} loading={saving}>
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Logo & Favicon
            </CardTitle>
            <CardDescription>
              Upload your clinic&apos;s logo and favicon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Primary Logo", desc: "Used on light backgrounds" },
              { label: "Dark Logo", desc: "Used on dark backgrounds" },
              { label: "Favicon", desc: "Browser tab icon (32x32)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-surface-muted">
                  <Upload className="h-6 w-6 text-neutral-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-dark">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-light">{item.desc}</p>
                  <Button variant="ghost" size="sm" className="mt-1">
                    Upload
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" /> Colors & Typography
            </CardTitle>
            <CardDescription>
              Define your brand colors and fonts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Primary", color: "#0D7377" },
                { label: "Secondary", color: "#D4A574" },
                { label: "Accent", color: "#14A3A8" },
              ].map((item) => (
                <div key={item.label}>
                  <label className="text-xs font-medium text-neutral-mid mb-2 block">
                    {item.label}
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 w-8 rounded-md border border-border"
                      style={{ backgroundColor: item.color }}
                    />
                    <Input
                      defaultValue={item.color}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Input label="Font Family" defaultValue="Plus Jakarta Sans" />
            <Input label="Display Font" defaultValue="Cormorant Garamond" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Facebook"
                placeholder="https://facebook.com/..."
                defaultValue="https://facebook.com/serenedental"
              />
              <Input
                label="Instagram"
                placeholder="https://instagram.com/..."
                defaultValue="https://instagram.com/serenedental"
              />
              <Input
                label="Twitter"
                placeholder="https://twitter.com/..."
                defaultValue="https://twitter.com/serenedental"
              />
              <Input label="LinkedIn" placeholder="https://linkedin.com/..." />
              <Input label="YouTube" placeholder="https://youtube.com/..." />
              <Input label="Google Business" placeholder="https://g.page/..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

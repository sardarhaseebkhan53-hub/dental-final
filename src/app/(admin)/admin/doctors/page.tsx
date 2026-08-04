"use client";

import React from "react";
import { Plus, Search, Star, Edit, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialization: "General & Cosmetic",
    initials: "SM",
    experience: "20+ years",
    rating: 4.9,
    patients: 180,
    fee: 150,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Dr. James Chen",
    specialization: "Orthodontics",
    initials: "JC",
    experience: "15+ years",
    rating: 4.8,
    patients: 145,
    fee: 200,
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatric Dentistry",
    initials: "ER",
    experience: "10+ years",
    rating: 4.9,
    patients: 120,
    fee: 130,
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Dr. Michael Thompson",
    specialization: "Oral Surgery",
    initials: "MT",
    experience: "18+ years",
    rating: 4.9,
    patients: 160,
    fee: 250,
    status: "ACTIVE",
  },
];

export default function DoctorsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Doctors
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage doctor profiles and settings.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Doctor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            placeholder="Search doctors..."
            leftIcon={<Search className="h-4 w-4" />}
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-surface-alt transition-colors"
              >
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary text-white text-lg font-display">
                    {doctor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-neutral-dark">
                      {doctor.name}
                    </h3>
                    <Badge
                      variant={doctor.status === "ACTIVE" ? "success" : "muted"}
                      className="text-[10px]"
                    >
                      {doctor.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-primary font-medium">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-neutral-light">
                    <span>{doctor.experience}</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      {doctor.rating}
                    </span>
                    <span>{doctor.patients} patients</span>
                    <span>{formatCurrency(doctor.fee)}/visit</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

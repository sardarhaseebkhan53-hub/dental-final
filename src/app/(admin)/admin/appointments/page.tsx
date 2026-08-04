"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: "IN_PERSON" | "TELEMEDICINE";
  initials: string;
  requestedAt: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patient: "Sarah Johnson",
    doctor: "Dr. Mitchell",
    service: "Cleaning",
    date: "Aug 3, 2026",
    time: "9:00 AM",
    status: "COMPLETED",
    type: "IN_PERSON",
    initials: "SJ",
    requestedAt: "Confirmed by Jane",
  },
  {
    id: "2",
    patient: "Michael Chen",
    doctor: "Dr. Chen",
    service: "Invisalign Check",
    date: "Aug 3, 2026",
    time: "10:00 AM",
    status: "IN_PROGRESS",
    type: "IN_PERSON",
    initials: "MC",
    requestedAt: "Checked in 10:01 AM",
  },
  {
    id: "3",
    patient: "Emily Davis",
    doctor: "Dr. Rodriguez",
    service: "Filling",
    date: "Aug 3, 2026",
    time: "10:30 AM",
    status: "CHECKED_IN",
    type: "IN_PERSON",
    initials: "ED",
    requestedAt: "Arrived early",
  },
  {
    id: "4",
    patient: "James Wilson",
    doctor: "Dr. Thompson",
    service: "Consultation",
    date: "Aug 3, 2026",
    time: "11:00 AM",
    status: "SCHEDULED",
    type: "IN_PERSON",
    initials: "JW",
    requestedAt: "Online request",
  },
  {
    id: "5",
    patient: "Lisa Brown",
    doctor: "Dr. Mitchell",
    service: "Whitening",
    date: "Aug 3, 2026",
    time: "2:00 PM",
    status: "SCHEDULED",
    type: "IN_PERSON",
    initials: "LB",
    requestedAt: "Needs confirmation",
  },
  {
    id: "6",
    patient: "Robert Taylor",
    doctor: "Dr. Chen",
    service: "Braces Adjustment",
    date: "Aug 4, 2026",
    time: "9:30 AM",
    status: "CONFIRMED",
    type: "IN_PERSON",
    initials: "RT",
    requestedAt: "SMS confirmed",
  },
  {
    id: "7",
    patient: "Anna Garcia",
    doctor: "Dr. Mitchell",
    service: "Root Canal",
    date: "Aug 4, 2026",
    time: "11:00 AM",
    status: "SCHEDULED",
    type: "IN_PERSON",
    initials: "AG",
    requestedAt: "Online request",
  },
  {
    id: "8",
    patient: "Tom Harris",
    doctor: "Dr. Rodriguez",
    service: "Checkup",
    date: "Aug 4, 2026",
    time: "3:00 PM",
    status: "SCHEDULED",
    type: "TELEMEDICINE",
    initials: "TH",
    requestedAt: "Portal request",
  },
];

function statusVariant(status: AppointmentStatus) {
  if (status === "COMPLETED" || status === "CONFIRMED") return "success";
  if (status === "IN_PROGRESS") return "warning";
  if (status === "CHECKED_IN") return "info";
  if (status === "CANCELLED") return "error";
  return "muted";
}

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((appointment) => {
        const query = searchQuery.toLowerCase();
        return [
          appointment.patient,
          appointment.doctor,
          appointment.service,
          appointment.status,
        ].some((value) => value.toLowerCase().includes(query));
      }),
    [appointments, searchQuery],
  );

  const stats = useMemo(
    () => [
      {
        label: "Today",
        count: appointments.filter((item) => item.date === "Aug 3, 2026")
          .length,
        color: "text-primary",
      },
      {
        label: "Confirmed",
        count: appointments.filter((item) => item.status === "CONFIRMED")
          .length,
        color: "text-success",
      },
      {
        label: "Needs Approval",
        count: appointments.filter((item) => item.status === "SCHEDULED")
          .length,
        color: "text-warning",
      },
      {
        label: "Completed",
        count: appointments.filter((item) => item.status === "COMPLETED")
          .length,
        color: "text-info",
      },
      {
        label: "Cancelled",
        count: appointments.filter((item) => item.status === "CANCELLED")
          .length,
        color: "text-error",
      },
    ],
    [appointments],
  );

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status,
              requestedAt:
                status === "CONFIRMED"
                  ? "Confirmed just now"
                  : status === "CANCELLED"
                    ? "Cancelled just now"
                    : appointment.requestedAt,
            }
          : appointment,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-pale px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure admin workflow
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-neutral-dark">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-neutral-mid">
            Confirm, cancel, and track patient appointment requests from one
            locked staff panel.
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4" /> New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-black ${stat.color}`}>
                {stat.count}
              </p>
              <p className="text-xs font-medium text-neutral-light">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-white/80 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by patient, doctor, service, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary-pale text-xs font-bold text-primary">
                          {apt.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-semibold text-neutral-dark">
                          {apt.patient}
                        </span>
                        <p className="text-xs text-neutral-light">
                          {apt.requestedAt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid">
                    {apt.doctor}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid">
                    {apt.service}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-neutral-dark">
                        {apt.date}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-neutral-light">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="muted" className="text-[10px]">
                      {apt.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(apt.status)}>
                      {apt.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {apt.status === "SCHEDULED" ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateStatus(apt.id, "CONFIRMED")}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(apt.id, "CANCELLED")}
                          >
                            <XCircle className="h-4 w-4" /> Cancel
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs font-medium text-neutral-light">
                          No action needed
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

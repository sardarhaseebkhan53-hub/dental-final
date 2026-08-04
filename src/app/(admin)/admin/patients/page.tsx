"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
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

const patients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
    patientNumber: "SDP-0001",
    lastVisit: "Jul 15, 2026",
    status: "ACTIVE",
    treatments: 3,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "(555) 234-5678",
    patientNumber: "SDP-0002",
    lastVisit: "Jul 20, 2026",
    status: "ACTIVE",
    treatments: 1,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 345-6789",
    patientNumber: "SDP-0003",
    lastVisit: "Jun 30, 2026",
    status: "ACTIVE",
    treatments: 2,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    phone: "(555) 456-7890",
    patientNumber: "SDP-0004",
    lastVisit: "May 15, 2026",
    status: "INACTIVE",
    treatments: 0,
  },
  {
    id: "5",
    name: "Lisa Brown",
    email: "lisa@example.com",
    phone: "(555) 567-8901",
    patientNumber: "SDP-0005",
    lastVisit: "Aug 1, 2026",
    status: "ACTIVE",
    treatments: 1,
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Patients
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage patient records and information.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients..."
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Patient #</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Treatments</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary-pale text-primary text-xs">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-neutral-dark">
                          {patient.name}
                        </p>
                        <p className="text-xs text-neutral-light">
                          {patient.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid font-mono">
                    {patient.patientNumber}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid">
                    {patient.phone}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        patient.status === "ACTIVE" ? "success" : "muted"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-mid">
                    {patient.treatments}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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

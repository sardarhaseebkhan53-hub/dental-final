"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
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

const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@serenedental.com",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    lastLogin: "2 hours ago",
    initials: "AU",
  },
  {
    id: "2",
    name: "Dr. Sarah Mitchell",
    email: "dr.mitchell@serenedental.com",
    role: "DOCTOR",
    status: "ACTIVE",
    lastLogin: "1 hour ago",
    initials: "SM",
  },
  {
    id: "3",
    name: "Dr. James Chen",
    email: "dr.chen@serenedental.com",
    role: "DOCTOR",
    status: "ACTIVE",
    lastLogin: "3 hours ago",
    initials: "JC",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "reception@serenedental.com",
    role: "RECEPTIONIST",
    status: "ACTIVE",
    lastLogin: "30 min ago",
    initials: "JS",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "PATIENT",
    status: "ACTIVE",
    lastLogin: "1 day ago",
    initials: "SJ",
  },
  {
    id: "6",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "PATIENT",
    status: "ACTIVE",
    lastLogin: "5 days ago",
    initials: "MC",
  },
  {
    id: "7",
    name: "John Doe",
    email: "john@example.com",
    role: "PATIENT",
    status: "PENDING_VERIFICATION",
    lastLogin: "Never",
    initials: "JD",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Users
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage all user accounts and roles.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
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
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users
                .filter(
                  (u) =>
                    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary-pale text-primary text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-neutral-dark">
                            {user.name}
                          </p>
                          <p className="text-xs text-neutral-light">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "SUPER_ADMIN"
                            ? "primary"
                            : user.role === "DOCTOR"
                              ? "info"
                              : user.role === "RECEPTIONIST"
                                ? "warning"
                                : "default"
                        }
                      >
                        {user.role.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "success" : "warning"
                        }
                      >
                        {user.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-mid">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon-sm">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Trash2 className="h-3.5 w-3.5 text-error" />
                        </Button>
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

"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const posts = [
  {
    id: "1",
    title: "The Importance of Regular Dental Checkups",
    category: "Preventive Care",
    author: "Dr. Mitchell",
    status: "PUBLISHED",
    date: "Aug 1, 2026",
    views: 1245,
  },
  {
    id: "2",
    title: "Complete Guide to Professional Teeth Whitening",
    category: "Cosmetic",
    author: "Dr. Mitchell",
    status: "PUBLISHED",
    date: "Jul 25, 2026",
    views: 890,
  },
  {
    id: "3",
    title: "Invisalign vs Traditional Braces",
    category: "Orthodontics",
    author: "Dr. Chen",
    status: "PUBLISHED",
    date: "Jul 18, 2026",
    views: 756,
  },
  {
    id: "4",
    title: "Overcoming Dental Anxiety",
    category: "Patient Care",
    author: "Dr. Rodriguez",
    status: "DRAFT",
    date: "Jul 10, 2026",
    views: 0,
  },
  {
    id: "5",
    title: "What to Expect During Dental Implant Process",
    category: "Implants",
    author: "Dr. Thompson",
    status: "SCHEDULED",
    date: "Aug 10, 2026",
    views: 0,
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-neutral-dark">
            Blog
          </h1>
          <p className="text-sm text-neutral-mid mt-1">
            Manage blog posts and content.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search posts..."
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
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts
                .filter((p) =>
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium text-sm text-neutral-dark max-w-xs truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="text-[10px]">
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-mid">
                      {post.author}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "PUBLISHED"
                            ? "success"
                            : post.status === "DRAFT"
                              ? "muted"
                              : "info"
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-mid">
                      {post.date}
                    </TableCell>
                    <TableCell className="text-sm text-neutral-mid">
                      {post.views.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon-sm">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="h-3.5 w-3.5" />
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

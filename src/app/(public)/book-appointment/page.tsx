"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getSession } from "next-auth/react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Check,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Video,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatCurrency } from "@/lib/utils";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const steps = [
  { id: 1, title: "Service", icon: FileText },
  { id: 2, title: "Doctor & Date", icon: User },
  { id: 3, title: "Your Details", icon: Calendar },
  { id: 4, title: "Confirmation", icon: Check },
];

const services = [
  {
    id: "1",
    name: "General Checkup",
    duration: "30 min",
    price: 150,
    category: "General",
  },
  {
    id: "2",
    name: "Teeth Cleaning",
    duration: "45 min",
    price: 120,
    category: "Preventive",
  },
  {
    id: "3",
    name: "Teeth Whitening",
    duration: "60 min",
    price: 350,
    category: "Cosmetic",
  },
  {
    id: "4",
    name: "Dental Filling",
    duration: "45 min",
    price: 200,
    category: "Restorative",
  },
  {
    id: "5",
    name: "Root Canal",
    duration: "90 min",
    price: 800,
    category: "Endodontics",
  },
  {
    id: "6",
    name: "Crown Placement",
    duration: "60 min",
    price: 1200,
    category: "Restorative",
  },
  {
    id: "7",
    name: "Invisalign Consultation",
    duration: "30 min",
    price: 100,
    category: "Orthodontics",
  },
  {
    id: "8",
    name: "Dental Implant",
    duration: "120 min",
    price: 3000,
    category: "Surgery",
  },
];

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialization: "General & Cosmetic",
    initials: "SM",
    rating: 4.9,
    fee: 150,
  },
  {
    id: "2",
    name: "Dr. James Chen",
    specialization: "Orthodontics",
    initials: "JC",
    rating: 4.8,
    fee: 200,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatric",
    initials: "ER",
    rating: 4.9,
    fee: 130,
  },
  {
    id: "4",
    name: "Dr. Michael Thompson",
    specialization: "Oral Surgery",
    initials: "MT",
    rating: 4.9,
    fee: 250,
  },
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const appointmentTypes = [
  {
    value: "IN_PERSON",
    label: "In-Person Visit",
    icon: MapPin,
    description: "Visit our clinic",
  },
  {
    value: "TELEMEDICINE",
    label: "Telemedicine",
    icon: Video,
    description: "Video consultation",
  },
];

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("IN_PERSON");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  const [serviceOptions, setServiceOptions] = useState(services);
  const [doctorOptions, setDoctorOptions] = useState(doctors);

  // Load live services/doctors from the API when the database is available,
  // falling back to the static catalogue otherwise (keeps the page functional
  // while offline or before seeding).
  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/doctors").then((r) => r.json()),
    ])
      .then(([servicesRes, doctorsRes]) => {
        if (cancelled) return;
        if (servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
          setServiceOptions(
            servicesRes.data.map((s: { id: string; name: string; duration: number; price: number; category: string }) => ({
              id: s.id,
              name: s.name,
              duration: `${s.duration} min`,
              price: s.price,
              category: s.category,
            })),
          );
        }
        if (doctorsRes.success && Array.isArray(doctorsRes.data) && doctorsRes.data.length > 0) {
          setDoctorOptions(
            doctorsRes.data.map((d: { id: string; name: string; specialization: string; fee: number; rating: number }) => ({
              id: d.id,
              name: d.name,
              specialization: d.specialization,
              initials: d.name
                .replace(/^Dr\.\s*/i, "")
                .split(" ")
                .map((part: string) => part[0])
                .join("")
                .toUpperCase()
                .slice(0, 2),
              rating: d.rating,
              fee: d.fee,
            })),
          );
        }
      })
      .catch(() => {
        // Keep static fallback data.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleBooking = async () => {
    setLoading(true);
    setBookingError("");

    try {
      const session = await getSession();

      if (!session?.user) {
        setBookingError("auth");
        setLoading(false);
        return;
      }

      // Live booking requires real (UUID) doctor/service records from the DB.
      if (!UUID_PATTERN.test(selectedDoctor) || !UUID_PATTERN.test(selectedService)) {
        setBookingError(
          "Live booking is temporarily unavailable. Please call us at (555) 123-4567 to schedule your appointment.",
        );
        setLoading(false);
        return;
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService,
          doctorId: selectedDoctor,
          date: selectedDate,
          startTime: selectedTime,
          type: selectedType,
          reason: reason || undefined,
          notes: notes || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setBookingError(
          result.error || "Unable to book your appointment. Please try again.",
        );
        setLoading(false);
        return;
      }

      setLoading(false);
      setBooked(true);
    } catch {
      setBookingError(
        "Unable to book your appointment. Please try again or call (555) 123-4567.",
      );
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-neutral-dark mb-3">
            Appointment Confirmed! 🎉
          </h1>
          <p className="text-neutral-mid mb-6">
            Your appointment has been booked successfully. You&apos;ll receive a
            confirmation email shortly.
          </p>
          <div className="bg-surface-alt rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light">Service</span>
              <span className="font-medium">
                {serviceOptions.find((s) => s.id === selectedService)?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light">Doctor</span>
              <span className="font-medium">
                {doctorOptions.find((d) => d.id === selectedDoctor)?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light">Date</span>
              <span className="font-medium">{selectedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-light">Time</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              setBooked(false);
              setCurrentStep(1);
              setDetailsConfirmed(false);
            }}
            size="lg"
          >
            Book Another Appointment
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20 bg-surface-alt">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-neutral-dark mb-2">
            Book Your Appointment
          </h1>
          <p className="text-neutral-mid">
            Schedule your visit in just a few easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                      currentStep >= step.id
                        ? "bg-primary text-white"
                        : "bg-surface-muted text-neutral-light",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block",
                      currentStep >= step.id
                        ? "text-primary"
                        : "text-neutral-light",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-px w-12 lg:w-20",
                      currentStep > step.id ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-border p-6 lg:p-8 shadow-card">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-semibold text-neutral-dark mb-2">
                  Select a Service
                </h2>
                <p className="text-sm text-neutral-mid mb-6">
                  Choose the dental service you need.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all",
                        selectedService === service.id
                          ? "border-primary bg-primary-pale ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30 hover:bg-surface-alt",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-neutral-dark">
                            {service.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="muted" className="text-[10px]">
                              {service.category}
                            </Badge>
                            <span className="text-xs text-neutral-light flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {service.duration}
                            </span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(service.price)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedService}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Doctor & Date */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-semibold text-neutral-dark mb-2">
                  Choose Doctor & Time
                </h2>
                <p className="text-sm text-neutral-mid mb-6">
                  Select your preferred doctor, date, and time slot.
                </p>

                {/* Appointment Type */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {appointmentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={cn(
                          "p-3 rounded-xl border flex items-center gap-3 transition-all",
                          selectedType === type.value
                            ? "border-primary bg-primary-pale"
                            : "border-border hover:border-primary/30",
                        )}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-neutral-dark">
                            {type.label}
                          </p>
                          <p className="text-xs text-neutral-light">
                            {type.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Doctor Selection */}
                <h3 className="text-sm font-semibold text-neutral-dark mb-3">
                  Select Doctor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {doctorOptions.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={cn(
                        "p-4 rounded-xl border flex items-center gap-3 text-left transition-all",
                        selectedDoctor === doctor.id
                          ? "border-primary bg-primary-pale ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30",
                      )}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-white">
                          {doctor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-neutral-dark">
                          {doctor.name}
                        </p>
                        <p className="text-xs text-neutral-light">
                          {doctor.specialization}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-accent">
                            ★ {doctor.rating}
                          </span>
                          <span className="text-xs text-neutral-light">•</span>
                          <span className="text-xs text-neutral-light">
                            {formatCurrency(doctor.fee)}/visit
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Date Selection */}
                <h3 className="text-sm font-semibold text-neutral-dark mb-3">
                  Select Date
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                  {Array.from({ length: 14 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i + 1);
                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    const dayNum = date.getDate();
                    const month = date.toLocaleDateString("en-US", {
                      month: "short",
                    });
                    const dateStr = date.toISOString().split("T")[0];
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={cn(
                          "flex flex-col items-center p-3 rounded-xl border min-w-[64px] transition-all",
                          selectedDate === dateStr
                            ? "border-primary bg-primary text-white"
                            : "border-border hover:border-primary/30",
                        )}
                      >
                        <span className="text-xs font-medium">{dayName}</span>
                        <span className="text-lg font-bold">{dayNum}</span>
                        <span className="text-xs">{month}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <>
                    <h3 className="text-sm font-semibold text-neutral-dark mb-3">
                      Select Time
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
                      {timeSlots.map((slot) => {
                        const hour = parseInt(slot.split(":")[0]);
                        const ampm = hour >= 12 ? "PM" : "AM";
                        const displayHour = hour > 12 ? hour - 12 : hour;
                        const label = `${displayHour}:${slot.split(":")[1]} ${ampm}`;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                              selectedTime === slot
                                ? "border-primary bg-primary text-white"
                                : "border-border hover:border-primary/30",
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="ghost" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedDoctor || !selectedDate || !selectedTime}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Patient Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-semibold text-neutral-dark mb-2">
                  Your Details
                </h2>
                <p className="text-sm text-neutral-mid mb-6">
                  Please provide your contact information.
                </p>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" required />
                    <Input label="Last Name" placeholder="Doe" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                    />
                  </div>
                  <Textarea
                    label="Reason for Visit"
                    placeholder="Brief description of your dental concern..."
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <Textarea
                    label="Additional Notes"
                    placeholder="Any allergies, special requirements, or questions..."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="ghost" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Review Booking <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-xl font-semibold text-neutral-dark mb-2">
                  Confirm Your Booking
                </h2>
                <p className="text-sm text-neutral-mid mb-6">
                  Review your appointment details before confirming.
                </p>

                <div className="bg-surface-alt rounded-xl p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-light mb-1">Service</p>
                      <p className="text-sm font-semibold">
                        {serviceOptions.find((s) => s.id === selectedService)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-light mb-1">Type</p>
                      <p className="text-sm font-semibold">
                        {selectedType === "IN_PERSON"
                          ? "In-Person Visit"
                          : "Telemedicine"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-light mb-1">Doctor</p>
                      <p className="text-sm font-semibold">
                        {doctorOptions.find((d) => d.id === selectedDoctor)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-light mb-1">
                        Date & Time
                      </p>
                      <p className="text-sm font-semibold">
                        {selectedDate} at {selectedTime}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-neutral-mid">
                      Consultation Fee
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(
                        doctorOptions.find((d) => d.id === selectedDoctor)?.fee || 0,
                      )}
                    </span>
                  </div>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-primary/20 bg-primary-pale/60 p-4 text-left">
                  <input
                    type="checkbox"
                    checked={detailsConfirmed}
                    onChange={(event) =>
                      setDetailsConfirmed(event.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-neutral-dark">
                      I confirm these appointment details are correct.
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-neutral-mid">
                      Our front desk will verify availability and send the final
                      confirmation by email or phone.
                    </span>
                  </span>
                </label>

                {bookingError === "auth" ? (
                  <div className="mt-6 rounded-xl border border-accent/30 bg-accent-light/50 p-5 text-center">
                    <p className="text-sm font-semibold text-neutral-dark mb-1">
                      Sign in to confirm your booking
                    </p>
                    <p className="text-xs text-neutral-mid mb-4">
                      Your selections are saved below — sign in (or create an
                      account) to submit the appointment request.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild size="lg">
                        <Link href="/login">
                          <LogIn className="h-4 w-4" /> Sign In to Book
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="secondary"
                        size="lg"
                        onClick={() => setBookingError("")}
                      >
                        <Link href="/register">Create an Account</Link>
                      </Button>
                    </div>
                  </div>
                ) : bookingError ? (
                  <div className="mt-6 rounded-xl border border-error/30 bg-error-light/50 p-4 text-center">
                    <p className="text-sm font-medium text-error">
                      {bookingError}
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingError("")}
                      className="mt-2 text-xs text-neutral-mid underline"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : null}

                <div className="flex justify-between mt-8">
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    loading={loading}
                    size="lg"
                    disabled={!detailsConfirmed}
                  >
                    <Check className="h-4 w-4" /> Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

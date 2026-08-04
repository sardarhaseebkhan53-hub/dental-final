"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Medical Info" },
  { id: 3, title: "Account Setup" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  allergies: string;
  medications: string;
  medicalConditions: string;
  insuranceProvider: string;
  insuranceNumber: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  hipaaConsent: boolean;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  allergies: "",
  medications: "",
  medicalConditions: "",
  insuranceProvider: "",
  insuranceNumber: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  hipaaConsent: false,
};

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const router = useRouter();

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    setError("");
    if (step === 1) {
      if (!form.firstName.trim() || !form.lastName.trim()) {
        setError("Please enter your first and last name.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError("Please enter a valid email address.");
        return false;
      }
      if (!form.dateOfBirth) {
        setError("Please select your date of birth.");
        return false;
      }
      if (!form.gender) {
        setError("Please select your gender.");
        return false;
      }
    }
    if (step === 3) {
      if (form.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
      if (!form.acceptTerms) {
        setError("You must accept the Terms of Service to continue.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/[^\d+]/g, "") || undefined,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          password: form.password,
          confirmPassword: form.confirmPassword,
          acceptTerms: form.acceptTerms,
          // Optional medical info (used later for the patient profile).
          bloodGroup: form.bloodGroup || undefined,
          allergies: form.allergies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          medications: form.medications
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          medicalConditions: form.medicalConditions
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          insuranceProvider: form.insuranceProvider.trim() || undefined,
          insuranceNumber: form.insuranceNumber.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration.
      const signInResult = await signIn("credentials", {
        email: form.email.trim(),
        password: form.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setRegistered(true);
        setLoading(false);
        return;
      }

      router.push("/patient/dashboard");
      router.refresh();
    } catch {
      setError("Unable to create your account. Please try again.");
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-alt p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center bg-white rounded-xl border border-border p-10 shadow-card"
        >
          <div className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-2">
            Account Created
          </h2>
          <p className="text-sm text-neutral-mid mb-8">
            Your account has been created successfully. Please sign in to
            continue.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Go to Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
            </div>
          </Link>
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-2">
            Create Your Account
          </h2>
          <p className="text-sm text-neutral-mid">
            Join Serene Dental — your journey to a beautiful smile starts here
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary text-white"
                      : "bg-surface-muted text-neutral-light"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    currentStep >= step.id
                      ? "text-primary"
                      : "text-neutral-light"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-12 ${currentStep > step.id ? "bg-primary" : "bg-border"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-border p-6 lg:p-8 shadow-card"
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-light text-error text-sm text-center">
              {error}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  leftIcon={<User className="h-4 w-4" />}
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  required
                />
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="(555) 000-0000"
                leftIcon={<Phone className="h-4 w-4" />}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <Input
                label="Date of Birth"
                type="date"
                leftIcon={<Calendar className="h-4 w-4" />}
                value={form.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
                required
              />
              <Select
                value={form.gender || undefined}
                onValueChange={(value) => updateField("gender", value)}
              >
                <SelectTrigger label="Gender" required>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                  <SelectItem value="PREFER_NOT_TO_SAY">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Select
                value={form.bloodGroup || undefined}
                onValueChange={(value) => updateField("bloodGroup", value)}
              >
                <SelectTrigger label="Blood Group">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE", "O_POSITIVE", "O_NEGATIVE"].map(
                    (g) => (
                      <SelectItem key={g} value={g}>
                        {g.replace("_", " ")}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <Input
                label="Known Allergies"
                placeholder="e.g., Penicillin, Latex (comma separated)"
                value={form.allergies}
                onChange={(e) => updateField("allergies", e.target.value)}
              />
              <Input
                label="Current Medications"
                placeholder="e.g., Aspirin, Ibuprofen (comma separated)"
                value={form.medications}
                onChange={(e) => updateField("medications", e.target.value)}
              />
              <Input
                label="Medical Conditions"
                placeholder="e.g., Diabetes, Hypertension (comma separated)"
                value={form.medicalConditions}
                onChange={(e) =>
                  updateField("medicalConditions", e.target.value)
                }
              />
              <Input
                label="Insurance Provider"
                placeholder="e.g., Delta Dental, Cigna"
                value={form.insuranceProvider}
                onChange={(e) =>
                  updateField("insuranceProvider", e.target.value)
                }
              />
              <Input
                label="Insurance Number"
                placeholder="Your policy number"
                value={form.insuranceNumber}
                onChange={(e) =>
                  updateField("insuranceNumber", e.target.value)
                }
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                leftIcon={<Lock className="h-4 w-4" />}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                hint="At least 8 characters with uppercase, lowercase, number and symbol"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                leftIcon={<Lock className="h-4 w-4" />}
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                required
              />
              <div className="space-y-3">
                <label className="flex items-start gap-2 text-sm text-neutral-mid cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-border text-primary focus:ring-primary/30"
                    checked={form.acceptTerms}
                    onChange={(e) => updateField("acceptTerms", e.target.checked)}
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-neutral-mid cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 rounded border-border text-primary focus:ring-primary/30"
                    checked={form.hipaaConsent}
                    onChange={(e) =>
                      updateField("hipaaConsent", e.target.checked)
                    }
                  />
                  <span>
                    I consent to HIPAA-compliant handling of my medical records
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" loading={loading}>
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-mid">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:text-primary-700"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile as updateFirebaseProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "success">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const login = useUserStore((s) => s.login);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      login({
        name: user.displayName || user.email?.split("@")[0] || "User",
        fullName: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatar: user.photoURL || undefined,
      });
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in. Please check your credentials.",
      );
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update display name in Firebase
      await updateFirebaseProfile(user, {
        displayName: fullName,
      });

      login({
        name: fullName.split(" ")[0],
        fullName,
        email,
      });
      setMode("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create account.",
      );
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      login({
        name: user.displayName?.split(" ")[0] || "User",
        fullName: user.displayName || "User",
        email: user.email || "",
        avatar: user.photoURL || undefined,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        mode === "signin"
          ? "Welcome back!"
          : mode === "signup"
            ? "Create Account"
            : "Success!"
      }
    >
      {/* Sign In Form */}
      {mode === "signin" && (
        <div className="animate-fade-in">
          <p className="text-gray-500 text-sm mb-6">
            Sign in to access your recipes and more
          </p>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full mb-6 border-gray-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-400 font-medium">
                or sign in with email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Sign In
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <button
              className="text-primary font-bold hover:underline"
              onClick={() => setMode("signup")}
            >
              Create an account
            </button>
          </p>
        </div>
      )}

      {/* Sign Up Form */}
      {mode === "signup" && (
        <div className="animate-fade-in">
          <p className="text-gray-500 text-sm mb-6">
            Join the COOKHUB culinary community
          </p>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full mb-6 border-gray-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-400 font-medium">
                or register with email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              className="text-primary font-bold hover:underline"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </p>
        </div>
      )}

      {/* Success Message */}
      {mode === "success" && (
        <div className="text-center py-8 animate-fade-in">
          <span className="material-symbols-outlined text-6xl text-green-500 mb-4">
            check_circle
          </span>
          <p className="text-gray-500 mb-6 font-medium">
            Your account has been created successfully.
          </p>
          <Button onClick={onClose} className="w-full">
            Start Cooking!
          </Button>
        </div>
      )}
    </Modal>
  );
}

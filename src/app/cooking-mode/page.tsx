"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CookHubData } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertCircle,
  Utensils,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Circle,
  ArrowRight,
  PartyPopper,
  Check,
} from "lucide-react";

function CookingModeContent() {
  const searchParams = useSearchParams();
  const recipeId = Number(searchParams.get("id"));
  const recipe = CookHubData.recipes.find((r) => r.id === recipeId);

  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const startTimer = useCallback((minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if ("vibrate" in navigator) navigator.vibrate(200);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-black text-white">
        <div className="text-center">
          <AlertCircle className="text-gray-500 mb-4 mx-auto" size={64} />
          <h2 className="text-2xl font-bold mb-2">Recipe not found</h2>
          <Link href="/" className="text-primary font-bold hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const step = recipe.steps[currentStep];
  const progress = ((currentStep + 1) / recipe.steps.length) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleStepComplete = () => {
    setCompletedSteps((prev) =>
      prev.includes(currentStep)
        ? prev.filter((s) => s !== currentStep)
        : [...prev, currentStep],
    );
  };

  const nextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsTimerRunning(false);
      setTimerSeconds(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsTimerRunning(false);
      setTimerSeconds(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-black text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-slate-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={`/recipe/${recipe.id}`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft />
            <span className="text-sm font-semibold hidden sm:inline">Exit</span>
          </Link>
          <div className="text-center">
            <h1 className="text-sm font-bold">{recipe.title}</h1>
            <p className="text-xs text-white/50">
              Step {currentStep + 1} of {recipe.steps.length}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/50">
              {completedSteps.length}/{recipe.steps.length} done
            </span>
          </div>
        </div>
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary to-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in" key={currentStep}>
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Utensils size={16} />
            Step {currentStep + 1}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 serif-font">
            {step.title}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Timer */}
        <div className="bg-white/5 rounded-3xl p-8 mb-12 text-center border border-white/10">
          <div className="timer-display text-6xl md:text-7xl mb-6 font-mono text-white">
            {timerSeconds > 0
              ? formatTime(timerSeconds)
              : formatTime(step.time * 60)}
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!isTimerRunning && timerSeconds === 0 && (
              <Button
                onClick={() => startTimer(step.time)}
                className="flex items-center gap-2"
              >
                <Play size={20} />
                Start Timer ({step.time} min)
              </Button>
            )}
            {isTimerRunning && (
              <Button
                variant="secondary"
                onClick={() => setIsTimerRunning(false)}
                className="flex items-center gap-2"
              >
                <Pause size={20} />
                Pause
              </Button>
            )}
            {!isTimerRunning && timerSeconds > 0 && (
              <>
                <Button
                  onClick={() => setIsTimerRunning(true)}
                  className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                >
                  <Play size={20} />
                  Resume
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTimerSeconds(0);
                    setIsTimerRunning(false);
                  }}
                  className="text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Reset
                </Button>
              </>
            )}
            {timerSeconds === 0 && !isTimerRunning && (
              <Button
                onClick={toggleStepComplete}
                variant={
                  completedSteps.includes(currentStep) ? "default" : "ghost"
                }
                className={`flex items-center gap-2 ${
                  completedSteps.includes(currentStep)
                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {completedSteps.includes(currentStep) ? (
                  <CheckCircle size={20} />
                ) : (
                  <Circle size={20} />
                )}
                {completedSteps.includes(currentStep)
                  ? "Completed"
                  : "Mark Complete"}
              </Button>
            )}
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentStep === 0 ? "opacity-30 cursor-not-allowed" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            <ArrowLeft />
            Previous
          </button>
          {currentStep < recipe.steps.length - 1 ? (
            <Button onClick={nextStep} className="gap-2">
              Next Step
              <ArrowRight />
            </Button>
          ) : (
            <Link
              href={`/recipe/${recipe.id}`}
              className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg shadow-green-500/30"
            >
              <PartyPopper size={20} />
              Finish!
            </Link>
          )}
        </div>

        {/* Steps Overview */}
        <div className="mt-16">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">
            All Steps
          </h3>
          <div className="grid gap-2">
            {recipe.steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  idx === currentStep
                    ? "bg-primary/20 border border-primary/30"
                    : completedSteps.includes(idx)
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-white/5 border border-white/5 hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    completedSteps.includes(idx)
                      ? "bg-green-500 text-white"
                      : idx === currentStep
                        ? "bg-primary text-white"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {completedSteps.includes(idx) ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-bold truncate ${idx === currentStep ? "text-white" : "text-white/60"}`}
                  >
                    {s.title}
                  </p>
                </div>
                <span className="text-xs text-white/30">{s.time} min</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CookingModePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-black flex items-center justify-center">
          <div className="text-white/50 text-center">
            <Utensils className="animate-pulse mb-4 mx-auto" size={48} />
            <p className="font-bold">Loading Cooking Mode...</p>
          </div>
        </div>
      }
    >
      <CookingModeContent />
    </Suspense>
  );
}

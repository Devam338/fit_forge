'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultState, todayString } from '@/lib/defaults';
import { AppState, Meal, Workout } from '@/lib/types';
import { foodPresets } from '@/lib/utils';

interface StoreContextValue {
  state: AppState;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  updateProfile: (updates: Partial<AppState['profile']>) => void;
  setGoal: (goal: AppState['profile']['goal']) => void;
  addWater: (delta: number) => void;
  addWorkout: (workout: Omit<Workout, 'id' | 'date' | 'completed'>) => void;
  addMeal: (meal: Omit<Meal, 'id' | 'date'>) => void;
  removeNotification: (id: string) => void;
  toggleReminder: (key: keyof AppState['reminderSettings']) => void;
  sendAiMessage: (message: string) => void;
  toggleGps: () => void;
  logProgress: (updates: { weightKg?: number; bodyFat?: string; waist?: string; biceps?: string; steps?: string }) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = 'fitforge-clone-state-v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [selectedDate, setSelectedDate] = useState(todayString());

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setState(JSON.parse(raw) as AppState);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.gps.active) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        if (!prev.gps.active) return prev;
        const newDuration = prev.gps.durationSec + 5;
        const newDistance = Number((prev.gps.distanceKm + 0.015).toFixed(2));
        const newCalories = Math.round(prev.gps.calories + 1);
        const paceNum = newDistance > 0 ? (newDuration / 60) / newDistance : 0;
        return {
          ...prev,
          gps: {
            active: true,
            distanceKm: newDistance,
            durationSec: newDuration,
            calories: newCalories,
            pace: `${paceNum.toFixed(1)} min/km`,
          },
        };
      });
    }, 5000);
    return () => clearInterval(id);
  }, [state.gps.active]);

  const value = useMemo<StoreContextValue>(() => ({
    state,
    selectedDate,
    setSelectedDate,
    updateProfile: (updates) => setState((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } })),
    setGoal: (goal) => setState((prev) => ({ ...prev, profile: { ...prev.profile, goal } })),
    addWater: (delta) => setState((prev) => {
      const current = prev.waterIntakeByDate[selectedDate] ?? 0;
      return {
        ...prev,
        waterIntakeByDate: {
          ...prev.waterIntakeByDate,
          [selectedDate]: Math.max(0, current + delta),
        },
      };
    }),
    addWorkout: (workout) => setState((prev) => ({
      ...prev,
      workouts: [
        ...prev.workouts,
        {
          id: crypto.randomUUID(),
          date: selectedDate,
          muscleGroup: workout.muscleGroup,
          duration: workout.duration,
          calories: workout.calories,
          completed: true,
        },
      ],
    })),
    addMeal: (meal) => setState((prev) => {
      const preset = meal.name.trim().toLowerCase();
      const auto = foodPresets[preset];
      return {
        ...prev,
        meals: [
          ...prev.meals,
          {
            id: crypto.randomUUID(),
            date: selectedDate,
            mealType: meal.mealType,
            name: meal.name,
            calories: auto?.calories ?? meal.calories,
            protein: auto?.protein ?? meal.protein,
            carbs: auto?.carbs ?? meal.carbs,
            fats: auto?.fats ?? meal.fats,
          },
        ],
      };
    }),
    removeNotification: (id) => setState((prev) => ({ ...prev, notifications: prev.notifications.filter((n) => n.id !== id) })),
    toggleReminder: (key) => setState((prev) => ({
      ...prev,
      reminderSettings: { ...prev.reminderSettings, [key]: !prev.reminderSettings[key] },
    })),
    sendAiMessage: (message) => setState((prev) => {
      const goal = prev.profile.goal.toLowerCase();
      const content = message.toLowerCase();
      let reply = `For your ${goal} goal, focus on consistency, enough protein, and a realistic plan.`;
      if (content.includes('protein')) reply = 'Aim for protein at each meal. Eggs, paneer, chicken, Greek yogurt, and dal are solid options.';
      if (content.includes('workout')) reply = 'Train 4 to 5 times per week, use progressive overload, and keep compound lifts at the center of your plan.';
      if (content.includes('diet')) reply = 'Stay close to your calorie target, prioritize protein, and use carbs around workouts for energy and recovery.';
      if (content.includes('progress')) reply = 'Track weight, waist, workouts, and calories together. One number alone can be misleading.';
      return {
        ...prev,
        aiMessages: [
          ...prev.aiMessages,
          { role: 'user', content: message },
          { role: 'assistant', content: reply },
        ],
      };
    }),
    toggleGps: () => setState((prev) => ({
      ...prev,
      gps: prev.gps.active ? { ...prev.gps, active: false } : { active: true, distanceKm: 0, durationSec: 0, calories: 0, pace: '0.0 min/km' },
    })),
    logProgress: (updates) => setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...(updates.weightKg !== undefined ? { weightKg: updates.weightKg } : {}),
        ...(updates.bodyFat !== undefined ? { bodyFat: updates.bodyFat } : {}),
        ...(updates.waist !== undefined ? { waist: updates.waist } : {}),
        ...(updates.biceps !== undefined ? { biceps: updates.biceps } : {}),
        ...(updates.steps !== undefined ? { steps: updates.steps } : {}),
      },
      weightLogs: updates.weightKg !== undefined ? [...prev.weightLogs, { date: selectedDate, weightKg: updates.weightKg }] : prev.weightLogs,
    })),
  }), [state, selectedDate]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

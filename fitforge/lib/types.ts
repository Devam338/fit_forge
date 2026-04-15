export type Goal = 'Muscle Gain' | 'Fat Loss' | 'Maintenance';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'cardio' | 'arms' | 'core';

export interface UserProfile {
  displayName: string;
  email: string;
  age: string;
  gender: string;
  heightCm: string;
  weightKg: number;
  activityLevel: string;
  dailyCalorieGoal: number;
  waterGoal: number;
  bodyFat: string;
  waist: string;
  biceps: string;
  steps: string;
  goal: Goal;
}

export interface Workout {
  id: string;
  date: string;
  muscleGroup: MuscleGroup;
  duration: number;
  calories: number;
  completed: boolean;
}

export interface Meal {
  id: string;
  date: string;
  mealType: MealType;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface WeightLog {
  date: string;
  weightKg: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'workout' | 'water' | 'goal';
}

export interface ReminderSettings {
  workoutReminder: boolean;
  hydrationReminder: boolean;
  mealLogging: boolean;
  goalCheckIn: boolean;
}

export interface GpsSession {
  active: boolean;
  distanceKm: number;
  durationSec: number;
  calories: number;
  pace: string;
}

export interface AppState {
  profile: UserProfile;
  workouts: Workout[];
  meals: Meal[];
  waterIntakeByDate: Record<string, number>;
  weightLogs: WeightLog[];
  notifications: NotificationItem[];
  reminderSettings: ReminderSettings;
  gps: GpsSession;
  aiMessages: { role: 'assistant' | 'user'; content: string }[];
}

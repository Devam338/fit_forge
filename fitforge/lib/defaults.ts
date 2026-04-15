import { AppState } from './types';

export const todayString = () => new Date().toISOString().slice(0, 10);

export const defaultState: AppState = {
  profile: {
    displayName: 'Devam',
    email: 'devam.patel@uwaterloo.ca',
    age: '',
    gender: 'Male',
    heightCm: '',
    weightKg: 30,
    activityLevel: 'Moderate',
    dailyCalorieGoal: 2000,
    waterGoal: 8,
    bodyFat: '',
    waist: '',
    biceps: '',
    steps: '',
    goal: 'Muscle Gain',
  },
  workouts: [],
  meals: [],
  waterIntakeByDate: {},
  weightLogs: [],
  notifications: [
    {
      id: '1',
      title: 'Keep it up! 🔥',
      body: "You're on a streak! Don't forget today's workout.",
      time: 'Just now',
      type: 'workout',
    },
    {
      id: '2',
      title: 'Stay hydrated',
      body: "You've had 3 glasses today. Aim for 8!",
      time: '1h ago',
      type: 'water',
    },
    {
      id: '3',
      title: 'Weekly Check-in',
      body: "You're 70% towards your calorie goal this week.",
      time: '3h ago',
      type: 'goal',
    },
  ],
  reminderSettings: {
    workoutReminder: true,
    hydrationReminder: true,
    mealLogging: false,
    goalCheckIn: true,
  },
  gps: {
    active: false,
    distanceKm: 0,
    durationSec: 0,
    calories: 0,
    pace: '—',
  },
  aiMessages: [
    {
      role: 'assistant',
      content:
        'Hey! I\'m your AI fitness coach 💪 Your current goal is muscle gain. Ask me about workout tips, diet suggestions, or progress analysis!',
    },
  ],
};

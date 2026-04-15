import { Meal, Workout } from './types';

export const formatDatePretty = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

export const formatGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning!';
  if (h < 18) return 'Good afternoon!';
  return 'Good evening!';
};

export const calculateBMI = (weightKg: number, heightCm?: number) => {
  if (!heightCm || !weightKg) return 10.4;
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  return Number(bmi.toFixed(1));
};

export const bmiLabel = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const estimateBMR = (weightKg: number, heightCm?: number, age?: number, gender?: string) => {
  if (!heightCm || !age) return 1243;
  return Math.round(
    gender === 'Male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161,
  );
};

export const activityMultiplier = (level: string) => {
  switch (level) {
    case 'Low': return 1.2;
    case 'Moderate': return 1.55;
    case 'High': return 1.725;
    default: return 1.55;
  }
};

export const mealTotals = (meals: Meal[]) => meals.reduce((acc, meal) => ({
  calories: acc.calories + meal.calories,
  protein: acc.protein + meal.protein,
  carbs: acc.carbs + meal.carbs,
  fats: acc.fats + meal.fats,
}), { calories: 0, protein: 0, carbs: 0, fats: 0 });

export const workoutTotals = (workouts: Workout[]) => workouts.reduce((acc, workout) => ({
  calories: acc.calories + workout.calories,
  count: acc.count + 1,
  done: acc.done + (workout.completed ? 1 : 0),
}), { calories: 0, count: 0, done: 0 });

export const getWeekdayLabels = () => {
  const labels: string[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
  }
  return labels;
};

export const foodPresets: Record<string, { calories: number; protein: number; carbs: number; fats: number }> = {
  eggs: { calories: 140, protein: 12, carbs: 1, fats: 10 },
  chicken: { calories: 220, protein: 35, carbs: 0, fats: 8 },
  paneer: { calories: 265, protein: 18, carbs: 6, fats: 20 },
  dal: { calories: 180, protein: 11, carbs: 28, fats: 3 },
  roti: { calories: 120, protein: 3, carbs: 22, fats: 2 },
  rice: { calories: 205, protein: 4, carbs: 45, fats: 0 },
  oats: { calories: 190, protein: 8, carbs: 32, fats: 4 },
  banana: { calories: 105, protein: 1, carbs: 27, fats: 0 },
  yogurt: { calories: 100, protein: 9, carbs: 7, fats: 3 },
};

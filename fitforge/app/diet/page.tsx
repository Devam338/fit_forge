'use client';

import { AlertTriangle, Plus, Search, Sparkles } from 'lucide-react';
import { Card, MetricCard } from '@/components/ui';
import { useStore } from '@/components/store';
import { mealTotals } from '@/lib/utils';
import { useState } from 'react';
import { MealType } from '@/lib/types';

const mealOrder: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
const mealEmoji: Record<MealType, string> = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎' };

export default function DietPage() {
  const { state, selectedDate, setSelectedDate, addMeal } = useStore();
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const todayMeals = state.meals.filter((m) => m.date === selectedDate);
  const totals = mealTotals(todayMeals);
  const remaining = state.profile.dailyCalorieGoal - totals.calories;

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl">Diet Tracker</h1>
        <input className="date-pill" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      <div className="grid-4">
        <MetricCard icon={<div />} value={`${totals.calories} kcal`} label={`/ ${state.profile.dailyCalorieGoal} kcal`} />
        <MetricCard icon={<div />} value={`${totals.protein} g`} label="/ 60g" />
        <MetricCard icon={<div />} value={`${totals.carbs} g`} label="/ 225g" />
        <MetricCard icon={<div />} value={`${totals.fats} g`} label="/ 56g" />
      </div>

      <Card>
        <div className="between">
          <div>
            <div className="muted">Remaining Today</div>
            <div className="title-xl" style={{ color: '#22c55e' }}>{remaining} kcal</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="muted">Goal: {state.profile.dailyCalorieGoal} kcal</div>
            <div className="muted">TDEE: 1927 kcal</div>
          </div>
        </div>
      </Card>

      <Card className="info-banner">
        <AlertTriangle color="#eab308" size={18} />
        <span>⚠️ Protein intake is very low. Add eggs, paneer, chicken, or dal.</span>
      </Card>

      <Card>
        <h2 className="section-title"><Sparkles color="#22c55e" size={18} /> Add Meal (Auto-Nutrition)</h2>
        <div className="input-row" style={{ marginBottom: 12 }}>
          <select value={mealType} onChange={(e) => setMealType(e.target.value as MealType)}>
            {mealOrder.map((m) => <option key={m} value={m}>{mealEmoji[m]} {m}</option>)}
          </select>
          <input value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Type food name (e.g., dal, roti, egg...)" />
          <button className="secondary-btn"><Search size={18} /></button>
        </div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <input style={{ maxWidth: 120 }} type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} placeholder="Calories" />
          <input style={{ maxWidth: 120 }} type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} placeholder="Protein" />
          <input style={{ maxWidth: 120 }} type="number" value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} placeholder="Carbs" />
          <input style={{ maxWidth: 120 }} type="number" value={fats} onChange={(e) => setFats(Number(e.target.value))} placeholder="Fats" />
          <button className="action-btn" onClick={() => {
            if (!foodName.trim()) return;
            addMeal({ mealType, name: foodName, calories, protein, carbs, fats });
            setFoodName(''); setCalories(0); setProtein(0); setCarbs(0); setFats(0);
          }}><Plus size={16} /> Add</button>
        </div>
      </Card>

      <div className="stack">
        {mealOrder.map((meal) => {
          const entries = todayMeals.filter((m) => m.mealType === meal);
          const mealCalories = entries.reduce((sum, item) => sum + item.calories, 0);
          return (
            <div key={meal}>
              <h2 className="section-title">{mealEmoji[meal]} {meal[0].toUpperCase() + meal.slice(1)} <span className="muted">({mealCalories} Kcal)</span></h2>
              {entries.length === 0 ? (
                <div className="muted" style={{ paddingLeft: 30 }}>No {meal} logged</div>
              ) : (
                <div className="list">
                  {entries.map((entry) => (
                    <Card key={entry.id}>
                      <div className="between">
                        <div>
                          <div style={{ fontWeight: 800 }}>{entry.name}</div>
                          <div className="muted small">P {entry.protein}g · C {entry.carbs}g · F {entry.fats}g</div>
                        </div>
                        <div style={{ fontWeight: 800 }}>{entry.calories} kcal</div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

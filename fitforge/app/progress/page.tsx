'use client';

import { useMemo, useState } from 'react';
import { Card, MetricCard } from '@/components/ui';
import { useStore } from '@/components/store';
import { WeeklyCaloriesChart, WeightTrendChart, WorkoutConsistencyChart } from '@/components/charts';
import { getWeekdayLabels } from '@/lib/utils';
import { Activity, Dumbbell, Footprints, Ruler, TrendingUp, Weight } from 'lucide-react';

export default function ProgressPage() {
  const { state, logProgress } = useStore();
  const [form, setForm] = useState({
    weightKg: String(state.profile.weightKg),
    bodyFat: state.profile.bodyFat,
    waist: state.profile.waist,
    biceps: state.profile.biceps,
    steps: state.profile.steps,
  });

  const labels = getWeekdayLabels();

  const weeklyCalories = useMemo(() => labels.map((day, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - idx));
    const dateStr = date.toISOString().slice(0, 10);
    const consumed = state.meals.filter((m) => m.date === dateStr).reduce((sum, m) => sum + m.calories, 0);
    const burned = state.workouts.filter((w) => w.date === dateStr).reduce((sum, w) => sum + w.calories, 0);
    return { day, consumed, burned };
  }), [labels, state.meals, state.workouts]);

  const consistency = useMemo(() => labels.map((day, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - idx));
    const dateStr = date.toISOString().slice(0, 10);
    const completed = state.workouts.filter((w) => w.date === dateStr).length;
    return { day, completed, planned: completed };
  }), [labels, state.workouts]);

  const weightData = state.weightLogs.map((log) => ({ date: log.date.slice(5), weight: log.weightKg }));

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl">Progress Tracking</h1>
      </div>

      <div className="grid-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <MetricCard icon={<Weight color="#22c55e" />} value={`${state.profile.weightKg} kg`} label="Weight" />
        <MetricCard icon={<TrendingUp color="#22c55e" />} value={state.profile.bodyFat || '—'} label="Body Fat" />
        <MetricCard icon={<Ruler color="#22c55e" />} value={state.profile.waist || '—'} label="Waist" />
        <MetricCard icon={<Ruler color="#22c55e" />} value={state.profile.biceps || '—'} label="Biceps" />
        <MetricCard icon={<Footprints color="#22c55e" />} value={state.profile.steps || '—'} label="Steps" />
      </div>

      <Card>
        <h2 className="section-title">💡 Progress Insights</h2>
        <div className="muted">Log your weight and body fat regularly to see trend insights.</div>
      </Card>

      <div className="grid-2">
        <Card>
          <h2 className="section-title">🔥 Weekly Calories</h2>
          <WeeklyCaloriesChart data={weeklyCalories} />
        </Card>
        <Card>
          <h2 className="section-title">⚖️ Weight Trend</h2>
          {weightData.length < 2 ? <div className="empty">Log at least 2 days of weight data</div> : <WeightTrendChart data={weightData} />}
        </Card>
      </div>

      <Card>
        <h2 className="section-title"><Dumbbell color="#22c55e" size={18} /> Workout Consistency</h2>
        <WorkoutConsistencyChart data={consistency} />
      </Card>

      <Card>
        <h2 className="section-title"><Activity color="#22c55e" size={18} /> Log Today&apos;s Progress</h2>
        <div className="form-grid">
          <input value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} placeholder="Weight (kg)" />
          <input value={form.bodyFat} onChange={(e) => setForm({ ...form, bodyFat: e.target.value })} placeholder="Body fat %" />
          <input value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} placeholder="Waist" />
          <input value={form.biceps} onChange={(e) => setForm({ ...form, biceps: e.target.value })} placeholder="Biceps" />
          <input className="full" value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} placeholder="Steps" />
          <button className="action-btn full" onClick={() => logProgress({
            weightKg: Number(form.weightKg || state.profile.weightKg),
            bodyFat: form.bodyFat,
            waist: form.waist,
            biceps: form.biceps,
            steps: form.steps,
          })}>Save Progress</button>
        </div>
      </Card>
    </div>
  );
}

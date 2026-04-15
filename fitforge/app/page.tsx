'use client';

import { Activity, AlertTriangle, Droplets, Flame, Target, TrendingUp, Zap } from 'lucide-react';
import { Card, MetricCard } from '@/components/ui';
import { useStore } from '@/components/store';
import { activityMultiplier, bmiLabel, calculateBMI, estimateBMR, formatDatePretty, formatGreeting, mealTotals, workoutTotals } from '@/lib/utils';

export default function DashboardPage() {
  const { state, setGoal, addWater, selectedDate } = useStore();
  const todayMeals = state.meals.filter((m) => m.date === selectedDate);
  const todayWorkouts = state.workouts.filter((w) => w.date === selectedDate);
  const totals = mealTotals(todayMeals);
  const workoutStats = workoutTotals(todayWorkouts);
  const bmi = calculateBMI(state.profile.weightKg, Number(state.profile.heightCm || 0));
  const bmr = estimateBMR(state.profile.weightKg, Number(state.profile.heightCm || 0), Number(state.profile.age || 0), state.profile.gender);
  const tdee = Math.round(bmr * activityMultiplier(state.profile.activityLevel));
  const water = state.waterIntakeByDate[selectedDate] ?? 0;

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <h1 className="title-xl">{formatGreeting()} 👋</h1>
          <div className="subtitle">{formatDatePretty(new Date(selectedDate))}</div>
        </div>
      </div>

      <div className="grid-4">
        <MetricCard icon={<Flame color="#f97316" />} value={totals.calories} label={`Calories In / ${state.profile.dailyCalorieGoal}`} />
        <MetricCard icon={<Zap color="#f59e0b" />} value={workoutStats.calories} label="Burned kcal" />
        <MetricCard icon={<Activity color="#22c55e" />} value={totals.calories - workoutStats.calories} label="Net Cal kcal" />
        <MetricCard icon={<TrendingUp color="#22c55e" />} value={0} label="Streak days" />
      </div>

      <Card>
        <div className="kpi-band">
          <div>
            <div className="value accent">{bmi}</div>
            <div className="metric-label">BMI · {bmiLabel(bmi)}</div>
          </div>
          <div>
            <div className="value">{bmr}</div>
            <div className="metric-label">BMR kcal</div>
          </div>
          <div>
            <div className="value">{tdee}</div>
            <div className="metric-label">TDEE kcal</div>
          </div>
        </div>
      </Card>

      <Card className="info-banner">
        <AlertTriangle color="#eab308" size={18} />
        <span>⚠️ Protein intake is very low. Add eggs, paneer, chicken, or dal.</span>
      </Card>

      <div className="grid-2">
        <Card>
          <h2 className="section-title"><Target color="#22c55e" size={18} /> Your Fitness Goal</h2>
          <div className="goal-options">
            {(['Muscle Gain', 'Fat Loss', 'Maintenance'] as const).map((goal) => (
              <button key={goal} className={`goal-card ${state.profile.goal === goal ? 'active' : ''}`} onClick={() => setGoal(goal)}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{goal}</div>
                <div className="small muted">
                  {goal === 'Muscle Gain' ? 'Build strength & size' : goal === 'Fat Loss' ? 'Lean down & cut' : 'Stay consistent'}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="section-title"><Droplets color="#3b82f6" size={18} /> Water Intake</h2>
          <div className="between" style={{ marginBottom: 12 }}>
            <div className="metric-value">{water}</div>
            <div className="muted">/ {state.profile.waterGoal} glasses</div>
          </div>
          <div className="progress-bar" style={{ marginBottom: 16 }}>
            <div className="progress-fill" style={{ width: `${Math.min((water / state.profile.waterGoal) * 100, 100)}%` }} />
          </div>
          <div className="row">
            <button className="secondary-btn" onClick={() => addWater(-1)}>-</button>
            <button className="action-btn" style={{ flex: 1 }} onClick={() => addWater(1)}>+ Add Glass</button>
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <h2 className="section-title"><Flame color="#f97316" size={18} /> Today&apos;s Macros</h2>
          {[
            ['Calories', totals.calories, state.profile.dailyCalorieGoal],
            ['Protein', totals.protein, 60],
            ['Carbs', totals.carbs, 225],
            ['Fats', totals.fats, 56],
          ].map(([label, value, goal]) => (
            <div key={String(label)} style={{ marginBottom: 16 }}>
              <div className="between small" style={{ marginBottom: 8 }}><span>{label}</span><span>{value} / {goal}{label === 'Calories' ? 'kcal' : 'g'}</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min((Number(value) / Number(goal)) * 100, 100)}%` }} /></div>
            </div>
          ))}
        </Card>

        <Card>
          <div className="between">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Today&apos;s Workouts</h2>
            <a href="/workouts" className="action-btn">+ Add</a>
          </div>
          {todayWorkouts.length === 0 ? (
            <div className="empty">No workouts planned for today. Add one!</div>
          ) : (
            <div className="list">
              {todayWorkouts.map((workout) => (
                <div key={workout.id} className="list-item between">
                  <div>
                    <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{workout.muscleGroup}</div>
                    <div className="muted small">{workout.duration} min</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>~{workout.calories} kcal</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

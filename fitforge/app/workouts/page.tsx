'use client';

import { Flame } from 'lucide-react';
import { Card } from '@/components/ui';
import { useStore } from '@/components/store';
import { workoutTotals } from '@/lib/utils';
import { useState } from 'react';

const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'cardio', 'arms', 'core'] as const;

export default function WorkoutsPage() {
  const { state, selectedDate, setSelectedDate, addWorkout } = useStore();
  const [muscleGroup, setMuscleGroup] = useState<typeof muscleGroups[number]>('chest');
  const [duration, setDuration] = useState(30);
  const todayWorkouts = state.workouts.filter((w) => w.date === selectedDate);
  const stats = workoutTotals(todayWorkouts);
  const estKcal = Math.round(duration * 2.57);

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl">Workouts</h1>
        <input className="date-pill" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      <Card>
        <div className="between">
          <div className="row">
            <div className="brand-icon"><Flame size={18} /></div>
            <div>
              <div className="title-xl" style={{ fontSize: 28 }}>{stats.calories} kcal</div>
              <div className="muted">Total calories burned</div>
            </div>
          </div>
          <div className="muted">{stats.count} workouts · {stats.done} done</div>
        </div>
      </Card>

      <Card>
        <div className="select-row">
          <div>
            <div className="muted small" style={{ marginBottom: 8 }}>Muscle Group</div>
            <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value as typeof muscleGroup)}>
              {muscleGroups.map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
          </div>
          <div>
            <div className="muted small" style={{ marginBottom: 8 }}>Duration</div>
            <div className="row">
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
              <span className="muted">min</span>
            </div>
          </div>
          <div className="muted">~{estKcal} kcal</div>
          <button className="action-btn" onClick={() => addWorkout({ muscleGroup, duration, calories: estKcal })}>+ Add</button>
        </div>
      </Card>

      {todayWorkouts.length === 0 ? (
        <div className="empty">No workouts yet. Add your first one above!</div>
      ) : (
        <div className="list">
          {todayWorkouts.map((workout) => (
            <Card key={workout.id}>
              <div className="between">
                <div>
                  <div style={{ textTransform: 'capitalize', fontWeight: 800 }}>{workout.muscleGroup}</div>
                  <div className="muted">{workout.duration} min</div>
                </div>
                <div style={{ fontWeight: 800 }}>~{workout.calories} kcal</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

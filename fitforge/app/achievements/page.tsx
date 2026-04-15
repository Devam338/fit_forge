'use client';

import { Card } from '@/components/ui';
import { useStore } from '@/components/store';
import { Lock, Trophy } from 'lucide-react';

export default function AchievementsPage() {
  const { state } = useStore();
  const badges = [
    ['First Workout', 'Completed your first workout', state.workouts.length >= 1],
    ['7-Day Streak', '7 consecutive days of activity', false],
    ['30-Day Streak', '30 consecutive days of activity', false],
    ['Meal Tracker', 'Logged 50 meals', state.meals.length >= 50],
    ['Weight Watcher', 'Logged weight for 7 days', state.weightLogs.length >= 7],
    ['Hydrated', 'Hit water goal 5 times', Object.values(state.waterIntakeByDate).filter((v) => v >= state.profile.waterGoal).length >= 5],
    ['Century Club', 'Completed 100 workouts', state.workouts.length >= 100],
  ] as const;
  const unlocked = badges.filter(([, , done]) => done).length;

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl">Achievements</h1>
      </div>
      <Card>
        <div className="row">
          <div style={{ width: 60, height: 60, borderRadius: 18, background: '#fde7da', display: 'grid', placeItems: 'center' }}><Trophy color="#f97316" /></div>
          <div>
            <div className="title-xl" style={{ fontSize: 28 }}>0 days</div>
            <div className="muted">Current Streak · Best: 0 days</div>
          </div>
        </div>
      </Card>
      <h2 className="section-title"><Trophy color="#22c55e" size={18} /> Badges ({unlocked}/7)</h2>
      <div className="badge-grid">
        {badges.map(([title, desc, done]) => (
          <Card key={title}>
            <div className="row">
              <Lock color={done ? '#22c55e' : '#a3a3a3'} />
              <div>
                <div style={{ fontWeight: 800, color: done ? '#111827' : '#737373' }}>{title}</div>
                <div className="muted">{desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

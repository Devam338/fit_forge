'use client';

import { Activity, User } from 'lucide-react';
import { Card } from '@/components/ui';
import { useStore } from '@/components/store';
import { activityMultiplier, bmiLabel, calculateBMI, estimateBMR } from '@/lib/utils';
import { useState } from 'react';

export default function SettingsPage() {
  const { state, updateProfile } = useStore();
  const [form, setForm] = useState({
    displayName: state.profile.displayName,
    age: state.profile.age,
    heightCm: state.profile.heightCm,
    gender: state.profile.gender,
    activityLevel: state.profile.activityLevel,
    dailyCalorieGoal: String(state.profile.dailyCalorieGoal),
    waterGoal: String(state.profile.waterGoal),
  });

  const bmi = calculateBMI(state.profile.weightKg, Number(state.profile.heightCm || 0));
  const bmr = estimateBMR(state.profile.weightKg, Number(state.profile.heightCm || 0), Number(state.profile.age || 0), state.profile.gender);
  const tdee = Math.round(bmr * activityMultiplier(state.profile.activityLevel));
  const recommended = Math.round(tdee * 1.18);

  return (
    <div className="stack">
      <div className="page-header"><h1 className="title-xl">Profile & Settings</h1></div>

      <Card>
        <h2 className="section-title"><Activity color="#22c55e" size={18} /> Your Body Metrics</h2>
        <div className="kpi-band">
          <div>
            <div className="value accent">{bmi}</div>
            <div className="metric-label">BMI · {bmiLabel(bmi)}</div>
          </div>
          <div>
            <div className="value">{bmr}</div>
            <div className="metric-label">BMR kcal/day</div>
          </div>
          <div>
            <div className="value">{tdee}</div>
            <div className="metric-label">TDEE kcal/day</div>
          </div>
        </div>
        <div className="center" style={{ marginTop: 22 }}>
          <div className="muted">Recommended calorie goal: <strong style={{ color: '#111827' }}>{recommended} kcal/day</strong></div>
        </div>
      </Card>

      <Card>
        <h2 className="section-title"><User size={18} /> Personal Details</h2>
        <div className="form-grid">
          <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="Display Name" />
          <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" />
          <input value={form.heightCm} onChange={(e) => setForm({ ...form, heightCm: e.target.value })} placeholder="Height (cm)" />
          <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select value={form.activityLevel} onChange={(e) => setForm({ ...form, activityLevel: e.target.value })}>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
          <input value={form.dailyCalorieGoal} onChange={(e) => setForm({ ...form, dailyCalorieGoal: e.target.value })} placeholder="Daily Calorie Goal" />
          <input className="full" value={form.waterGoal} onChange={(e) => setForm({ ...form, waterGoal: e.target.value })} placeholder="Daily Water Goal (glasses)" />
          <button className="action-btn full" onClick={() => updateProfile({
            displayName: form.displayName,
            age: form.age,
            heightCm: form.heightCm,
            gender: form.gender,
            activityLevel: form.activityLevel,
            dailyCalorieGoal: Number(form.dailyCalorieGoal),
            waterGoal: Number(form.waterGoal),
          })}>Save Profile</button>
        </div>
      </Card>
    </div>
  );
}

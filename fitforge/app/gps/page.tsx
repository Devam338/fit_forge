'use client';

import { Flame, MapPin, Navigation, Play, Timer } from 'lucide-react';
import { MetricCard } from '@/components/ui';
import { useStore } from '@/components/store';

export default function GpsPage() {
  const { state, toggleGps } = useStore();
  const mins = Math.floor(state.gps.durationSec / 60);
  const secs = state.gps.durationSec % 60;

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl"><MapPin color="#22c55e" size={28} style={{ verticalAlign: 'middle' }} /> GPS Activity</h1>
      </div>
      <div className="grid-4">
        <MetricCard icon={<Navigation color="#22c55e" />} value={`${state.gps.distanceKm.toFixed(2)} km`} label="Distance" />
        <MetricCard icon={<Timer color="#3b82f6" />} value={`${mins}:${String(secs).padStart(2, '0')}`} label="Duration" />
        <MetricCard icon={<Flame color="#f97316" />} value={`${state.gps.calories} kcal`} label="Calories" />
        <MetricCard icon={<MapPin color="#a855f7" />} value={state.gps.pace} label="Pace" />
      </div>
      <div className="center">
        <button className="action-btn" style={{ fontSize: 18, padding: '14px 42px' }} onClick={toggleGps}><Play size={18} style={{ marginRight: 8 }} /> {state.gps.active ? 'Stop Activity' : 'Start Activity'}</button>
      </div>
    </div>
  );
}

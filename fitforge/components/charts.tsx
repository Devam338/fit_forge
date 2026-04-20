'use client';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function WeeklyCaloriesChart({ data }: { data: { day: string; consumed: number; burned: number }[] }) {
  return (
    <div className="chart-placeholder">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumed" fill="#34c97b" radius={[4,4,0,0]} />
          <Bar dataKey="burned" fill="#f97316" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 

export function WeightTrendChart({ data }: { data: { date: string; weight: number }[] }) {
  return (
    <div className="chart-placeholder">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#4f88ff" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WorkoutConsistencyChart({ data }: { data: { day: string; completed: number; planned: number }[] }) {
  return (
    <div className="chart-tall">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#34c97b" radius={[4,4,0,0]} />
          <Bar dataKey="planned" fill="#94a3b8" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

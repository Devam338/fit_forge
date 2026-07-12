'use client';

import { Bell, Flame, Target, Droplets, X } from 'lucide-react';
import { Card } from '@/components/ui';
import { useStore } from '@/components/store';

const iconFor = {
  workout: <Flame color="#f97316" size={19} />,
  water: <Droplets color="#3b82f6" size={18} />,
  goal: <Target color="#22c55e" size={18} />,
};

export default function NotificationsPage() {
  const { state, removeNotification, toggleReminder } = useStore();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="title-xl">
          <Bell
            color="#22c55e"
            size={28}
            style={{ verticalAlign: 'middle' }}
          />{' '}
          Notifications
        </h1>

        <p className="muted">
          Stay updated on your workouts, hydration, meals, and weekly goals.
        </p>
      </div>

      <div>
        <h2 className="section-title">Recent</h2>

        <div className="list">
          {state.notifications.length === 0 ? (
            <Card>
              <p className="muted">
                You’re all caught up! New reminders will appear here.
              </p>
            </Card>
          ) : (
            state.notifications.map((n) => (
              <Card key={n.id}>
                <div className="between">
                  <div
                    className="row"
                    style={{ alignItems: 'flex-start' }}
                  >
                    {iconFor[n.type]}

                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {n.title} <span className="notice-dot" />
                      </div>

                      <div className="muted">{n.body}</div>

                      <div
                        className="tiny muted"
                        style={{ marginTop: 8 }}
                      >
                        {n.time}
                      </div>
                    </div>
                  </div>

                  <button
                    className="secondary-btn"
                    onClick={() => removeNotification(n.id)}
                    aria-label={`Remove ${n.title} notification`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <Card>
        <h2 className="section-title">Reminder Settings</h2>

        {[
          [
            'workoutReminder',
            'Workout Reminder',
            'Daily reminder to complete your workout',
          ],
          [
            'hydrationReminder',
            'Hydration Reminder',
            'Reminder to drink water every 2 hours',
          ],
          [
            'mealLogging',
            'Meal Logging',
            'Reminder to log your meals',
          ],
          [
            'goalCheckIn',
            'Goal Check-in',
            'Weekly goal progress reminder',
          ],
        ].map(([key, title, desc]) => {
          const reminderKey =
            key as keyof typeof state.reminderSettings;

          return (
            <div
              key={key}
              className="between"
              style={{ padding: '10px 0' }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{title}</div>
                <div className="muted small">{desc}</div>
              </div>

              <button
                className={`toggle ${
                  state.reminderSettings[reminderKey] ? 'on' : ''
                }`}
                onClick={() => toggleReminder(reminderKey)}
                aria-label={`Toggle ${title}`}
                aria-pressed={state.reminderSettings[reminderKey]}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
}

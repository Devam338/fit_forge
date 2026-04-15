'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Bot, Dumbbell, Flame, LayoutDashboard, LogOut, MapPin, Moon, Salad, Settings, Trophy, TrendingUp } from 'lucide-react';

const items = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/workouts', label: 'Workouts', icon: Dumbbell },
  { href: '/diet', label: 'Diet', icon: Salad },
  { href: '/gps', label: 'GPS Activity', icon: MapPin },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/coach', label: 'AI Coach', icon: Bot },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-icon"><Dumbbell size={18} /></div>
          <div>
            <div className="brand-name">FitForge</div>
            <div className="brand-email">devam.patel@uwaterloo.ca</div>
          </div>
        </div>
        <nav className="nav">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-row"><span>Theme</span><Moon size={18} /></div>
        <div className="sidebar-row"><span className="row"><LogOut size={18} /> Sign out</span></div>
      </div>
    </aside>
  );
}

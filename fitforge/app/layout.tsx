import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { StoreProvider } from '@/components/store';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FitForge Clone',
  description: 'A FitForge-inspired fitness dashboard clone built with Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="layout">
            <Sidebar />
            <main className="main">
              <div className="page-wrap">{children}</div>
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}

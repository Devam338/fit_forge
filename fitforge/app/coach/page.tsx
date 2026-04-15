'use client';

import { Bot, Send } from 'lucide-react';
import { Card } from '@/components/ui';
import { useStore } from '@/components/store';
import { useState } from 'react';

export default function CoachPage() {
  const { state, sendAiMessage } = useStore();
  const [input, setInput] = useState('');

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <h1 className="title-xl" style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span className="brand-icon"><Bot size={18} /></span> AI Coach</h1>
          <div className="subtitle">Personalized for your {state.profile.goal.toLowerCase()} goal</div>
        </div>
      </div>

      <Card className="chat-box">
        <div className="chat-messages">
          {state.aiMessages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role === 'user' ? 'user' : ''}`}>{msg.content}</div>
          ))}
        </div>
        <div className="chat-input row">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask your coach anything..." />
          <button className="action-btn" onClick={() => { if (input.trim()) { sendAiMessage(input); setInput(''); } }}><Send size={16} /></button>
        </div>
      </Card>
    </div>
  );
}

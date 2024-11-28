import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const { currentTheme } = useTheme();

  return (
    <div 
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
      className="rounded-xl shadow-lg transition-all duration-200 h-full flex flex-col overflow-hidden backdrop-blur-sm"
    >
      <div className="px-6 py-4 border-b" style={{ borderColor: currentTheme.border }}>
        <h2 className="text-lg font-semibold">Markdown Editor</h2>
      </div>
      <div className="flex-1 p-6">
        <textarea
          style={{
            backgroundColor: currentTheme.secondaryBackground,
            color: currentTheme.text,
            '--scrollbar-track': currentTheme.scrollbarTrack,
            '--scrollbar-thumb': currentTheme.scrollbarThumb,
            '--scrollbar-thumb-hover': currentTheme.scrollbarThumbHover,
          } as React.CSSProperties}
          className="w-full h-full p-4 rounded-lg font-mono text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none bg-opacity-50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your markdown here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
}
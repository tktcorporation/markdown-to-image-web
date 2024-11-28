import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
      className="min-h-screen transition-colors duration-200"
    >
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}
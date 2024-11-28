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
        background: currentTheme.background,
        color: currentTheme.text,
      }}
      className="min-h-screen relative isolate"
    >
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative">
        <Header />
        <main className="relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
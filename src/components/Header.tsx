import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  const { currentTheme } = useTheme();

  return (
    <header
      style={{
        background: currentTheme.secondaryBackground,
        borderColor: currentTheme.border,
      }}
      className="sticky top-0 z-50 h-16 backdrop-blur-sm border-b transition-all duration-200"
    >
      <div className="container mx-auto px-2 h-full flex justify-between items-center">
        <h1 className="text-xl font-bold">Markdown to Image</h1>
        <ThemeSelector />
      </div>
    </header>
  );
}
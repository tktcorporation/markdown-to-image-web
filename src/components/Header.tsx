import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  const { currentTheme } = useTheme();

  return (
    <header
      style={{
        backgroundColor: currentTheme.secondaryBackground,
        borderColor: currentTheme.border,
      }}
      className="py-4 border-b shadow-sm transition-colors duration-200"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Markdown to Image</h1>
        <ThemeSelector />
      </div>
    </header>
  );
}
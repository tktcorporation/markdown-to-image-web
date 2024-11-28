import { useTheme } from '../../context/ThemeContext';

interface EditorToolbarProps {
  onClear: () => void;
}

export function EditorToolbar({ onClear }: EditorToolbarProps) {
  const { currentTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Markdown Editor</h2>
      <button
        onClick={onClear}
        className="px-3 py-1 rounded-md text-sm transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.secondaryBackground,
          color: currentTheme.text,
          borderColor: currentTheme.border,
        }}
      >
        Clear
      </button>
    </div>
  );
}
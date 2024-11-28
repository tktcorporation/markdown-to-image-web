import { memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme, themes } from '../types/theme';
import { Listbox } from '@headlessui/react';
import { FiSun, FiMoon, FiBook, FiCheck } from 'react-icons/fi';

const themeIcons = {
  light: FiSun,
  dark: FiMoon,
  sepia: FiBook,
} as const;

const ThemeOption = memo(({ theme, selected }: { theme: Theme; selected: boolean }) => {
  const Icon = themeIcons[theme.id as keyof typeof themeIcons];
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
          {theme.name}
        </span>
      </div>
      {selected && <FiCheck className="w-4 h-4" />}
    </div>
  );
});

ThemeOption.displayName = 'ThemeOption';

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme();

  const handleChange = (newTheme: Theme) => {
    try {
      setTheme(newTheme);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  return (
    <div className="relative w-48">
      <Listbox value={currentTheme} onChange={handleChange}>
        <div>
          <Listbox.Button
            className="relative w-full py-2 px-4 text-left rounded-lg shadow-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: currentTheme.secondaryBackground,
              color: currentTheme.text,
              borderColor: currentTheme.border,
              boxShadow: `0 1px 3px ${currentTheme.border}`,
            }}
          >
            <ThemeOption theme={currentTheme} selected={false} />
          </Listbox.Button>

          <Listbox.Options
            className="absolute w-full mt-1 rounded-lg shadow-lg overflow-hidden z-10 focus:outline-none"
            style={{
              backgroundColor: currentTheme.background,
              borderColor: currentTheme.border,
              border: '1px solid'
            }}
          >
            {themes.map((theme) => (
              <Listbox.Option
                key={theme.id}
                value={theme}
                className="ui-active:bg-opacity-75 ui-active:cursor-pointer"
              >
                {({ active, selected }) => (
                  <div
                    className="relative cursor-pointer select-none py-2 px-4 transition-colors duration-150"
                    style={{
                      backgroundColor: active ? theme.secondaryBackground : theme.background,
                      color: theme.text,
                    }}
                  >
                    <ThemeOption theme={theme} selected={selected} />
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
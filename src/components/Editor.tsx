import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState, forwardRef } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export const Editor = forwardRef<HTMLDivElement, EditorProps>(({ 
  value, 
  onChange,
  height
}, ref) => {
  const { currentTheme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setLineCount(value.split('\n').length);
  }, [value]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const lineNumbers = document.getElementById('line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const commonStyles = {
    lineHeight: '1.6',
    fontSize: '14px',
    padding: '16px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  };

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div 
        className="h-[60px] flex items-center px-4 border-b"
        style={{ 
          borderColor: currentTheme.border,
          background: currentTheme.secondaryBackground,
        }}
      >
        <h2 className="text-lg font-medium">Editor</h2>
      </div>
      <div 
        className="flex-1 relative"
        style={{ 
          height: height ? `${height}px` : 'auto',
          minHeight: '400px'
        }}
      >
        <div className="absolute inset-0 flex">
          {/* Line Numbers */}
          <div
            id="line-numbers"
            className="select-none text-right"
            style={{
              ...commonStyles,
              background: currentTheme.codeBackground,
              color: `${currentTheme.text}80`,
              borderRight: `1px solid ${currentTheme.border}`,
              width: '2.5rem',
              paddingRight: '0.5rem',
              paddingLeft: '0.25rem',
              height: '100%'
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} style={{ height: '1.6em' }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 h-full">
            <textarea
              ref={textareaRef}
              style={{
                ...commonStyles,
                background: currentTheme.secondaryBackground,
                color: currentTheme.text,
                '--scrollbar-track': currentTheme.scrollbarTrack,
                '--scrollbar-thumb': currentTheme.scrollbarThumb,
                '--scrollbar-thumb-hover': currentTheme.scrollbarThumbHover,
                height: '100%'
              } as React.CSSProperties}
              className="w-full focus:outline-none focus:ring-1 ring-inset transition-all duration-200 resize-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onScroll={handleScroll}
              placeholder="Enter your markdown here..."
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Editor.displayName = 'Editor';
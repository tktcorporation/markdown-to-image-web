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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLineCount(value.split('\n').length);
  }, [value]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (!isMobile) {
      const lineNumbers = document.getElementById('line-numbers');
      if (lineNumbers) {
        lineNumbers.scrollTop = e.currentTarget.scrollTop;
      }
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea && isMobile) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value, isMobile]);

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
          height: !isMobile && height ? `${height}px` : 'auto',
          minHeight: !isMobile ? '400px' : 'auto'
        }}
      >
        <div className={isMobile ? "flex" : "absolute inset-0 flex"}>
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
              height: !isMobile ? '100%' : 'auto',
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} style={{ height: '1.6em' }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* Editor */}
          <textarea
            ref={textareaRef}
            style={{
              ...commonStyles,
              background: currentTheme.secondaryBackground,
              color: currentTheme.text,
              width: 'calc(100% - 2.5rem)',
              overflow: isMobile ? 'hidden' : 'auto',
              height: !isMobile ? '100%' : 'auto',
              '--scrollbar-track': currentTheme.scrollbarTrack,
              '--scrollbar-thumb': currentTheme.scrollbarThumb,
              '--scrollbar-thumb-hover': currentTheme.scrollbarThumbHover,
            } as React.CSSProperties}
            className="focus:outline-none focus:ring-1 ring-inset transition-all duration-200 resize-none"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onScroll={handleScroll}
            placeholder="Enter your markdown here..."
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
});

Editor.displayName = 'Editor';
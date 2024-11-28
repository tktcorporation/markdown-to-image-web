import { forwardRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PreviewActions } from './PreviewActions';

interface PreviewProps {
  html: string;
  onExport: () => void;
  onCopyImage: () => void;
  isExporting: boolean;
  isCopying: boolean;
  contentRef?: React.RefObject<HTMLDivElement>;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({
  html,
  onExport,
  onCopyImage,
  isExporting,
  isCopying,
  contentRef
}, ref) => {
  const { currentTheme } = useTheme();

  const getTransparentBackground = (background: string, opacity: number) => {
    if (background.includes('linear-gradient')) {
      return background.replace(
        /#([0-9A-F]{6})/gi,
        (match, hex) => {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
      );
    }
    
    const hexColor = background.startsWith('#') ? background : `#${background}`;
    if (!/^#[0-9A-F]{6}$/i.test(hexColor)) {
      return background;
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const contentStyles = {
    '--tw-prose-body': currentTheme.text,
    '--tw-prose-headings': currentTheme.text,
    '--tw-prose-links': currentTheme.accent,
    '--tw-prose-bold': currentTheme.text,
    '--tw-prose-counters': currentTheme.text,
    '--tw-prose-bullets': currentTheme.text,
    '--tw-prose-hr': currentTheme.border,
    '--tw-prose-quotes': currentTheme.text,
    '--tw-prose-code': currentTheme.text,
    '--tw-prose-pre-code': currentTheme.text,
    '--tw-prose-pre-bg': currentTheme.codeBackground,
    '--scrollbar-track': currentTheme.scrollbarTrack,
    '--scrollbar-thumb': currentTheme.scrollbarThumb,
    '--scrollbar-thumb-hover': currentTheme.scrollbarThumbHover,
    background: currentTheme.secondaryBackground,
    color: currentTheme.text,
    minHeight: '400px',
    borderRadius: '16px',
    // boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  } as React.CSSProperties;

  return (
    <div>
      <div 
        className="h-[60px] flex justify-between items-center px-4 border-b"
        style={{ 
          borderColor: currentTheme.border,
          background: currentTheme.secondaryBackground,
        }}
      >
        <h2 className="text-lg font-medium">Preview</h2>
        <PreviewActions
          onExport={onExport}
          onCopyImage={onCopyImage}
          isExporting={isExporting}
          isCopying={isCopying}
        />
      </div>
      <div 
        className="p-3" 
        ref={ref} 
        style={{ 
          background: getTransparentBackground(currentTheme.accent, 0.6),
          padding: '1.5rem',
        }}
      >
        <div
          ref={contentRef}
          style={contentStyles}
          className="prose prose-sm md:prose-base lg:prose-lg p-8 prose-img:mx-auto prose-headings:mb-4 transition-all duration-200 prose-pre:bg-opacity-50"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
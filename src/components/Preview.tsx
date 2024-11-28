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
    minHeight: '400px'
  } as React.CSSProperties;

  return (
    <div ref={ref}>
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
        ref={contentRef}
        style={contentStyles}
        className="prose prose-sm md:prose-base lg:prose-lg p-4 prose-img:mx-auto prose-headings:mb-4 transition-all duration-200 prose-pre:bg-opacity-50"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
});

Preview.displayName = 'Preview';
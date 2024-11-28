import React, { forwardRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PreviewProps {
  html: string;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ html }, ref) => {
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
    backgroundColor: currentTheme.secondaryBackground,
    color: currentTheme.text,
  } as React.CSSProperties;

  return (
    <div 
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
      className="rounded-xl shadow-lg transition-all duration-200 h-full flex flex-col overflow-hidden backdrop-blur-sm"
    >
      <div className="px-6 py-4 border-b" style={{ borderColor: currentTheme.border }}>
        <h2 className="text-lg font-semibold">Preview</h2>
      </div>
      <div className="flex-1 p-6">
        <div
          ref={ref}
          style={contentStyles}
          className="prose prose-sm md:prose-base lg:prose-lg h-full p-4 rounded-lg overflow-y-auto prose-img:mx-auto prose-headings:mb-4 transition-all duration-200 prose-pre:bg-opacity-50 bg-opacity-50"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
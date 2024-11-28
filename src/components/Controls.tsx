import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiDownload, FiClipboard } from 'react-icons/fi';

interface ControlsProps {
  onExport: () => void;
  onCopyImage: () => void;
  isExporting?: boolean;
  isCopying?: boolean;
  error?: string | null;
}

export function Controls({ 
  onExport, 
  onCopyImage, 
  isExporting = false, 
  isCopying = false,
  error
}: ControlsProps) {
  const { currentTheme } = useTheme();

  const buttonBaseStyle = "flex items-center gap-2 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50";

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex justify-center gap-4">
        <button
          onClick={onExport}
          disabled={isExporting}
          className={buttonBaseStyle}
          style={{ 
            backgroundColor: currentTheme.accent,
            color: currentTheme.buttonText,
            opacity: isExporting ? 0.7 : 1,
            '--tw-ring-color': currentTheme.accent,
          } as React.CSSProperties}
        >
          <FiDownload className="w-5 h-5" />
          <span className="relative">
            {isExporting ? 'Exporting...' : 'Export as Image'}
          </span>
        </button>
        
        <button
          onClick={onCopyImage}
          disabled={isCopying}
          className={buttonBaseStyle}
          style={{ 
            backgroundColor: currentTheme.secondaryBackground,
            color: currentTheme.text,
            borderColor: currentTheme.border,
            border: '1px solid',
            opacity: isCopying ? 0.7 : 1,
            '--tw-ring-color': currentTheme.border,
          } as React.CSSProperties}
        >
          <FiClipboard className="w-5 h-5" />
          <span className="relative">
            {isCopying ? 'Copying...' : 'Copy Image'}
          </span>
        </button>
      </div>

      {error && (
        <div 
          className="mt-4 p-4 rounded-lg text-sm"
          style={{
            backgroundColor: currentTheme.secondaryBackground,
            color: currentTheme.text,
            borderColor: currentTheme.border,
            border: '1px solid',
          }}
        >
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  );
}
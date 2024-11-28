import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

interface ExportButtonProps {
  onClick: () => void;
  isExporting: boolean;
}

export function ExportButton({ onClick, isExporting }: ExportButtonProps) {
  const { currentTheme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      disabled={isExporting}
      className="flex items-center gap-2 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
      style={{ 
        backgroundColor: currentTheme.accent,
        color: currentTheme.buttonText,
        opacity: isExporting ? 0.7 : 1,
        '--tw-ring-color': currentTheme.accent,
      } as React.CSSProperties}
    >
      <FiDownload className="w-5 h-5" />
      <span>{isExporting ? 'Exporting...' : 'Export as Image'}</span>
    </button>
  );
}
import React from 'react';
import { FiClipboard } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

interface CopyButtonProps {
  onClick: () => void;
  isCopying: boolean;
}

export function CopyButton({ onClick, isCopying }: CopyButtonProps) {
  const { currentTheme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      disabled={isCopying}
      className="flex items-center gap-2 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
      <span>{isCopying ? 'Copying...' : 'Copy Image'}</span>
    </button>
  );
}
import { FiDownload, FiClipboard } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

interface PreviewActionsProps {
  onExport: () => void;
  onCopyImage: () => void;
  isExporting: boolean;
  isCopying: boolean;
}

export function PreviewActions({
  onExport,
  onCopyImage,
  isExporting,
  isCopying
}: PreviewActionsProps) {
  const { currentTheme } = useTheme();

  const buttonBaseStyle = `
    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
    transition-all duration-200 backdrop-blur-sm
    focus:outline-none focus:ring-1 ring-inset
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onCopyImage}
        disabled={isCopying}
        className={buttonBaseStyle}
        style={{
          background: currentTheme.secondaryBackground,
          color: currentTheme.text,
          borderColor: currentTheme.border,
        }}
        title="Copy to clipboard"
      >
        <FiClipboard className="w-4 h-4" />
        <span>{isCopying ? 'Copying...' : 'Copy'}</span>
      </button>
      
      <button
        onClick={onExport}
        disabled={isExporting}
        className={buttonBaseStyle}
        style={{
          background: currentTheme.accent,
          color: currentTheme.buttonText,
        }}
        title="Export as PNG"
      >
        <FiDownload className="w-4 h-4" />
        <span>{isExporting ? 'Exporting...' : 'Export'}</span>
      </button>
    </div>
  );
}
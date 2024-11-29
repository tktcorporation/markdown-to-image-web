import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TabViewProps {
  editorContent: React.ReactNode;
  previewContent: React.ReactNode;
}

export function TabView({ editorContent, previewContent }: TabViewProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const { currentTheme } = useTheme();

  const tabStyle = (isActive: boolean) => `
    flex-1 py-2 px-4 text-center font-medium transition-all duration-200
    ${isActive ? 'border-b-2' : 'opacity-70 hover:opacity-100'}
  `;

  return (
    <div className="md:hidden">
      <div 
        className="sticky top-0 z-20 flex border-b bg-opacity-50 backdrop-blur-sm"
        style={{ 
          borderColor: currentTheme.border,
          background: currentTheme.secondaryBackground,
        }}
      >
        <button
          className={tabStyle(activeTab === 'editor')}
          onClick={() => setActiveTab('editor')}
          style={{
            borderColor: activeTab === 'editor' ? currentTheme.accent : 'transparent',
            color: currentTheme.text
          }}
        >
          Editor
        </button>
        <button
          className={tabStyle(activeTab === 'preview')}
          onClick={() => setActiveTab('preview')}
          style={{
            borderColor: activeTab === 'preview' ? currentTheme.accent : 'transparent',
            color: currentTheme.text
          }}
        >
          Preview
        </button>
      </div>
      <div>
        <div style={{ 
          position: 'relative',
          display: activeTab === 'editor' ? 'block' : 'none',
        }}>
          {editorContent}
        </div>
        <div style={{ 
          position: 'relative',
          display: activeTab === 'preview' ? 'block' : 'none',
        }}>
          {previewContent}
        </div>
      </div>
    </div>
  );
}
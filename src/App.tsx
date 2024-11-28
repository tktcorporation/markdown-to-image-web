import { useRef } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import { Layout } from './components/Layout';
import { useMarkdown } from './hooks/useMarkdown';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { INITIAL_MARKDOWN } from './constants/initialMarkdown';
import { Toaster } from './components/ui/toaster';
import { useImageExport } from './hooks/useImageExport';

function AppContent() {
  const { markdown, previewHtml, updateMarkdown } = useMarkdown(INITIAL_MARKDOWN);
  const previewRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();
  const { isExporting, isCopying, handleExport, handleCopy } = useImageExport();

  const onExport = async () => {
    if (!previewRef.current) return;
    await handleExport(previewRef.current, currentTheme, markdown);
  };

  const onCopyImage = async () => {
    if (!previewRef.current) return;
    await handleCopy(previewRef.current, currentTheme, markdown);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
          <Editor value={markdown} onChange={updateMarkdown} />
          <Preview html={previewHtml} ref={previewRef} />
        </div>

        <Controls 
          onExport={onExport} 
          onCopyImage={onCopyImage}
          isExporting={isExporting}
          isCopying={isCopying}
        />
      </div>
      <Toaster />
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
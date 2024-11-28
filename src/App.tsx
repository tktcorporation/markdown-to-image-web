import { useRef, useEffect, useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Layout } from './components/Layout';
import { TabView } from './components/TabView';
import { useMarkdown } from './hooks/useMarkdown';
import { ThemeProvider } from './context/ThemeContext';
import { INITIAL_MARKDOWN } from './constants/initialMarkdown';
import { Toaster } from './components/ui/toaster';
import { useImageExport } from './hooks/useImageExport';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { markdown, previewHtml, updateMarkdown } = useMarkdown(INITIAL_MARKDOWN);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const { isExporting, isCopying, handleExport, handleCopy } = useImageExport();
  const [contentHeight, setContentHeight] = useState<number>(0);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const updateHeight = () => {
      if (!previewContentRef.current) return;
      
      const previewHeight = previewContentRef.current.scrollHeight;
      const minHeight = 400;
      setContentHeight(Math.max(previewHeight, minHeight));
    };

    updateHeight();
    
    const observer = new ResizeObserver(updateHeight);
    if (previewContentRef.current) {
      observer.observe(previewContentRef.current);
    }

    return () => observer.disconnect();
  }, [markdown, previewHtml]);

  const onExport = async () => {
    if (!previewRef.current) return;
    await handleExport(previewRef.current);
  };

  const onCopyImage = async () => {
    if (!previewRef.current) return;
    await handleCopy(previewRef.current);
  };

  const editorContent = (
    <Editor 
      value={markdown} 
      onChange={updateMarkdown}
      ref={editorRef}
      height={contentHeight}
    />
  );

  const previewContent = (
    <Preview
      html={previewHtml}
      ref={previewRef}
      contentRef={previewContentRef}
      onExport={onExport}
      onCopyImage={onCopyImage}
      isExporting={isExporting}
      isCopying={isCopying}
    />
  );

  return (
    <Layout>
      <div className="container mx-auto px-2 py-6">
        {/* Mobile Tab View */}
        <div className="md:hidden">
          <TabView 
            editorContent={editorContent}
            previewContent={previewContent}
          />
        </div>

        {/* Desktop Split View */}
        <div className="hidden md:grid md:grid-cols-2 relative">
          <div className="rounded-l-lg overflow-hidden">
            {editorContent}
          </div>
          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 left-1/2 w-px"
            style={{ background: currentTheme.border }}
          />
          <div className="rounded-r-lg overflow-hidden">
            {previewContent}
          </div>
        </div>
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
import { useTheme } from '../context/ThemeContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface TabViewProps {
  editorContent: React.ReactNode;
  previewContent: React.ReactNode;
}

export function TabView({ editorContent, previewContent }: TabViewProps) {
  const { currentTheme } = useTheme();

  return (
    <div className="md:hidden">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList 
          className="sticky top-0 z-20 w-full flex border-b bg-opacity-50 backdrop-blur-sm p-0 h-auto bg-transparent"
          style={{ 
            borderColor: currentTheme.border,
            background: currentTheme.secondaryBackground,
          }}
        >
          <TabsTrigger 
            value="editor"
            className="flex-1 py-3 rounded-none border-b-2 transition-all duration-200 
              data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:font-semibold
              data-[state=inactive]:text-muted data-[state=inactive]:border-transparent data-[state=inactive]:opacity-70
              hover:text-accent/80"
            style={{
              color: currentTheme.text,
              '--accent-color': currentTheme.accent,
            } as React.CSSProperties}
          >
            Editor
          </TabsTrigger>
          <TabsTrigger 
            value="preview"
            className="flex-1 py-3 rounded-none border-b-2 transition-all duration-200 
              data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:font-semibold
              data-[state=inactive]:text-muted data-[state=inactive]:border-transparent data-[state=inactive]:opacity-70
              hover:text-accent/80"
            style={{
              color: currentTheme.text,
              '--accent-color': currentTheme.accent,
            } as React.CSSProperties}
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="outline-none">
          {editorContent}
        </TabsContent>
        <TabsContent value="preview" className="outline-none">
          {previewContent}
        </TabsContent>
      </Tabs>
    </div>
  );
}
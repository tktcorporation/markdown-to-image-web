import { useState, useCallback, useRef, useEffect } from 'react';

export function useEditor(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [editorWidth, setEditorWidth] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`;
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => window.removeEventListener('resize', adjustHeight);
  }, [value]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return {
    value,
    editorRef,
    editorWidth,
    setEditorWidth,
    handleChange,
    handleClear
  };
}
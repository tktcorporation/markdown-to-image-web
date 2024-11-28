import { PreviewToolbarProps } from '../../types/preview';

export function PreviewToolbar({ isExport = false }: PreviewToolbarProps) {
  if (isExport) return null;

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Preview</h2>
    </div>
  );
}
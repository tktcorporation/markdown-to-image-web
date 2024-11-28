export interface ImageWidth {
  value: number | 'auto';
  label: string;
}

export const imageWidths: ImageWidth[] = [
  { value: 'auto', label: 'Auto' },
  { value: 640, label: '640px' },
  { value: 800, label: '800px' },
  { value: 1024, label: '1024px' },
  { value: 1280, label: '1280px' }
];
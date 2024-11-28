export interface Theme {
  id: string;
  name: string;
  background: string;
  text: string;
  accent: string;
  border: string;
  codeBackground: string;
  buttonText: string;
  secondaryBackground: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    background: '#ffffff',
    text: '#1a1a1a',
    accent: '#3b82f6',
    border: '#e5e7eb',
    codeBackground: '#f3f4f6',
    buttonText: '#ffffff',
    secondaryBackground: '#f9fafb',
    scrollbarTrack: '#f1f1f1',
    scrollbarThumb: '#c1c1c1',
    scrollbarThumbHover: '#a1a1a1'
  },
  {
    id: 'dark',
    name: 'Dark',
    background: '#1a1a1a',
    text: '#ffffff',
    accent: '#60a5fa',
    border: '#374151',
    codeBackground: '#2d2d2d',
    buttonText: '#ffffff',
    secondaryBackground: '#262626',
    scrollbarTrack: '#2d2d2d',
    scrollbarThumb: '#404040',
    scrollbarThumbHover: '#4a4a4a'
  },
  {
    id: 'sepia',
    name: 'Sepia',
    background: '#f8f4e9',
    text: '#433422',
    accent: '#8b4513',
    border: '#d3cbb7',
    codeBackground: '#f0ece1',
    buttonText: '#ffffff',
    secondaryBackground: '#f5f1e6',
    scrollbarTrack: '#f0ece1',
    scrollbarThumb: '#d3cbb7',
    scrollbarThumbHover: '#c4b89f'
  }
];
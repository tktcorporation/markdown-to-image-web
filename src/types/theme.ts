interface Theme {
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
    background: 'linear-gradient(135deg, #f6f8fd 0%, #f1f5ff 100%)',
    text: '#1a1a1a',
    accent: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
    border: 'rgba(226, 232, 240, 0.8)',
    codeBackground: 'rgba(243, 244, 246, 0.8)',
    buttonText: '#ffffff',
    secondaryBackground: 'rgba(255, 255, 255, 0.7)',
    scrollbarTrack: 'rgba(241, 241, 241, 0.6)',
    scrollbarThumb: 'rgba(193, 193, 193, 0.8)',
    scrollbarThumbHover: 'rgba(161, 161, 161, 0.9)'
  },
  {
    id: 'dark',
    name: 'Dark',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    text: '#ffffff',
    accent: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'rgba(55, 65, 81, 0.8)',
    codeBackground: 'rgba(45, 45, 45, 0.8)',
    buttonText: '#ffffff',
    secondaryBackground: 'rgba(38, 38, 38, 0.7)',
    scrollbarTrack: 'rgba(45, 45, 45, 0.6)',
    scrollbarThumb: 'rgba(64, 64, 64, 0.8)',
    scrollbarThumbHover: 'rgba(74, 74, 74, 0.9)'
  },
  {
    id: 'sepia',
    name: 'Sepia',
    background: 'linear-gradient(135deg, #fbf8f2 0%, #f8f4e9 100%)',
    text: '#433422',
    accent: 'linear-gradient(135deg, #9c4221 0%, #c05621 100%)',
    border: 'rgba(211, 203, 183, 0.8)',
    codeBackground: 'rgba(240, 236, 225, 0.8)',
    buttonText: '#ffffff',
    secondaryBackground: 'rgba(245, 241, 230, 0.7)',
    scrollbarTrack: 'rgba(240, 236, 225, 0.6)',
    scrollbarThumb: 'rgba(211, 203, 183, 0.8)',
    scrollbarThumbHover: 'rgba(196, 184, 159, 0.9)'
  }
];

export type { Theme };
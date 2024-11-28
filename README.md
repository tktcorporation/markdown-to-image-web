# Markdown to Image Converter

A modern web application that converts Markdown content to high-quality PNG images with real-time preview. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Real-time Preview**: See your markdown rendered instantly as you type
- 🎨 **Multiple Themes**: Choose between Light, Dark, and Sepia themes
- 📷 **Export Options**: 
  - Export as PNG image
  - Copy directly to clipboard
- ✨ **Smart File Naming**: Automatically uses the first heading as the filename
- 🎯 **High-Quality Output**: Generates crisp, high-resolution images
- 💅 **Modern UI**: Clean, responsive design with smooth transitions
- ⌨️ **Markdown Support**: 
  - Headers
  - Lists (ordered and unordered)
  - Code blocks with syntax highlighting
  - Tables
  - Links
  - Images
  - Blockquotes
  - And more!

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/markdown-to-image.git
cd markdown-to-image
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Enter Markdown**: Type or paste your markdown content in the editor on the left
2. **Preview**: See the rendered output in real-time on the right
3. **Choose Theme**: Select your preferred theme from the dropdown in the header
4. **Export**:
   - Click "Export as Image" to save as PNG
   - Click "Copy Image" to copy to clipboard

### File Naming

The exported image filename is automatically generated from:
- The first H1 or H2 heading in your markdown
- Current timestamp
- Example: `my-document-title-1234567890.png`

If no heading is found, it defaults to `markdown-export-[timestamp].png`

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Marked (Markdown parsing)
- html2canvas (Image generation)
- Headless UI (Accessible components)
- Radix UI (Toast notifications)

## Project Structure

```
src/
├── components/     # React components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── services/      # Business logic services
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Marked](https://marked.js.org/) for Markdown parsing
- [html2canvas](https://html2canvas.hertzen.com/) for image generation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Headless UI](https://headlessui.dev/) for accessible components
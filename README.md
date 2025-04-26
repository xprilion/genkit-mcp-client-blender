# Blender MCP Client via Firebase Genkit Gemini

A client application for interacting with Blender through the Model Context Protocol (MCP). This application allows users to create and manipulate 3D scenes by selecting shapes, colors, textures, and patterns, and providing scene descriptions. The project uses Firebase Genkit for accessing Gemini and as a the underlying MCP Client.

## Features

- Shape selection from a grid of basic 3D shapes
- Color, texture, and pattern selection
- Scene description input
- Scene version history
- Real-time updates to Blender through MCP

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Blender with MCP server running
- Firebase Genkit MCP

### Installation

1. Clone the repository:

```bash
git clone https://github.com/xprilion/genkit-mcp-client-blender.git
cd genkit-mcp-client-blender
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Select a shape from the grid
2. Choose colors, textures, and patterns from the properties panel
3. Add a description of your scene
4. Click "Submit Scene" to send the scene data to Blender
5. View and restore previous scene versions from the history panel

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added to:

- `app/globals.css` for global styles
- Component-specific styles using Tailwind classes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

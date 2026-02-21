# 🖥️ Amrish OS

A portfolio website designed as a **desktop operating system experience** — built with React, TypeScript, and Vite.

![Amrish OS](public/vite.svg)

## 🚀 Live Demo

> Coming soon / Deploy to GitHub Pages or Vercel

## ✨ Features

- 🖥️ **Desktop Environment** — Draggable, resizable windows with a taskbar
- 🔐 **BIOS Boot Screen** — Simulated boot sequence on first load
- 📁 **File Explorer** — Browse portfolio sections like a file system
- 💻 **Code Editor** — VS Code-style syntax-highlighted code viewer
- 🐍 **Snake Game** — Playable Snake game built into the OS
- 🧱 **Tetris Game** — Playable Tetris game built into the OS
- 📅 **Calendar App** — Interactive calendar
- 🖥️ **Terminal** — Functional terminal window with custom commands
- 📊 **Skills Radar Chart** — Visual skills overview using a radar chart
- 📄 **Resume Viewer** — View and download resume
- 🏆 **Awards** — Highlights of achievements
- 📬 **Contact** — Contact form / links
- 🎨 **Display Settings** — Customize the desktop appearance

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Framer Motion | Animations |
| CSS | Styling |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/amrishnitjsr/Amrish-os.git

# Navigate to the project directory
cd Amrish-os

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📁 Project Structure

```
src/
├── App.tsx               # Root component
├── main.tsx              # Entry point
├── components/
│   ├── Desktop.tsx       # Main desktop environment
│   ├── Taskbar.tsx       # Bottom taskbar
│   ├── Window.tsx        # Reusable window component
│   ├── BiosScreen.tsx    # Boot sequence screen
│   ├── FileExplorer.tsx  # File explorer app
│   ├── CodeEditorApp.tsx # Code editor app
│   ├── TerminalWindow.tsx# Terminal emulator
│   ├── SnakeGame.tsx     # Snake game
│   ├── TetrisGame.tsx    # Tetris game
│   ├── CalendarApp.tsx   # Calendar app
│   ├── Skills.tsx        # Skills section
│   ├── RadarChart.tsx    # Radar chart for skills
│   ├── About.tsx         # About section
│   ├── Projects.tsx      # Projects section
│   ├── Awards.tsx        # Awards section
│   ├── Resume.tsx        # Resume viewer
│   ├── Contact.tsx       # Contact section
│   ├── Logs.tsx          # System logs
│   └── DisplaySettings.tsx # Display customization
└── styles/
    └── index.css         # Global styles
```

## 👤 Author

**Amrish**  
GitHub: [@amrishnitjsr](https://github.com/amrishnitjsr)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

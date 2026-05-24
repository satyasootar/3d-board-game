# Arena Override: 3D Tic-Tac-Toe

A next-generation, fully interactive 3D Tic-Tac-Toe experience built with React Three Fiber. **Arena Override** transforms the classic game into a highly customizable holographic battle arena.



## 🌟 Features

- **Next-Gen 3D Rendering**: Fully 3D environment powered by WebGL, featuring dynamic lighting, post-processing bloom, and advanced glass/crystal materials.
- **Dynamic AI Personas**: Play against 4 unique AI opponents that physically react to the game:
  - 🧠 **ZEN**: Calm and defensive.
  - 🔥 **RAGE**: Aggressive moves that trigger massive red bloom spikes.
  - ⚡ **GLITCH**: Unpredictable logic that causes digital screen distortions.
  - 🛡️ **GODMODE**: Mathematically perfect Minimax algorithm.
- **Deep Customization System**:
  - Unlocked themes include *Cyberpunk Grid, Space Arena, Dark Matrix, Lava Core, Ice Realm, and Minimal Glass*.
  - Customize the board's shape, material (glass, neon, holographic, lava, metallic), glow intensity, and opacity.
  - Real-time environment and post-processing tweaking via a sleek, sci-fi configuration terminal.
- **Preview Sandbox**: Freely test X and O pieces on the board while customizing without triggering game-over states.
- **Premium UX/UI**: A hyper-polished, minimal, typography-driven overlay menu that gets out of the way to let the 3D graphics shine.

## 🚀 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **3D Engine**: `@react-three/fiber` & `three.js`
- **Post-Processing**: `@react-three/postprocessing`
- **Animations**: `framer-motion` & `framer-motion-3d`
- **State Management**: `zustand` (with persist middleware)
- **Styling**: Tailwind CSS


## 🎮 How to Play

1. **Customize**: When you first load the game, you're placed in the Arena Config. Use the right-side terminal to tweak the board's appearance and environment.
2. **Sandbox**: Click anywhere on the board to drop test pieces and see how they look in your current theme.
3. **Engage**: Select a Game Mode from the left menu (Local PVP or AI) to officially start a match. The HUD will appear, and the Sandbox mode will end.
4. **Win**: Connect three pieces in a row to win!

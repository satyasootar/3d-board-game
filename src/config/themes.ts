export type MaterialType = 'glass' | 'metallic' | 'holographic' | 'neon' | 'matte' | 'crystal' | 'lava';
export type BoardShape = 'square' | 'hexagonal' | 'circular';
export type SymbolStyle = 'neon' | 'crystal' | 'minimal' | 'fire';
export type EnvType = 'cybercity' | 'space' | 'matrix' | 'void' | 'lava' | 'ice';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  board: {
    shape: BoardShape;
    material: MaterialType;
    color: string;
    glowIntensity: number;
    opacity: number;
    gridColor: string;
  };
  symbols: {
    style: SymbolStyle;
    xColor: string;
    oColor: string;
    glow: number;
  };
  environment: {
    type: EnvType;
    backgroundColor: string;
    particleColor: string;
    particleDensity: number;
    ambientSound?: string; // TBD if audio added
  };
  lighting: {
    ambientColor: string;
    ambientIntensity: number;
    spotColor: string;
    spotIntensity: number;
  };
  effects: {
    bloom: boolean;
    bloomIntensity: number;
    glitch: boolean;
    glitchIntensity: number;
    noise: boolean;
  };
}

export const themes: Record<string, ThemeConfig> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Grid',
    description: 'Neon pink and cyan glow, futuristic city ambiance',
    board: {
      shape: 'square',
      material: 'holographic',
      color: '#1a1a2e',
      glowIntensity: 2.5,
      opacity: 0.8,
      gridColor: '#00f3ff',
    },
    symbols: {
      style: 'neon',
      xColor: '#ff003c',
      oColor: '#00f3ff',
      glow: 3.0,
    },
    environment: {
      type: 'cybercity',
      backgroundColor: '#0a0a14',
      particleColor: '#ff003c',
      particleDensity: 150,
    },
    lighting: {
      ambientColor: '#2b00ff',
      ambientIntensity: 0.5,
      spotColor: '#ff003c',
      spotIntensity: 2.0,
    },
    effects: {
      bloom: true,
      bloomIntensity: 1.5,
      glitch: true,
      glitchIntensity: 0.3,
      noise: true,
    }
  },
  space: {
    id: 'space',
    name: 'Space Arena',
    description: 'Floating cosmic board, stars and nebula background',
    board: {
      shape: 'circular',
      material: 'glass',
      color: '#ffffff',
      glowIntensity: 0.5,
      opacity: 0.3,
      gridColor: '#4d4dff',
    },
    symbols: {
      style: 'crystal',
      xColor: '#ffbb00',
      oColor: '#00ccff',
      glow: 1.5,
    },
    environment: {
      type: 'space',
      backgroundColor: '#000000',
      particleColor: '#ffffff',
      particleDensity: 500,
    },
    lighting: {
      ambientColor: '#111122',
      ambientIntensity: 0.3,
      spotColor: '#ffffff',
      spotIntensity: 1.5,
    },
    effects: {
      bloom: true,
      bloomIntensity: 1.0,
      glitch: false,
      glitchIntensity: 0,
      noise: false,
    }
  },
  matrix: {
    id: 'matrix',
    name: 'Dark Matrix',
    description: 'Black and green hacker aesthetic, digital rain',
    board: {
      shape: 'square',
      material: 'neon',
      color: '#000000',
      glowIntensity: 1.0,
      opacity: 0.9,
      gridColor: '#00ff00',
    },
    symbols: {
      style: 'minimal',
      xColor: '#00ff00',
      oColor: '#00ff00',
      glow: 2.0,
    },
    environment: {
      type: 'matrix',
      backgroundColor: '#000500',
      particleColor: '#00ff00',
      particleDensity: 300,
    },
    lighting: {
      ambientColor: '#002200',
      ambientIntensity: 0.8,
      spotColor: '#00ff00',
      spotIntensity: 1.0,
    },
    effects: {
      bloom: true,
      bloomIntensity: 1.2,
      glitch: true,
      glitchIntensity: 0.8,
      noise: true,
    }
  },
  lava: {
    id: 'lava',
    name: 'Lava Core',
    description: 'Molten glowing cracks, heat distortion',
    board: {
      shape: 'hexagonal',
      material: 'lava',
      color: '#2a0800',
      glowIntensity: 3.0,
      opacity: 1.0,
      gridColor: '#ff3300',
    },
    symbols: {
      style: 'fire',
      xColor: '#ffaa00',
      oColor: '#ff0000',
      glow: 2.5,
    },
    environment: {
      type: 'lava',
      backgroundColor: '#1a0500',
      particleColor: '#ff5500',
      particleDensity: 200,
    },
    lighting: {
      ambientColor: '#ff3300',
      ambientIntensity: 0.6,
      spotColor: '#ffaa00',
      spotIntensity: 2.5,
    },
    effects: {
      bloom: true,
      bloomIntensity: 2.0,
      glitch: false,
      glitchIntensity: 0,
      noise: true,
    }
  },
  ice: {
    id: 'ice',
    name: 'Ice Realm',
    description: 'Frozen transparent board, snow particles',
    board: {
      shape: 'square',
      material: 'crystal',
      color: '#e0f7fa',
      glowIntensity: 0.8,
      opacity: 0.4,
      gridColor: '#80deea',
    },
    symbols: {
      style: 'crystal',
      xColor: '#ffffff',
      oColor: '#b2ebf2',
      glow: 1.0,
    },
    environment: {
      type: 'ice',
      backgroundColor: '#001a33',
      particleColor: '#ffffff',
      particleDensity: 400,
    },
    lighting: {
      ambientColor: '#4dd2ff',
      ambientIntensity: 0.7,
      spotColor: '#ffffff',
      spotIntensity: 1.5,
    },
    effects: {
      bloom: true,
      bloomIntensity: 0.8,
      glitch: false,
      glitchIntensity: 0,
      noise: false,
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Glass',
    description: 'Clean translucent design, smooth reflections',
    board: {
      shape: 'square',
      material: 'glass',
      color: '#ffffff',
      glowIntensity: 0.1,
      opacity: 0.2,
      gridColor: '#cccccc',
    },
    symbols: {
      style: 'minimal',
      xColor: '#333333',
      oColor: '#888888',
      glow: 0.1,
    },
    environment: {
      type: 'void',
      backgroundColor: '#f5f5f7',
      particleColor: '#cccccc',
      particleDensity: 0,
    },
    lighting: {
      ambientColor: '#ffffff',
      ambientIntensity: 1.0,
      spotColor: '#ffffff',
      spotIntensity: 0.5,
    },
    effects: {
      bloom: false,
      bloomIntensity: 0,
      glitch: false,
      glitchIntensity: 0,
      noise: false,
    }
  }
};

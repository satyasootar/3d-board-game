import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch, Noise } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import { useThemeStore } from '../../store/useThemeStore';
import { useGameStore } from '../../store/useGameStore';
import { useGameAI } from '../../game/ai';
import { Board } from './Board';
import { EnvironmentManager } from './EnvironmentManager';
import { Symbol } from './Symbol';

export function ArenaCanvas() {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { effects } = activeTheme;
  const board = useGameStore((state) => state.board);
  
  useGameAI(); // Initialize AI reactions

  // Calculate coordinates for symbols based on grid
  const getSymbolPosition = (index: number): [number, number, number] => {
    const gridSize = 3;
    const cellSize = 2.2;
    const gap = 0.2;
    const offset = (gridSize * cellSize + (gridSize - 1) * gap) / 2 - cellSize / 2;
    
    const x = Math.floor(index / 3);
    const z = index % 3;
    
    return [
      x * (cellSize + gap) - offset,
      0.5,
      z * (cellSize + gap) - offset
    ];
  };

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 8, 10], fov: 45 }} performance={{ min: 0.5 }}>
        <color attach="background" args={['#000000']} />
        
        <EnvironmentManager />
        
        <group position={[0, -1, 0]}>
          <Board />
          {board.map((cell, i) => (
            cell && <Symbol key={i} type={cell} position={getSymbolPosition(i)} />
          ))}
        </group>

        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2.5} 
          minDistance={5}
          maxDistance={20}
        />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          {(effects.bloom && (
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={effects.bloomIntensity} 
              mipmapBlur // uses a faster blurring method
            />
          )) as any}
          {(effects.glitch && (
            <Glitch
              delay={[1.5, 3.5] as any}
              duration={[0.1, 0.3] as any}
              strength={[0.01 * effects.glitchIntensity, 0.05 * effects.glitchIntensity] as any}
              mode={GlitchMode.SPORADIC}
            />
          )) as any}
          {(effects.noise && (
            <Noise opacity={0.05} />
          )) as any}
        </EffectComposer>
      </Canvas>
    </div>
  );
}

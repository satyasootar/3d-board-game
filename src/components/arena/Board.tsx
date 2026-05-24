import { useThemeStore } from '../../store/useThemeStore';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion-3d';

interface BoardProps {
  // Game state could be passed here later
}

export function Board({}: BoardProps) {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { shape, material, color, opacity, glowIntensity, gridColor } = activeTheme.board;

  const gridSize = 3;
  const cellSize = 2.2;
  const gap = 0.2;
  const offset = (gridSize * cellSize + (gridSize - 1) * gap) / 2 - cellSize / 2;

  const cells = [];
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const px = x * (cellSize + gap) - offset;
      const pz = z * (cellSize + gap) - offset;
      cells.push({ x, z, px, pz });
    }
  }

  const getGeometry = () => {
    switch (shape) {
      case 'circular':
        return <cylinderGeometry args={[1.2, 1.2, 0.4, 32]} />;
      case 'hexagonal':
        return <cylinderGeometry args={[1.3, 1.3, 0.4, 6]} />;
      case 'square':
      default:
        return <boxGeometry args={[cellSize, 0.4, cellSize]} />;
    }
  };

  const renderMaterial = () => {
    switch (material) {
      case 'glass':
      case 'crystal':
        return (
          <meshPhysicalMaterial
            color={color}
            transmission={0.9}
            opacity={opacity}
            transparent
            roughness={0.1}
            ior={1.5}
            thickness={2}
          />
        );
      case 'neon':
      case 'holographic':
        return (
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={glowIntensity * 0.5}
            transparent
            opacity={opacity}
            wireframe={material === 'holographic'}
          />
        );
      case 'lava':
        // Lava rock with a glowing hue
        return (
          <meshStandardMaterial 
            color={color} 
            emissive="#ff3300"
            emissiveIntensity={glowIntensity * 0.5}
            roughness={0.9}
            metalness={0.1}
            transparent
            opacity={opacity}
          />
        );
      case 'metallic':
      case 'matte':
      default:
        return (
          <meshStandardMaterial 
            color={color} 
            roughness={material === 'metallic' ? 0.2 : 0.8}
            metalness={material === 'metallic' ? 0.8 : 0.1}
            transparent
            opacity={opacity}
          />
        );
    }
  };

  const { makeMove } = useGameStore();

  return (
    <group position={[0, 0, 0]}>
      {/* The Arena Base */}
      <mesh position={[0, -0.5, 0]}>
        {shape === 'circular' ? (
          <cylinderGeometry args={[4.5, 5, 0.5, 64]} />
        ) : shape === 'hexagonal' ? (
          <cylinderGeometry args={[5, 5.5, 0.5, 6]} />
        ) : (
          <boxGeometry args={[8, 0.5, 8]} />
        )}
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Cells */}
      {cells.map((c, i) => (
        <motion.mesh 
          key={i} 
          position={[c.px, 0, c.pz]}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: 0.1, scale: 1.05 }}
          whileTap={{ y: -0.1, scale: 0.95 }}
          transition={{ duration: 0.5, delay: i * 0.05, type: 'spring' }}
          onClick={(e) => { e.stopPropagation(); makeMove(i); }}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          {getGeometry()}
          {renderMaterial()}
        </motion.mesh>
      ))}
    </group>
  );
}

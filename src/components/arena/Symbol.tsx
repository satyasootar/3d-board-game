import { useThemeStore } from '../../store/useThemeStore';
import { motion } from 'framer-motion-3d';

interface SymbolProps {
  type: 'X' | 'O';
  position: [number, number, number];
}

export function Symbol({ type, position }: SymbolProps) {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { style, xColor, oColor, glow } = activeTheme.symbols;

  const color = type === 'X' ? xColor : oColor;

  const renderMaterial = () => {
    switch (style) {
      case 'neon':
      case 'fire':
        return (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={glow}
            toneMapped={false}
          />
        );
      case 'crystal':
        return (
          <meshPhysicalMaterial
            color={color}
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={2}
            emissive={color}
            emissiveIntensity={glow * 0.2}
          />
        );
      case 'minimal':
      default:
        return (
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.2}
          />
        );
    }
  };

  if (type === 'X') {
    return (
      <group position={position}>
        <motion.mesh
          initial={{ scale: 0, rotateY: Math.PI }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          {/* X requires two crossed boxes */}
          <group rotation={[0, Math.PI / 4, 0]}>
            <mesh>
              <boxGeometry args={[1.5, 0.2, 0.2]} />
              {renderMaterial()}
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[1.5, 0.2, 0.2]} />
              {renderMaterial()}
            </mesh>
          </group>
        </motion.mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <motion.mesh
        initial={{ scale: 0, rotateX: Math.PI }}
        animate={{ scale: 1, rotateX: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.6, 0.15, 16, 32]} />
        {renderMaterial()}
      </motion.mesh>
    </group>
  );
}

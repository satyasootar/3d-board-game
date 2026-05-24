import { useThemeStore } from '../../store/useThemeStore';
import { Environment, Sparkles, Stars, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function EnvironmentManager() {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { environment, lighting } = activeTheme;

  const bgRef = useRef<THREE.Color>(new THREE.Color(environment.backgroundColor));

  // Smoothly interpolate background color
  useFrame((_state, delta) => {
    bgRef.current.lerp(new THREE.Color(environment.backgroundColor), delta * 2);
    _state.scene.background = bgRef.current;
  });

  return (
    <>
      <ambientLight 
        intensity={lighting.ambientIntensity} 
        color={lighting.ambientColor} 
      />
      <directionalLight
        position={[5, 10, 5]}
        intensity={lighting.spotIntensity}
        color={lighting.spotColor}
      />
      <directionalLight
        position={[-5, 10, -5]}
        intensity={lighting.spotIntensity * 0.5}
        color={lighting.ambientColor}
      />

      {environment.type === 'space' && (
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      )}

      {environment.type === 'cybercity' && (
        <Environment preset="city" background={false} blur={0.8} />
      )}

      {environment.type === 'lava' && (
        <Environment preset="sunset" background={false} />
      )}
      
      {environment.type === 'ice' && (
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      )}

      {environment.particleDensity > 0 && (
        <Sparkles
          count={Math.min(environment.particleDensity, 150)} // Cap max sparkles
          scale={15}
          size={4}
          speed={0.4}
          opacity={0.5}
          color={environment.particleColor}
        />
      )}
    </>
  );
}

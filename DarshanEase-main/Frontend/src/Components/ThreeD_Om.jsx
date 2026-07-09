import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows } from '@react-three/drei';

const OmModel = () => {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      // Gentle floating and looking at mouse
      const t = state.clock.getElapsedTime();
      textRef.current.rotation.y = Math.sin(t / 2) * 0.2 + (state.mouse.x * 0.3);
      textRef.current.rotation.x = Math.cos(t / 2) * 0.1 - (state.mouse.y * 0.3);
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      floatingRange={[-0.1, 0.1]}
    >
      <Text
        ref={textRef}
        fontSize={2.5}
        color="#ff7e40" // Primary Color
        font="https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff"
        anchorX="center"
        anchorY="middle"
        castShadow
      >
        ॐ
        <meshPhysicalMaterial
          color="#ff7e40"
          emissive="#ff4500"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Text>
    </Float>
  );
};

// Fallback component if 3D context fails
const OmFallback = () => (
  <div style={{ fontSize: '100px', color: '#ff7e40', textShadow: '0 0 20px rgba(255,126,64,0.5)', animation: 'pulseOpacity 2s infinite' }}>
    ॐ
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const ThreeD_Om = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <OmFallback />;

  return (
    <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ErrorBoundary fallback={<OmFallback />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffa500" />
          <OmModel />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#ff7e40" />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ThreeD_Om;

import React from 'react';
import { ContactShadows } from '@react-three/drei';

/**
 * Backdrop & Ground Contact Shadow Environment Architecture
 */
export const WatchEnvironment = () => {
  return (
    <>
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.7}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
};

export default WatchEnvironment;

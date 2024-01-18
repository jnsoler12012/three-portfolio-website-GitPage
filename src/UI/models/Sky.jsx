import React from 'react'
import skyScene from 'Models3D/sky.glb';
import { useGLTF } from '@react-three/drei';

function Sky() {
    const sky = useGLTF(skyScene);

    return (
        <mesh>
            <primitive object={sky.scene} />
        </mesh>
    )
}

export default Sky
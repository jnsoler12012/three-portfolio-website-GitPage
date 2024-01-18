import React from 'react'
import planeScene from 'Models3D/plane.glb';
import { useGLTF } from '@react-three/drei';

export default function () {
    const { scene, animations } = useGLTF(planeScene);

    return (
        <mesh>
            <primitive object={scene} />
        </mesh>
    )
}
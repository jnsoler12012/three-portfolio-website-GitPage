import React, { useEffect, useRef } from 'react'
import planeScene from 'Models3D/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

export default function ({ isRotating, ...props }) {
    const ref = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
        actions['Take 001'].play()
    }, [actions, isRotating])


    return (
        <mesh {...props} ref={ref}>
            <primitive object={scene} />
        </mesh>
    )
}
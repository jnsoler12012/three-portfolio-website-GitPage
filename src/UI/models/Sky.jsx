import React, { useRef } from 'react'
import skyScene from 'Models3D/sky.glb';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Sky({ isRotating }) {
    const skyRef = useRef()
    const sky = useGLTF(skyScene);

    useFrame((_, delta) => {

        skyRef.current.rotation.y += 0.08 * delta
        if (isRotating) {
            skyRef.current.rotation.y += 0.19 * delta
        }
        // if (isRotating) {
        //     skyRef.current.rotation.y += 0.25 * delta
        // }

    })

    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    )
}

export default Sky
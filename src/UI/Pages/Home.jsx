import React, { Suspense } from 'react'
import Image1 from 'Images/Image1.png';
import { Canvas } from '@react-three/fiber';
import { Loader } from '../Components';
import { Island, Plane, Sky } from '../models';

export default function () {
    const adjustIslandForScreenSize = () => {
        let screenScale
        let screenPosition = [0, -6.5, -43.4];
        let rotation = [0.1, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition, rotation];
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()

    return (
        <section className='w-full h-screen relative'>
            <Canvas
                className='w-full h-screen bg-transparent'
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight />
                    <Sky />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                    />
                    <Plane />
                </Suspense>
            </Canvas>
        </section>
    )
}
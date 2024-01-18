import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { HomeInfo, Loader } from '../Components';
import { Island, Plane, Sky } from '../models';

export default function () {

    const [isRotating, setIsRotating] = useState(false)
    const [currentStage, setCurrentStage] = useState(1)

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition

        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0]
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -4]
        }

        return [screenScale, screenPosition];
    }


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

    const [planeScale, planePosition] = adjustPlaneForScreenSize()
    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()

    return (
        <section className='w-full h-screen relative'>
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight />
                    <Sky
                        isRotating={isRotating}
                    />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        scale={planeScale}
                        position={planePosition}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}
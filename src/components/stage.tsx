import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { Loading } from './Loading'
import { Player } from './Player'
import { Room } from './Room'

export function Stage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          {
            name: 'right',
            keys: ['ArrowRight', 'd', 'D'],
          },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Canvas camera={{ fov: 45 }}>
          <Suspense fallback={<Loading />}>
            <Physics gravity={[0, -30, 0]}>
              <Player />
              <Room />
              <RigidBody type="fixed" colliders={false}>
                <CuboidCollider position={[0, 0, 0]} args={[100, 2, 100]} />
              </RigidBody>
            </Physics>
            <PointerLockControls />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

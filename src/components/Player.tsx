import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls, useKeyboardControls } from '@react-three/drei'
import { CapsuleCollider, RigidBody, RigidBodyApi } from '@react-three/rapier'
import { Mesh, SpotLight, Vector3 } from 'three'

function useCameraShake(intensity = 0.2, frequency = 2) {
  const shake = useRef(new Vector3())
  const noise = useRef(new Vector3())

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime()

    noise.current.set(
      (Math.random() * 2 - 1) * intensity +
        Math.sin(time * (frequency * 0.8)) * intensity * 0.5,
      (Math.random() * 2 - 1) * intensity +
        Math.cos(time * (frequency * 0.6)) * intensity * 0.5,
      (Math.random() * 2 - 1) * intensity +
        Math.sin(time * (frequency * 1.2)) * intensity * 0.5
    )

    shake.current.lerp(noise.current, 0.2)

    camera.position.add(shake.current)
    camera.rotation.x += Math.sin(time * (frequency * 0.9)) * 0.0008
    camera.rotation.y += Math.cos(time * (frequency * 1.1)) * 0.001
  })

  return shake
}

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

const MAX_VERTICAL_ANGLE = Math.PI / 8

export function Player() {
  const ref = useRef<RigidBodyApi>(null)

  const [, get] = useKeyboardControls()

  useCameraShake(0.55, 1.4)

  const spotlightRef = useRef<SpotLight>(null)

  useFrame((state) => {
    const { forward, backward, left, right } = get()
    const velocity = ref.current!.linvel()

    state.camera.rotation.order = 'YXZ'
    const cameraRotation = state.camera.rotation.x
    if (cameraRotation > MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = MAX_VERTICAL_ANGLE
    } else if (cameraRotation < -MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = -MAX_VERTICAL_ANGLE
    }

    const { x, y, z } = ref.current!.translation()
    state.camera.position.set(x, y, z)

    frontVector.set(0, 0, +backward - +forward)
    sideVector.set(+left - +right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(9)
      .applyQuaternion(state.camera.quaternion)
    ref.current!.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
  })

  const emptyMeshRef = useRef<Mesh>(null)
  useFrame((state) => {
    const { x, y, z } = ref.current!.translation()
    state.camera.position.set(x, y, z)

    if (spotlightRef.current) {
      const spotlight = spotlightRef.current
      spotlight.position.copy(state.camera.position)

      const offset = new Vector3(0, 0, -1)
      offset.applyQuaternion(state.camera.quaternion)
      emptyMeshRef.current!.position.copy(state.camera.position).add(offset)

      spotlight.target.position.copy(emptyMeshRef.current!.position)
    }
  })

  return (
    <>
      <spotLight
        ref={spotlightRef}
        intensity={1}
        distance={50}
        angle={Math.PI / 6}
        penumbra={0.1}
      />

      <RigidBody
        ref={ref}
        colliders={false}
        mass={0.5}
        type="dynamic"
        position={[-2, 4, 24]}
        enabledRotations={[false, false, false]}
      >
        <mesh ref={emptyMeshRef} />
        <CapsuleCollider args={[0.75, 1]} />
      </RigidBody>
      <PointerLockControls />
    </>
  )
}

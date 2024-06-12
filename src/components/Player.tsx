import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls, useKeyboardControls } from '@react-three/drei'
import { CapsuleCollider, RigidBody, RigidBodyApi } from '@react-three/rapier'
import { Mesh, SpotLight, Vector3 } from 'three'
import { useCameraShake } from '../hooks/useCameraShake'

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

const MAX_VERTICAL_ANGLE = Math.PI / 8

export function Player() {
  const ref = useRef<RigidBodyApi>(null)
  const spotlightRef = useRef<SpotLight>(null)
  const emptyMeshRef = useRef<Mesh>(null)

  const [, get] = useKeyboardControls()
  useCameraShake(0.55, 1.4)

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

    // Update the empty mesh position to always be in front of the camera with an offset
    if (emptyMeshRef.current) {
      const offset = new Vector3(0, 0, -1) // Adjust the offset as needed
      offset.applyQuaternion(state.camera.quaternion)
      emptyMeshRef.current.position.copy(state.camera.position).add(offset)
    }

    // Update spotlight logic
    if (spotlightRef.current) {
      const spotlight = spotlightRef.current
      spotlight.position.copy(state.camera.position)
      spotlight.target.position.copy(emptyMeshRef.current!.position)
    }
  })

  return (
    <>
      <spotLight
        ref={spotlightRef}
        intensity={3}
        distance={50}
        angle={Math.PI / 6}
        penumbra={0.1}
      />
      <ambientLight intensity={0.05} />
      <RigidBody
        ref={ref}
        colliders={false}
        mass={0.5}
        type="dynamic"
        position={[0, 4, 0]}
        enabledRotations={[false, false, false]}
      >
        <mesh ref={emptyMeshRef}>
          <boxGeometry args={[1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <CapsuleCollider args={[0.75, 1]} />
      </RigidBody>
      <PointerLockControls />
    </>
  )
}

import * as THREE from 'three'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import {
  CapsuleCollider,
  RigidBody,
  RigidBodyApi,
  useRapier,
} from '@react-three/rapier'

function useCameraShake(intensity = 0.2, frequency = 2) {
  const shake = useRef(new THREE.Vector3())
  const noise = useRef(new THREE.Vector3())

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

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const SWIM_SPEED = 3
const DASH_SPEED = 6
const SWIM_BUOYANCY = 2
const SWIM_DRAG = 0.9
const MAX_VERTICAL_ANGLE = Math.PI / 8
const DASH_DURATION = 1

export function Player() {
  const ref = useRef<RigidBodyApi>(null)
  const rapier = useRapier()
  const [, get] = useKeyboardControls()
  const [isDashing, setIsDashing] = useState(false)
  const [dashEndTime, setDashEndTime] = useState(0)

  useCameraShake(0.55, 1.4)

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()
    const velocity = ref.current!.linvel()

    state.camera.rotation.order = 'YXZ'
    const cameraRotation = state.camera.rotation.x
    if (cameraRotation > MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = MAX_VERTICAL_ANGLE
    } else if (cameraRotation < -MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = -MAX_VERTICAL_ANGLE
    }

    // update camera position
    const { x, y, z } = ref.current!.translation()
    state.camera.position.set(x, y, z)

    // Check if player is in water
    const inWater = y < 2

    if (inWater) {
      // Swimming movement
      frontVector.set(0, 0, +backward - +forward)
      sideVector.set(+left - +right, 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(isDashing ? DASH_SPEED : SWIM_SPEED)
        .applyQuaternion(state.camera.quaternion) // Apply camera quaternion for direction
      ref.current!.setLinvel({
        x: direction.x * SWIM_DRAG,
        y: velocity.y + SWIM_BUOYANCY,
        z: direction.z * SWIM_DRAG,
      })

      // Start dashing if jump is pressed
      if (jump && !isDashing) {
        setIsDashing(true)
        setDashEndTime(state.clock.getElapsedTime() + DASH_DURATION)
      }

      // Stop dashing after the dash duration
      if (isDashing && state.clock.getElapsedTime() > dashEndTime) {
        setIsDashing(false)
      }
    } else {
      // Regular movement
      frontVector.set(0, 0, +backward - +forward)
      sideVector.set(+left - +right, 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(9)
        .applyQuaternion(state.camera.quaternion) // Apply camera quaternion for direction
      ref.current!.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

      // Jumping
      const world = rapier.world.raw()
      const ray = world.castRay(
        new RAPIER.Ray(ref.current!.translation(), { x: 0, y: -1, z: 0 }),
        10,
        true
      )
      const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
      if (jump && grounded) ref.current!.setLinvel({ x: 0, y: 7.5, z: 0 })
    }
  })

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={0.5}
      type="dynamic"
      position={[-2, 4, 24]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.75, 1]} />
    </RigidBody>
  )
}

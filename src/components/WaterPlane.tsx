import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export const WaterPlane: React.FC = () => {
  const planeGeometryRef = useRef<THREE.PlaneGeometry>(null)
  const vertData = useRef<
    { initH: number; amplitude: number; phase: number }[]
  >([])

  useEffect(() => {
    if (planeGeometryRef.current) {
      // Initialize vertData
      vertData.current = Array.from(
        { length: planeGeometryRef.current.attributes.position.count },
        (_, idx) => {
          const v3 = new THREE.Vector3()
          v3.fromBufferAttribute(
            planeGeometryRef.current!.attributes.position,
            idx
          )
          return {
            initH: v3.z,
            amplitude: THREE.MathUtils.randFloatSpread(1),
            phase: THREE.MathUtils.randFloat(0, Math.PI),
          }
        }
      )
    }
  }, [planeGeometryRef.current])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (planeGeometryRef.current) {
      const positions = planeGeometryRef.current.attributes.position

      vertData.current.forEach((vd, idx) => {
        const y = vd.initH + Math.cos(time * 2 + vd.phase) * vd.amplitude
        positions.setZ(idx, y)
      })

      positions.needsUpdate = true
      planeGeometryRef.current.computeVertexNormals()
    }
  })

  return (
    <>
      <mesh scale={1} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100, 150, 150]} ref={planeGeometryRef} />
        <meshPhysicalMaterial color="grey" />
        <ambientLight intensity={0.25} />
      </mesh>
      <mesh scale={1} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshPhysicalMaterial color="grey" />
        <ambientLight intensity={0.25} />
      </mesh>
    </>
  )
}

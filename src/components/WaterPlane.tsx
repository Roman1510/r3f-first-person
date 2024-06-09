import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export const WaterPlane: React.FC = () => {
  const planeGeometryRef = useRef<THREE.PlaneGeometry>(null)
  const vertData = useRef<
    { initH: number; amplitude: number; phase: number }[]
  >([])
  const texture = useLoader(THREE.TextureLoader, '/sand.jpg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
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
            amplitude: THREE.MathUtils.randFloatSpread(0.5),
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
        const y = vd.initH + Math.cos(time + vd.phase) * vd.amplitude
        positions.setZ(idx, y)
      })

      positions.needsUpdate = true
      planeGeometryRef.current.computeVertexNormals()
    }
  })

  return (
    <>
      <mesh scale={1} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[100, 100, 120, 120]} ref={planeGeometryRef} />
        <meshPhysicalMaterial color="grey" map={texture} />
        <ambientLight intensity={0.15} />
      </mesh>
      <mesh scale={1} rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshPhysicalMaterial color="grey" map={texture} />
        <ambientLight intensity={0.15} />
      </mesh>
    </>
  )
}

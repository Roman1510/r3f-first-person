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
            initH: v3.y,
            amplitude: THREE.MathUtils.randFloatSpread(2),
            phase: THREE.MathUtils.randFloat(0, Math.PI),
          }
        }
      )
    }
  }, [planeGeometryRef.current])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (planeGeometryRef.current)
      planeGeometryRef.current.attributes.position.needsUpdate = true

    vertData.current.forEach((vd, idx) => {
      const y = vd.initH + Math.sin(time + vd.phase) * vd.amplitude
      if (planeGeometryRef.current)
        planeGeometryRef.current.attributes.position.setY(idx, y)
    })

    if (planeGeometryRef.current)
      planeGeometryRef.current.computeVertexNormals()
  })

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 350, 350]} ref={planeGeometryRef} />
      <meshLambertMaterial opacity={0.4} color="aqua" />
      <ambientLight />
    </mesh>
  )
}

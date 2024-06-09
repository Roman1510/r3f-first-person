/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: artfletch (https://sketchfab.com/artfletch)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/the-charterhouse-great-chamber-50e692c037784347b289d7bbcb318bed
title: The Charterhouse Great Chamber
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { RigidBody } from '@react-three/rapier'
import { WaterPlane } from './WaterPlane'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_12: THREE.Mesh
    Object_13: THREE.Mesh
    Object_14: THREE.Mesh
    Object_15: THREE.Mesh
    Object_16: THREE.Mesh
    Object_17: THREE.Mesh
    Object_18: THREE.Mesh
    Object_19: THREE.Mesh
    Object_20: THREE.Mesh
    Object_21: THREE.Mesh
    Object_22: THREE.Mesh
    Object_23: THREE.Mesh
    Object_24: THREE.Mesh
    Object_25: THREE.Mesh
    Object_26: THREE.Mesh
    Object_27: THREE.Mesh
    Object_28: THREE.Mesh
    Object_29: THREE.Mesh
  }
  materials: {
    CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1: THREE.MeshBasicMaterial
  }
}

export function Room(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/the_charterhouse_great_chamber.glb',
    '/draco-gltf'
  ) as unknown as GLTFResult
  return (
    <>
      <WaterPlane />
      <RigidBody type="fixed" colliders="trimesh">
        <group {...props} dispose={null} position={[0, 24, 0]} scale={2.5}>
          <group
            position={[-0.43, -9.71, 1.35]}
            rotation={[-Math.PI, -0.1, 0]}
            scale={0.5}
          >
            <mesh
              geometry={nodes.Object_2.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_3.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_4.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_5.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_7.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_8.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_10.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_11.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_12.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_13.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_14.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_15.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_16.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_17.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_18.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_19.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_20.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_21.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_22.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_23.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_24.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_25.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_26.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_27.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_28.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
            <mesh
              geometry={nodes.Object_29.geometry}
              material={
                materials.CharterhouseGreatChamber01CharterhouseGreatChamber01_Material_u1_v1
              }
            />
          </group>
        </group>
      </RigidBody>
    </>
  )
}

useGLTF.preload('/the_charterhouse_great_chamber.glb')

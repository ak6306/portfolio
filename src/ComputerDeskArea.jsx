import React, { useRef, useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function ComputerDeskArea(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('./computer-desk-area.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]]
      firstAction.play()
    }
    
    // Enable shadows on all meshes in the model
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [actions, scene])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Body108_0" position={[-0.724, 1.013, 0.657]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.material} />
              </group>
              <group name="Cube_1" position={[-0.724, 1.013, 0.762]} scale={0.092}>
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.material_0} />
              </group>
              
              <group name="MONITOR_4" position={[0.048, 0.928, 0.305]} scale={0.605}>
                <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.peopleColors} />
                {/* Override the Blender screenshot texture with a dark matte screen to prevent white blowout */}
                <mesh name="Object_9" geometry={nodes.Object_9.geometry}>
                  <meshStandardMaterial color="#010308" roughness={0.9} />
                </mesh>
                
                {/* Pure WebGL Text - Never fails to render! */}
                {/* Micro-adjusted Y to 0.935 for pixel-perfect padding */}
                <group position={[0, 0.935, 0.12]} rotation={[-0.2, 0, 0]} scale={0.55}>
                   <Text position={[0, 0.18, 0]} fontSize={0.07} color="#ffffff" anchorX="center">
                     ADITYA CHOUDHARY
                   </Text>
                   <Text position={[0, 0.08, 0]} fontSize={0.035} color="#ff8a65" anchorX="center">
                     SOFTWARE ENGINEER (4+ YOE)
                   </Text>
                   
                   <Text position={[-0.45, -0.05, 0]} fontSize={0.03} color="#ffffff" anchorX="left">
                     SUMMARY
                   </Text>
                   <Text position={[-0.45, -0.11, 0]} fontSize={0.022} color="#cccccc" anchorX="left" maxWidth={0.9} lineHeight={1.3}>
                     Backend systems engineer using Java, Spring Boot, and AWS. Expertise in distributed systems, large-scale data processing, and AI-driven agentic workflows.
                   </Text>
                   
                   <Text position={[-0.45, -0.25, 0]} fontSize={0.03} color="#ffffff" anchorX="left">
                     SKILLS
                   </Text>
                   <Text position={[-0.45, -0.31, 0]} fontSize={0.022} color="#cccccc" anchorX="left" maxWidth={0.9} lineHeight={1.3}>
                     Java, Python, JS | Spring Boot, REST APIs | AWS (EC2, S3, Lambda) | React | LangChain, AI Integrations
                   </Text>
                   
                   <Text position={[-0.45, -0.45, 0]} fontSize={0.03} color="#ffffff" anchorX="left">
                     EXPERIENCE
                   </Text>
                   <Text position={[-0.45, -0.52, 0]} fontSize={0.022} color="#ffaa88" anchorX="left">
                     Autodesk (SDE 2)
                   </Text>
                   <Text position={[-0.43, -0.59, 0]} fontSize={0.02} color="#aaaaaa" anchorX="left" maxWidth={0.88} lineHeight={1.2}>
                     • Designed AI-powered Agent using MCP tools to automate workflows, reducing manual effort by 6x.
                   </Text>
                   <Text position={[-0.43, -0.66, 0]} fontSize={0.02} color="#aaaaaa" anchorX="left" maxWidth={0.88} lineHeight={1.2}>
                     • Architected a distributed Spring Batch system, scaling parallel conversions for 1M+ projects.
                   </Text>
                   
                   <Text position={[-0.45, -0.77, 0]} fontSize={0.022} color="#ffaa88" anchorX="left">
                     Autodesk (SDE 1 & Intern)
                   </Text>
                   <Text position={[-0.43, -0.84, 0]} fontSize={0.02} color="#aaaaaa" anchorX="left" maxWidth={0.88} lineHeight={1.2}>
                     • Migrated legacy services to AWS. Built 20+ REST APIs. Handled prod incidents for 99% uptime.
                   </Text>
                   <Text position={[-0.43, -0.91, 0]} fontSize={0.02} color="#aaaaaa" anchorX="left" maxWidth={0.88} lineHeight={1.2}>
                     • Built processing jobs for migrating 30M+ records with zero downtime.
                   </Text>

                   <Text position={[-0.45, -1.05, 0]} fontSize={0.03} color="#ffffff" anchorX="left">
                     EDUCATION & CERTS
                   </Text>
                   <Text position={[-0.45, -1.12, 0]} fontSize={0.022} color="#cccccc" anchorX="left" maxWidth={0.9}>
                     KIIT University (BTech CS) | AWS Certified Cloud Practitioner
                   </Text>
                </group>
              </group>

              <group name="TABLE_5" position={[0.048, -0.002, 0.572]} scale={0.605}>
                <mesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.WOOD} />
              </group>
              <group name="KEYBOARD_6" position={[-0.087, 0.954, 0.727]} scale={0.605}>
                <mesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.peopleColors} />
              </group>
              <group name="MOUSE_7" position={[0.423, 0.928, 0.831]}>
                <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.peopleColors} />
              </group>
              
              <group name="Cylinder002_8" position={[0.011, 0.442, 1.214]} scale={[0.026, 0.245, 0.026]}>
                <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.peopleColors} />
                <mesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.FABRIC} />
              </group>
              <group name="Cylinder003_9" position={[0.011, 0.442, 1.214]} scale={[0.026, 0.245, 0.026]}>
                <mesh name="Object_20" geometry={nodes.Object_20.geometry} material={materials.FABRIC} />
              </group>
              <group name="Cylinder007_10" position={[0.011, 0.442, 1.214]} scale={[0.026, 0.245, 0.026]}>
                <mesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials.peopleColors} />
              </group>
              
              <group name="MONITOR001_11" position={[0.808, 1.239, 0.49]} scale={0.605}>
                <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials.material_6} />
              </group>
              
              <group name="rig_CharRoot_43" position={[0, -0.199, 1.224]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.01}>
                <group name="bip_42" position={[0, 92.405, -1.666]} rotation={[0, -1.571, 0]}>
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <group name="lpMaleG_41" />
                    <skinnedMesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials.peopleColors} skeleton={nodes.Object_30.skeleton} />
                    <skinnedMesh name="Object_31" geometry={nodes.Object_31.geometry} material={materials.peopleColors} skeleton={nodes.Object_31.skeleton} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./computer-desk-area.glb')

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function Clicky(props) {
  const { sendActiveModelToApp, getModelStateFromComponents } = props
  const { nodes, materials } = useGLTF("/clicky.glb");
  const [isHovered, setIsHovered] = useState(null);

  const modelGroup = useRef();

  return (
    <group
      ref={modelGroup}
      {...props}
      dispose={null}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        sendActiveModelToApp(getModelStateFromComponents(), event.object.name)
      }}
      onPointerLeave={(event) => {
        setIsHovered(false);
      }}
      onPointerMissed={()=> {
        sendActiveModelToApp(getModelStateFromComponents(), null)
      }}
    >
      <mesh
        castShadow
        receiveShadow
        name="Case_A_v3"
        geometry={nodes.Case_A_v3.geometry}
        position={[-0.25, 2.28, 3.76]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <meshStandardMaterial color={getModelStateFromComponents().items.Case_A_v3} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        name="Spring_Normal"
        geometry={nodes.Spring_Normal.geometry}
        position={[-0.32, -8.22, 1.46]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <meshStandardMaterial color={getModelStateFromComponents().items.Spring_Normal} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        name="Wheel_40T"
        geometry={nodes.Wheel_40T.geometry}
        position={[0.19, 8.26, 1.16]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      >
        <meshStandardMaterial color={getModelStateFromComponents().items.Wheel_40T} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        name="Case_B_v4"
        geometry={nodes.Case_B_v4.geometry}
        position={[-0.27, 1.26, -1.59]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={getModelStateFromComponents().items.Case_B_v4} />
      </mesh>
    </group>
  );
}

// okay this has no shadows
// but we can figure that out later

useGLTF.preload("/clicky.glb");

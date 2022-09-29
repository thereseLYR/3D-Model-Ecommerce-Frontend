import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Clicky from "../components/Clicky.jsx";
import { SketchPicker } from "react-color";

const initialModelState = {
  currentItem: null,
  items: {
    Case_A_v3: "coral",
    Spring_Normal: "darkmagenta",
    Wheel_40T: "lightblue",
    Case_B_v4: "indianred",
  },
};

function ClickyConfigurator() {
  const [modelState, setModelState] = useState(initialModelState);

  const getModelStateFromComponents = () => {
    // console.log('sending model data to app...')
    return modelState;
  };

  const sendActiveModelToApp = (stateObj, modelNameStr) => {
    setModelState({ ...stateObj, currentItem: modelNameStr });
    // console.log('Saved model state from model component to app component')
  };

  function Picker() {
    return (
      <div className="picker" style={{display: modelState.currentItem ? "block":"none"}} >
        <h1> {modelState.currentItem}</h1>
        <SketchPicker
          color={modelState.items[modelState.currentItem]}
          onChange={(color) => {
            console.log(color);
            modelState.items[modelState.currentItem] = color.hex;
          }}
        />
      </div>
    );
  }

  function ColorState() {
    const objEntries = Object.entries(modelState.items);
    console.log(objEntries);

    return (
      <div>
        {objEntries.map((subArr) => {
          return (
            <h2>
              {subArr[0]}: {subArr[1]}{" "}
            </h2>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Picker />
      <ColorState />
      <Canvas>
        <PerspectiveCamera makeDefault fov={75} position={[0, 0, 50]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={0.4}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <ContactShadows
          opacity={1}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />

        {/* not the right geometry but whatever */}
        <Clicky
          sendActiveModelToApp={sendActiveModelToApp}
          getModelStateFromComponents={getModelStateFromComponents}
        />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
}

export default ClickyConfigurator;

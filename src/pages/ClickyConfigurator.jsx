import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { useCookies } from "react-cookie";
import Clicky from "../components/Clicky.jsx";
import SaveButton from "../components/SaveButton.jsx";

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
  const [cookies, setCookie] = useCookies(["saved-models"]);

  const getModelStateFromComponents = () => {
    return modelState;
  };

  const sendActiveModelToApp = (stateObj, modelNameStr) => {
    setModelState({ ...stateObj, currentItem: modelNameStr });
  };

  function handleModelSave() {
    let prevCookieValues = cookies["saved-models"]
    // cookies are stored as an object
    // access a specific cookie by using its key/name, e.g. cookies["saved-models"]
    // general format of the saved-models cookie should be an object
    // e.g.
    // {
    //   clicky: {
    //     Case_A_v3: "#b8e986";
    //     Case_B_v4: "indianred";
    //     Spring_Normal: "darkmagenta";
    //     Wheel_40T: "lightblue";
    //   }
    //   flowerpot: {
    //     pot: "indianred";
    //   }
    // }
    setCookie("saved-models", { ...prevCookieValues, 1: modelState.items }) // assume clicky has a model ID of 1
    // setCookie("saved-models", { ...prevCookieValues, clicky2: modelState.items })
    // the line above is to test saving multiple instances of the same model in the saved-models cookie
    console.log("saved-models", cookies["saved-models"]);
    return;
  }

  function Picker() {
    return (
      <div
        className="picker"
        style={{ display: modelState.currentItem ? "block" : "none" }}
      >
        <h1> {modelState.currentItem}</h1>
        <SketchPicker
          color={modelState.items[modelState.currentItem]}
          onChange={(color) => {
            // console.log(color);
            modelState.items[modelState.currentItem] = color.hex;
          }}
        />
      </div>
    );
  }

  function ColorState() {
    const objEntries = Object.entries(modelState.items);
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
      <SaveButton onClickFunction={handleModelSave} />
      {/* <ColorState /> */}
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

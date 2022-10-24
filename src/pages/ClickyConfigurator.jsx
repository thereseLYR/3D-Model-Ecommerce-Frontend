import { Text } from "@chakra-ui/react";
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Clicky from "../components/Clicky.jsx";
import SaveButton from "../components/SaveButton.jsx";

const initialModelState = {
  currentItem: "Case_A_v3",
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
  const navigate = useNavigate();

  const getModelStateFromComponents = () => {
    return modelState;
  };

  const sendActiveModelToApp = (stateObj, modelNameStr) => {
    setModelState({ ...stateObj, currentItem: modelNameStr });
  };

  function handleModelSave() {
    let prevCookieValues = cookies["saved-models"];
    // cookies are stored as an object
    // access a specific cookie by using its key/name, e.g. cookies["saved-models"]
    // general format of the saved-models cookie should be an object, with first layer key being the model ID
    // e.g.
    // {
    //   1: {
    //     Case_A_v3: "#b8e986";
    //     Case_B_v4: "indianred";
    //     Spring_Normal: "darkmagenta";
    //     Wheel_40T: "lightblue";
    //   }
    //   2: {
    //     pot: "indianred";
    //   }
    // }

    setCookie("saved-models", { ...prevCookieValues, 1: modelState.items }); // assume clicky has a model ID of 1
    // setCookie("saved-models", { ...prevCookieValues, clicky2: modelState.items })
    // the line above is to test saving multiple instances of the same model in the saved-models cookie
    return;
  }

  const handleExitClick = () => {
    navigate("/model");
  };

  function Picker() {
    return (
      <div className="picker">
        <Text w={"200px"} as="b" margin={"0px 3px 3px 0px"}>
          Part Name:
        </Text>
        <Text w={"200px"} margin={"0px 3px 10px 0px"}>
          {modelState.currentItem}
        </Text>
        <SketchPicker
          color={modelState.items[modelState.currentItem] || "coral"}
          onChange={(color) => {
            modelState.items[modelState.currentItem] = color.hex;
          }}
        />
        <SaveButton
          onSaveCustomClick={handleModelSave}
          onExitClick={handleExitClick}
        />
      </div>
    );
  }

  // function ColorState() {
  //   const objEntries = Object.entries(modelState.items);
  //   return (
  //     <div>
  //       {objEntries.map((subArr) => {
  //         return (
  //           <h2>
  //             {subArr[0]}: {subArr[1]}{" "}
  //           </h2>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Picker />
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

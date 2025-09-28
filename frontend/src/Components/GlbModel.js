import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const GlbModel = ({ modelPath }) => {
    const gltf = useGLTF(modelPath); // loads the .glb model

    return (
        <primitive
            object={gltf.scene}
            scale={0.4}        // adjust size
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
};

export default GlbModel;

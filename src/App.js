import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from "three"
import styled from 'styled-components';

const Background = styled.div`
width: 100vw;
height: 100vh;
/* background-color: black; */
`

/* ---------------- 맥북 */
const MacBook = () => {
  const lidRef = useRef(); // 맥북 화면 부분
  const [isOpen, setIsOpen] = useState(false); // 닫힘/열림 상태
  const [angle, setAngle] = useState(0); // 현재 열림 각도
  const targetAngle = isOpen ? Math.PI / 1.5 : 0; // 목표 각도
  const speed = 0.1; // 애니메이션 속도

  const MacBookScreen = () => {
    const { scene } = useGLTF(process.env.PUBLIC_URL + '/appletop.glb'); // 내보낸 모델 경로
    return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
  };
  const MacBookBottom = () => {
    const { scene } = useGLTF(process.env.PUBLIC_URL + '/btm.glb'); // 내보낸 모델 경로
    return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
  };



  useFrame(() => {
    if (lidRef.current && Math.abs(angle - targetAngle) > 0.01) {
      const newAngle = angle + (isOpen ? speed : -speed);
      setAngle(newAngle);
      lidRef.current.rotation.x = -newAngle; // 화면 회전
    }
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <group onClick={handleClick}>
      {/* 맥북 바닥 */}

      {/* <mesh position={[0, -1.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="gray" />
      </mesh> */}
      <group position={[0, -1.09,0]} castShadow>  
      <MacBookBottom/>
      </group>

      {/* 맥북 화면 */}
      <group ref={lidRef} position={[0, -1.05,-1]} castShadow>
     {/*  <mesh ref={lidRef} position={[0, 0.05, 1]} castShadow>
        <boxGeometry args={[3, 0.05, 2]} />
        <meshStandardMaterial color="royalblue">
          <meshStandardMaterial map={screenTexture} />
        </meshStandardMaterial>
      </mesh> */}
      <MacBookScreen/>
      </group>
    </group>
  );
};

/* ---------------- 맥북끝 */

const Block = () => {
  const meshRef = useRef();
  const [position, setPosition] = useState([0, 0.5, 0]); // 블록 초기 위치
  const [rotation, setRotation] = useState(0); // 박스의 초기 회전 각도 (라디안)
  const speed = 0.02; // 이동 속도
  const keys = useRef({}); //눌린키를 추적
  const rotationSpeed = Math.PI / 180; // 회전 속도

  // 방향키 이벤트 핸들러
   // 키 입력 처리
   useEffect(() => {
    const handleKeyDown = (event) => {
      keys.current[event.key] = true;
    };

    const handleKeyUp = (event) => {
      keys.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 매 프레임마다 움직임 업데이트
  useFrame(() => {
    let newPos = [...position];
    let newRot = rotation;

    // 방향키에 따라 이동 및 회전 처리
    if (keys.current["ArrowUp"]) {
      newPos[0] -= Math.sin(rotation) * speed;
      newPos[2] -= Math.cos(rotation) * speed;
    }
    if (keys.current["ArrowDown"]) {
      newPos[0] += Math.sin(rotation) * speed;
      newPos[2] += Math.cos(rotation) * speed;
    }
    if (keys.current["ArrowLeft"]) {
      newRot += rotationSpeed;
    }
    if (keys.current["ArrowRight"]) {
      newRot -= rotationSpeed;
    }

    setPosition(newPos);
    setRotation(newRot);

    // 박스의 위치와 회전 업데이트
    if (meshRef.current) {
      meshRef.current.position.set(...newPos);
      meshRef.current.rotation.y = newRot;
    }
  });


  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 6]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};


function App() {
  
  return (
   <>
    {/*   <Canvas style={{width:'100vw', height:'100vh'}}>
        <OrbitControls/>
       <RotatingCube />
    </Canvas> */}

<Background>
<Canvas 
    shadows 
    style={{ width: "100vw", height: "100vh" }}
    camera={{position: [0,10,10], fov:16}}
    >
      {/* -------------------바닥 */}
    {/*   <OrbitControls 
         minPolarAngle={Math.PI / 3.5} // 카메라가 수평에서 45도 아래로 내려가지 못하게 제한
         maxPolarAngle={Math.PI / 2.6} // 수평(90도) 위로는 자유롭게 회전 가능
         minAzimuthAngle={-Math.PI / 6} // 좌측으로 회전 가능한 최대 각도 (-45도)
         maxAzimuthAngle={Math.PI / 6} // 우측으로 회전 가능한 최대 각도 (+45도)
         enablePan={false} // 패닝 허용
         enableZoom={false} // 줌 허용
         />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <Plane /> */}
      {/* ----------------------- 바닥끝 */}
      {/* <Block /> */}

      <OrbitControls
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
          enablePan={false}
          enableZoom={false}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <MacBook />
    </Canvas>
         </Background>
   </>
  );
}

export default App;


import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from "three"
import styled, { keyframes } from 'styled-components';
import Bgimg from "./img/bgimg.png"
import Clickimg from "./img/clickimg.png"

const BackgroundImage = () => {
  const texture = useTexture(Bgimg);

  return (
    <mesh 
      position={[0, 0.5, -2.8]} 
      name="BackgroundImage"
      receiveShadow
      onPointerDown={(e) => e.stopPropagation()} // 이벤트 중지
      onPointerUp={(e) => e.stopPropagation()}   // 이벤트 중지
      >
      <planeGeometry args={[4, 2.6]} />
      <meshBasicMaterial
        map={texture} // 텍스처를 설정
        transparent={true} // 투명 배경 활성화
        alphaTest={0}
      />
    </mesh>
  );
};
const BackgroundText = () => {
  return (
    <Html
    position={[0, 0, -2.3]} // 텍스트 위치 (적절히 조정)
    transform
    distanceFactor={4.6} // 크기 조절
    style={{
      // outline:'1px dotted red',
      fontSize:'30px',
      color: 'white',
      width:'100vw',
      zIndex:'-2',
      height:'100vh',
      fontWeight:'700'
      // background: 'rgba(0, 0, 0, 0.5)',
      // padding: '8px 12px',
      // borderRadius: '8px',
      // textAlign: 'center',
      // cursor: 'pointer',
    }}
  >
    <div> R3F-PROJECT</div>
  </Html>
  );
};

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(35px); }
  100% { transform: translateY(0); }
`;

const AnimatedHtmlContainer = styled.div`
  font-size: 90px;
  color: white;
  width: 540px;
  height: 240px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  text-align: center;
  cursor: normal;

  animation: ${floatAnimation} 3s infinite ease-in-out;
`;

/* ---------------- 맥북 */
const MacBook = () => {
  const lidRef = useRef(); // 맥북 화면 부분
  const [isOpen, setIsOpen] = useState(false); // 닫힘/열림 상태
  const [angle, setAngle] = useState(0); // 현재 열림 각도
  const targetAngle = isOpen ? Math.PI / 1.5 : 0; // 목표 각도
  const speed = 0.1; // 애니메이션 속도

  const MacBookScreen = () => {
    const { scene } = useGLTF(process.env.PUBLIC_URL + '/appletop.glb'); // 내보낸 모델 경로
    return (
      <>
        <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
      </>
    )
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
      <group position={[0, -0.903,0]} castShadow>  
      <MacBookBottom/>
      <BackgroundImage style={{ pointerEvents: "none" }} />
  
      </group>

      {/* 맥북 화면 */}
      <group ref={lidRef} position={[0, -0.85,-1]} castShadow>
     {/*  <mesh ref={lidRef} position={[0, 0.05, 1]} castShadow>
        <boxGeometry args={[3, 0.05, 2]} />
        <meshStandardMaterial color="royalblue">
          <meshStandardMaterial map={screenTexture} />
        </meshStandardMaterial>
      </mesh> */}
      <MacBookScreen/>

      {/* ---------- open 글씨 */}
      {!isOpen && (
      <Html
        position={[0, 0.7, 0.5]} // 텍스트 위치 (적절히 조정)
        transform
        distanceFactor={1.5} // 크기 조절
        style={{
          cursor: 'normal',
        }}
      >
         <AnimatedHtmlContainer bg={Clickimg}>
          <div></div>
         </AnimatedHtmlContainer>
      </Html>
    )}

             {/* iframe */}
             {isOpen && ( // 열림 상태일 때만 iframe 렌더링
          <Html
            position={[0, 0, 1]} // iframe 위치
            rotation={[-29.84, 0, 0]} // iframe 각도 (화면 기울기)
            transform
            distanceFactor={1.5}
            style={{
              width: '780px',
              height: '510px',
              border: '2px solid rgba(0,0,0,0.5)',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
          >
            <iframe
              src="https://gumi-gomi.github.io/kmong_pj/build/" // 표시하고자 하는 URL
              title="MacBook Screen"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Html>
        )}

      </group>
    </group>
  );
};

/* ---------------- 맥북끝 */

// ----------------- 별효과

const Stars = () => {
  const pointsRef = useRef();
  const particleCount = 200; // 별의 개수
  const positions = new Float32Array(particleCount * 3); // x, y, z 값 저장 배열

  // 별의 초기 위치 랜덤 설정
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x 좌표
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y 좌표
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z 좌표 (깊이)
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  // z축 방향으로 이동
  useFrame(() => {
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 2] += 0.02; // z축 이동
      if (positions[i * 3 + 2] > 25) {
        positions[i * 3 + 2] = -25; // 화면을 벗어나면 초기화
      }
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true; // 업데이트 적용
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.04} color="white" />
    </points>
  );
};

// ----------------- 별효과 끝

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
<Canvas 
    shadows 
    style={{ width: "100vw", height: "100vh", zIndex:'10' }}
    camera={{position: [-3,2,10], fov:16}}
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
          // enableZoom={false}
          minDistance={11} // 줌 최소 거리
          maxDistance={13} // 줌 최대 거리
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 1]} intensity={0.7} castShadow />
        <MacBook />
    </Canvas>

     <Canvas 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: 'black',
        }}
     >
      <ambientLight intensity={0.5} />
      <BackgroundText/>
      <Stars />
    </Canvas>
     
   </>
  );
}

export default App;


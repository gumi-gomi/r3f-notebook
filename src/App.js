import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from "three"
import styled, { keyframes } from 'styled-components';
import Bgimg from "./img/bgimg.png"
import Clickimg from "./img/clickimg.png"

const Seconddiv = styled.div`
outline: 1px dotted red;
width: 100%;
height: 700px;
background-color: #000;

`


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
    }}
  >
    <div> UNIVERSE-DINO</div>
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
  @media screen and (max-width: 768px) {
    /* outline: 1px dotted red; */
    width: 600px;
    height: 250px;
    font-size: 6vw;
  }

`;

/* ---------------- 맥북 */
const MacBook = () => {
  const lidRef = useRef(); // 맥북 화면 부분
  const [isOpen, setIsOpen] = useState(false); // 닫힘/열림 상태
  const [angle, setAngle] = useState(0); // 현재 열림 각도
  const targetAngle = isOpen ? Math.PI / 1.5 : 0; // 목표 각도
  const speed = 0.1; // 애니메이션 속도

  const MacBookScreen = () => {
    const { scene } = useGLTF(
      './appletop.glb'
    ); // 내보낸 모델 경로
    return (
      <>
        <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
      </>
    )
  };
  const MacBookBottom = () => {
    const { scene } = useGLTF('./btm.glb'); // 내보낸 모델 경로
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
      <group position={[0, -0.903,0]} castShadow>  
      <MacBookBottom/>
      <BackgroundImage style={{ pointerEvents: "none" }} />
      </group>

      {/* 맥북 화면 */}
      <group ref={lidRef} position={[0, -0.85,-1]} castShadow>
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
              opacity:'1',
            }}
          >
            <iframe
              src="https://chromedino.com/" // 표시하고자 하는 URL
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
const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size; 
};


function App() {

  const [width, height] = useWindowSize();

  // 화면 크기에 따라 fov 및 position 값 동적 계산
  const calculateFov = () => Math.max(16, (height / width) * 20); // 기본값 16, 화면 비율에 따라 증가
  const calculatePosition = () => {
    if (width < 768) {
      return [-3, 1.5, 8]; // 모바일 크기
    } else if (width < 1024) {
      return [-3, 2, 9]; // 태블릿 크기
    } else {
      return [-3, 2, 10]; // 데스크톱 크기
    }
  };

  const cameraFov = calculateFov();
  const cameraPosition = calculatePosition();
  
  return (
   <>
<Canvas 
  gl={{ 
    antialias: true,  
    powerPreference: "default" 
  }}
    shadows 
    style={{ width: "100vw", height: "100vh", zIndex:'10' }}
    // camera={{position: [-3,2,10], fov:16}}
    camera={{
      position: cameraPosition,
      fov: cameraFov,
    }}
    >
  

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
     gl={{ 
      antialias: true,  
      powerPreference: "default" 
    }}
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
      <ambientLight intensity={0.5}/>
      <BackgroundText/>
      <Stars />
    </Canvas>
     
    {/*   <Seconddiv>

      </Seconddiv> */}
   </>
  );
}

export default App;


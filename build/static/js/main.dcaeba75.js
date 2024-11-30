/*! For license information please see main.dcaeba75.js.LICENSE.txt */
  0% { transform: translateY(0); }
  50% { transform: translateY(35px); }
  100% { transform: translateY(0); }
`,Mb=yb.div`
  font-size: 90px;
  color: white;
  width: 540px;
  height: 240px;
  background-image: url(${e=>e.bg});
  background-size: cover;
  text-align: center;
  cursor: normal;

  animation: ${Ab} 3s infinite ease-in-out;
  @media screen and (max-width: 768px) {
    /* outline: 1px dotted red; */
    width: 600px;
    height: 250px;
    font-size: 6vw;
  }

`,Eb=()=>{const e=(0,t.useRef)(),[n,r]=(0,t.useState)(!1),[i,a]=(0,t.useState)(0),s=n?Math.PI/1.5:0,o=()=>{const{scene:e}=Sy("./appletop.glb");return(0,mm.jsx)(mm.Fragment,{children:(0,mm.jsx)("primitive",{object:e,scale:[.5,.5,.5]})})},l=()=>{const{scene:e}=Sy("./btm.glb");return(0,mm.jsx)("primitive",{object:e,scale:[.5,.5,.5]})};hg((()=>{if(e.current&&Math.abs(i-s)>.01){const t=i+(n?.1:-.1);a(t),e.current.rotation.x=-t}}));return(0,mm.jsxs)("group",{onClick:()=>{r(!n)},children:[(0,mm.jsxs)("group",{position:[0,-.903,0],castShadow:!0,children:[(0,mm.jsx)(l,{}),(0,mm.jsx)(bb,{style:{pointerEvents:"none"}})]}),(0,mm.jsxs)("group",{ref:e,position:[0,-.85,-1],castShadow:!0,children:[(0,mm.jsx)(o,{}),!n&&(0,mm.jsx)(hv,{position:[0,.7,.5],transform:!0,distanceFactor:1.5,style:{cursor:"normal"},children:(0,mm.jsx)(Mb,{bg:xb,children:(0,mm.jsx)("div",{})})}),n&&(0,mm.jsx)(hv,{position:[0,0,1],rotation:[-29.84,0,0],transform:!0,distanceFactor:1.5,style:{width:"780px",height:"510px",border:"2px solid rgba(0,0,0,0.5)",borderRadius:"15px",overflow:"hidden",opacity:"1"},children:(0,mm.jsx)("iframe",{src:"https://gumi-gomi.github.io/kmong_pj/build/",title:"MacBook Screen",width:"100%",height:"100%",style:{border:"none"}})})]})]})},wb=()=>{const e=(0,t.useRef)(),n=new Float32Array(600);return(0,t.useEffect)((()=>{for(let e=0;e<200;e++)n[3*e]=20*(Math.random()-.5),n[3*e+1]=10*(Math.random()-.5),n[3*e+2]=50*(Math.random()-.5);e.current&&e.current.geometry.setAttribute("position",new pa(n,3))}),[n]),hg((()=>{for(let e=0;e<200;e++)n[3*e+2]+=.02,n[3*e+2]>25&&(n[3*e+2]=-25);e.current&&(e.current.geometry.attributes.position.needsUpdate=!0)})),(0,mm.jsxs)("points",{ref:e,children:[(0,mm.jsx)("bufferGeometry",{}),(0,mm.jsx)("pointsMaterial",{size:.04,color:"white"})]})};const Cb=function(){const[e,n]=(()=>{const[e,n]=(0,t.useState)([window.innerWidth,window.innerHeight]);return(0,t.useEffect)((()=>{const e=()=>n([window.innerWidth,window.innerHeight]);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),e})(),r=Math.max(16,n/e*20),i=e<768?[-3,1.5,8]:e<1024?[-3,2,9]:[-3,2,10];return(0,mm.jsxs)(mm.Fragment,{children:[(0,mm.jsxs)(Qg,{shadows:!0,style:{width:"100vw",height:"100vh",zIndex:"10"},camera:{position:i,fov:r},children:[(0,mm.jsx)(By,{minPolarAngle:Math.PI/3,maxPolarAngle:Math.PI/2,minAzimuthAngle:-Math.PI/6,maxAzimuthAngle:Math.PI/6,enablePan:!1,minDistance:11,maxDistance:13}),(0,mm.jsx)("ambientLight",{intensity:.5}),(0,mm.jsx)("directionalLight",{position:[5,3,1],intensity:.7,castShadow:!0}),(0,mm.jsx)(Eb,{})]}),(0,mm.jsxs)(Qg,{style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"black"},children:[(0,mm.jsx)("ambientLight",{intensity:.5}),(0,mm.jsx)(Sb,{}),(0,mm.jsx)(wb,{})]})]})};r.createRoot(document.getElementById("root")).render((0,mm.jsx)(t.StrictMode,{children:(0,mm.jsx)(Cb,{})}))})()})();
//# sourceMappingURL=main.dcaeba75.js.map
/*! For license information please see main.cd186413.js.LICENSE.txt */
width: 100vw;
height: 100vh;
background-color: black;
`,yb=gb.section`
  position: fixed;
  outline: 1px dotted red;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 700px;
  perspective: 3000px;
`,_b=()=>{const e=(0,t.useRef)(),[n,r]=(0,t.useState)(!1),[i,a]=(0,t.useState)(0),s=n?Math.PI/1.5:0,o=()=>{const{scene:e}=ly("./appletop.glb");return(0,mm.jsx)(mm.Fragment,{children:(0,mm.jsx)("primitive",{object:e,scale:[.5,.5,.5]})})},l=()=>{const{scene:e}=ly("./btm.glb");return(0,mm.jsx)("primitive",{object:e,scale:[.5,.5,.5]})};hg((()=>{if(e.current&&Math.abs(i-s)>.01){const t=i+(n?.1:-.1);a(t),e.current.rotation.x=-t}}));return(0,mm.jsxs)("group",{onClick:()=>{r(!n)},children:[(0,mm.jsx)("group",{position:[0,-1.1,0],castShadow:!0,children:(0,mm.jsx)(l,{})}),(0,mm.jsxs)("group",{ref:e,position:[0,-1.05,-1],castShadow:!0,children:[(0,mm.jsx)(o,{}),!n&&(0,mm.jsx)(xy,{position:[0,1,1],transform:!0,distanceFactor:1.5,style:{fontSize:"120px",color:"white",textAlign:"center",cursor:"pointer"},children:(0,mm.jsx)("div",{children:"Open"})}),n&&(0,mm.jsx)(xy,{position:[0,0,1],rotation:[-29.84,0,0],transform:!0,distanceFactor:1.5,style:{width:"780px",height:"510px",border:"2px solid rgba(0,0,0,0.5)",borderRadius:"15px",overflow:"hidden"},children:(0,mm.jsx)("iframe",{src:"https://gumi-gomi.github.io/kmong_pj/build/",title:"MacBook Screen",width:"100%",height:"100%",style:{border:"none"}})})]})]})};const xb=function(){return(0,mm.jsx)(mm.Fragment,{children:(0,mm.jsxs)(vb,{children:[(0,mm.jsxs)(Qg,{shadows:!0,style:{width:"100vw",height:"100vh",zIndex:"10"},camera:{position:[0,10,10],fov:16},children:[(0,mm.jsx)(Ty,{minPolarAngle:Math.PI/3,maxPolarAngle:Math.PI/2,minAzimuthAngle:-Math.PI/6,maxAzimuthAngle:Math.PI/6,enablePan:!1,minDistance:12,maxDistance:14}),(0,mm.jsx)("ambientLight",{intensity:.5}),(0,mm.jsx)("directionalLight",{position:[5,3,1],intensity:.7,castShadow:!0}),(0,mm.jsx)(_b,{})]}),(0,mm.jsx)(yb,{children:(0,mm.jsx)("h1",{style:{color:"white"},children:"hello"})})]})})};r.createRoot(document.getElementById("root")).render((0,mm.jsx)(t.StrictMode,{children:(0,mm.jsx)(xb,{})}))})()})();
//# sourceMappingURL=main.cd186413.js.map
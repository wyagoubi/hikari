// خلفية حيّة: نجوم بطبقات بارالاكس، يراعات متوهجة، شهب عابرة
(()=>{const c=$('#stars'),x=c.getContext('2d');let W,H,S,F,K=[],mx=0,sy=0;
const nf=i=>({x:Math.random()*W,y:i?Math.random()*H:H+10,r:Math.random()*2+1,v:Math.random()*.4+.15,p:Math.random()*7,h:Math.random()>.5?275:42});
const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight;S=Array.from({length:190},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.2,p:Math.random()*7,z:Math.random()*.9+.1}));F=Array.from({length:matchMedia('(prefers-reduced-motion:reduce)').matches?0:32},()=>nf(1))};
rs();onresize=rs;addEventListener('mousemove',e=>mx=e.clientX/W-.5);addEventListener('scroll',()=>sy=scrollY,{passive:true});
(function t(n){x.clearRect(0,0,W,H);
 S.forEach(s=>{x.globalAlpha=.25+.75*Math.abs(Math.sin(n/900+s.p));x.fillStyle=s.r>1.2?'#fff2c9':'#d9c8ff';x.beginPath();x.arc(s.x-mx*34*s.z,((s.y-sy*.06*s.z)%H+H)%H,s.r,0,7);x.fill()});
 F.forEach((f,i)=>{f.y-=f.v;f.x+=Math.sin(n/1500+f.p)*.4;if(f.y<-10)F[i]=nf();x.globalAlpha=.5+.45*Math.sin(n/600+f.p);const g=x.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*8);g.addColorStop(0,`hsla(${f.h},95%,78%,.95)`);g.addColorStop(1,'transparent');x.fillStyle=g;x.beginPath();x.arc(f.x,f.y,f.r*8,0,7);x.fill()});
 if(Math.random()<.004)K.push({x:Math.random()*W,y:Math.random()*H*.4,l:0});
 K=K.filter(k=>{k.l++;k.x-=9;k.y+=4;x.globalAlpha=1-k.l/40;x.strokeStyle='#fff';x.lineWidth=1.5;x.beginPath();x.moveTo(k.x,k.y);x.lineTo(k.x+70,k.y-31);x.stroke();return k.l<40});
 requestAnimationFrame(t)})(0)})();

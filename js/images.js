// ربط المنتجات بصورها (المجلد images/) — أضف img لأي منتج جديد
const IMG={1:'book-1',2:'book-2',3:'book-3',4:'book-4',5:'book-5',6:'book-6',7:'cat-charms',8:'charms-2',9:'cat-dioramas',10:'dioramas-2'};
P.forEach(p=>IMG[p.id]&&(p.img='images/'+IMG[p.id]+'.jpg'));
const _b2=bind;bind=function(){_b2();
 const hs=$('#hs');if(hs){const f=$('.fl3',hs);f.innerHTML='<img class="pimg hero-img" src="images/hero.jpg" alt="Hikari Studio">';const im=$('img',f);
  hs.onmousemove=e=>{const r=hs.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;im.style.transform=`rotateY(${x*18}deg) rotateX(${-y*14}deg)`};hs.onmouseleave=()=>im.style.transform=''}
 const st=$('#stg'),im=st&&$('img',st);if(im){$('.views')?.remove();
  st.onmousemove=e=>{const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;im.style.transform=`rotateY(${x*22}deg) rotateX(${-y*18}deg) scale(1.04)`};st.onmouseleave=()=>im.style.transform=''}
};
route();

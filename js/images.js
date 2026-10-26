// ربط المنتجات بصورها (المجلد images/) — أضف img لأي منتج جديد
const IMG={1:'book-1',2:'book-2',3:'book-3',4:'book-4',5:'book-5',6:'book-6',7:'charms',8:'charms-2',9:'dome',10:'dome-2'};
P.forEach(p=>IMG[p.id]&&(p.img='images/'+IMG[p.id]+'.svg'));
const _b2=bind;bind=function(){_b2();
 const st=$('#stg'),im=st&&$('img',st);if(im){$('.views')?.remove();
  st.onmousemove=e=>{const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;im.style.transform=`rotateY(${x*22}deg) rotateX(${-y*18}deg) scale(1.04)`};st.onmouseleave=()=>im.style.transform=''}
};
route();

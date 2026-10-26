// الهيدر: مؤشر ذهبي منزلق، تصغير عند التمرير، بحث، قائمة الهاتف
const nv=$('#nav'),ind=$('#ind'),hd=$('#hd');
const pos=el=>{if(!el)return ind.style.width=0;ind.style.width=el.offsetWidth+'px';ind.style.transform=`translateX(${el.offsetLeft}px)`};
const act=()=>pos($('a.on',nv));
$$('a',nv).forEach(a=>a.onmouseenter=()=>pos(a));nv.onmouseleave=act;
addEventListener('hashchange',()=>setTimeout(act,30));addEventListener('resize',act);addEventListener('load',act);document.fonts&&document.fonts.ready.then(act);setTimeout(act,300);
addEventListener('scroll',()=>hd.classList.toggle('sc',scrollY>30),{passive:true});
$('#sb').onclick=()=>{$('#sbar').classList.toggle('o');setTimeout(()=>$('#si').focus(),300)};
$('#si').onkeydown=e=>{if(e.key=='Enter'){sel.q=e.target.value;sel.t='';sel.pr=0;$('#sbar').classList.remove('o');location.hash='#/shop';route()}};
$('#mb').addEventListener('click',e=>e.currentTarget.classList.toggle('x'));
addEventListener('hashchange',()=>$('#mb').classList.remove('x'));

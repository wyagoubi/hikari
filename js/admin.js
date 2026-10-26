// لوحة التحكم + المفضلة + تخزين محلي للمنتجات (يُستبدل بقاعدة البيانات لاحقًا)
const PR=ls('hk_price',{});
ls('hk_extra',[]).forEach(p=>P.push(p));
ls('hk_hidden',[]).forEach(id=>{const i=P.findIndex(p=>p.id==id);i>-1&&P.splice(i,1)});
P.forEach(p=>PR[p.id]&&(p.p=PR[p.id]));
const sv=(k,v)=>localStorage[k]=JSON.stringify(v);
V.admin=async()=>{
 const t=location.hash.split('/')[2]||'home';let o=ls('hk_orders',[]);
 try{const r=await fetch('/api/orders');if(r.ok)o=[...await r.json(),...o]}catch{}
 const stt=ls('hk_status',{});o.forEach(x=>stt[x.id]&&(x.st=stt[x.id]));
 const T=[['home','الرئيسية'],['products','المنتجات'],['orders','الطلبات'],['customers','العملاء']];
 const ST=['قيد المراجعة','قيد الصنع','تم الشحن','مكتمل'];
 const ordT=l=>`<table><tr><th>#</th><th>العميل</th><th>الهاتف</th><th>الولاية</th><th>المجموع</th><th>الحالة</th></tr>${l.map(x=>`<tr><td>${x.id}</td><td>${x.n}</td><td>${x.ph||'-'}</td><td>${x.w||'-'}</td><td>${fmt(x.t||0)}</td><td><select data-o="${x.id}">${ST.map(s=>`<option ${x.st==s?'selected':''}>${s}</option>`).join('')}</select></td></tr>`).join('')||'<tr><td colspan=6 class="empty">لا توجد طلبات بعد.</td></tr>'}</table>`;
 const cu={};o.forEach(x=>{const k=x.ph||x.n;cu[k]=cu[k]||{n:x.n,ph:x.ph,w:x.w,c:0,s:0};cu[k].c++;cu[k].s+=x.t||0});
 const rev=o.reduce((a,x)=>a+(x.t||0),0);
 const B={
 home:`<div class="kp"><div><b>${o.length}</b>الطلبات</div><div><b>${P.length}</b>المنتجات</div><div><b>${Object.keys(cu).length}</b>العملاء</div></div><div class="kp"><div><b>${fmt(rev)}</b>الإيرادات</div><div><b>${o.filter(x=>x.st=='قيد المراجعة').length}</b>بانتظار المراجعة</div><div><b>${fav.length}</b>مفضلة هذا الجهاز</div></div><div class="box" style="overflow:auto"><h3>أحدث الطلبات</h3>${ordT(o.slice(0,5))}</div>`,
 orders:`<div class="box" style="overflow:auto"><h3>كل الطلبات</h3>${ordT(o)}</div>`,
 customers:`<div class="box" style="overflow:auto"><h3>العملاء</h3><table><tr><th>الاسم</th><th>الهاتف</th><th>الولاية</th><th>الطلبات</th><th>الإنفاق</th></tr>${Object.values(cu).map(c=>`<tr><td>${c.n}</td><td>${c.ph||'-'}</td><td>${c.w||'-'}</td><td>${c.c}</td><td>${fmt(c.s)}</td></tr>`).join('')||'<tr><td colspan=5 class="empty">لا يوجد عملاء بعد.</td></tr>'}</table></div>`,
 products:`<div class="box" style="overflow:auto"><h3>المنتجات</h3><table><tr><th>المنتج</th><th>القسم</th><th>السعر</th><th></th></tr>${P.map(p=>`<tr><td>${p.n}</td><td>${CATS[p.cat]}</td><td>${fmt(p.p)}</td><td><button class="mini" data-ed="${p.id}">تعديل السعر</button> <button class="mini d" data-del="${p.id}">حذف</button></td></tr>`).join('')}</table><div class="af"><label>اسم المنتج<input id="an"></label><label>السعر<input id="ap_p" type="number"></label><label>القسم<select id="ac">${Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label><button class="btn f" id="aa">إضافة</button></div></div>`}[t]||'';
 return `<div class="pg"><div class="sh"><h2>لوحة التحكم</h2></div><div class="adm"><aside class="box atabs">${T.map(x=>`<a href="#/admin/${x[0]}" class="${x[0]==t?'on':''}">${x[1]}</a>`).join('')}</aside><div>${B}</div></div></div>`};
const _b=bind;bind=function(){_b();
 $$('[data-o]').forEach(s=>s.onchange=()=>{const m=ls('hk_status',{});m[s.dataset.o]=s.value;sv('hk_status',m);toast('تم حفظ حالة الطلب')});
 $$('[data-del]').forEach(b=>b.onclick=()=>{if(!confirm('حذف هذا المنتج؟'))return;const id=+b.dataset.del,h=ls('hk_hidden',[]);h.push(id);sv('hk_hidden',h);const e=ls('hk_extra',[]).filter(p=>p.id!=id);sv('hk_extra',e);P.splice(P.findIndex(p=>p.id==id),1);route()});
 $$('[data-ed]').forEach(b=>b.onclick=()=>{const p=P.find(x=>x.id==b.dataset.ed),v=+prompt('السعر الجديد (دج):',p.p);if(!v)return;PR[p.id]=v;p.p=v;sv('hk_price',PR);route()});
 const aa=$('#aa');if(aa)aa.onclick=()=>{const n=$('#an').value.trim(),pr=+$('#ap_p').value,c=$('#ac').value;if(!n||!pr)return toast('أدخل الاسم والسعر');
  const p={id:Date.now()%1e7,cat:c,n,p:pr,c:['#7a3fc9','#2a0f55'],s:{books:'✦',charms:'☾',dioramas:'🌸'}[c],r:5,d:'منتج جديد من لوحة التحكم.',m:'—',z:'—'};
  P.push(p);const e=ls('hk_extra',[]);e.push(p);sv('hk_extra',e);toast('تمت إضافة المنتج');route()};
};
route();

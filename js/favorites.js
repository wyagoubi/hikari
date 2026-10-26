V.fav=()=>{const l=P.filter(p=>fav.includes(p.id));return `<div class="pg"><div class="sh"><h2>مفضلتي</h2></div>${l.length?`<div class="grid">${l.map(card).join('')}</div>`:'<div class="box empty">لم تضف شيئًا بعد. اضغط ♥ على أي قطعة تعجبك.<br><a class="btn f" href="#/shop">تصفح المجموعات</a></div>'}</div>`};
route();

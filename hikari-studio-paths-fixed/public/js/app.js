'use strict';
const T = {
ar:{skip:'تخطي إلى المحتوى',nav_home:'الرئيسية',nav_collections:'المجموعات',nav_custom:'الطلبات المخصصة',nav_about:'من نحن',nav_reviews:'آراء العملاء',search:'بحث',search_ph:'ابحث عن منتج…',cart:'السلة',
hero_title:'أعمال يدوية تحمل <span class="gold">سحرك الخاص</span>',hero_sub:'كتب جلدية مجلدة يدويًا، وتعليقات طينية، وعوالم مصغرة نصنعها بعناية لتصبح كل قطعة حكاية فريدة من عالمك.',cta1:'استكشف المجموعات',cta2:'اطلب قطعة مخصصة',
ill:'صورة توضيحية',t1:'صناعة يدوية',t1s:'كل قطعة تُصنع بعناية',t2:'تصاميم مخصصة',t2s:'نحوّل فكرتك إلى قطعة',t3:'التوصيل داخل الجزائر',t3s:'إلى مختلف الولايات',
col_t:'المجموعات المميزة',col_s:'اكتشف قطعنا المصنوعة يدويًا بعناية',browse:'تصفح المجموعة',feat_t:'أحدث القطع',feat_s:'من ورشتنا إلى عالمك',all:'الكل',sort:'الترتيب',s_new:'الأحدث',s_asc:'السعر: الأقل',s_desc:'السعر: الأعلى',
none:'لا توجد منتجات منشورة في هذا القسم حاليًا.',none2:'يمكنك طلب قطعة مخصصة بتصميمك الخاص.',details:'التفاصيل',add:'أضف إلى السلة',added:'تمت الإضافة إلى السلة',avail:'متوفر',made:'يُصنع عند الطلب',left:'المتبقي',out:'غير متوفر حاليًا',
mat:'المواد',dim:'الأبعاد',time:'مدة التحضير',qty:'الكمية',desc:'الوصف',cust_note:'تخصيص (اختياري): اسم، لون، رموز…',cust_btn:'اطلب تصميمًا مخصصًا',video:'مشاهدة الفيديو',zoom:'اضغط للتكبير',back:'← رجوع',
craft_t:'قصتنا',craft_s1:'في ورشة Hikari Studio نجلّد الكتب بالجلد يدويًا، ونشكّل التعليقات من الطين، ونبني عوالم مصغرة صغيرة التفاصيل.',craft_s2:'كل قطعة تبدأ بفكرة وتنتهي بحكاية تحملها معك.',
how_t:'كيف تطلب؟',h1:'اختر قطعتك',h1s:'أو أرسل فكرتك المخصصة',h2:'أكّد طلبك',h2s:'بالاسم والهاتف والولاية',h3:'نبدأ العمل',h3s:'ونتواصل معك للتفاصيل',h4:'استلم طلبك',h4s:'توصيل إلى المنزل أو المكتب',
rev_t:'آراء العملاء',rev_none:'لا توجد آراء منشورة بعد. كن أول من يشاركنا رأيه!',rev_add:'شاركنا رأيك',rev_name:'الاسم',rev_city:'المدينة (اختياري)',rev_rate:'التقييم',rev_text:'رأيك',rev_send:'إرسال',rev_ok:'شكرًا! سيظهر رأيك بعد مراجعته.',
cart_t:'سلة المشتريات',cart_empty:'سلتك فارغة.',remove:'إزالة',sub:'المجموع الفرعي',dlv:'رسوم التوصيل',total:'المجموع الكلي',ship:'معلومات التوصيل',name:'الاسم الكامل',phone:'رقم الهاتف',email:'البريد الإلكتروني (اختياري)',wilaya:'الولاية',choose:'اختر الولاية',
home:'التوصيل إلى المنزل',office:'التوصيل إلى مكتب التوصيل',addr:'العنوان',note:'ملاحظات (اختياري)',confirm:'تأكيد الطلب',na:'غير متاح لهذه الولاية',tbd:'—',
ok_t:'تم استلام طلبك',ok_p:'رقم الطلب',ok_s:'سنتواصل معك على هاتفك لتأكيد الطلب.',
c_t:'اطلب قطعة مخصصة',c_s:'أخبرنا بفكرتك وسنراجعها ونتواصل معك. إرسال النموذج لا يعني قبول الطلب.',c_type:'نوع المشروع',c_books:'كتاب جلدي',c_charms:'تعليقة طينية',c_dioramas:'عالم مصغر',c_other:'أخرى',c_desc:'وصف فكرتك بالتفصيل',c_colors:'الألوان المفضلة',c_links:'روابط إلهام (اختياري)',c_budget:'الميزانية (اختياري)',c_files:'صور مرجعية (حتى 4 صور، 6MB لكل صورة)',c_send:'إرسال الطلب',c_ok:'تم استلام طلبك المخصص',c_ok2:'سنراجع الفكرة والصور ثم نتواصل معك. لم يُقبل الطلب بعد.',
f_nav:'تصفح',f_follow:'تابعنا',f_deliv:'التوصيل داخل الجزائر',f_deliv2:'التوصيل إلى المنزل أو مكتب التوصيل حسب الولاية.',copy:'جميع الحقوق محفوظة.',
e_invalid_contact:'تحقق من الاسم ورقم الهاتف (مثال: 05XXXXXXXX).',e_delivery_unavailable:'التوصيل غير متاح لهذه الولاية/الطريقة حاليًا.',e_address_required:'أدخل العنوان.',e_empty_cart:'السلة فارغة.',e_item_unavailable:'أحد المنتجات لم يعد متاحًا.',e_out_of_stock:'الكمية المطلوبة غير متوفرة.',e_invalid:'تحقق من الحقول المطلوبة.',e_bad_file:'الملفات يجب أن تكون صور JPG أو PNG أو WEBP.',e_server_error:'حدث خطأ، حاول لاحقًا.'},
fr:{skip:'Aller au contenu',nav_home:'Accueil',nav_collections:'Collections',nav_custom:'Sur mesure',nav_about:'À propos',nav_reviews:'Avis',search:'Rechercher',search_ph:'Rechercher un produit…',cart:'Panier',
hero_title:'Des créations artisanales <span class="gold">à votre magie</span>',hero_sub:'Livres reliés main en cuir, charms en argile et mondes miniatures, façonnés avec soin pour que chaque pièce devienne une histoire unique.',cta1:'Explorer les collections',cta2:'Commander sur mesure',
ill:'Image illustrative',t1:'Fait main',t1s:'Chaque pièce façonnée avec soin',t2:'Sur mesure',t2s:'Votre idée devient une pièce',t3:'Livraison en Algérie',t3s:'Vers toutes les wilayas',
col_t:'Collections à la une',col_s:'Découvrez nos pièces artisanales',browse:'Voir la collection',feat_t:'Dernières pièces',feat_s:'De notre atelier à votre monde',all:'Tout',sort:'Tri',s_new:'Nouveautés',s_asc:'Prix croissant',s_desc:'Prix décroissant',
none:'Aucun produit publié dans cette section pour le moment.',none2:'Vous pouvez commander une pièce sur mesure.',details:'Détails',add:'Ajouter au panier',added:'Ajouté au panier',avail:'Disponible',made:'Fait sur commande',left:'Restant',out:'Indisponible',
mat:'Matériaux',dim:'Dimensions',time:'Délai',qty:'Quantité',desc:'Description',cust_note:'Personnalisation (optionnel) : nom, couleur, symboles…',cust_btn:'Demander un design sur mesure',video:'Voir la vidéo',zoom:'Cliquer pour agrandir',back:'← Retour',
craft_t:'Notre histoire',craft_s1:'À l’atelier Hikari Studio, nous relions des livres en cuir à la main, modelons des charms en argile et bâtissons de petits mondes miniatures.',craft_s2:'Chaque pièce commence par une idée et finit en histoire.',
how_t:'Comment commander ?',h1:'Choisissez',h1s:'ou envoyez votre idée',h2:'Confirmez',h2s:'nom, téléphone, wilaya',h3:'Nous créons',h3s:'et vous contactons',h4:'Recevez',h4s:'à domicile ou en bureau',
rev_t:'Avis clients',rev_none:'Aucun avis publié pour l’instant. Soyez le premier !',rev_add:'Donnez votre avis',rev_name:'Nom',rev_city:'Ville (optionnel)',rev_rate:'Note',rev_text:'Votre avis',rev_send:'Envoyer',rev_ok:'Merci ! Votre avis apparaîtra après modération.',
cart_t:'Panier',cart_empty:'Votre panier est vide.',remove:'Retirer',sub:'Sous-total',dlv:'Livraison',total:'Total',ship:'Livraison',name:'Nom complet',phone:'Téléphone',email:'E-mail (optionnel)',wilaya:'Wilaya',choose:'Choisir la wilaya',
home:'Livraison à domicile',office:'Livraison en bureau',addr:'Adresse',note:'Remarques (optionnel)',confirm:'Confirmer la commande',na:'Indisponible pour cette wilaya',tbd:'—',
ok_t:'Commande reçue',ok_p:'N° de commande',ok_s:'Nous vous appellerons pour confirmer.',
c_t:'Commande sur mesure',c_s:'Décrivez votre idée, nous l’étudierons et vous contacterons. L’envoi du formulaire ne vaut pas acceptation.',c_type:'Type de projet',c_books:'Livre en cuir',c_charms:'Charm en argile',c_dioramas:'Diorama',c_other:'Autre',c_desc:'Décrivez votre idée',c_colors:'Couleurs souhaitées',c_links:'Liens d’inspiration (optionnel)',c_budget:'Budget (optionnel)',c_files:'Images de référence (4 max, 6 Mo chacune)',c_send:'Envoyer la demande',c_ok:'Demande reçue',c_ok2:'Nous étudierons l’idée et les images puis vous contacterons. La demande n’est pas encore acceptée.',
f_nav:'Navigation',f_follow:'Suivez-nous',f_deliv:'Livraison en Algérie',f_deliv2:'À domicile ou en bureau selon la wilaya.',copy:'Tous droits réservés.',
e_invalid_contact:'Vérifiez le nom et le téléphone (ex. 05XXXXXXXX).',e_delivery_unavailable:'Livraison indisponible pour cette wilaya/méthode.',e_address_required:'Saisissez l’adresse.',e_empty_cart:'Panier vide.',e_item_unavailable:'Un produit n’est plus disponible.',e_out_of_stock:'Quantité indisponible.',e_invalid:'Vérifiez les champs requis.',e_bad_file:'Images JPG, PNG ou WEBP uniquement.',e_server_error:'Erreur, réessayez plus tard.'},
en:{skip:'Skip to content',nav_home:'Home',nav_collections:'Collections',nav_custom:'Custom Orders',nav_about:'About',nav_reviews:'Reviews',search:'Search',search_ph:'Search products…',cart:'Cart',
hero_title:'Handmade creations <span class="gold">with your own magic</span>',hero_sub:'Hand-bound leather books, clay charms and miniature worlds, crafted with care so every piece becomes a story of its own.',cta1:'Explore collections',cta2:'Request a custom piece',
ill:'Illustrative image',t1:'Handmade',t1s:'Every piece crafted with care',t2:'Custom designs',t2s:'Your idea becomes a piece',t3:'Delivery across Algeria',t3s:'To all wilayas',
col_t:'Featured collections',col_s:'Discover our carefully handmade pieces',browse:'Browse collection',feat_t:'Latest pieces',feat_s:'From our atelier to your world',all:'All',sort:'Sort',s_new:'Newest',s_asc:'Price: low to high',s_desc:'Price: high to low',
none:'No published products in this section yet.',none2:'You can request a custom piece instead.',details:'Details',add:'Add to cart',added:'Added to cart',avail:'In stock',made:'Made to order',left:'Left',out:'Currently unavailable',
mat:'Materials',dim:'Dimensions',time:'Production time',qty:'Quantity',desc:'Description',cust_note:'Personalization (optional): name, color, symbols…',cust_btn:'Request a custom design',video:'Watch video',zoom:'Click to zoom',back:'← Back',
craft_t:'Our story',craft_s1:'At Hikari Studio we bind leather books by hand, shape clay charms and build tiny miniature worlds.',craft_s2:'Every piece begins with an idea and ends as a story you can carry.',
how_t:'How to order',h1:'Choose a piece',h1s:'or send a custom idea',h2:'Confirm',h2s:'name, phone, wilaya',h3:'We craft',h3s:'and contact you',h4:'Receive',h4s:'home or pickup office',
rev_t:'Customer reviews',rev_none:'No reviews published yet. Be the first to share yours!',rev_add:'Share your review',rev_name:'Name',rev_city:'City (optional)',rev_rate:'Rating',rev_text:'Your review',rev_send:'Send',rev_ok:'Thank you! Your review will appear after moderation.',
cart_t:'Shopping cart',cart_empty:'Your cart is empty.',remove:'Remove',sub:'Subtotal',dlv:'Delivery fee',total:'Total',ship:'Delivery',name:'Full name',phone:'Phone',email:'Email (optional)',wilaya:'Wilaya',choose:'Choose wilaya',
home:'Home delivery',office:'Pickup office delivery',addr:'Address',note:'Notes (optional)',confirm:'Confirm order',na:'Not available for this wilaya',tbd:'—',
ok_t:'Order received',ok_p:'Order no.',ok_s:'We will call you to confirm.',
c_t:'Request a custom piece',c_s:'Tell us your idea; we will review it and contact you. Submitting the form does not mean it is accepted.',c_type:'Project type',c_books:'Leather book',c_charms:'Clay charm',c_dioramas:'Miniature diorama',c_other:'Other',c_desc:'Describe your idea in detail',c_colors:'Preferred colors',c_links:'Inspiration links (optional)',c_budget:'Budget (optional)',c_files:'Reference images (up to 4, 6MB each)',c_send:'Send request',c_ok:'Custom request received',c_ok2:'We will review the idea and images, then contact you. It has not been accepted yet.',
f_nav:'Navigate',f_follow:'Follow us',f_deliv:'Delivery in Algeria',f_deliv2:'Home or pickup-office delivery depending on the wilaya.',copy:'All rights reserved.',
e_invalid_contact:'Check name and phone (e.g. 05XXXXXXXX).',e_delivery_unavailable:'Delivery unavailable for this wilaya/method.',e_address_required:'Enter your address.',e_empty_cart:'Cart is empty.',e_item_unavailable:'An item is no longer available.',e_out_of_stock:'Requested quantity unavailable.',e_invalid:'Check the required fields.',e_bad_file:'JPG, PNG or WEBP images only.',e_server_error:'Something went wrong, try again.'}};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let lang = localStorage.getItem('hk_lang') || 'ar';
const t = (k) => T[lang][k] ?? T.en[k] ?? k;
const cur = () => lang === 'ar' ? 'د.ج' : 'DA';
const money = (n) => Number(n).toLocaleString(lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-US') + ' ' + cur();
const api = async (u, o) => { const r = await fetch(u, o); const j = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(j.error || 'server_error'), { status: r.status }); return j; };
const errMsg = (e) => t('e_' + e.message) !== 'e_' + e.message ? t('e_' + e.message) : t('e_server_error');
const toast = (m) => { const e = $('#toast'); e.textContent = m; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), 2200); };
const catName = (c) => c['name_' + lang];
const ph = (label = '') => `<div class="ph"><div><svg><use href="#i-mush"/></svg>${esc(label)}</div></div>`;

// cart (ids + qty only; prices always come from the server)
const cart = { get: () => { try { return JSON.parse(localStorage.getItem('hk_cart')) || []; } catch { return []; } },
  set(c) { localStorage.setItem('hk_cart', JSON.stringify(c)); cart.badge(); },
  add(id, qty, note) { const c = cart.get(), x = c.find(i => i.id === id); x ? (x.qty = Math.min(20, x.qty + qty), note && (x.note = note)) : c.push({ id, qty, note: note || '' }); cart.set(c); },
  badge() { const n = cart.get().reduce((a, i) => a + i.qty, 0), b = $('#cartCount'); b.hidden = !n; b.textContent = n; } };

function applyLang() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i)); $$('[data-ip]').forEach(e => e.placeholder = t(e.dataset.ip));
  $$('[data-ia]').forEach(e => e.setAttribute('aria-label', t(e.dataset.ia)));
  $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
}
const card = (p) => { const im = p.images[0], out = !p.available || (p.stock != null && p.stock < 1);
  return `<article class="card"><div class="im">${im ? `<img src="${esc(im.url)}" alt="${esc(p.name)}" loading="lazy" width="400" height="500">` : ph(p.name)}</div>
  <div class="bd"><h3><a class="cardlink" href="#/p/${p.id}">${esc(p.name)}</a></h3><span class="price">${money(p.price)}</span>
  <span class="tag ${out ? 'bad' : ''}">${out ? t('out') : p.stock == null ? t('made') : t('avail')}</span><a class="btn sm" href="#/p/${p.id}">${t('details')}</a></div></article>`; };
const empty = () => `<div class="empty"><p>${t('none')}</p><p>${t('none2')}</p><a class="btn pri" href="#/custom">${t('cta2')}</a></div>`;
const head = (title, sub, mini) => `<div class="sec-head">${mini ? `<img class="mini" src="assets/mascot-sm.webp" alt="" width="84" height="84" loading="lazy">` : ''}<h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}<div class="orn"><svg><use href="#i-star"/></svg></div></div>`;
const main = $('#main');

const R = {
async home(after) {
  const [cats, prods] = await Promise.all([api('/api/categories'), api('/api/products')]);
  const img = { books: 'cat-books', charms: 'cat-charms', dioramas: 'cat-dioramas' };
  main.innerHTML = `<section class="hero"><div class="wrap"><div class="hero-txt"><h1>${t('hero_title')}</h1><p>${t('hero_sub')}</p>
    <div class="cta"><a class="btn pri" href="#/shop">${t('cta1')}</a><a class="btn" href="#/custom">${t('cta2')}</a></div></div>
    <div class="hero-art"><svg class="deco f1"><use href="#i-feather"/></svg><svg class="deco s1"><use href="#i-star"/></svg>
    <div class="frame"><img class="hero-book" src="assets/hero-book.webp" width="1200" height="1046" alt="${esc(t('ill'))}: celestial hand-bound grimoire"><span class="badge-ill">${t('ill')}</span></div>
    <img class="mascot" src="assets/mascot.webp" width="250" height="255" alt="Hikari Studio mascot"><svg class="deco m1"><use href="#i-mush"/></svg></div></div>
    <div class="wrap"><div class="trust"><div><b>${t('t1')}</b><span>${t('t1s')}</span></div><div><b>${t('t2')}</b><span>${t('t2s')}</span></div><div><b>${t('t3')}</b><span>${t('t3s')}</span></div></div></div></section>
  <section id="collections"><div class="wrap">${head(t('col_t'), t('col_s'), true)}<div class="grid c3">${cats.map(c => `<article class="card"><div class="im"><img src="assets/${img[c.slug] || 'cat-books'}.webp" alt="${esc(catName(c))} — ${t('ill')}" loading="lazy" width="320" height="400"></div><div class="bd"><h3>${esc(catName(c))}</h3><a class="btn" href="#/shop?cat=${c.slug}">${t('browse')}</a></div></article>`).join('')}</div></div></section>
  <section><div class="wrap">${head(t('feat_t'), t('feat_s'))}${prods.length ? `<div class="grid">${prods.slice(0, 4).map(card).join('')}</div>` : empty()}</div></section>
  <section id="about"><div class="wrap about"><div class="frame"><img src="assets/about.webp" alt="${esc(t('ill'))}" loading="lazy" width="320" height="320"><img class="mascot" src="assets/mascot-sm.webp" alt="" loading="lazy" width="190" height="190"></div>
    <div><h2>${t('craft_t')}</h2><p>${t('craft_s1')}</p><p>${t('craft_s2')}</p></div></div></section>
  <section><div class="wrap">${head(t('how_t'))}<div class="steps">${[1, 2, 3, 4].map(n => `<div class="step"><h3>${t('h' + n)}</h3><p>${t('h' + n + 's')}</p></div>`).join('')}</div></div></section>
  <section id="reviews"><div class="wrap">${head(t('rev_t'))}<div id="revList"></div>
    <form class="panel formbox" id="revForm" style="margin-top:30px"><h3>${t('rev_add')}</h3><div class="row2"><div><label>${t('rev_name')}</label><input name="author" required maxlength="60"></div><div><label>${t('rev_city')}</label><input name="city" maxlength="60"></div></div>
    <label>${t('rev_rate')}</label><select name="rating"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select><label>${t('rev_text')}</label><textarea name="text" required maxlength="800"></textarea>
    <p class="err" id="revErr"></p><button class="btn pri">${t('rev_send')}</button></form></div></section>`;
  api('/api/reviews').then(rv => $('#revList').innerHTML = rv.length ? `<div class="revs">${rv.map(r => `<div class="rev"><div class="stars" aria-label="${r.rating}/5">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div><p>${esc(r.text)}</p><small>${esc(r.author)}${r.city ? ' — ' + esc(r.city) : ''}</small></div>`).join('')}</div>` : `<div class="empty">${t('rev_none')}</div>`);
  $('#revForm').onsubmit = async (e) => { e.preventDefault(); const b = e.submitter || e.target.querySelector('button'); b.disabled = true;
    try { await api('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(e.target))) }); e.target.reset(); toast(t('rev_ok')); } catch (x) { $('#revErr').textContent = errMsg(x); } b.disabled = false; };
  if (after) requestAnimationFrame(() => $('#' + after)?.scrollIntoView());
},
async shop(qs) {
  const p = new URLSearchParams(qs), cat = p.get('cat') || '', q = p.get('q') || '', sort = p.get('sort') || '';
  const [cats, prods] = await Promise.all([api('/api/categories'), api('/api/products?' + new URLSearchParams({ cat, q, sort }))]);
  const go = (o) => { const n = new URLSearchParams({ cat, q, sort, ...o }); [...n].forEach(([k, v]) => !v && n.delete(k)); location.hash = '#/shop?' + n; };
  main.innerHTML = `<section><div class="wrap">${head(t('nav_collections'), q ? '“' + esc(q) + '”' : '', true)}<div class="bar">
    <button class="chip" data-c="" aria-pressed="${!cat}">${t('all')}</button>${cats.map(c => `<button class="chip" data-c="${c.slug}" aria-pressed="${cat === c.slug}">${esc(catName(c))}</button>`).join('')}
    <select id="sort" aria-label="${t('sort')}"><option value="">${t('s_new')}</option><option value="price_asc" ${sort === 'price_asc' ? 'selected' : ''}>${t('s_asc')}</option><option value="price_desc" ${sort === 'price_desc' ? 'selected' : ''}>${t('s_desc')}</option></select></div>
    ${prods.length ? `<div class="grid">${prods.map(card).join('')}</div>` : empty()}</div></section>`;
  $$('.chip').forEach(b => b.onclick = () => go({ cat: b.dataset.c })); $('#sort').onchange = (e) => go({ sort: e.target.value });
},
async product(id) {
  let p; try { p = await api('/api/products/' + id); } catch { return main.innerHTML = `<section><div class="wrap">${empty()}</div></section>`; }
  const out = !p.available || (p.stock != null && p.stock < 1); let qty = 1, cur_ = 0;
  main.innerHTML = `<section><div class="wrap"><a href="#/shop" class="chip" style="display:inline-block;margin-bottom:20px">${t('back')}</a><div class="pd"><div class="gal"><div class="frame"><div class="main" id="gMain" title="${t('zoom')}" tabindex="0" role="button" aria-label="${t('zoom')}"></div></div>
    <div class="thumbs" id="thumbs">${p.images.map((i, n) => `<button data-n="${n}" aria-label="${n + 1}"><img src="${esc(i.url)}" alt="" loading="lazy"></button>`).join('')}</div></div>
    <div><h1>${esc(p.name)}</h1><div class="price">${money(p.price)}</div><span class="tag ${out ? 'bad' : ''}">${out ? t('out') : p.stock == null ? t('made') : t('avail') + (p.stock <= 5 ? ` · ${t('left')}: ${p.stock}` : '')}</span>
    <p style="margin-top:14px;color:var(--tx2);white-space:pre-line">${esc(p.description)}</p>
    <ul class="specs">${p.materials ? `<li><b>${t('mat')}:</b> ${esc(p.materials)}</li>` : ''}${p.dimensions ? `<li><b>${t('dim')}:</b> ${esc(p.dimensions)}</li>` : ''}${p.production_time ? `<li><b>${t('time')}:</b> ${esc(p.production_time)}</li>` : ''}</ul>
    ${p.customizable ? `<label for="cn">${t('cust_note')}</label><input id="cn" maxlength="200">` : ''}
    <div class="buy"><div class="qty"><button id="qm" aria-label="-">−</button><span id="qv">1</span><button id="qp" aria-label="+">+</button></div><button class="btn pri" id="addBtn" ${out ? 'disabled' : ''}>${t('add')}</button></div>
    <div class="cta">${p.customizable ? `<a class="btn" href="#/custom">${t('cust_btn')}</a>` : ''}${/^https:\/\//.test(p.video_url) ? `<a class="btn" target="_blank" rel="noopener" href="${esc(p.video_url)}">${t('video')}</a>` : ''}</div></div></div></div></section>`;
  const show = (n) => { cur_ = n; const i = p.images[n]; $('#gMain').innerHTML = i ? `<img src="${esc(i.url)}" alt="${esc(p.name)}" width="800" height="800">` : ph(p.name); $$('#thumbs button').forEach((b, k) => b.setAttribute('aria-current', k === n)); }; show(0);
  $$('#thumbs button').forEach(b => b.onclick = () => show(+b.dataset.n));
  const z = () => { if (!p.images[cur_]) return; $('#zoom img').src = p.images[cur_].url; $('#zoom').showModal(); }; $('#gMain').onclick = z; $('#gMain').onkeydown = (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), z());
  $('#qm').onclick = () => $('#qv').textContent = qty = Math.max(1, qty - 1); $('#qp').onclick = () => $('#qv').textContent = qty = Math.min(20, qty + 1);
  $('#addBtn').onclick = () => { cart.add(p.id, qty, $('#cn')?.value.trim()); toast(t('added')); };
},
async cart() {
  const c = cart.get(); const done = (o) => main.innerHTML = `<section><div class="wrap done"><h2>${t('ok_t')}</h2><p>${t('ok_p')}: <b class="gold">#${o.id}</b></p><p>${t('total')}: ${money(o.total)}</p><p style="color:var(--tx2)">${t('ok_s')}</p><a class="btn pri" href="#/shop" style="margin-top:18px">${t('nav_collections')}</a></div></section>`;
  if (!c.length) return main.innerHTML = `<section><div class="wrap">${head(t('cart_t'))}<div class="empty"><p>${t('cart_empty')}</p><a class="btn pri" href="#/shop">${t('cta1')}</a></div></div></section>`;
  const [prods, wil] = await Promise.all([api('/api/cart/price', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: c.map(i => i.id) }) }), api('/api/wilayas')]);
  const byId = Object.fromEntries(prods.map(p => [p.id, p])); cart.set(c.filter(i => byId[i.id]));
  const draw = () => {
    const items = cart.get().map(i => ({ ...i, p: byId[i.id] })), sub = items.reduce((a, i) => a + i.p.price * i.qty, 0);
    const w = wil.find(x => x.code == $('#wil')?.value), type = document.querySelector('input[name=dt]:checked')?.value || 'home', fee = w ? (type === 'home' ? w.fee_home : w.fee_office) : null;
    $('#lines').innerHTML = items.map(i => `<div class="line">${i.p.images[0] ? `<img src="${esc(i.p.images[0].url)}" alt="" width="76" height="76">` : ph()}<div><b>${esc(i.p.name)}</b>${i.note ? `<br><small style="color:var(--tx2)">${esc(i.note)}</small>` : ''}<br><span class="price">${money(i.p.price)}</span></div>
      <div><div class="qty"><button data-q="-1" data-id="${i.id}" aria-label="-">−</button><span>${i.qty}</span><button data-q="1" data-id="${i.id}" aria-label="+">+</button></div><br><button class="rm" data-rm="${i.id}">${t('remove')}</button></div></div>`).join('');
    $('#sums').innerHTML = `<div class="sum"><span>${t('sub')}</span><span>${money(sub)}</span></div><div class="sum"><span>${t('dlv')}</span><span>${!w ? t('tbd') : fee == null ? t('na') : money(fee)}</span></div><div class="sum t"><span>${t('total')}</span><span>${fee == null ? money(sub) : money(sub + fee)}</span></div>`;
    $('#addrBox').hidden = type !== 'home'; $('#addr').required = type === 'home';
    $$('[data-q]').forEach(b => b.onclick = () => { const l = cart.get(), x = l.find(i => i.id == b.dataset.id); x.qty = Math.min(20, Math.max(1, x.qty + +b.dataset.q)); cart.set(l); draw(); });
    $$('[data-rm]').forEach(b => b.onclick = () => { const l = cart.get().filter(i => i.id != b.dataset.rm); cart.set(l); l.length ? draw() : R.cart(); });
  };
  main.innerHTML = `<section><div class="wrap">${head(t('cart_t'))}<div class="cart"><div class="panel" id="lines"></div><form class="panel" id="co"><h3>${t('ship')}</h3>
    <label>${t('name')}</label><input name="name" required maxlength="100" autocomplete="name"><label>${t('phone')}</label><input name="phone" required inputmode="tel" pattern="[0-9+ ]{9,16}" autocomplete="tel" placeholder="05XXXXXXXX"><label>${t('email')}</label><input name="email" type="email" autocomplete="email">
    <label>${t('wilaya')}</label><select name="wilaya" id="wil" required><option value="">${t('choose')}</option>${wil.map(x => `<option value="${x.code}">${x.code} — ${esc(x.name)}</option>`).join('')}</select>
    <div class="radios"><label><input type="radio" name="dt" value="home" checked> ${t('home')}</label><label><input type="radio" name="dt" value="office"> ${t('office')}</label></div>
    <div id="addrBox"><label>${t('addr')}</label><input name="address" id="addr" maxlength="300" autocomplete="street-address"></div><label>${t('note')}</label><textarea name="note" style="min-height:70px" maxlength="400"></textarea>
    <div id="sums" style="margin-top:14px"></div><p class="err" id="coErr" role="alert"></p><button class="btn pri" style="width:100%" id="coBtn">${t('confirm')}</button></form></div></div></section>`;
  draw(); $('#wil').onchange = draw; $$('input[name=dt]').forEach(r => r.onchange = draw);
  $('#co').onsubmit = async (e) => { e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)), btn = $('#coBtn'); btn.classList.add('load'); btn.disabled = true; $('#coErr').textContent = '';
    const items = cart.get(), notes = items.filter(i => i.note).map(i => `[${byId[i.id].name}] ${i.note}`).join(' | ');
    try { const r = await api('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.name, phone: f.phone, email: f.email, wilaya: f.wilaya, delivery_type: f.dt, address: f.address, note: [notes, f.note].filter(Boolean).join(' || '), items: items.map(i => ({ id: i.id, qty: i.qty })) }) });
      cart.set([]); done(r.order); scrollTo(0, 0); } catch (x) { $('#coErr').textContent = errMsg(x); btn.classList.remove('load'); btn.disabled = false; } };
},
custom() {
  main.innerHTML = `<section><div class="wrap">${head(t('c_t'), t('c_s'), true)}<form class="panel formbox" id="cf" enctype="multipart/form-data"><div class="row2"><div><label>${t('name')}</label><input name="name" required maxlength="100"></div><div><label>${t('phone')}</label><input name="phone" required inputmode="tel" placeholder="05XXXXXXXX"></div></div>
    <label>${t('email')}</label><input name="email" type="email"><div class="row2"><div><label>${t('c_type')}</label><select name="type"><option value="books">${t('c_books')}</option><option value="charms">${t('c_charms')}</option><option value="dioramas">${t('c_dioramas')}</option><option value="other">${t('c_other')}</option></select></div><div><label>${t('c_budget')}</label><input name="budget" maxlength="60"></div></div>
    <label>${t('c_desc')}</label><textarea name="description" required minlength="10" maxlength="3000"></textarea><div class="row2"><div><label>${t('c_colors')}</label><input name="colors" maxlength="200"></div><div><label>${t('c_links')}</label><input name="links" maxlength="600"></div></div>
    <label>${t('c_files')}</label><input type="file" name="refs" accept="image/jpeg,image/png,image/webp" multiple id="cfiles"><p class="err" id="cfe" role="alert"></p><button class="btn pri" id="cb">${t('c_send')}</button></form></div></section>`;
  $('#cfiles').onchange = (e) => { const f = [...e.target.files]; $('#cfe').textContent = f.length > 4 || f.some(x => x.size > 6 * 1048576) ? t('c_files') : ''; if ($('#cfe').textContent) e.target.value = ''; };
  $('#cf').onsubmit = async (e) => { e.preventDefault(); const b = $('#cb'); b.classList.add('load'); b.disabled = true;
    try { await api('/api/custom-orders', { method: 'POST', body: new FormData(e.target) }); main.innerHTML = `<section><div class="wrap done"><h2>${t('c_ok')}</h2><p style="color:var(--tx2)">${t('c_ok2')}</p><a class="btn pri" href="#/" style="margin-top:18px">${t('nav_home')}</a></div></section>`; scrollTo(0, 0); }
    catch (x) { $('#cfe').textContent = errMsg(x); b.classList.remove('load'); b.disabled = false; } };
}};

async function footer() {
  const s = await api('/api/settings').catch(() => ({})), names = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', facebook: 'Facebook' };
  const links = Object.keys(names).filter(k => /^https:\/\//.test(s[k] || ''));
  $('#foot').innerHTML = `<div class="wrap"><div class="cols"><div><a class="brand" href="#/"><img src="assets/logo-sm.webp" width="44" height="44" alt=""><span style="display:inline">Hikari Studio</span></a><p style="color:var(--tx2);margin-top:8px">Handmade ✦ Fantasy ✦ Art</p><img class="mascot" src="assets/mascot-sm.webp" alt="" width="96" height="96" loading="lazy"></div>
  <div><h3>${t('f_nav')}</h3><a href="#/">${t('nav_home')}</a><a href="#/shop">${t('nav_collections')}</a><a href="#/custom">${t('nav_custom')}</a><a href="#/about">${t('nav_about')}</a><a href="#/reviews">${t('nav_reviews')}</a></div>
  <div><h3>${t('f_deliv')}</h3><p style="color:var(--tx2)">${t('f_deliv2')}</p>${links.length ? `<h3 style="margin-top:16px">${t('f_follow')}</h3>${links.map(k => `<a href="${esc(s[k])}" target="_blank" rel="noopener noreferrer">${names[k]}</a>`).join('')}` : ''}</div></div>
  <p class="copy">© ${new Date().getFullYear()} Hikari Studio. ${t('copy')}</p></div>`;
}
async function route() {
  const [h, qs = ''] = (location.hash.slice(1) || '/').split('?'), [, r, a] = h.split('/');
  $('#menu').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false');
  const key = !r ? 'home' : r === 'p' ? 'shop' : r; $$('#menu a').forEach(x => x.classList.toggle('on', x.dataset.route === key));
  try { main.setAttribute('aria-busy', 'true');
    if (!r) await R.home(); else if (r === 'about' || r === 'reviews') await R.home(r); else if (r === 'shop') await R.shop(qs); else if (r === 'p') await R.product(a); else if (r === 'cart') await R.cart(); else if (r === 'custom') R.custom(); else await R.home();
  } catch (e) { main.innerHTML = `<section><div class="wrap"><div class="empty">${t('e_server_error')}</div></div></section>`; console.error(e); }
  main.removeAttribute('aria-busy'); if (r !== 'about' && r !== 'reviews') scrollTo(0, 0);
}
$$('[data-lang]').forEach(b => b.onclick = () => { lang = b.dataset.lang; localStorage.setItem('hk_lang', lang); applyLang(); route(); footer(); });
$('#burger').onclick = () => { const o = $('#menu').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o); };
$('#btnSearch').onclick = () => { const b = $('#searchbar'); b.hidden = !b.hidden; if (!b.hidden) $('#searchInput').focus(); };
$('#searchbar').onsubmit = (e) => { e.preventDefault(); location.hash = '#/shop?q=' + encodeURIComponent($('#searchInput').value.trim()); $('#searchbar').hidden = true; };
$('#zoom').onclick = (e) => e.target.id !== 'zoom' && e.target.tagName !== 'IMG' ? $('#zoom').close() : e.target.id === 'zoom' && $('#zoom').close(); $('#zoomClose').onclick = () => $('#zoom').close();
addEventListener('hashchange', route); applyLang(); cart.badge(); footer(); route();

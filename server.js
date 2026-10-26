// خادم بسيط: يقدّم الواجهة ويحفظ الطلبات في orders.json (قبل ربط قاعدة البيانات)
const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp'};
const F=path.join(__dirname,'orders.json');
const rd=()=>{try{return JSON.parse(fs.readFileSync(F))}catch{return[]}};
http.createServer((q,s)=>{
  if(q.url==='/api/orders'){
    if(q.method==='GET'){s.setHeader('Content-Type','application/json');return s.end(JSON.stringify(rd()))}
    if(q.method==='POST'){let b='';q.on('data',d=>b+=d);return q.on('end',()=>{const o=JSON.parse(b);const a=rd();a.unshift(o);fs.writeFileSync(F,JSON.stringify(a,null,1));s.end('{"ok":true}')})}
  }
  let f=path.join(__dirname,q.url==='/'?'index.html':decodeURIComponent(q.url.split('?')[0]));
  if(!f.startsWith(__dirname)||!fs.existsSync(f)){s.statusCode=404;return s.end('404')}
  s.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(s);
}).listen(3000,()=>console.log('http://localhost:3000'));

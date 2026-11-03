// 描画の差し替え口。例: WC.Gfx.set('chaser',(c,x,y,st,self)=>c.drawImage(img,x,y,st,st))
WC.Gfx={fns:{},set(k,f){this.fns[k]=f},draw(k,c,x,y,st){(this.fns[k]||this.fns._)(c,x,y,st||{})}};
const R=col=>(c,x,y)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle=col;c.fillRect(x+3,y+3,tw-6,th-6)};
WC.Gfx.fns._=R('#f0f');
Object.entries({player:'#e83',chaser:'#e4e',runner:'#4c4',foreman:'#fa0',fastchaser:'#f6a',fireball:'#f50',drum:'#a52',hdrum:'#c73',bomb:'#999'}).forEach(([k,v])=>WC.Gfx.fns[k]=R(v));
WC.Gfx.fns.floor=(c,x,y)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle='#2a6';c.fillRect(x,y+th-5,tw,5)};
WC.Gfx.fns.wall=(c,x,y,o)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle=WC.CONFIG.wall.colors[o.hp]||'#fff';c.fillRect(x,y+3,tw,th-6)};
WC.Gfx.fns.ladder=(c,x,y,o)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle=o.needsBreak?'#ec6':'#89b';c.fillRect(x+8,y,3,th);c.fillRect(x+tw-11,y,3,th);for(let i=4;i<th;i+=8)c.fillRect(x+8,y+i,tw-16,2)};
WC.Gfx.fns.door=(c,x,y,o)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle=o.isOpen?'#142':'#4a6';c.fillRect(x+4,y+2,tw-8,th-4)};
// 背景〜オブジェクトの描画(ゲームとエディタ共用)。床レイヤーの判定どおりに描く。
WC.Gfx.terrain=(c,L)=>{
 const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;
 for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++){
  // 梯子の下端は自動足場を描き、上端には自動足場を描かない。
  if(L.floor[y][x]||y==L.h-1)WC.Gfx.draw('floor',c,x*tw,y*th);
 }
 L.objs.forEach(o=>WC.Gfx.draw(o.kind,c,o.x*tw,(o.fy??o.y)*th,o))};
WC.Gfx.fns.iron=(c,x,y)=>{const tw=WC.CONFIG.tileW,th=WC.CONFIG.tileH;c.fillStyle='#778';c.fillRect(x+12,y,8,th)};

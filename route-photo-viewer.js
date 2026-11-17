(() => {
const css=document.createElement("style");
css.textContent=`
#detail .modal-embed-frame:has(.alagok-photo-view){height:clamp(300px,55vh,540px)}
.alagok-photo-view{height:100%;display:grid;grid-template-rows:minmax(0,1fr) auto;background:#06151e;color:#edf7f4;overflow:hidden}
.alagok-photo-view:fullscreen{width:100vw;height:100vh}
.alagok-photo-stage{position:relative;overflow:hidden;touch-action:none;cursor:grab;outline-offset:-3px;min-height:180px}
.alagok-photo-stage:active{cursor:grabbing}
.alagok-photo-stage img{position:static!important;display:block;width:100%!important;height:100%!important;max-width:none!important;object-fit:contain!important;animation:none!important;transform-origin:center;user-select:none;pointer-events:none}
.alagok-photo-toolbar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:10px;background:#102b36;border-top:1px solid #2d5159}
.alagok-photo-toolbar button{border:1px solid #42656b;border-radius:9px;background:#153641;color:#eef8f4;min-height:38px;min-width:38px;padding:6px 10px;font:inherit;font-size:13px;cursor:pointer}
.alagok-photo-toolbar button:hover{background:#23515b}
.alagok-photo-toolbar button:focus-visible{outline:2px solid #73d9b6}
.alagok-photo-caption{padding:10px 2px;font-size:12px;line-height:1.6;color:#b8cecb}
.alagok-photo-caption strong{color:#e6c273}
.alagok-photo-caption a{color:#83ddc1}
.alagok-photo-caption p{margin:3px 0}
`;document.head.append(css);
document.querySelectorAll('[data-modal-mode="vr360"],[data-tour-mode="vr360"]').forEach(b=>{b.textContent="🖼️ Fotoğrafı incele";b.setAttribute("aria-label","Rota fotoğrafını büyüt ve incele");});

function mount(container,options){
 const pano=typeof container==="string"?document.getElementById(container):container;
 const isTour=pano.id==="tour-pano";
 const frame=document.getElementById(isTour?"tour-embed":"d-embed");
 const captionId=isTour?"alagok-atlas-photo-caption":"alagok-photo-caption";
 const item=window.ACTIVITIES.find(x=>x.title===options.title)||{title:options.title||"Rota fotoğrafı",image:options.panorama,city:""};
 frame.hidden=true;frame.removeAttribute("src");pano.hidden=false;pano.replaceChildren();
 pano._alagokResize?.disconnect();
 const wrap=document.createElement("div");wrap.className="alagok-photo-view";
 const stage=document.createElement("div");stage.className="alagok-photo-stage";stage.tabIndex=0;stage.setAttribute("aria-label","Fotoğraf: sürükleyerek kadrajı kaydır, artı ve eksi ile büyüt");
 const img=document.createElement("img");img.alt=item.imageAlt||item.title;img.draggable=false;img.decoding="async";
 const bar=document.createElement("div");bar.className="alagok-photo-toolbar";bar.setAttribute("aria-label","Fotoğraf kontrolleri");
 let scale=1,x=0,y=0,drag=null;
 const percent=document.createElement("span");percent.style.fontSize="12px";percent.setAttribute("role","status");
 function paint(){const w=stage.clientWidth,h=stage.clientHeight,ratio=(img.naturalWidth||w)/(img.naturalHeight||h);const bw=Math.min(w,h*ratio),bh=bw/ratio;x=Math.max(-Math.max(0,(bw*scale-w)/2),Math.min(Math.max(0,(bw*scale-w)/2),x));y=Math.max(-Math.max(0,(bh*scale-h)/2),Math.min(Math.max(0,(bh*scale-h)/2),y));img.style.transform="translate("+x+"px,"+y+"px) scale("+scale+")";percent.textContent=Math.round(scale*100)+"%";}
 function zoom(delta){scale=Math.min(5,Math.max(1,scale+delta));paint();}
 function button(label,title,action){const b=document.createElement("button");b.type="button";b.textContent=label;b.title=title;b.setAttribute("aria-label",title);b.addEventListener("click",action);bar.append(b);return b;}
 button("−","Küçült",()=>zoom(-.25));button("+","Büyüt",()=>zoom(.25));
 button("←","Kadrajı sola kaydır",()=>{x+=45;paint();});button("↑","Kadrajı yukarı kaydır",()=>{y+=45;paint();});button("↓","Kadrajı aşağı kaydır",()=>{y-=45;paint();});button("→","Kadrajı sağa kaydır",()=>{x-=45;paint();});
 button("Sıfırla","Fotoğrafı başlangıç görünümüne getir",()=>{scale=1;x=y=0;paint();});
 button("⛶ Tam ekran","Tam ekran fotoğraf",async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await wrap.requestFullscreen();paint();}catch{percent.textContent="Tam ekran bu tarayıcıda açılamadı";}});
 bar.append(percent);
 stage.addEventListener("pointerdown",e=>{if(scale===1){scale=1.75;paint();}drag={px:e.clientX,py:e.clientY,x,y};stage.setPointerCapture(e.pointerId);stage.focus();});
 stage.addEventListener("pointermove",e=>{if(!drag)return;x=drag.x+e.clientX-drag.px;y=drag.y+e.clientY-drag.py;paint();});
 stage.addEventListener("pointerup",()=>drag=null);stage.addEventListener("pointercancel",()=>drag=null);
 stage.addEventListener("wheel",e=>{e.preventDefault();zoom(e.deltaY<0?.2:-.2);},{passive:false});
 stage.addEventListener("keydown",e=>{const key=e.key;if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","0"].includes(key))return;e.preventDefault();if(key==="+"||key==="=")zoom(.25);else if(key==="-")zoom(-.25);else if(key==="0"){scale=1;x=y=0;paint();}else{if(scale===1)scale=1.75;if(key==="ArrowLeft")x+=45;if(key==="ArrowRight")x-=45;if(key==="ArrowUp")y+=45;if(key==="ArrowDown")y-=45;paint();}});
 img.addEventListener("load",paint);img.addEventListener("error",()=>{img.hidden=true;const msg=document.createElement("p");msg.style.padding="20px";msg.textContent="Fotoğraf bu bağlantıda yüklenemedi. Aşağıdaki fotoğraf kaynağını açabilirsin.";stage.append(msg);});
 stage.append(img);wrap.append(stage,bar);pano.append(wrap);img.src=item.image||"";
 document.getElementById(captionId)?.remove();
 const caption=document.createElement("div");caption.id=captionId;caption.className=captionId;
 const brand=document.createElement("strong");brand.textContent="Anadoluyum VR · Rota inceleme";
 caption.append(brand);
 if(item.imageSource){const a=document.createElement("a");a.href=item.imageSource;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Fotoğraf kaynağı ↗";caption.append(a);}
 pano.parentElement.after(caption);
 if(window.ResizeObserver){pano._alagokResize=new ResizeObserver(paint);pano._alagokResize.observe(stage);}
 paint();
 return {destroy(){pano._alagokResize?.disconnect();if(pano.contains(wrap))wrap.remove();caption.remove();},resize:paint};
}
window.pannellum=window.pannellum||{};
const originalViewer=window.pannellum.viewer;
window.pannellum.viewer=function(container,options){
 const id=typeof container==="string"?container:container?.id;
 if(["d-pano","tour-pano"].includes(id)&&options.panorama&&options.haov!==360)return mount(container,options);
 if(originalViewer)return originalViewer.call(this,container,options);
 throw new Error("Bu panorama biçimi desteklenmiyor");
};
const active=document.querySelector("[data-tour-mode].active");
if(active?.dataset.tourMode==="vr360")active.click();
})();

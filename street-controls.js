(() => {
let sdk;
function loadMaps() {
 if(window.google?.maps?.StreetViewPanorama)return Promise.resolve();
 if(sdk)return sdk;
 sdk=new Promise((resolve,reject)=>{
  const key=typeof getGoogleMapsApiKey==="function"?getGoogleMapsApiKey():"";
  if(!key){reject(new Error("Harita bağlantısı kurulamadı"));return;}
  const callback="alagokStreetReady";
  window[callback]=resolve;
  const script=document.createElement("script");
  script.src="https://maps.googleapis.com/maps/api/js?key="+encodeURIComponent(key)+"&callback="+callback+"&loading=async";
  script.onerror=()=>reject(new Error("Street View yüklenemedi"));
  document.head.append(script);
  setTimeout(()=>{if(!window.google?.maps?.StreetViewPanorama)reject(new Error("Street View bağlantısı zaman aşımına uğradı"));},15000);
 });
 return sdk;
}
function enhance(frame,modeSelector) {
 if(!frame)return;
 const host=frame.parentElement;
 const overlay=document.createElement("div");
 overlay.hidden=true;
 overlay.style.cssText="position:absolute;inset:0;z-index:25;background:#102d39;display:none;grid-template-rows:minmax(0,1fr) auto";
 const viewer=document.createElement("div");viewer.style.cssText="min-height:200px;width:100%;height:100%";
 const bar=document.createElement("div");bar.style.cssText="display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px;background:#102d39;color:white";
 const status=document.createElement("span");status.style.cssText="font-size:12px;flex:1 1 160px";status.setAttribute("role","status");
 let panorama,version=0;
 const controls={};
 for(const [id,label] of [["left","↶ Sola dön"],["forward","↑ İlerle"],["back","↓ Geri git"],["right","Sağa dön ↷"]]){
 const b=document.createElement("button");b.type="button";b.textContent=label;b.className="tour-button";b.style.cssText="padding:8px 12px;font-size:13px";b.disabled=true;b.addEventListener("click",()=>move(id));controls[id]=b;bar.append(b);
 }
 bar.append(status);overlay.append(viewer,bar);host.style.position="relative";host.append(overlay);
 function nearest(back) {
 const heading=(panorama?.getPov().heading||0)+(back?180:0);
 return (panorama?.getLinks()||[]).filter(x=>x.pano).map(x=>({...x,diff:Math.abs(((x.heading-heading+540)%360)-180)})).filter(x=>x.diff<95).sort((a,b)=>a.diff-b.diff)[0];
 }
 function update(){
 const ready=panorama?.getStatus()===google.maps.StreetViewStatus.OK;
 controls.left.disabled=controls.right.disabled=!ready;
 controls.forward.disabled=!ready||!nearest(false);
 controls.back.disabled=!ready||!nearest(true);
 status.textContent=ready?((panorama.getLinks()||[]).length?"↑ ↓ ilerle · ← → dön · Görüntüyü sürükleyerek çevrene bak.":"Bu panoramada bağlantılı yürüyüş noktası yok; çevrene bakabilirsin."):"Bu konumda sokak panoraması bulunamadı.";
 }
 function move(id){
 if(!panorama||controls[id]?.disabled)return;
 if(id==="left"||id==="right"){const pov=panorama.getPov();panorama.setPov({...pov,heading:pov.heading+(id==="left"?-30:30)});}
 else {const link=nearest(id==="back");if(link)panorama.setPano(link.pano);}
 }
 overlay.tabIndex=0;
 overlay.addEventListener("keydown",e=>{
 if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
 const id={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"forward",ArrowDown:"back"}[e.key];
 if(id){e.preventDefault();e.stopPropagation();move(id);}
 });
 async function sync(){
 const versionNow=++version;
 const active=document.querySelector(modeSelector);
 if(!active||active.dataset.tourMode!=="streetview"&&active.dataset.modalMode!=="streetview"){overlay.style.display="none";return;}
 const src=frame.getAttribute("src")||"";
 if(!src.includes("/streetview")){overlay.style.display="none";return;}
 status.textContent="Street View hazırlanıyor…";
 try{
 await loadMaps();if(versionNow!==version)return;
 const url=new URL(src);const coords=url.searchParams.get("location")?.split(",").map(Number);
 if(!coords||coords.length!==2)return;
 const service=new google.maps.StreetViewService();
 const result=await service.getPanorama({location:{lat:coords[0],lng:coords[1]},radius:1000,preference:google.maps.StreetViewPreference.NEAREST,source:google.maps.StreetViewSource.OUTDOOR});
 if(versionNow!==version)return;
 overlay.style.display="grid";
 if(!panorama){
 panorama=new google.maps.StreetViewPanorama(viewer,{linksControl:true,clickToGo:true,panControl:true,zoomControl:true,fullscreenControl:true,showRoadLabels:true,motionTracking:false});
 for(const event of ["links_changed","pov_changed","status_changed"])panorama.addListener(event,update);
 }
 panorama.setPano(result.data.location.pano);
 panorama.setPov({heading:Number(url.searchParams.get("heading")||0),pitch:0});
 panorama.setVisible(true);update();
 }catch(error){if(versionNow!==version)return;overlay.style.display="none";note.textContent="Gömülü Street View’da görüntünün üzerindeki yön oklarını kullan. Ek yön paneli bu bağlantıda açılamadı; Google Maps’te aç seçeneğiyle devam edebilirsin.";}
 }
 const note=document.createElement("p");note.style.cssText="font-size:13px;padding:8px;color:inherit";note.textContent="Street View: görüntü üzerindeki oklarla yürü. Yön paneli açıldığında ↑ ↓ ilerletir, ← → döndürür. Bağlantılı panorama bulunması gerekir.";
 host.after(note);
 new MutationObserver(sync).observe(frame,{attributes:true,attributeFilter:["src"]});
 document.querySelectorAll("[data-tour-mode],[data-modal-mode]").forEach(b=>b.addEventListener("click",()=>setTimeout(sync,0)));
 sync();
}
enhance(document.getElementById("tour-embed"),"[data-tour-mode].active");
enhance(document.getElementById("d-embed"),"[data-modal-mode].active");
})();
(() => {
const creditFor = (item) => {
 const a = document.createElement("a");
 a.href=item.imageSource; a.target="_blank"; a.rel="noopener noreferrer";
 a.textContent="Fotoğraf: "+item.imageArtist+" · "+item.imageLicense;
 a.style.cssText="display:block;font-size:12px;line-height:1.5;padding:8px;color:inherit;overflow-wrap:anywhere";
 return a;
};
const update = () => {
 document.querySelectorAll(".route-detail").forEach(card=>{
  const item=window.ACTIVITIES.find(x=>x.title===card.querySelector("h3")?.textContent);
  if(item?.imageSource&&!card.querySelector("[data-photo-credit]")){
   const credit=creditFor(item);credit.dataset.photoCredit="true";
   card.querySelector(".route-detail-content")?.append(credit);
  }
 });
};
const root=document.getElementById("route-directory");
if(root)new MutationObserver(update).observe(root,{childList:true});
update();
const dialog=document.getElementById("detail");
if(dialog)new MutationObserver(()=>{
 if(!dialog.open)return;
 dialog.querySelector("[data-photo-credit]")?.remove();
 const item=window.ACTIVITIES.find(x=>x.title===document.getElementById("d-title")?.textContent);
 if(item?.imageSource){const credit=creditFor(item);credit.dataset.photoCredit="true";dialog.querySelector("article")?.append(credit);}
}).observe(dialog,{attributes:true,attributeFilter:["open"]});
})();
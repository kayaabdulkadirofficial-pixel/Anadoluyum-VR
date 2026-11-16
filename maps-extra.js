(() => {
const tour=document.querySelector(".visual-tour");
if(!tour)return;
const panel=document.createElement("div");panel.className="map-links";panel.style.padding="1rem";
for(const [label,url] of [["Mapillary sokak görüntüleri ↗","https://www.mapillary.com/app/?lat=39&lng=35&z=5"],["Panoramax fotoğraf haritası ↗","https://explore.panoramax.fr/"]]){
const a=document.createElement("a");a.className="btn ghost";a.textContent=label;a.href=url;a.target="_blank";a.rel="noopener noreferrer";panel.append(a);
}
tour.append(panel);
})();
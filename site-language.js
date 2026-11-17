/* Native Turkish / English interface; place names and editorial route texts retain their originals. */
(() => {
  "use strict";
  const translations = {
    "Keşfet":"Explore","360° Atlas":"360° Atlas","420 Rota":"420 Routes","VR Vizyonu":"VR Vision",
    "Yapay Zekâ Destekli Sanal Gerçeklik Rekreasyon Rehberi":"AI-powered virtual reality recreation guide",
    "Yerin Rengi, Göğün Ufku: Keşfetmenin Yeni Boyutu.":"Colours of the Earth, Horizons of the Sky: A New Dimension of Discovery.",
    "Nerede nefes alacağını, nasıl dinleneceğini ve nereye bakacağını gösteren rehber.":"Your guide to places to unwind, recharge and explore.",
    "Aktivite keşfet":"Explore activities","VR yol haritası":"VR roadmap","rota":"routes","şehir":"cities","kategori":"categories",
    "Gözlüksüz 360° & harita önizleme":"360° and map preview — no headset required",
    "Türkiye destinasyon atlası · 420 rota":"Türkiye destination atlas · 420 routes",
    "Görseller arasında ilerle, 360° Sokak Görünümü veya Uydu Harita moduna geçerek rotaları yerinde keşfet.":"Browse photos and explore destinations using available street imagery or satellite maps.",
    "Görsel Tur":"Photo Tour","Fotoğrafı incele":"Explore photo","Uydu & Konum":"Satellite & Location","Uydu & Harita":"Satellite & Map",
    "Önceki destinasyon":"Previous destination","Sonraki destinasyon":"Next destination","Sonraki":"Next","Duraklat":"Pause","Oynat":"Play",
    "Destinasyon seç":"Choose a destination","Görünüm modu":"View mode","Destinasyon görsel ve 360° önizlemesi":"Destination photos and 360° preview",
    "81 ilde 420 gezi önerisi: 54 millî park ve 279 tabiat parkını şehir ve kategoriye göre keşfet. Park adı veya şehir yazarak ara.":"420 trip ideas across 81 provinces: explore 54 national parks and 279 nature parks by city and category. Search by park or city.",
    "Tümü":"All","Doğa":"Nature","Şehir":"City","Kültür":"Culture","Su":"Water","Hareket":"Active","Aile":"Family",
    "Müzeler":"Museums","Arkeoloji":"Archaeology","İnanç":"Faith","Mağaralar":"Caves","Şelaleler":"Waterfalls","Termal":"Thermal",
    "Millî Parklar":"National Parks","Milli Parklar":"National Parks","Tabiat Parkları":"Nature Parks",
    "Şehir seç · Türkiye'nin 81 ili":"Choose a city · Türkiye’s 81 provinces","Tüm şehirler":"All cities","Aktivite filtreleri":"Activity filters",
    "Ara":"Search","Seçimleri temizle":"Clear filters",
    "Park adı, millî park, tabiat parkı veya şehir ara…":"Search for a park, national park, nature park or city…",
    "81 il · 420 gezi önerisi":"81 provinces · 420 trip ideas","420 rota · Şehir şehir keşfet":"420 routes · Explore city by city",
    "54 millî park, 279 tabiat parkı ve 87 diğer gezi rotası. Her kaydın ayrıntılarını ve Google Maps bağlantısını açabilirsin.":"54 national parks, 279 nature parks and 87 other routes. Open each route for details and its Google Maps location.",
    "Şehir, kategori veya park adıyla filtrele":"Filter by city, category or park name",
    "Rota içeriğinden başlayıp 360° ve etkileşimli VR adımlarına pilotlarla ilerle.":"Start with route content and develop 360° and interactive VR experiences through pilot projects.",
    "1. İçerik temeli":"1. Content foundation","Destinasyon, etkinlik, erişilebilirlik ve kaynak verisini standartlaştır.":"Standardise destination, activity, accessibility and source information.",
    "2. Web önizlemesi":"2. Web preview","Seçili rotalara mobil uyumlu 360° fotoğraflar ve sahne noktaları ekle.":"Add mobile-friendly 360° photos and scene points to selected routes.",
    "3. Etkileşimli pilot":"3. Interactive pilot","Az sayıda rotada bilgi etiketleri ve sahneler arası geçişi dene.":"Try information labels and scene navigation on a small set of routes.",
    "4. Cihaz ve konfor uyumu":"4. Device support and comfort","Performans, okunabilirlik, hareket konforu ve erişilebilirliği ölç.":"Evaluate performance, readability, movement comfort and accessibility.",
    "5. Ölçerek genişlet":"5. Grow through feedback","Yüklenme, görev tamamlama ve geri bildirime göre kapsamı büyüt.":"Expand based on loading performance, task completion and feedback.",
    "Detaylı rota rehberi":"Detailed route guide","Her rota için gezi özeti, planlama aşamaları, süre ve harita bağlantıları.":"Trip summaries, planning steps, durations and map links for each route.",
    "Gezi akışı":"Trip plan","Kaynak":"Source","Resmî kaynak":"Official source","Kapat":"Close",
    "Rota harita görünümü":"Route map view","Rota Google Maps Gömülü Görünümü":"Embedded Google Maps route view",
    "Google Maps Uydu ve Harita Gömülü Görünüm":"Embedded Google Maps satellite and map view",
    "Fotoğraf kaynakları ve lisanslar":"Photo sources and licences","Fotoğraf henüz eklenmedi":"Photo not yet available",
    "Alagök VR · Rota inceleme":"Alagök VR · Route explorer","Google’da gerçek 360° keşfet":"Explore real 360° imagery on Google",
    "Fotoğraf: rota görseli":"Photo: route image","Fotoğraf kaynağı":"Photo source","Görsel kaynağı":"Image source",
    "Fotoğrafı büyütüp sürükleyerek inceleyebilirsin. Bu bir yer fotoğrafıdır; gerçek 360° yürüyüş, Google Street View kapsamına bağlıdır.":"Zoom and drag to explore this photo. Real 360° walking depends on Google Street View coverage.",
    "Yakınlaştır":"Zoom in","Uzaklaştır":"Zoom out","Sıfırla":"Reset","Tam ekran":"Fullscreen"
  };
  const sorted = Object.entries(translations).sort((a,b) => b[0].length-a[0].length);
  const records = new WeakMap();
  const ignored = "script,style,noscript,code,textarea,[data-language-control]";
  let language = "tr";
  try { if(localStorage.getItem("alagok-language")==="en") language="en"; } catch {}
  const control = document.createElement("label");
  control.dataset.languageControl = "";
  control.className = "language-control";
  control.innerHTML = '<span>🌐 Dil / Language</span><select id="site-language" aria-label="Dil / Language"><option value="tr">Türkçe</option><option value="en">English</option></select>';
  document.querySelector(".topbar")?.append(control);
  const notice = document.createElement("p");
  notice.className = "language-notice"; notice.dataset.languageControl = "";
  notice.textContent = "English interface · Place names and route descriptions remain in their original Turkish.";
  notice.hidden = true; document.querySelector("main")?.prepend(notice);
  const style = document.createElement("style");
  style.textContent = '.language-control{display:flex;flex-direction:column;gap:5px;color:var(--muted,#aec9c0);font-size:.75rem;flex-shrink:0}.language-control select{font:inherit;font-size:.9rem;padding:8px 12px;color:#e8f4ee;background:#102b35;border:1px solid #47685e;border-radius:10px;min-height:40px}.language-notice{margin:16px 6vw;color:#b6cdc6;font-size:.9rem}.language-notice[hidden]{display:none!important}@media(max-width:850px){.topbar{flex-wrap:wrap}.topbar nav{order:3;width:100%;flex-wrap:wrap}.language-control{margin-left:auto}.brand{min-width:0}.brand small{max-width:210px}}';
  document.head.append(style);
  function english(text) {
    if(translations[text]) return translations[text];
    let result = text;
    // Whole labels embedded beside icons and counts; do not translate parts of place names.
    for (const [tr,en] of sorted) {
      const start = result.indexOf(tr);
      if(start<0) continue;
      const before=result.slice(0,start), after=result.slice(start+tr.length);
      if(!/[\p{L}]/u.test(before.replace(/Alagök VR/g,"")) && !/[\p{L}]/u.test(after)) {
        result=before+en+after; break;
      }
    }
    return result
      .replace(/Destinasyon seç · (\d+) rota/g,"Choose a destination · $1 routes")
      .replace(/Toplam (\d+) rotadan (\d+) rota gösteriliyor/g,"Showing $2 of $1 routes")
      .replace(/Toplam (\d+) rotadan (\d+) rota listeleniyor\.?/g,"Listing $2 of $1 routes.")
      .replace(/(\d+) rota listeleniyor\.?/g,"Listing $1 routes.")
      .replace(/Tüm şehirler/g,"All cities")
      .replace(/(\d+)\s*rota\b/g,"$1 routes")
      .replace(/(\d+(?:[–-]\d+)?) saat/g,"$1 hours")
      .replace(/(\d+) dakika/g,"$1 minutes")
      .replace(/Yarım gün/g,"Half day")
      .replace(/^İpucu: /,"Tip: ").replace(/^Gezi notu: /,"Trip note: ");
  }
  function changeText(node,attribute) {
    const current = attribute ? node.getAttribute(attribute) : node.nodeValue;
    if(!current?.trim()) return;
    const key=attribute||"text"; let record=records.get(node);
    if(!record) { record={}; records.set(node,record); }
    if(!record[key] || current!==record[key].last) record[key]={original:current,last:current};
    const source=record[key].original;
    const leading=source.match(/^\s*/)[0], trailing=source.match(/\s*$/)[0];
    const next=language==="en" ? leading+english(source.trim())+trailing : source;
    record[key].last=next;
    if(current!==next) { if(attribute) node.setAttribute(attribute,next); else node.nodeValue=next; }
  }
  function visit(root) {
    if(root.nodeType===Node.TEXT_NODE) {
      if(!root.parentElement?.closest(ignored)) changeText(root); return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE || root.closest(ignored)) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node; while((node=walker.nextNode())) if(!node.parentElement?.closest(ignored)) changeText(node);
    [root,...root.querySelectorAll("[placeholder],[aria-label],[title]")].forEach(el=>{
      if(el.closest(ignored)) return;
      ["placeholder","aria-label","title"].forEach(attr=>{if(el.hasAttribute(attr)) changeText(el,attr);});
    });
  }
  const select=control.querySelector("select"); select.value=language;
  function apply() {
    document.documentElement.lang=language; notice.hidden=language!=="en";
    visit(document.body);
    document.title=language==="en" ? "Alagök VR — Virtual Reality Recreation Guide" : "Alagök VR — Yapay Zekâ Destekli Sanal Gerçeklik Rekreasyon Rehberi";
  }
  select.addEventListener("change",()=>{
    language=select.value==="en"?"en":"tr";
    try {localStorage.setItem("alagok-language",language);} catch {}
    apply();
  });
  apply();
  const observer=new MutationObserver(mutations=>{
    for(const mutation of mutations) {
      if(mutation.type==="childList") mutation.addedNodes.forEach(visit);
      else if(mutation.type==="characterData") visit(mutation.target);
      else if(mutation.type==="attributes" && !mutation.target.closest(ignored)) changeText(mutation.target,mutation.attributeName);
    }
  });
  observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title"]});
})();
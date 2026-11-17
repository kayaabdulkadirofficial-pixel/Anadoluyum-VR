/* Complete Turkish / English / German interface and route translations. */
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
    "Anadoluyum VR · Rota inceleme":"Anadoluyum VR · Route explorer","Google’da gerçek 360° keşfet":"Explore real 360° imagery on Google",
    "Fotoğraf: rota görseli":"Photo: route image","Fotoğraf kaynağı":"Photo source","Görsel kaynağı":"Image source",
    "Fotoğrafı büyütüp sürükleyerek inceleyebilirsin. Bu bir yer fotoğrafıdır; gerçek 360° yürüyüş, Google Street View kapsamına bağlıdır.":"Zoom and drag to explore this photo. Real 360° walking depends on Google Street View coverage.",
    "Yakınlaştır":"Zoom in","Uzaklaştır":"Zoom out","Sıfırla":"Reset","Tam ekran":"Fullscreen"
  };
  const german = {
  "Explore": "Entdecken",
  "360° Atlas": "360°-Atlas",
  "420 Routes": "420 Routen",
  "VR Vision": "VR-Vision",
  "AI-powered virtual reality recreation guide": "KI-gestützter Freizeitführer mit virtueller Realität",
  "Colours of the Earth, Horizons of the Sky: A New Dimension of Discovery.": "Farben der Erde, Weite des Himmels: Eine neue Dimension des Entdeckens.",
  "Your guide to places to unwind, recharge and explore.": "Ihr Wegweiser zu Orten zum Durchatmen, Erholen und Entdecken.",
  "Explore activities": "Aktivitäten entdecken",
  "VR roadmap": "VR-Fahrplan",
  "routes": "Routen",
  "cities": "Städte",
  "categories": "Kategorien",
  "360° and map preview — no headset required": "360°- und Kartenvorschau — ohne VR-Brille",
  "Türkiye destination atlas · 420 routes": "Reiseatlas der Türkei · 420 Routen",
  "Browse photos and explore destinations using available street imagery or satellite maps.": "Entdecken Sie Reiseziele anhand von Fotos, verfügbaren Straßenaufnahmen und Satellitenkarten.",
  "Photo Tour": "Fototour",
  "Explore photo": "Foto erkunden",
  "Satellite & Location": "Satellit & Standort",
  "Satellite & Map": "Satellit & Karte",
  "Previous destination": "Vorheriges Reiseziel",
  "Next destination": "Nächstes Reiseziel",
  "Next": "Weiter",
  "Pause": "Pause",
  "Play": "Abspielen",
  "Choose a destination": "Reiseziel auswählen",
  "View mode": "Ansichtsmodus",
  "Destination photos and 360° preview": "Reiseziel-Fotos und 360°-Vorschau",
  "420 trip ideas across 81 provinces: explore 54 national parks and 279 nature parks by city and category. Search by park or city.": "420 Ausflugsideen in 81 Provinzen: Entdecken Sie 54 Nationalparks und 279 Naturparks nach Stadt und Kategorie. Suchen Sie nach Park oder Stadt.",
  "All": "Alle",
  "Nature": "Natur",
  "City": "Stadt",
  "Culture": "Kultur",
  "Water": "Wasser",
  "Active": "Bewegung",
  "Family": "Familie",
  "Museums": "Museen",
  "Archaeology": "Archäologie",
  "Faith": "Religion",
  "Caves": "Höhlen",
  "Waterfalls": "Wasserfälle",
  "Thermal": "Thermal",
  "National Parks": "Nationalparks",
  "Nature Parks": "Naturparks",
  "Choose a city · Türkiye’s 81 provinces": "Stadt auswählen · Die 81 Provinzen der Türkei",
  "All cities": "Alle Städte",
  "Activity filters": "Aktivitätsfilter",
  "Search": "Suchen",
  "Clear filters": "Filter zurücksetzen",
  "Search for a park, national park, nature park or city…": "Nach Park, Nationalpark, Naturpark oder Stadt suchen…",
  "81 provinces · 420 trip ideas": "81 Provinzen · 420 Ausflugsideen",
  "420 routes · Explore city by city": "420 Routen · Stadt für Stadt entdecken",
  "54 national parks, 279 nature parks and 87 other routes. Open each route for details and its Google Maps location.": "54 Nationalparks, 279 Naturparks und 87 weitere Routen. Öffnen Sie eine Route für Details und den Standort auf Google Maps.",
  "Filter by city, category or park name": "Nach Stadt, Kategorie oder Parkname filtern",
  "Start with route content and develop 360° and interactive VR experiences through pilot projects.": "Beginnen Sie mit Routeninhalten und entwickeln Sie in Pilotprojekten 360°- und interaktive VR-Erlebnisse.",
  "1. Content foundation": "1. Inhaltliche Grundlage",
  "Standardise destination, activity, accessibility and source information.": "Informationen zu Reisezielen, Aktivitäten, Barrierefreiheit und Quellen vereinheitlichen.",
  "2. Web preview": "2. Web-Vorschau",
  "Add mobile-friendly 360° photos and scene points to selected routes.": "Ausgewählte Routen um mobilfreundliche 360°-Fotos und Szenenpunkte ergänzen.",
  "3. Interactive pilot": "3. Interaktives Pilotprojekt",
  "Try information labels and scene navigation on a small set of routes.": "Informationstafeln und Szenenwechsel auf einigen Routen erproben.",
  "4. Device support and comfort": "4. Geräteunterstützung und Komfort",
  "Evaluate performance, readability, movement comfort and accessibility.": "Leistung, Lesbarkeit, Bewegungskomfort und Barrierefreiheit bewerten.",
  "5. Grow through feedback": "5. Anhand von Rückmeldungen erweitern",
  "Expand based on loading performance, task completion and feedback.": "Den Umfang anhand von Ladezeiten, Aufgabenerfüllung und Rückmeldungen erweitern.",
  "Detailed route guide": "Ausführlicher Routenführer",
  "Trip summaries, planning steps, durations and map links for each route.": "Ausflugsübersichten, Planungsschritte, Dauer und Kartenlinks für jede Route.",
  "Trip plan": "Ausflugsplan",
  "Source": "Quelle",
  "Official source": "Offizielle Quelle",
  "Close": "Schließen",
  "Route map view": "Routenkartenansicht",
  "Embedded Google Maps route view": "Eingebettete Google-Maps-Routenansicht",
  "Embedded Google Maps satellite and map view": "Eingebettete Google-Maps-Satelliten- und Kartenansicht",
  "Photo sources and licences": "Fotoquellen und Lizenzen",
  "Photo not yet available": "Foto noch nicht verfügbar",
  "Anadoluyum VR · Route explorer": "Anadoluyum VR · Routen erkunden",
  "Explore real 360° imagery on Google": "Echte 360°-Aufnahmen auf Google entdecken",
  "Photo: route image": "Foto: Routenbild",
  "Photo source": "Fotoquelle",
  "Image source": "Bildquelle",
  "Zoom and drag to explore this photo. Real 360° walking depends on Google Street View coverage.": "Vergrößern und verschieben Sie das Foto, um es zu erkunden. Echte 360°-Rundgänge hängen von der Google-Street-View-Abdeckung ab.",
  "Zoom in": "Vergrößern",
  "Zoom out": "Verkleinern",
  "Reset": "Zurücksetzen",
  "Fullscreen": "Vollbild"
};
  const sorted = Object.entries(translations).sort((a,b) => b[0].length-a[0].length);
  const fullTexts = window.ANADOLUYUM_TEXTS || {};
  for (const [tr,en] of Object.entries(translations)) {
    if(!fullTexts[tr]) fullTexts[tr]={en,de:german[en]||en};
  }
  const records = new WeakMap();
  const ignored = "script,style,noscript,code,textarea,[data-language-control]";
  let language = "tr";
  try { const saved=localStorage.getItem("alagok-language"); if(["en","de"].includes(saved)) language=saved; } catch {}
  const control = document.createElement("label");
  control.dataset.languageControl = "";
  control.className = "language-control";
  control.innerHTML = '<span>🌐 Dil / Language</span><select id="site-language" aria-label="Dil / Language"><option value="tr">Türkçe</option><option value="en">English</option><option value="de">Deutsch</option></select>';
  const languageHost=document.querySelector(".topbar");
  if(languageHost) languageHost.append(control); else document.body.prepend(control);
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
      if(!/[\p{L}]/u.test(before.replace(/Anadoluyum VR/g,"")) && !/[\p{L}]/u.test(after)) {
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
  function completeText(text) {
    if(fullTexts[text]) return fullTexts[text][language];
    const decorated=text.match(/^([^\p{L}\p{N}]*)(.*?)(\s*(?:\(\d+\)|[↗↑→])\s*)?$/u);
    if(decorated && fullTexts[decorated[2]]) return decorated[1]+fullTexts[decorated[2]][language]+(decorated[3]||"");
    const segments=text.split(" · ");
    if(segments.length>1) return segments.map(part=>translate(part.trim())).join(" · ");
    for(const prefix of ["İpucu: ","Gezi notu: ","Fotoğraf / görsel: ","Fotoğraf: ","Lisans: ","Kaynak: "]) {
      if(text.startsWith(prefix)) return fullTexts[prefix.trim()][language]+" "+translate(text.slice(prefix.length));
    }
    return null;
  }
  function translate(text) {
    if(language==="tr") return text;
    const complete=completeText(text);
    if(complete!==null) return complete;
    const en = english(text);
    if(language !== "de") return en
      .replace(/\(öneri\)/g,"(suggested)")
      .replace(/(\d+) rota mevcut/g,"$1 routes available")
      .replace(/(\d+) routes mevcut/g,"$1 routes available");
    if(german[en]) return german[en];
    for(const [label, translated] of Object.entries(german).sort((a,b)=>b[0].length-a[0].length)) {
      const start=en.indexOf(label);
      if(start<0) continue;
      const before=en.slice(0,start), after=en.slice(start+label.length);
      if(!/[\p{L}]/u.test(before.replace(/Anadoluyum VR/g,"")) && !/[\p{L}]/u.test(after)) return before+translated+after;
    }
    return en
      .replace(/Choose a destination · (\d+) routes/g,"Reiseziel auswählen · $1 Routen")
      .replace(/Showing (\d+) of (\d+) routes/g,"$1 von $2 Routen werden angezeigt")
      .replace(/Listing (\d+) of (\d+) routes\.?/g,"$1 von $2 Routen werden aufgelistet.")
      .replace(/Listing (\d+) routes\.?/g,"$1 Routen werden aufgelistet.")
      .replace(/All cities/g,"Alle Städte")
      .replace(/(\d+) routes/g,"$1 Routen")
      .replace(/(\d+(?:[–-]\d+)?) hours/g,"$1 Stunden")
      .replace(/(\d+) minutes/g,"$1 Minuten")
      .replace(/Half day/g,"Halber Tag")
      .replace(/\(öneri\)/g,"(Vorschlag)")
      .replace(/(\d+) Routen mevcut/g,"$1 Routen verfügbar")
      .replace(/^Tip: /,"Tipp: ").replace(/^Trip note: /,"Ausflugshinweis: ")
      .replace(/ destinasyon görünümü/g," – Reisezielansicht");
  }
  function changeText(node,attribute) {
    const current = attribute ? node.getAttribute(attribute) : node.nodeValue;
    if(!current?.trim()) return;
    const key=attribute||"text"; let record=records.get(node);
    if(!record) { record={}; records.set(node,record); }
    if(!record[key] || current!==record[key].last) record[key]={original:current,last:current};
    const source=record[key].original.replace(/Alagök VR/g,"Anadoluyum VR").replace(" (@alagokvr)","");
    const leading=source.match(/^\s*/)[0], trailing=source.match(/\s*$/)[0];
    const next=language!=="tr" ? leading+translate(source.trim())+trailing : source;
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
    [root,...root.querySelectorAll("[placeholder],[aria-label],[title],[alt]")].forEach(el=>{
      if(el.closest(ignored)) return;
      ["placeholder","aria-label","title","alt"].forEach(attr=>{if(el.hasAttribute(attr)) changeText(el,attr);});
    });
  }
  const select=control.querySelector("select"); select.value=language;
  function apply() {
    document.documentElement.lang=language;
    control.querySelector("span").textContent=language==="de"?"🌐 Sprache":language==="en"?"🌐 Language":"🌐 Dil";
    select.setAttribute("aria-label",language==="de"?"Sprache auswählen":language==="en"?"Choose language":"Dil seç");
    visit(document.body);
    const creditsPage=location.pathname.endsWith("image-credits.html");
    document.title=creditsPage ? (language==="de"?"Fotoquellen":language==="en"?"Photo sources":"Fotoğraf kaynakları")+" · Anadoluyum VR" : language==="de" ? "Anadoluyum VR — Freizeitführer mit virtueller Realität" : language==="en" ? "Anadoluyum VR — Virtual Reality Recreation Guide" : "Anadoluyum VR — Yapay Zekâ Destekli Sanal Gerçeklik Rekreasyon Rehberi";
    window.dispatchEvent(new CustomEvent("anadoluyum-language-change",{detail:{language}}));
  }
  select.addEventListener("change",()=>{
    language=["en","de"].includes(select.value)?select.value:"tr";
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
  observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title","alt"]});
  window.anadoluyumTranslate=(text,targetLanguage=language)=>{
    const previous=language;
    try {language=targetLanguage;return translate(text);} finally {language=previous;}
  };
  // Keep searches working in all languages without changing route identifiers or map queries.
  if(typeof matches==="function") {
    const originalMatches=matches;
    matches=function(item,query) {
      if(originalMatches(item,query))return true;
      if(!originalMatches(item,""))return false;
      const fields=["title","place","tag","body","tip"];
      const localised=fields.flatMap(field=>["en","de"].map(lang=>window.anadoluyumTranslate(item[field]||"",lang))).join(" ");
      const haystack=normalize(localised);
      return query.split(/\s+/).filter(Boolean).every(word=>haystack.includes(word));
    };
  }
})();

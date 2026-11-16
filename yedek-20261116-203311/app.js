const grid = document.getElementById("grid");
const search = document.getElementById("search");
const dialog = document.getElementById("detail");
const routeDirectory = document.getElementById("route-directory");
const chips = document.querySelectorAll(".filters .chip[data-filter]");

const citySelect = document.getElementById("city-select");
const citySummary = document.getElementById("city-summary");
const cityGoogleMap = document.getElementById("city-google-map");
let filter = "all";
const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
const categoryIcons = {"doga":"🌿","sehir":"🏙️","kultur":"🏛️","su":"🌊","spor":"🚴","aile":"👨‍👩‍👧","muze":"🖼️","arkeoloji":"🏺","inanc":"🕌","magara":"🪨","selale":"💧","termal":"♨️"};

const routeCount = document.getElementById("route-count");
const cityCount = document.getElementById("city-count");
if (routeCount) routeCount.textContent = window.ACTIVITIES.length;
if (cityCount) cityCount.textContent = new Set(window.ACTIVITIES.map(item => item.city)).size;
const categoryCount = document.getElementById("category-count");
if (categoryCount) categoryCount.textContent = new Set(window.ACTIVITIES.map(item => item.category)).size;

function getGoogleMapsApiKey() {
  return "";
}

function mapsSearchUrl(item) {
 const query = encodeURIComponent(`${item.place || item.title}, ${item.city}, Türkiye`);
 return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function streetViewDirectUrl(item) {
  if (item.lat != null && item.lng != null) {
    const heading = item.heading ?? 0;
    const pitch = item.pitch ?? 5;
    const fov = item.fov ?? 85;
    return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${item.lat},${item.lng}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
  }
  return mapsSearchUrl(item);
}

function buildEmbedUrl(item, mode) {
  const key = getGoogleMapsApiKey();
  const hasCoords = item.lat != null && item.lng != null;
  if (mode === "streetview") {
    if (!key || !hasCoords) return null;
    const heading = item.heading ?? 0;
    const pitch = item.pitch ?? 5;
    const fov = item.fov ?? 85;
    return `https://www.google.com/maps/embed/v1/streetview?key=${encodeURIComponent(key)}&location=${item.lat},${item.lng}&heading=${heading}&pitch=${pitch}&fov=${fov}&radius=50000&source=outdoor`;
  }
  const q = hasCoords ? `${item.lat},${item.lng}` : encodeURIComponent(`${item.place || item.title}, ${item.city}, Türkiye`);
  return `https://maps.google.com/maps?q=${q}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;
}

function matches(item, q) {
  const hay = normalize(`${item.title} ${item.city} ${item.tag} ${item.body}`);
  const okFilter = filter === "all" || item.category === filter;
  return okFilter && (!citySelect.value || item.city === citySelect.value) && hay.includes(q);
}

function render() {
  const q = normalize((search.value || "").trim());
  const items = window.ACTIVITIES.filter((item) => matches(item, q));
  const city = citySelect.value;
  const cityTotal = window.ACTIVITIES.filter(item => !city || item.city === city).length;
  citySummary.textContent = city
    ? `${city} · ${cityTotal ? cityTotal + " rota mevcut" : "Bu il için ayrıntılı rotalar henüz eklenmedi."}`
    : "81 il arasından seçim yapın veya tüm mevcut rotaları keşfedin.";
  for (const [link, provider] of [[cityGoogleMap, "google"]]) {
    link.hidden = !city;
    if (city) link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city + ", Türkiye")}`;
    else link.removeAttribute("href");
  }
  document.getElementById("result-count").textContent = `${city || "Tüm şehirler"} · ${items.length} rota gösteriliyor`;
  grid.innerHTML = items
    .map(
      (item) => `
      <button class="card" data-id="${item.id}">
        ${item.image ? `<img class="card-img" src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy" />` : `<div class="route-cover" aria-hidden="true"><span>${item.icon || categoryIcons[item.category] || "✦"}</span><small>${item.city} · ${item.tag}</small></div>`}
        <div class="card-body">
          <p class="tag"><span class="activity-icon" aria-hidden="true">${item.icon || categoryIcons[item.category] || "✦"}</span> ${item.tag} &middot; ${item.city}</p>
          <h3>${item.title}</h3>
          <p class="card-duration">${item.duration}</p>
        </div>
      </button>`
    )
    .join("");

  routeDirectory.innerHTML = items.map(item => {
    const place = item.place || item.title;
    let steps;
    if (item.category === "milli" || item.category === "tabiat") steps = ["Parkın resmî girişini ve güncel ziyaret koşullarını kontrol et.", place + " için izin verilen yürüyüş ve seyir alanlarını takip et.", "Atıkları yanında götür; ateş ve kamp kurallarını önceden kontrol et."];
    else if (["arkeoloji","muze","inanc","kultur"].includes(item.category)) steps = [place + " için ziyaret saati, bilet ve kapalı gün bilgisini doğrula.", "Mekânı ve kültürel mirası kendi akışında keşfet.", "Fotoğraf ve ziyaret kurallarına uy."];
    else if (["magara","selale"].includes(item.category)) steps = ["Mevsim, hava ve alanın ziyarete açık olup olmadığını kontrol et.", place + " çevresindeki işaretli ziyaret güzergâhını takip et.", "Zemin ve hava koşullarına uygun giysi ve ayakkabı seç."];
    else steps = [place + " için ulaşım ve hava durumunu yola çıkmadan kontrol et.", "Ziyaret alanında keşif ve manzara molası ver.", "Dönüş saatini ve ulaşım planını önceden belirle."];
    return '<article class="route-detail"><img src="' + item.image + '" alt="' + (item.imageAlt || place) + '" loading="lazy"><div class="route-detail-content"><p class="tag">' + (item.icon || "✦") + ' ' + item.tag + ' · ' + item.city + '</p><h3>' + item.title + '</h3><p>' + item.body + '</p><div class="route-facts"><span>⏱ ' + item.duration + '</span><span>📍 ' + place + '</span></div><h4>Gezi akışı</h4><ol>' + steps.map(step=>'<li>'+step+'</li>').join("") + '</ol><p class="tip">' + (item.tip || "Ziyaret öncesi açılış saatlerini, ulaşımı ve alan kurallarını doğrulayın.") + '</p><div class="map-links"><a class="btn primary" href="' + streetViewDirectUrl(item) + '" target="_blank" rel="noopener noreferrer">🌐 360° Gez ↗</a><a class="btn ghost" href="' + mapsSearchUrl(item) + '" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>' + (item.source ? '<a href="' + item.source + '" target="_blank" rel="noopener noreferrer">Kaynak ↗</a>' : '') + '</div></div></article>';
  }).join("");
  if (!items.length) {
    grid.innerHTML = city && !cityTotal
      ? "<p class='empty-state'>Bu şehir için ayrıntılı rota içeriği henüz eklenmedi. Yukarıdaki bağlantıdan şehir haritasını açabilir veya başka bir il seçebilirsiniz.</p>"
      : "<p class='empty-state'>Bu seçimlere uygun rota bulunamadı. Aramayı veya kategoriyi değiştirin ya da seçimleri temizleyin.</p>";
  }
}

let currentModalItem = null;
let currentModalMode = "streetview";
let modalPanoViewer = null;

function destroyModalPano() {
  if (modalPanoViewer) {
    try { modalPanoViewer.destroy(); } catch {}
    modalPanoViewer = null;
  }
}

function updateModalEmbed() {
  if (!currentModalItem) return;
  const iframe = document.getElementById("d-embed");
  const pano = document.getElementById("d-pano");
  if (!iframe || !pano) return;

  if (currentModalMode === "vr360" && window.pannellum && currentModalItem.image) {
    iframe.hidden = true;
    iframe.removeAttribute("src");
    pano.hidden = false;
    destroyModalPano();
    modalPanoViewer = window.pannellum.viewer("d-pano", {
      type: "equirectangular",
      panorama: currentModalItem.image,
      autoLoad: true,
      autoRotate: -2,
      haov: 150,
      vaov: 75,
      minPitch: -35,
      maxPitch: 35,
      hfov: 75,
      title: currentModalItem.title,
      author: `Alagök VR · ${currentModalItem.city}`
    });
    return;
  }

  destroyModalPano();
  pano.hidden = true;
  const url = buildEmbedUrl(currentModalItem, currentModalMode);
  if (url) {
    iframe.src = url;
    iframe.hidden = false;
  }
}

document.querySelectorAll("[data-modal-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-modal-mode]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentModalMode = btn.dataset.modalMode;
    updateModalEmbed();
  });
});

function openDetail(id) {
  const item = window.ACTIVITIES.find((a) => a.id === id);
  if (!item) return;
  currentModalItem = item;
  document.getElementById("d-tag").textContent = `${item.icon || categoryIcons[item.category] || "✦"} ${item.tag} \u00b7 ${item.city}`;
  document.getElementById("d-title").textContent = item.title;
  document.getElementById("d-meta").textContent = item.duration;
  document.getElementById("d-body").textContent = item.body;
  document.getElementById("d-tip").textContent = `\u0130pucu: ${item.tip}`;
  document.getElementById("d-streetview-map").href = streetViewDirectUrl(item);
  document.getElementById("d-google-map").href = mapsSearchUrl(item);
  const sourceLink = document.getElementById("d-source");
  sourceLink.hidden = !item.source;
  if (item.source) {
    sourceLink.href = item.source;
    sourceLink.textContent = (item.sourceLabel || "Resmî kaynak") + " ↗";
  } else sourceLink.removeAttribute("href");
  updateModalEmbed();
  dialog.showModal();
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
    chip.classList.add("active");
    chip.setAttribute("aria-pressed", "true");
    filter = chip.dataset.filter;
    render();
  });
});

search.addEventListener("input", render);
citySelect.addEventListener("change", render);
document.getElementById("reset-filters").addEventListener("click", () => {
  citySelect.value = "";
  search.value = "";
  filter = "all";
  chips.forEach(chip => { chip.classList.toggle("active", chip.dataset.filter === "all"); chip.setAttribute("aria-pressed", String(chip.dataset.filter === "all")); });
  render();
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) openDetail(card.dataset.id);
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

dialog.addEventListener("close", destroyModalPano);

document.querySelector(".close").addEventListener("click", () => dialog.close());

render();


// Lightweight photo tour preview + Keyless 360° Pannellum VR & Google Maps Satellite Embed
const tourScene = document.getElementById("tour-scene");
if (tourScene) {
  const tourSlides = window.ACTIVITIES.filter((item) => item.image);
  const tourImage = document.getElementById("tour-image");
  const tourStops = document.getElementById("tour-stops");
  const tourEmbed = document.getElementById("tour-embed");
  const tourPano = document.getElementById("tour-pano");
  const tourSvLink = document.getElementById("tour-sv-link");
  const modeButtons = document.querySelectorAll("[data-tour-mode]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tourIndex = 0;
  let tourTimer = null;
  let tourPlaying = !reducedMotion;
  let tourMode = "photo";
  let tourPanoViewer = null;

  function destroyTourPano() {
    if (tourPanoViewer) {
      try { tourPanoViewer.destroy(); } catch {}
      tourPanoViewer = null;
    }
  }

  function updateTourModeView(item) {
    if (!item) return;
    const svUrl = streetViewDirectUrl(item);
    if (tourSvLink) tourSvLink.href = svUrl;

    if (tourMode === "photo") {
      destroyTourPano();
      if (tourPano) tourPano.hidden = true;
      if (tourEmbed) { tourEmbed.hidden = true; tourEmbed.removeAttribute("src"); }
      return;
    }

    if (tourMode === "vr360" && window.pannellum && tourPano) {
      if (tourEmbed) { tourEmbed.hidden = true; tourEmbed.removeAttribute("src"); }
      tourPano.hidden = false;
      destroyTourPano();
      tourPanoViewer = window.pannellum.viewer("tour-pano", {
        type: "equirectangular",
        panorama: item.image,
        autoLoad: true,
        autoRotate: -2,
        haov: 150,
        vaov: 75,
        minPitch: -35,
        maxPitch: 35,
        hfov: 75,
        title: item.title,
        author: `Alagök VR · ${item.city}`
      });
      return;
    }

    destroyTourPano();
    if (tourPano) tourPano.hidden = true;
    const embedUrl = buildEmbedUrl(item, tourMode);
    if (embedUrl && tourEmbed) {
      tourEmbed.src = embedUrl;
      tourEmbed.hidden = false;
    }
  }

  function setTourMode(mode) {
    tourMode = mode;
    modeButtons.forEach((btn) => {
      const active = btn.dataset.tourMode === mode;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    if (tourScene) {
      tourScene.classList.remove("tour-mode-photo", "tour-mode-streetview", "tour-mode-vr360", "tour-mode-map");
      tourScene.classList.add(`tour-mode-${mode}`);
    }
    if (mode !== "photo" && tourPlaying) setTourPlaying(false);
    updateTourModeView(tourSlides[tourIndex]);
  }

  function showTourSlide(index) {
    if (!tourSlides.length) return;
    tourIndex = (index + tourSlides.length) % tourSlides.length;
    const item = tourSlides[tourIndex];
    tourScene.classList.remove("is-moving");
    tourImage.src = item.image;
    tourImage.alt = item.imageAlt || `${item.city} destinasyon görünümü`;
    document.getElementById("tour-location").textContent = `${item.city} · ${item.tag}`;
    document.getElementById("tour-title").textContent = item.title;
    document.getElementById("tour-description").textContent = item.body;
    document.getElementById("tour-duration").textContent = `◷ ${item.duration}`;
    document.getElementById("tour-category").textContent = `${item.icon || categoryIcons[item.category] || "✦"} ${item.tag}`;
    document.getElementById("tour-tip").textContent = `Gezi notu: ${item.tip}`;
    document.getElementById("tour-map-link").href = mapsSearchUrl(item);
    document.getElementById("tour-counter").textContent = `${tourIndex + 1} / ${tourSlides.length}`;
    tourStops.querySelectorAll("button").forEach((button, i) => {
      const active = i === tourIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
    updateTourModeView(item);
    requestAnimationFrame(() => tourScene.classList.add("is-moving"));
  }

  function setTourPlaying(playing) {
    tourPlaying = playing;
    const button = document.getElementById("tour-toggle");
    button.textContent = playing ? "⏸ Duraklat" : "▶ Oynat";
    button.setAttribute("aria-pressed", String(playing));
    if (tourTimer) window.clearInterval(tourTimer);
    tourTimer = playing ? window.setInterval(() => showTourSlide(tourIndex + 1), 8000) : null;
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => setTourMode(btn.dataset.tourMode));
  });

  tourStops.innerHTML = tourSlides.map((item, i) => `<button type="button" class="tour-stop" data-index="${i}" aria-label="${item.city}: ${item.title}" aria-current="false"><img src="${item.image}" alt="" loading="lazy"><span>${item.city}<small>${item.tag} · ${item.duration}</small></span></button>`).join("");
  tourStops.addEventListener("click", (event) => {
    const stop = event.target.closest("button[data-index]");
    if (stop) { showTourSlide(Number(stop.dataset.index)); setTourPlaying(false); }
  });
  document.getElementById("tour-prev").addEventListener("click", () => showTourSlide(tourIndex - 1));
  document.getElementById("tour-next").addEventListener("click", () => showTourSlide(tourIndex + 1));
  document.getElementById("tour-toggle").addEventListener("click", () => setTourPlaying(!tourPlaying));
  showTourSlide(0);
  setTourPlaying(tourPlaying);
}

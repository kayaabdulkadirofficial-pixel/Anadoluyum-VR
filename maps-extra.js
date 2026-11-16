(() => {
  const yandexUrl = (item, embed = false) => {
    const place = [item.place || item.title, item.city, "Türkiye"].filter(Boolean).join(", ");
    return (embed ? "https://yandex.com/map-widget/v1/?" : "https://yandex.com/maps/?") + "text=" + encodeURIComponent(place) + "&lang=tr_TR";
  };
  const link = (label, url) => {
    const a = document.createElement("a");
    a.className = "btn ghost";
    a.textContent = label;
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  };
  const citySelect = document.getElementById("city-select");
  const citySummary = document.querySelector(".city-summary");
  if (citySelect && citySummary) {
    let cityLink = document.getElementById("city-yandex-map");
    if (!cityLink) {
      cityLink = link("Yandex Maps ↗", "");
      cityLink.id = "city-yandex-map";
      citySummary.append(cityLink);
    }
    let cityFrame = document.getElementById("city-yandex-embed");
    if (!cityFrame) {
      const section = document.createElement("section");
      section.style.cssText = "grid-column:1/-1;width:100%;min-width:0";
      const heading = document.createElement("h4");
      heading.textContent = "Yandex Maps";
      cityFrame = document.createElement("iframe");
      cityFrame.id = "city-yandex-embed";
      cityFrame.title = "Şehir Yandex haritası";
      cityFrame.loading = "lazy";
      cityFrame.allowFullscreen = true;
      cityFrame.style.cssText = "width:100%;height:280px;border:0;border-radius:14px";
      section.append(heading, cityFrame);
      citySummary.append(section);
    }
    const updateCity = () => {
      const item = { city: citySelect.value || "Türkiye" };
      cityLink.hidden = false;
      cityLink.href = yandexUrl(item);
      cityFrame.src = yandexUrl(item, true);
    };
    citySelect.addEventListener("change", updateCity);
    document.getElementById("reset-filters")?.addEventListener("click", updateCity);
    updateCity();
  }
  const directory = document.getElementById("route-directory");
  const addRouteLinks = () => {
    directory?.querySelectorAll(".route-detail").forEach(card => {
      const title = card.querySelector("h3")?.textContent;
      const item = window.ACTIVITIES.find(route => route.title === title);
      const links = card.querySelector(".map-links");
      if (item && links && !links.querySelector('[href*="yandex."]')) {
        links.append(link("Yandex Maps ↗", yandexUrl(item)));
      }
    });
  };
  if (directory) {
    new MutationObserver(addRouteLinks).observe(directory, { childList: true });
    addRouteLinks();
  }
  const detail = document.getElementById("detail");
  if (detail) {
    new MutationObserver(() => {
      if (!detail.open) return;
      const item = window.ACTIVITIES.find(route => route.title === document.getElementById("d-title")?.textContent);
      const links = detail.querySelector(".map-links");
      if (!item || !links) return;
      let a = document.getElementById("d-yandex-map");
      if (!a) { a = link("Yandex Maps ↗", ""); a.id = "d-yandex-map"; links.append(a); }
      a.href = yandexUrl(item);
    }).observe(detail, { attributes: true, attributeFilter: ["open"] });
  }
  const tour = document.querySelector(".visual-tour");
  if (!tour) return;
  const extras = document.createElement("details");
  extras.className = "route-map-embeds";
  extras.style.cssText = "padding:1rem;min-width:0";
  const summary = document.createElement("summary");
  summary.textContent = "Yandex panorama ve diğer sokak görüntüleri";
  const frame = document.createElement("iframe");
  frame.title = "Yandex harita ve panorama keşfi";
  frame.loading = "lazy";
  frame.allowFullscreen = true;
  frame.style.cssText = "display:block;width:100%;height:420px;max-height:65vh;border:0;border-radius:14px;margin:1rem 0";
  const note = document.createElement("p");
  note.textContent = "Yandex haritasında panorama kapsaması olan noktaları seçerek çevrene bakabilirsin. Diğer kaynaklar kendi sitelerinde açılır; her konumda 360° görüntü bulunmayabilir.";
  const links = document.createElement("div");
  links.className = "map-links";
  const ya = link("Yandex Maps’te aç ↗", "");
  links.append(ya,
    link("Mapillary sokak görüntüleri ↗", "https://www.mapillary.com/app/?lat=39&lng=35&z=5"),
    link("Panoramax fotoğraf haritası ↗", "https://explore.panoramax.fr/"));
  extras.append(summary, note, frame, links);
  tour.append(extras);
  const updateTour = () => {
    const item = window.ACTIVITIES.find(route => route.title === document.getElementById("tour-title")?.textContent);
    if (!item) return;
    ya.href = yandexUrl(item);
    if (extras.open) frame.src = yandexUrl(item, true);
  };
  extras.addEventListener("toggle", () => { if (extras.open) updateTour(); else frame.removeAttribute("src"); });
  const title = document.getElementById("tour-title");
  if (title) new MutationObserver(updateTour).observe(title, { childList: true, characterData: true, subtree: true });
  updateTour();
})();

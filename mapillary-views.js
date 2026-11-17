/* Mapillary official capture embeds; no API token required. */
(() => {
  "use strict";
  const routes = window.ACTIVITIES || [];
  const storageKey = "alagok-mapillary-captures-v1";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch {}
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
  function captureId(value) {
    let source = String(value || "").trim();
    if (source.startsWith("<")) {
      source = new DOMParser().parseFromString(source, "text/html").querySelector("iframe")?.getAttribute("src") || "";
    }
    if (/^\d{6,30}$/.test(source)) return source;
    try {
      const url = new URL(source);
      if (url.protocol !== "https:" || !["mapillary.com", "www.mapillary.com"].includes(url.hostname)) return null;
      const id = url.searchParams.get("image_key") || url.searchParams.get("pKey");
      return /^\d{6,30}$/.test(id || "") ? id : null;
    } catch { return null; }
  }
  const style = document.createElement("style");
  style.textContent = `
    .mly-panel{padding:18px;border:1px solid #33525b;border-radius:16px;background:#102b35;color:#e0eeeb;margin:12px 0;overflow:hidden}
    .mly-panel[hidden]{display:none!important}.mly-panel h3{font-size:1.1rem;margin:0 0 8px}.mly-panel p{line-height:1.6;margin:8px 0}
    .mly-screen{width:100%;height:clamp(320px,55vh,590px);border:0;border-radius:12px;background:#0a1c24;display:block}
    .mly-screen[hidden]{display:none}.mly-panel form{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
    .mly-panel input{flex:1 1 220px;min-width:0;padding:12px;border:1px solid #55717a;border-radius:10px;background:#09212b;color:#fff}
    .mly-panel button,.mly-panel a.mly-link{display:inline-block;padding:10px 15px;border-radius:22px;background:#72d6b4;color:#09252b;font-weight:700;border:0;text-decoration:none;cursor:pointer}
    .mly-panel details{margin-top:14px}.mly-panel summary{cursor:pointer}.mly-status{font-size:.9rem;color:#b7ceca}.mly-panel label{display:block;margin-top:10px}
  `;
  document.head.append(style);
  function mount(kind, bar, stage, getItem) {
    if (!bar || !stage) return;
    const tab = document.createElement("button");
    tab.type = "button"; tab.className = "tour-mode-btn"; tab.textContent = "📷 Mapillary Sokak Görüntüleri";
    tab.setAttribute("aria-expanded", "false");
    tab.setAttribute("role", "tab"); tab.setAttribute("aria-selected", "false");
    const panel = document.createElement("section");
    panel.className = "mly-panel"; panel.hidden = true; panel.id = "mapillary-" + kind;
    tab.setAttribute("aria-controls", panel.id);
    panel.innerHTML = '<h3></h3><iframe class="mly-screen" title="Mapillary sokak görüntüleri" allow="fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" hidden></iframe><p class="mly-status" role="status"></p><a class="mly-link" target="_blank" rel="noopener noreferrer">Mapillary haritasında görüntü bul ↗</a><details><summary>Bu rotaya Mapillary görüntüsü bağla</summary><p>Mapillary’de bir fotoğraf seçin, Paylaş düğmesinden bağlantıyı veya gömme kodunu kopyalayın. Bağladığınız görüntü bu tarayıcıda saklanır.</p><form><label style="width:100%">Mapillary paylaşım bağlantısı veya gömme kodu</label><input type="text" required autocomplete="off" placeholder="https://www.mapillary.com/app/?pKey=…" aria-label="Mapillary paylaşım bağlantısı"><button type="submit">Görüntüyü aç ve kaydet</button><button type="button" class="mly-clear">Bağlantıyı kaldır</button></form></details>';
    bar.append(tab); stage.after(panel);
    const frame = panel.querySelector("iframe"), status = panel.querySelector("[role=status]");
    const input = panel.querySelector("input"), link = panel.querySelector("a");
    input.id = "mly-input-" + kind; panel.querySelector("label").htmlFor = input.id;
    let active = false, itemId = null, previousHidden = false;
    function render() {
      const item = getItem(); if (!item) return;
      if (itemId !== item.id) input.value = "";
      itemId = item.id;
      panel.querySelector("h3").textContent = item.city + " · " + item.title;
      const hasCoords = Number.isFinite(item.lat) && Number.isFinite(item.lng);
      link.href = hasCoords ? "https://www.mapillary.com/app/?lat=" + item.lat + "&lng=" + item.lng + "&z=16" : "https://www.mapillary.com/app/?lat=39&lng=35&z=5";
      const id = captureId(item.mapillaryImageId || item.mapillaryUrl || saved[item.id]);
      if (active && id) {
        const src = "https://www.mapillary.com/embed?image_key=" + id + "&style=classic";
        if (frame.getAttribute("src") !== src) frame.src = src;
        frame.hidden = false;
        status.textContent = "Görüntü içinde sürükleyerek çevreye bakın; mevcut yön oklarıyla görüntüler arasında ilerleyin. Her kayıt 360° olmayabilir. Açılmıyorsa Mapillary üzerinden deneyin.";
        link.href = "https://www.mapillary.com/app/?pKey=" + id + "&focus=photo";
        link.textContent = "Görüntüyü Mapillary’de aç ↗";
      } else {
        frame.hidden = true; frame.removeAttribute("src");
        status.textContent = hasCoords ? "Bu rotaya henüz sokak görüntüsü bağlanmadı. Konumdaki görüntülerden birini seçip paylaşım bağlantısını ekleyin." : "Bu rotaya henüz sokak görüntüsü bağlanmadı. Mapillary haritasında " + item.city + " / " + item.title + " konumunu bulup bir görüntü seçin.";
        link.textContent = "Mapillary haritasında görüntü bul ↗";
      }
    }
    tab.addEventListener("click", () => {
      if (!active) previousHidden = stage.hidden;
      active = true; stage.hidden = true; panel.hidden = false;
      bar.querySelectorAll("button").forEach(button => { button.classList.remove("active"); if (button.hasAttribute("aria-selected")) button.setAttribute("aria-selected", "false"); });
      tab.classList.add("active"); tab.setAttribute("aria-expanded", "true"); tab.setAttribute("aria-selected", "true");
      render();
    });
    bar.addEventListener("click", e => {
      if (!e.target.closest("button") || e.target.closest("button") === tab || !active) return;
      active = false; panel.hidden = true; stage.hidden = previousHidden;
      tab.classList.remove("active"); tab.setAttribute("aria-expanded", "false"); tab.setAttribute("aria-selected", "false"); frame.removeAttribute("src");
    });
    panel.querySelector("form").addEventListener("submit", e => {
      e.preventDefault(); const id = captureId(input.value), item = getItem();
      if (!id || !item) { status.textContent = "Geçerli bir Mapillary fotoğraf paylaşım bağlantısı veya gömme kodu ekleyin."; input.focus(); return; }
      saved[item.id] = id;
      try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
      catch { status.textContent = "Tarayıcı kaydetmeye izin vermedi; görüntü bu oturumda kullanılacak."; }
      render(); input.value = "";
      window.dispatchEvent(new Event("alagok-mapillary-change"));
    });
    panel.querySelector(".mly-clear").addEventListener("click", () => {
      const item = getItem(); if (!item) return; delete saved[item.id];
      try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch {}
      render(); window.dispatchEvent(new Event("alagok-mapillary-change"));
    });
    window.addEventListener("alagok-mapillary-change", render);
    const watch = document.getElementById(kind === "atlas" ? "tour-counter" : "d-title");
    if (watch) new MutationObserver(() => {
      if (active) { stage.hidden = true; render(); }
    }).observe(watch, {childList:true,characterData:true,subtree:true});
    if (kind === "detail") {
      const dialog = panel.closest("dialog");
      if (dialog) new MutationObserver(() => {
        if (!dialog.open) { frame.removeAttribute("src"); return; }
        if (active) render();
      }).observe(dialog, {attributes:true,attributeFilter:["open"]});
    }
  }
  mount("atlas", document.querySelector(".tour-mode-bar"), document.getElementById("tour-scene"), () => {
    const index = Number((document.getElementById("tour-counter")?.textContent || "1").split("/")[0].trim()) - 1;
    return routes[index] || routes[0];
  });
  mount("detail", document.querySelector(".modal-embed-tabs"), document.querySelector(".modal-embed-frame"), () =>
    typeof currentModalItem !== "undefined" && currentModalItem ? currentModalItem : null);
})();
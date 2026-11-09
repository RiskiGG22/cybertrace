/* ===== LIVE ATTACK ANIMATION ===== */
(function () {
  const RADAR_URL = "https://cybertrace-attacks.rap090921.workers.dev";
  const CENTROID = {US:[39,-98],CA:[56,-106],MX:[23,-102],BR:[-10,-52],AR:[-34,-64],CL:[-30,-71],CO:[4,-73],PE:[-10,-76],GB:[54,-2],IE:[53,-8],FR:[46,2],DE:[51,10],NL:[52,5],BE:[50.6,4.7],ES:[40,-4],PT:[39.5,-8],IT:[42,12.5],CH:[47,8],AT:[47.5,14],PL:[52,19],CZ:[49.8,15.5],SK:[48.7,19.5],HU:[47,19],RO:[46,25],BG:[42.7,25],RS:[44,21],HR:[45,15.5],SI:[46,14.8],GR:[39,22],TR:[39,35],SE:[62,15],NO:[61,9],FI:[64,26],DK:[56,10],LU:[49.8,6.1],RU:[61,100],UA:[49,32],BY:[53.7,28],MD:[47,28.5],GE:[42,43.5],AM:[40,45],AZ:[40.5,47.5],KZ:[48,68],UZ:[41,64],IL:[31,35],SA:[24,45],AE:[24,54],IR:[32,53],IQ:[33,44],EG:[27,30],ZA:[-29,24],NG:[9,8],KE:[0,38],MA:[32,-6],IN:[21,78],PK:[30,70],BD:[24,90],LK:[7.9,80.7],NP:[28,84],MM:[21,96],TH:[15,101],VN:[16,106],KH:[12.5,105],LA:[18,103],MY:[4,102],SG:[1.35,103.8],ID:[-2.5,118],PH:[12,122],CN:[35,105],HK:[22.3,114.2],TW:[23.7,121],JP:[36,138],KR:[36.5,128],MN:[46,105],AU:[-25,134],NZ:[-41,174]};
  let pairs = [];
  const TARGET = { name: "Indonesia", lat: -6.2, lon: 106.8 };
  const MAX_ARCS = 5, MIN_GAP = 900, MAX_GAP = 1800, FEED_MAX = 6;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stats = null;
  const WORLD_VB = "0 20 720 270";
  const INDO_VB = "470 130 250 94";
  let zoomed = true;

  const baseRender = window.renderStats;
  window.renderStats = function (s) { stats = s; return baseRender.apply(this, arguments); };

  const st = document.createElement("style");
  st.textContent =
    "#mapPoints,#visitorPoints{display:none}" +
    ".atk-label{fill:#fff;font-weight:600;paint-order:stroke;stroke:#050506;stroke-width:2.2px;stroke-linejoin:round;opacity:0;animation:atkLabel 2.1s ease-out forwards;pointer-events:none}" +
    "@keyframes atkLabel{0%{opacity:0}12%{opacity:1}70%{opacity:1}100%{opacity:0}}" +
    ".atk-target{fill:var(--accent);font-weight:700;letter-spacing:.1em;paint-order:stroke;stroke:#050506;stroke-width:2px;pointer-events:none}" +
    ".atk-arc{fill:none;stroke:var(--accent);stroke-width:1.1;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;opacity:.95;filter:drop-shadow(0 0 2px var(--accent));animation:atkDraw .9s ease-out forwards,atkFade .9s ease-in 1s forwards}" +
    "@keyframes atkDraw{to{stroke-dashoffset:0}}@keyframes atkFade{to{opacity:0}}" +
    ".atk-arc,.atk-head,.atk-ring{pointer-events:none}" +
    ".atk-arc.out{stroke:#ffb703;filter:drop-shadow(0 0 2px #ffb703)}" +
    ".atk-row .dir{display:inline-block;min-width:44px;font-size:8.5px;font-weight:700;letter-spacing:.08em;margin-right:6px;color:var(--accent)}.atk-row .dir.out{color:#ffb703}" +
    ".atk-head{fill:#fff;filter:drop-shadow(0 0 3px var(--accent))}" +
    ".atk-ring{fill:none;stroke:#fff;stroke-width:1;transform-box:fill-box;transform-origin:center;animation:atkRing 1.1s ease-out forwards}" +
    "@keyframes atkRing{from{transform:scale(.3);opacity:1}to{transform:scale(4);opacity:0}}" +
    "#attackFeed{margin:12px 0 4px;border:1px solid var(--border);border-radius:10px;padding:6px 10px;background:rgba(6,6,8,.6)}" +
    "#attackFeed .atk-title{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:9px;letter-spacing:.14em;color:var(--accent);font-weight:700;padding:4px 0}" +
    ".atk-btn{background:transparent;border:1px solid var(--accent);color:var(--accent);border-radius:999px;font-size:9px;font-weight:700;letter-spacing:.08em;padding:4px 10px;cursor:pointer}" +
    ".atk-row{display:grid;grid-template-columns:58px 1fr;gap:8px;font-size:10.5px;padding:5px 0;border-top:1px solid var(--border);animation:atkIn .35s ease-out}" +
    ".atk-row time{color:var(--muted);font-family:ui-monospace,monospace}" +
    ".atk-row b{font-weight:600}.atk-row span{color:var(--muted)}" +
    "@keyframes atkIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}";
  document.head.append(st);

  const svg = $("worldMap");
  const layer = svgEl("g", { id: "attackLayer" });
  svg.append(layer);

  const [tx, ty] = project(TARGET.lon, TARGET.lat);
  const mark = svgEl("circle", { cx: tx.toFixed(1), cy: ty.toFixed(1), r: "2.5", class: "world-target" });
  svg.append(mark);
  const tlabel = svgEl("text", { x: tx.toFixed(1), y: (ty + 12).toFixed(1), class: "atk-target", "text-anchor": "middle" });
  tlabel.textContent = "INDONESIA"; svg.append(tlabel);
  function applyView() {
    svg.setAttribute("viewBox", zoomed ? INDO_VB : WORLD_VB);
    mark.setAttribute("r", zoomed ? "1.4" : "2.5");
    tlabel.style.fontSize = zoomed ? "5px" : "13px";
    tlabel.setAttribute("y", (ty + (zoomed ? 8 : 18)).toFixed(1));
    btn.textContent = zoomed ? "LIHAT DUNIA" : "FOKUS INDONESIA";
  }

  const feed = el("div"); feed.id = "attackFeed";
  const titleRow = el("div", "atk-title");
  const titleSpan = el("span", null, "LIVE ATTACK FEED · VISUALISASI");
  titleRow.append(titleSpan);
  const btn = el("button", "atk-btn", "");
  btn.type = "button";
  btn.addEventListener("click", (e) => { e.stopPropagation(); zoomed = !zoomed; applyView(); });
  titleRow.append(btn);
  feed.append(titleRow);
  const list = el("div"); feed.append(list);
  const cl = $("countryList"); cl.parentNode.insertBefore(feed, cl);
  applyView();
    function pick(items, weightOf) {
    const total = items.reduce((a, x) => a + weightOf(x), 0);
    let r = Math.random() * total;
    for (const x of items) { r -= weightOf(x); if (r <= 0) return x; }
    return items[items.length - 1];
  }

  function drawArc(host, g, vb, k, fs) {
    const arc = svgEl("path", { d: g.d, class: "atk-arc" + (g.out ? " out" : ""), pathLength: "1" });
    arc.style.strokeWidth = (1.1 * k).toFixed(2);
    const ring = svgEl("circle", { cx: g.x2.toFixed(1), cy: g.y2.toFixed(1), r: (3 * k).toFixed(2), class: "atk-ring" });
    ring.style.animationDelay = reduce ? "0s" : ".85s";
    const head = svgEl("circle", { r: (2 * k).toFixed(2), class: "atk-head" });
    head.append(svgEl("animateMotion", { dur: ".9s", fill: "freeze", path: g.d }));
    const m = vb[2] * 0.012;
    let lx = g.out ? g.x2 : g.x1, ly = g.out ? g.y2 : g.y1;
    for (let i = 0; i <= 80; i++) {
      const t = g.out ? 1 - i / 80 : i / 80, u = 1 - t;
      const bx = u * u * g.x1 + 2 * u * t * g.cx + t * t * g.x2, by = u * u * g.y1 + 2 * u * t * g.cy + t * t * g.y2;
      if (bx >= vb[0] + m && bx <= vb[0] + vb[2] - m && by >= vb[1] + m && by <= vb[1] + vb[3] - m) { lx = bx; ly = by; break; }
    }
    const left = lx < vb[0] + vb[2] / 2;
    const label = svgEl("text", { x: (lx + (left ? 0.5 : -0.5) * fs).toFixed(1), y: (ly + fs * 0.9).toFixed(1), class: "atk-label", "text-anchor": left ? "start" : "end" });
    label.style.fontSize = fs.toFixed(2) + "px"; label.style.strokeWidth = (fs * 0.4).toFixed(2) + "px"; label.textContent = g.name;
    host.append(arc, head, ring, label);
    setTimeout(() => { arc.remove(); head.remove(); ring.remove(); label.remove(); }, 2300);
      }  function fire() {
    if (document.hidden) return;
    let src, dst, malName, tag = "MASUK", out = false;
    if (pairs.length) {
      const ins = pairs.filter((x) => x.dir !== "out"), outs = pairs.filter((x) => x.dir === "out");
      const pool = ins.length && outs.length ? (Math.random() < 0.5 ? ins : outs) : pairs;
      const p = pick(pool, (x) => x.value || 0.0001);
      if (p.dir === "out") {
        const c = CENTROID[p.to];
        src = { name: TARGET.name, lat: TARGET.lat, lon: TARGET.lon };
        dst = { name: p.toName || p.to, lat: c[0], lon: c[1] };
        malName = "Serangan keluar"; tag = "KELUAR"; out = true;
      } else {
        const c = CENTROID[p.from];
        src = { name: p.fromName || p.from, lat: c[0], lon: c[1] };
        dst = { name: TARGET.name, lat: TARGET.lat, lon: TARGET.lon };
        malName = "Serangan masuk";
      }
    } else {
      if (!stats) { try { stats = readCache(); } catch (e) { /* abaikan */ } }
      if (!geoData.length || !stats || !stats.topMalware || !stats.topMalware.length) return;
      const srcs = geoData.filter((c) => !(Math.abs(c.lat - TARGET.lat) < 3 && Math.abs(c.lon - TARGET.lon) < 3));
      if (!srcs.length) return;
      src = pick(srcs, (c) => c.count);
      dst = { name: TARGET.name, lat: TARGET.lat, lon: TARGET.lon };
      const mal = pick(stats.topMalware, (m) => m.count || m[1] || 1);
      malName = mal.name || mal.label || mal[0] || "Unknown";
    }

    const [x1, y1] = project(src.lon, src.lat), [x2, y2] = project(dst.lon, dst.lat);
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - dist * 0.35;
    const d = "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1);
    const geo = { x1, y1, x2, y2, cx, cy, d, out, name: out ? dst.name : src.name };

    while (layer.childElementCount > MAX_ARCS * 4) layer.firstChild.remove();
    drawArc(layer, geo, (zoomed ? INDO_VB : WORLD_VB).split(" ").map(Number), zoomed ? 0.7 : 1, zoomed ? 5 : 18);

    const msvg = document.querySelector("#mapModal .mm-svg");
    if (msvg) {
      let ml = msvg.querySelector("#atkModalLayer");
      if (!ml) { ml = svgEl("g", { id: "atkModalLayer" }); msvg.append(ml); }
      const mv = (msvg.getAttribute("viewBox") || "0 0 720 360").trim().split(/\s+/).map(Number);
      if (mv.length === 4 && mv.every(Number.isFinite)) {
        const kk = mv[2] / 720;
        while (ml.childElementCount > MAX_ARCS * 4) ml.firstChild.remove();
        drawArc(ml, geo, mv, 1.6 * kk, 20 * kk);
      }
    }

    const t = new Date(), p = (n) => String(n).padStart(2, "0");
    const row = el("div", "atk-row");
    const b = el("b", null, malName);
    const dirEl = el("span", "dir" + (out ? " out" : ""), tag);
    row.append(el("time", null, p(t.getHours()) + ":" + p(t.getMinutes()) + ":" + p(t.getSeconds())),
               (() => { const w = el("div"); w.append(dirEl, b, el("span", null, " · " + src.name + " → " + dst.name)); return w; })());
    list.prepend(row);
    while (list.childElementCount > FEED_MAX) list.lastChild.remove();
  }

  async function loadRadar() {
    if (!RADAR_URL) return;
    try {
      const r = await fetch(RADAR_URL.replace(/\/$/, "") + "/attacks?to=ID&range=7d");
      if (!r.ok) throw new Error("radar");
      const j = await r.json();
      pairs = (j.pairs || []).filter((p) => CENTROID[p.from] && CENTROID[p.to]);
      titleSpan.textContent = pairs.length ? "SERANGAN DARI & KE INDONESIA · CLOUDFLARE RADAR · 7 HARI" : "LIVE ATTACK FEED · VISUALISASI";
    } catch (e) { pairs = []; titleSpan.textContent = "LIVE ATTACK FEED · VISUALISASI"; }
  }
  loadRadar(); setInterval(loadRadar, 10 * 60 * 1000);

  (function loop() {
    fire();
    setTimeout(loop, (reduce ? 2 : 1) * (MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP)));
  })();
})();

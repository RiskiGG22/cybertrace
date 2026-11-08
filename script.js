"use strict";

/* ===== HALAMAN LOADING / INTRO ===== */
try { (function introScreen() {
  const SLIDES = [
    { kind: "radar", eyebrow: "THREAT INTELLIGENCE PLATFORM", title: "CyberTrace", text: "Platform pemantau ancaman siber global. Datanya diambil langsung dari ThreatFox (abuse.ch), bukan data contoh." },
    { kind: "net", nodes: [[60, 200], [110, 90], [190, 150], [240, 70], [230, 230]], edges: [[0, 1], [1, 2], [2, 3], [2, 4]], hot: 2, eyebrow: "LIVE THREAT FEED", title: "Ancaman terbaru, langsung dari sumbernya", text: "Indikator malware, server C2, dan phishing yang dilaporkan komunitas dalam 24 jam terakhir, lengkap dengan grafik tren dan malware terbanyak." },
    { kind: "net", nodes: [[50, 120], [130, 60], [150, 170], [250, 110], [210, 240], [80, 240]], edges: [[0, 1], [1, 3], [1, 2], [2, 4], [2, 5]], hot: 2, eyebrow: "GLOBAL THREAT MAP", title: "Lihat di mana server penyerang berada", text: "Lokasi server C2 dipetakan lewat GeoIP. Buka peta layar penuh, zoom, geser, lalu ketuk titik untuk melihat koordinat dan membukanya di Google Maps.", note: "Lokasi bersifat perkiraan, bukan alamat atau identitas pelaku." },
    { kind: "net", nodes: [[150, 50], [70, 140], [230, 140], [110, 240], [200, 240]], edges: [[0, 1], [0, 2], [1, 3], [2, 4], [1, 2]], hot: 0, eyebrow: "INDICATOR ANALYSIS", title: "Periksa IP atau domain yang mencurigakan", text: "Cek apakah sebuah IP atau domain terdaftar di database ancaman. Hasilnya lengkap dengan Risk Score, lokasi, ISP, dan jenis jaringannya.", note: "Tidak ditemukan bukan jaminan aman." },
    { kind: "net", nodes: [[60, 80], [150, 140], [240, 80], [80, 230], [220, 230]], edges: [[0, 1], [1, 2], [1, 3], [1, 4]], hot: 1, eyebrow: "LIVE VISITOR & CASES", title: "Pantau pengunjung, simpan hasil investigasi", text: "Setiap pengunjung dicek otomatis dan muncul real time di peta. Temuan penting bisa disimpan sebagai kasus investigasi." },
    { kind: "final" }
  ];
  const STEP_MS = 4200, LAST = SLIDES.length - 1, NS = "http://www.w3.org/2000/svg";
  const mk = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const sv = (tag, attrs) => { const n = document.createElementNS(NS, tag); Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v)); return n; };

  const css = document.createElement("style");
  css.textContent = "#intro{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;background:radial-gradient(900px 500px at 80% -10%,rgba(255,43,58,.22),transparent 60%),#050506;color:#fff;font-family:var(--body,Inter,system-ui,sans-serif);transition:opacity .6s ease,visibility .6s}#intro.out{opacity:0;visibility:hidden;pointer-events:none}" +
    ".in-top{display:flex;justify-content:space-between;align-items:center;padding:calc(14px + env(safe-area-inset-top,0px)) 20px 10px}.in-brand{color:var(--accent,#ff2b3a);font-family:var(--head,'Barlow Condensed',Arial,sans-serif);font-size:22px;font-weight:700;letter-spacing:1.5px}.in-skip{background:transparent;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:999px;padding:0 16px;min-height:34px;font-size:10px;letter-spacing:1.5px;font-weight:600;cursor:pointer}" +
    ".in-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:5vw;padding:0 6vw;cursor:pointer}.in-art{flex:0 0 auto;width:min(42vw,420px);aspect-ratio:1}.in-art svg{width:100%;height:100%;overflow:visible}.in-copy{flex:0 1 480px;animation:in-rise .7s cubic-bezier(.2,.8,.2,1) both}" +
    ".in-eyebrow{color:var(--accent,#ff2b3a);font-size:10px;letter-spacing:2.4px;font-weight:600}.in-title{font-family:var(--head,'Barlow Condensed',Arial,sans-serif);font-size:clamp(28px,5vw,46px);font-weight:600;line-height:1.05;margin:10px 0 12px}.in-text{color:#c9c9cf;font-size:14px;line-height:1.6;margin:0}.in-note{color:var(--muted,#a6a6ad);font-size:11px;margin:10px 0 0}" +
    ".in-big{font-family:var(--head,'Barlow Condensed',Arial,sans-serif);font-size:clamp(30px,6.4vw,64px);font-weight:600;line-height:1.08;max-width:900px;animation:in-rise .7s cubic-bezier(.2,.8,.2,1) both}.in-big em{font-style:normal;color:var(--accent,#ff2b3a)}.in-go{margin-top:26px;background:var(--accent,#ff2b3a);color:#fff;border:0;border-radius:999px;min-height:46px;padding:0 28px;font-size:11px;letter-spacing:1.5px;font-weight:700;cursor:pointer}" +
    ".in-bottom{padding:12px 20px calc(18px + env(safe-area-inset-bottom,0px))}.in-dots{display:flex;gap:8px;justify-content:center}.in-dots i{display:block;width:8px;height:8px;border-radius:999px;background:rgba(255,255,255,.25);cursor:pointer;transition:width .3s,background .3s}.in-dots i.on{width:26px;background:var(--accent,#ff2b3a)}" +
    ".in-bar{height:2px;margin:14px auto 0;max-width:420px;background:rgba(255,255,255,.14);border-radius:999px;overflow:hidden}.in-bar i{display:block;height:100%;width:0;background:var(--accent,#ff2b3a)}.in-bar i.run{animation:in-fill " + STEP_MS + "ms linear forwards}.in-bar i.full{width:100%}.in-status{text-align:center;margin-top:12px;font-size:9.5px;letter-spacing:1.4px;color:var(--muted,#a6a6ad)}.in-status.ok{color:var(--accent,#ff2b3a)}" +
    ".in-edge{fill:none;stroke:rgba(255,255,255,.55);stroke-width:1.4;stroke-dasharray:1;stroke-dashoffset:1;animation:in-draw .8s ease forwards}.in-node{fill:#25252a;stroke:rgba(255,255,255,.7);stroke-width:1.6;opacity:0;animation:in-fade .5s ease forwards}.in-node.hot{fill:var(--accent,#ff2b3a);stroke:#fff}.in-pulse{fill:none;stroke:var(--accent,#ff2b3a);stroke-width:1.5;transform-box:fill-box;transform-origin:center;animation:in-ping 2s ease-out infinite}" +
    ".in-ring{fill:none;stroke:rgba(255,255,255,.2);stroke-width:1.2}.in-arc{fill:none;stroke:var(--accent,#ff2b3a);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:in-spin 6s linear infinite}.in-arc.b{stroke:rgba(255,255,255,.5);stroke-width:2;animation-duration:9s;animation-direction:reverse}.in-eye{fill:var(--accent,#ff2b3a);font-size:54px;text-anchor:middle;dominant-baseline:central}" +
    "@keyframes in-draw{to{stroke-dashoffset:0}}@keyframes in-fade{to{opacity:1}}@keyframes in-ping{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.6);opacity:0}}@keyframes in-spin{to{transform:rotate(360deg)}}@keyframes in-fill{to{width:100%}}@keyframes in-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}" +
    "@media(max-width:760px){.in-stage{flex-direction:column;gap:18px;padding:0 22px;justify-content:center}.in-art{width:min(62vw,36vh)}.in-copy{flex:0 0 auto;max-width:100%;text-align:center}.in-text{font-size:13px}}" +
    "@media(prefers-reduced-motion:reduce){#intro *{animation-duration:.01ms!important;animation-delay:0s!important}}";
  document.head.append(css);

  const root = document.getElementById("intro") || mk("div"); root.id = "intro"; root.dataset.ready = "1"; root.replaceChildren();
  if (!root.parentNode) document.body.prepend(root);
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = "hidden";

  const top = mk("div", "in-top"); const skip = mk("button", "in-skip", "LEWATI"); top.append(mk("div", "in-brand", "◈ CYBERTRACE"), skip);
  const stage = mk("div", "in-stage");
  const bottom = mk("div", "in-bottom"); const dots = mk("div", "in-dots"); const bar = mk("div", "in-bar"); const fill = mk("i"); bar.append(fill);
  const status = mk("div", "in-status", "● MENGHUBUNGKAN KE THREATFOX...");
  const dotEls = SLIDES.map((_, i) => { const d = mk("i"); d.addEventListener("click", (e) => { e.stopPropagation(); show(i); }); dots.append(d); return d; });
  bottom.append(dots, bar, status); root.append(top, stage, bottom);

  function art(sl) {
    const svg = sv("svg", { viewBox: "0 0 300 300", role: "img", "aria-hidden": "true" });
    if (sl.kind === "radar") {
      [50, 95, 140].forEach((r) => svg.append(sv("circle", { cx: 150, cy: 150, r: r, class: "in-ring" })));
      svg.append(sv("circle", { cx: 150, cy: 150, r: 140, class: "in-arc", "stroke-dasharray": "90 790" }));
      svg.append(sv("circle", { cx: 150, cy: 150, r: 95, class: "in-arc b", "stroke-dasharray": "120 480" }));
      const t = sv("text", { x: 150, y: 150, class: "in-eye" }); t.textContent = "◈"; svg.append(t);
      return svg;
    }
    sl.edges.forEach(([a, b], i) => {
      const e = sv("path", { d: "M" + sl.nodes[a].join(" ") + " L" + sl.nodes[b].join(" "), pathLength: 1, class: "in-edge" });
      e.style.animationDelay = (0.15 + i * 0.22) + "s"; svg.append(e);
    });
    sl.nodes.forEach(([x, y], i) => {
      const hot = i === sl.hot; const c = sv("circle", { cx: x, cy: y, r: hot ? 11 : 8, class: "in-node" + (hot ? " hot" : "") });
      c.style.animationDelay = (0.1 + i * 0.18) + "s"; svg.append(c);
      if (hot) svg.append(sv("circle", { cx: x, cy: y, r: 11, class: "in-pulse" }));
    });
    return svg;
  }

  let idx = -1, timer = 0, closed = false;
  function show(i) {
    clearTimeout(timer); idx = i; const sl = SLIDES[i]; stage.replaceChildren();
    dotEls.forEach((d, k) => d.classList.toggle("on", k === i));
    if (sl.kind === "final") {
      const wrap = mk("div"); wrap.style.cssText = "text-align:center;display:flex;flex-direction:column;align-items:center";
      const big = mk("div", "in-big"); const em = (t) => mk("em", null, t);
      big.append("Kami memetakan ", em("ancaman siber global"), " untuk ", em("mendeteksi lebih dini"), " dan melacak lokasi server penyerang.");
      const go = mk("button", "in-go", "MASUK DASHBOARD"); go.addEventListener("click", (e) => { e.stopPropagation(); close(); });
      wrap.append(big, go); stage.append(wrap); fill.className = "full"; fill.style.animation = "none";
      return;
    }
    const a = mk("div", "in-art"); a.append(art(sl));
    const c = mk("div", "in-copy"); c.append(mk("div", "in-eyebrow", sl.eyebrow), mk("h2", "in-title", sl.title), mk("p", "in-text", sl.text));
    if (sl.note) c.append(mk("p", "in-note", sl.note));
    stage.append(a, c);
    fill.className = ""; void fill.offsetWidth; fill.className = "run";
    timer = setTimeout(() => show(Math.min(LAST, idx + 1)), STEP_MS);
  }

  stage.addEventListener("click", () => { if (idx < LAST) show(idx + 1); });
  skip.addEventListener("click", close);
  const onKey = (e) => { if (e.key === "Escape") close(); else if (e.key === "ArrowRight" && idx < LAST) show(idx + 1); else if (e.key === "ArrowLeft" && idx > 0) show(idx - 1); };
  document.addEventListener("keydown", onKey);

  const poll = setInterval(() => {
    const b = document.getElementById("liveBadge"); const t = b ? b.textContent : "";
    if (t.includes("LIVE")) { status.textContent = "● DATA LIVE SIAP"; status.className = "in-status ok"; }
    else if (t.includes("OFFLINE") || t.includes("ERROR")) { status.textContent = "● API OFFLINE · TAMPILAN TERBATAS"; status.className = "in-status"; }
    else status.textContent = "● MENGHUBUNGKAN KE THREATFOX...";
  }, 400);

  function close() {
    if (closed) return; closed = true; clearTimeout(timer); clearInterval(poll); document.removeEventListener("keydown", onKey);
    root.classList.add("out"); document.body.style.overflow = prevOverflow; setTimeout(() => root.remove(), 700);
  }
  show(0);
})(); } catch (e) { const x = document.getElementById("intro"); if (x) x.remove(); document.body.style.overflow = ""; }

window.addEventListener("error", (e) => {
  const b = document.getElementById("liveBadge");
  if (b) { b.textContent = "● ERROR JS"; b.className = "demo-label off"; }
  const c = document.getElementById("mapCaption");
  if (c) c.textContent = "ERROR: " + e.message + " (baris " + e.lineno + ")";
});

const $ = (id) => document.getElementById(id);
let geoData = [], visitorData = [], lastTarget = null;
const API_URL = "https://jolly-sun-7b3.rap090921.workers.dev";
const STATS_TTL = 10 * 60 * 1000;
const STATS_KEY = "cybertrace_stats_v3";
const GEO_KEY = "cybertrace_geo_v1";
const GEO_TTL = 30 * 60 * 1000;
const MAP_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function row(label, value) {
  const r = el("div", "result-row");
  r.append(el("span", null, label), el("span", null, String(value ?? "-")));
  return r;
}

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 });
function pad2(n) { return String(n).padStart(2, "0"); }
function timeAgo(ts) {
  if (!Number.isFinite(ts)) return "-";
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return s + " dtk lalu";
  if (s < 3600) return Math.floor(s / 60) + " mnt lalu";
  if (s < 86400) return Math.floor(s / 3600) + " jam lalu";
  return Math.floor(s / 86400) + " hari lalu";
}

function parseSeen(s) { return s ? Date.parse(String(s).replace(" UTC", "Z").replace(" ", "T")) : NaN; }
function countBy(rows, key) {
  const m = new Map();
  rows.forEach((r) => { const k = r[key] || "unknown"; m.set(k, (m.get(k) || 0) + 1); });
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

const IP_RE = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

function ipList(rows) {
  const seen = new Set();
  rows.forEach((r) => {
    if (r.ioc_type === "ip:port" && r.ioc) {
      const ip = String(r.ioc).split(":")[0];
      if (IP_RE.test(ip)) seen.add(ip);
    }
  });
  return [...seen].slice(0, 100);
}

function aggregateGeo(results) {
  const m = new Map();
  (Array.isArray(results) ? results : []).forEach((r) => {
    if (!r || r.status !== "success" || !r.countryCode) return;
    if (!Number.isFinite(r.lat) || !Number.isFinite(r.lon)) return;
    const c = m.get(r.countryCode) || { code: r.countryCode, name: r.country || r.countryCode, count: 0, lat: 0, lon: 0 };
    c.count++; c.lat += r.lat; c.lon += r.lon; m.set(r.countryCode, c);
  });
  return [...m.values()].map((c) => ({ ...c, lat: c.lat / c.count, lon: c.lon / c.count })).sort((a, b) => b.count - a.count);
}

function project(lon, lat) { return [(lon + 180) * 2, (90 - lat) * 2]; }

function topoToPath(topo, objName) {
  const tf = topo.transform;
  const arcs = topo.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      if (tf) { x += dx; y += dy; return [x * tf.scale[0] + tf.translate[0], y * tf.scale[1] + tf.translate[1]]; }
      return [dx, dy];
    });
  });
  const getArc = (i) => (i >= 0 ? arcs[i] : arcs[~i].slice().reverse());
  const ring = (idxs) => { let pts = []; idxs.forEach((i, k) => { const a = getArc(i); pts = pts.concat(k ? a.slice(1) : a); }); return pts; };
  let d = "";
  const polygon = (rings) => rings.forEach((r) => {
    const pts = ring(r).map(([lon, lat]) => { const [x, y] = project(lon, lat); return x.toFixed(1) + " " + y.toFixed(1); });
    d += "M" + pts.join("L") + "Z";
  });
  const geom = (g) => {
    if (g.type === "GeometryCollection") g.geometries.forEach(geom);
    else if (g.type === "Polygon") polygon(g.arcs);
    else if (g.type === "MultiPolygon") g.arcs.forEach(polygon);
  };
  geom(topo.objects[objName]);
  return d;
}

function groupTypes(rows) {
  const name = (t) => t === "sha256_hash" || t === "md5_hash" || t === "sha1_hash" ? "HASH" : t === "ip:port" ? "IP:PORT" : t === "domain" ? "DOMAIN" : t === "url" ? "URL" : "OTHER";
  const m = new Map();
  rows.forEach((r) => { const g = name(r.ioc_type); m.set(g, (m.get(g) || 0) + 1); });
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

function topTags(rows) {
  const m = new Map();
  rows.forEach((r) => { if (Array.isArray(r.tags)) { r.tags.forEach((t) => { if (t) m.set(t, (m.get(t) || 0) + 1); }); } });
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
}

function avgConfidence(rows) {
  const vals = rows.map((r) => Number(r.confidence_level)).filter((n) => Number.isFinite(n));
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function aggregate(rows, now) {
  now = now || Date.now();
  const HOURS = 24, start = now - HOURS * 3600000, hourly = new Array(HOURS).fill(0);
  rows.forEach((r) => {
    const t = parseSeen(r.first_seen);
    if (t >= start && t <= now) { const i = Math.min(HOURS - 1, Math.floor((t - start) / 3600000)); hourly[i]++; }
  });
  const ofType = (type) => rows.filter((r) => r.ioc_type === type).length;
  const recent = rows.map((r) => ({ ioc: r.ioc, malware: r.malware_printable, type: r.ioc_type, ts: parseSeen(r.first_seen), confidence: r.confidence_level })).sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 10);
  return {
    updated: now, start: start, total: rows.length, families: new Set(rows.map((r) => r.malware_printable)).size,
    ips: ofType("ip:port"), urls: ofType("url"), domains: ofType("domain"),
    topMalware: countBy(rows, "malware_printable").slice(0, 5), ipList: ipList(rows),
    iocTypes: groupTypes(rows), threatTypes: countBy(rows, "threat_type").slice(0, 4),
    tags: topTags(rows), avgConfidence: avgConfidence(rows), hourly: hourly, recent: recent
  };
}

const SVG_NS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) { const n = document.createElementNS(SVG_NS, tag); Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v)); return n; }
function setMapStatus(caption, tag) { $("mapCaption").textContent = caption; if (tag) $("mapTag").textContent = tag; }

function initMap() {
  const svg = $("worldMap"); svg.replaceChildren();
  let grid = "";
  for (let lon = -150; lon <= 150; lon += 30) { const [x] = project(lon, 0); grid += "M" + x + " 20 V290 "; }
  for (let lat = -30; lat <= 60; lat += 30) { const [, y] = project(0, lat); grid += "M0 " + y + " H720 "; }
  svg.append(svgEl("path", { d: grid, class: "world-grid" }));
  svg.append(svgEl("path", { id: "mapLand", d: "", class: "world-land" }));
  svg.append(svgEl("g", { id: "mapPoints" }));
  svg.append(svgEl("g", { id: "visitorPoints" }));
  fetch(MAP_URL).then((res) => res.json()).then((topo) => { $("mapLand").setAttribute("d", topoToPath(topo, "countries")); }).catch(() => { setMapStatus("PETA DASAR TIDAK TERSEDIA"); });
}

function renderGeo(countries) {
  geoData = countries;
  const points = $("mapPoints"); points.replaceChildren();
  const total = countries.reduce((a, c) => a + c.count, 0);
  countries.forEach((c) => {
    const [x, y] = project(c.lon, c.lat);
    const r = 5 + Math.sqrt(c.count) * 2.5;
    const dot = svgEl("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: r.toFixed(1), class: "world-point" });
    const title = svgEl("title"); title.textContent = c.name + ": " + c.count + " IP"; dot.append(title); points.append(dot);
  });
  const list = $("countryList"); list.replaceChildren();
  countries.slice(0, 6).forEach((c) => { const item = el("div", "country-item"); item.append(el("span", null, c.name), el("b", null, c.count + " IP")); list.append(item); });
  setMapStatus("LOKASI SERVER C2 · " + countries.length + " NEGARA", "GEOIP · " + total + " IP");
}

function readGeoCache() {
  try { const raw = JSON.parse(localStorage.getItem(GEO_KEY) || "null"); if (raw && Array.isArray(raw.data) && Date.now() - raw.t < GEO_TTL) return raw.data; } catch { /* abaikan */ }
  return null;
}

async function loadGeo(ips) {
  if (!ips || !ips.length) { setMapStatus("TIDAK ADA IP", "GEOIP · KOSONG"); return; }
  const cached = readGeoCache(); if (cached) { renderGeo(cached); return; }
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(API_URL + "/geo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ips: ips }), signal: controller.signal });
    if (!res.ok) throw new Error("geo");
    const countries = aggregateGeo(await res.json()); if (!countries.length) throw new Error("empty");
    try { localStorage.setItem(GEO_KEY, JSON.stringify({ t: Date.now(), data: countries })); } catch { /* abaikan */ }
    renderGeo(countries);
  } catch { setMapStatus("DATA LOKASI OFFLINE", "GEOIP · OFFLINE"); } finally { clearTimeout(timer); }
}

function validateIndicator(value) {
  const domain = /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (IP_RE.test(value)) return "IP ADDRESS";
  if (domain.test(value)) return "DOMAIN";
  return null;
}

function setBadge(text, cls) {
  const badge = $("liveBadge"); badge.textContent = text; badge.className = "demo-label " + cls;
  const sys = $("sysText"); if (sys) sys.textContent = cls === "ok" ? "SYSTEM OPERATIONAL" : "API OFFLINE";
}

function renderTrend(s) {
  const W = 600, BASE = 178, TOP = 10; const n = s.hourly.length; const max = Math.max(...s.hourly, 1);
  const pts = s.hourly.map((v, i) => { const x = (i * W) / (n - 1); const y = BASE - (v / max) * (BASE - TOP); return x.toFixed(1) + " " + y.toFixed(1); });
  const line = "M" + pts.join(" L");
  $("trendLine").setAttribute("d", line); $("trendArea").setAttribute("d", line + " L" + W + " " + BASE + " L0 " + BASE + " Z");
  const labels = $("yLabels").children; [1, 0.75, 0.5, 0.25, 0].forEach((f, i) => { labels[i].textContent = compact.format(Math.round(max * f)); });
  $("trendValue").textContent = "PEAK " + compact.format(Math.max(...s.hourly)) + "/JAM";
  const axis = $("trendLabels"); axis.replaceChildren();
  [0, 4, 8, 12, 16, 20, 23].forEach((i) => { const d = new Date(s.start + i * 3600000); axis.append(el("span", null, pad2(d.getHours()) + ":00")); });
}

function renderMalware(s) {
  const box = $("malwareBars"); box.replaceChildren();
  if (!s.topMalware.length) { box.append(el("div", "feed-empty", "Belum ada data.")); return; }
  const colors = ["", "orange", "yellow", "blue", "green"]; const top = s.topMalware[0][1];
  s.topMalware.forEach(([name, count], i) => {
    const r = el("div", "severity-row"); const head = el("div");
    head.append(el("span", null, name), el("b", null, compact.format(count)));
    const bar = el("div", "bar " + colors[i % colors.length]); const fill = el("i");
    fill.style.width = Math.max(4, (count / top) * 100) + "%"; bar.append(fill); r.append(head, bar); box.append(r);
  });
}

function renderFeed(s) {
  const body = $("feedBody"); body.replaceChildren();
  if (!s.recent.length) { const tr = el("tr"); const td = el("td", "feed-empty", "Belum ada data."); td.colSpan = 4; tr.append(td); body.append(tr); return; }
  s.recent.forEach((item) => {
    const tr = el("tr"); const iocCell = el("td", "mono", item.ioc || "-"); iocCell.title = item.ioc || "";
    tr.append(iocCell, el("td", null, item.malware || "-"), el("td", null, item.type || "-"), el("td", null, timeAgo(item.ts)));
    if (item.type === "ip:port" || item.type === "domain") {
      tr.className = "clickable"; tr.title = "Ketuk untuk analisis";
      tr.addEventListener("click", () => {
        $("indicator").value = String(item.ioc).split(item.type === "ip:port" ? ":" : "/")[0];
        $("indicators").scrollIntoView({ behavior: "smooth", block: "start" });
        $("analyzeBtn").click();
      });
    }
    body.append(tr);
  });
}

function renderLandscape(s) {
  const colors = ["#ff2b3a", "#ffffff", "#8a0f1b", "#b8b8bf", "#5a5a62"];
  const svg = $("donut"); const legend = $("donutLegend"); const NS = "http://www.w3.org/2000/svg";
  svg.replaceChildren(); legend.replaceChildren();
  const total = s.iocTypes.reduce((a, [, n]) => a + n, 0) || 1; const R = 38; const C = 2 * Math.PI * R; let offset = 0;
  s.iocTypes.forEach(([name, count], i) => {
    const len = (count / total) * C; const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", "50"); c.setAttribute("cy", "50"); c.setAttribute("r", String(R)); c.setAttribute("fill", "none"); c.setAttribute("stroke", colors[i % colors.length]); c.setAttribute("stroke-width", "12"); c.setAttribute("stroke-dasharray", len.toFixed(2) + " " + (C - len).toFixed(2)); c.setAttribute("stroke-dashoffset", String(-offset)); c.setAttribute("transform", "rotate(-90 50 50)"); svg.append(c); offset += len;
    const item = el("div", "legend-item"); const dot = el("i", "legend-dot"); dot.style.background = colors[i % colors.length]; const pct = Math.round((count / total) * 100);
    item.append(dot, el("span", null, name), el("b", null, compact.format(count) + " · " + pct + "%")); legend.append(item);
  });
  const center = document.createElementNS(NS, "text"); center.setAttribute("x", "50"); center.setAttribute("y", "52"); center.setAttribute("text-anchor", "middle"); center.setAttribute("class", "donut-total"); center.textContent = compact.format(s.total); svg.append(center);
  const bars = $("threatBars"); bars.replaceChildren(); const bc = ["", "orange", "yellow", "blue"]; const top = (s.threatTypes[0] && s.threatTypes[0][1]) || 1;
  s.threatTypes.forEach(([name, count], i) => {
    const r = el("div", "severity-row"); const head = el("div"); head.append(el("span", null, name.replace(/_/g, " ")), el("b", null, compact.format(count)));
    const bar = el("div", "bar " + bc[i % bc.length]); const fill = el("i"); fill.style.width = Math.max(4, (count / top) * 100) + "%"; bar.append(fill); r.append(head, bar); bars.append(r);
  });
  const chips = $("tagChips"); chips.replaceChildren();
  s.tags.forEach(([tag]) => chips.append(el("span", "chip", tag)));
  $("confNote").textContent = "Rata-rata tingkat keyakinan laporan: " + s.avgConfidence + "%";
}

function renderStats(s) {
  ["statTotal", "statFamilies", "statIps"].forEach((id) => $(id).classList.remove("loading"));
  $("statTotal").textContent = compact.format(s.total); $("statFamilies").textContent = compact.format(s.families); $("statIps").textContent = compact.format(s.ips);
  renderTrend(s); renderMalware(s); renderFeed(s); renderLandscape(s);
  const d = new Date(s.updated); $("feedUpdated").textContent = "UPDATE " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()); setBadge("● LIVE · THREATFOX", "ok");
}

function renderOffline(message) {
  ["statTotal", "statFamilies", "statIps"].forEach((id) => { $(id).classList.remove("loading"); $(id).textContent = "—"; });
  $("malwareBars").replaceChildren(el("div", "feed-empty", message)); $("threatBars").replaceChildren(el("div", "feed-empty", message)); $("donutLegend").replaceChildren(el("div", "feed-empty", message));
  const body = $("feedBody"); body.replaceChildren(); const tr = el("tr"); const td = el("td", "feed-empty", message); td.colSpan = 4; tr.append(td); body.append(tr); setBadge("● OFFLINE", "off");
}

function readCache() { try { const raw = JSON.parse(localStorage.getItem(STATS_KEY) || "null"); if (raw && raw.data && Date.now() - raw.data.updated < STATS_TTL) return raw.data; } catch { /* abaikan */ } return null; }
function writeCache(data) { try { localStorage.setItem(STATS_KEY, JSON.stringify({ data: data })); } catch { /* abaikan */ } }

async function loadStats() {
  const cached = readCache(); if (cached) { renderStats(cached); loadGeo(cached.ipList); return; }
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(API_URL + "/iocs?days=1", { signal: controller.signal });
    if (!res.ok) throw new Error("API " + res.status); const data = await res.json();
    if (data.query_status !== "ok" || !Array.isArray(data.data)) throw new Error("Status " + data.query_status);
    const stats = aggregate(data.data); writeCache(stats); renderStats(stats); loadGeo(stats.ipList); addActivity("Live feed updated: " + stats.total + " IOC");
  } catch { renderOffline("Gagal memuat data live."); } finally { clearTimeout(timer); }
}

function showMessage(output, text, isError) { output.replaceChildren(); output.append(el("div", isError ? "result-msg error" : "result-msg", text)); }

function seenRange(items) {
  const t = (v) => parseSeen(v);
  const firsts = items.map((i) => ({ v: i.first_seen, t: t(i.first_seen) })).filter((x) => Number.isFinite(x.t));
  const lasts = items.map((i) => ({ v: i.last_seen || i.first_seen, t: t(i.last_seen || i.first_seen) })).filter((x) => Number.isFinite(x.t));
  const first = firsts.length ? firsts.reduce((a, b) => (b.t < a.t ? b : a)).v : "-";
  const last = lasts.length ? lasts.reduce((a, b) => (b.t > a.t ? b : a)).v : "-";
  return { first, last };
}

function renderResult(output, { found, value, type, items }) {
  output.replaceChildren(); const card = el("div", "result-card"); const head = el("div", "result-head");
  head.append(el("span", "result-status " + (found ? "threat" : "clean"), found ? "THREAT FOUND" : "NO MATCH"), el("span", "result-value", value)); card.append(head);
  const body = el("div", "result-body"); body.append(row("Type", type), row("Source", "ThreatFox (abuse.ch)"));
  if (type === "DOMAIN") riskRows(riskScore(found ? items : [], null)).forEach((r) => body.append(r));
  if (found) {
    const d = items[0]; body.append(row("IOC records", items.length), row("Malware", d.malware_printable), row("Threat type", d.threat_type_desc || d.threat_type), row("First seen", seenRange(items).first), row("Last seen", seenRange(items).last), row("Reporter", d.reporter));
    const confidence = Number(d.confidence_level) || 0; body.append(row("Confidence", confidence + "%"));
    const bar = el("div", "conf-bar"); const fill = el("i"); fill.style.width = Math.min(100, Math.max(0, confidence)) + "%"; bar.append(fill); body.append(bar);
  } else { body.append(row("Result", "No record in database")); }
  card.append(body);
  if (found && items.length > 1) {
    card.append(el("div", "result-sub", "TOP IOC RECORDS")); const list = el("div", "ioc-list");
    items.slice(0, 5).forEach((item) => { const entry = el("div", "ioc-item"); entry.append(el("b", null, item.ioc || "-"), el("small", null, (item.malware_printable || "-") + " · " + (item.confidence_level ?? "-") + "%")); list.append(entry); });
    card.append(list);
  }
  card.append(el("div", "result-note", found ? "Data dari ThreatFox. Verifikasi lanjut diperlukan." : "Tidak ditemukan bukan jaminan aman. ThreatFox menyimpan IP dalam format ip:port.")); output.append(card);
}

function hostKind(g) {
  if (g.proxy) return "VPN / Proxy / Tor";
  if (g.hosting) return "Server hosting / data center";
  if (g.mobile) return "Jaringan seluler";
  if (!g.isp && !g.org) return "Tidak diketahui (data ISP kosong)";
  return "Jaringan umum (ISP / rumahan / kantor)";
}

function markTarget(lon, lat) {
  const pts = $("mapPoints"); if (!pts || !Number.isFinite(lon) || !Number.isFinite(lat)) return;
  pts.querySelectorAll(".world-target").forEach((n) => n.remove());
  const [x, y] = project(lon, lat);
  pts.append(svgEl("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: "9", class: "world-target" }));
}

let lastItems = [];
function riskScore(items, g) {
  let score = 5; const why = [];
  if (items && items.length) {
    const conf = Number(items[0].confidence_level) || 0;
    score = 50 + Math.round(conf * 0.35) + Math.min(10, items.length * 2);
    why.push("Terdaftar di ThreatFox (" + items.length + " record)");
  } else why.push("Tidak ada di ThreatFox");
  if (g) {
    if (g.proxy) { score += 10; why.push("VPN/proxy/Tor"); }
    if (g.hosting) { score += 10; why.push("Server hosting"); }
  }
  score = Math.max(0, Math.min(100, score));
  const label = score >= 70 ? "HIGH" : score >= 35 ? "MEDIUM" : "LOW";
  return { score, label, why };
}
function riskRows(r) { return [row("Risk score", r.score + "/100 · " + r.label), row("Dasar penilaian", r.why.join("; "))]; }

let intelToken = 0;
async function resolveDomain(domain) {
  const urls = ["https://dns.google/resolve?name=" + encodeURIComponent(domain) + "&type=A", "https://cloudflare-dns.com/dns-query?name=" + encodeURIComponent(domain) + "&type=A"];
  for (const u of urls) {
    try {
      const r = await fetch(u, { headers: { accept: "application/dns-json" } }); if (!r.ok) continue;
      const j = await r.json(); const a = (j.Answer || []).find((x) => x.type === 1 && IP_RE.test(x.data));
      if (a) return a.data;
    } catch { /* coba resolver berikutnya */ }
  }
  return null;
}

async function showDomainIntel(output, domain) {
  const myToken = intelToken + 1; const card = el("div", "result-card"); card.append(el("div", "result-sub", "LOKASI & INFRASTRUKTUR SERVER"));
  const body = el("div", "result-body"); body.append(row("Status", "Mencari IP domain...")); card.append(body); output.append(card);
  const ip = await resolveDomain(domain);
  if (myToken <= intelToken) return;
  if (!ip) { body.replaceChildren(row("Status", "Domain tidak bisa di-resolve ke IP")); return; }
  card.remove(); showIpIntel(output, ip, domain);
}

async function showIpIntel(output, ip, domain) {
  const myToken = ++intelToken; const items = lastItems;
  const card = el("div", "result-card"); card.append(el("div", "result-sub", "LOKASI & INFRASTRUKTUR SERVER"));
  const body = el("div", "result-body"); body.append(row("Status", "Memeriksa lokasi...")); card.append(body); output.append(card);
  try {
    const res = await fetch(API_URL + "/geo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ips: [ip] }) });
    if (!res.ok) throw new Error("geo " + res.status);
    const arr = await res.json(); if (myToken !== intelToken) return; const g = Array.isArray(arr) ? arr[0] : null;
    if (!g || g.status !== "success") throw new Error("empty");
    body.replaceChildren(
      ...(domain ? [row("Domain", domain), row("Resolve ke IP", ip)] : riskRows(riskScore(items, g))),
      row("Negara", g.country + " (" + g.countryCode + ")"),
      row("Wilayah / Kota", [g.regionName, g.city].filter(Boolean).join(", ") || "-"),
      row("Koordinat", Number(g.lat).toFixed(3) + ", " + Number(g.lon).toFixed(3)),
      row("Akurasi", (g.city || g.regionName) ? "Perkiraan level kota/wilayah" : "Hanya level negara (titik tengah)"),
      row("Jenis host", hostKind(g)),
      row("ISP", g.isp || "-"),
      row("Organisasi", g.org || "-"),
      row("ASN", g.as || "-"),
      row("Reverse DNS", g.reverse || "-")
    );
    card.append(el("div", "result-note", (domain ? "Lokasi IP hasil resolve domain. Jika domain memakai CDN (mis. Cloudflare), lokasi yang tampil adalah server CDN. " : "") + "Ini perkiraan lokasi dan pemilik server, bukan identitas pelaku. Merk perangkat dan sistem operasi tidak dapat diketahui dari IP."));
    const addr = [g.city, g.regionName, g.country].filter(Boolean).join(", ");
    const link = el("a", null, "BUKA DI GOOGLE MAPS");
    link.href = "https://www.google.com/maps?q=" + encodeURIComponent(Number(g.lat) + "," + Number(g.lon));
    link.target = "_blank"; link.rel = "noopener noreferrer";
    link.style.cssText = "display:block;margin:4px 14px 14px;padding:11px;border-radius:999px;background:var(--accent);color:#fff;text-align:center;font-size:10.5px;font-weight:700;text-decoration:none;letter-spacing:.5px";
    card.append(link);
    body.append(row("Alamat perkiraan", addr || "-"));
    lastTarget = { lat: Number(g.lat), lon: Number(g.lon), ip: ip, place: [g.city, g.regionName, g.country].filter(Boolean).join(", ") };
    markTarget(g.lon, g.lat);
  } catch { if (myToken === intelToken) body.replaceChildren(row("Status", "Data lokasi tidak tersedia")); }
}

$("analyzeBtn").addEventListener("click", async () => {
  const value = $("indicator").value.trim(); const output = $("result"); const button = $("analyzeBtn");
  if (!value) { showMessage(output, "ERROR: Masukkan indikator terlebih dahulu.", true); return; }
  const type = validateIndicator(value); if (!type) { showMessage(output, "ERROR: Format tidak valid. Gunakan IP atau domain.", true); return; }
  button.disabled = true; button.textContent = "..."; showMessage(output, "Memeriksa ThreatFox...");
  try {
    const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ indicator: value }) });
    if (!res.ok) throw new Error("API " + res.status); const data = await res.json();
    const found = data.query_status === "ok" && Array.isArray(data.data) && data.data.length > 0;
    renderResult(output, { found, value, type, items: found ? data.data : [] }); addActivity("Lookup: " + value);
    if (type === "IP ADDRESS") { lastItems = found ? data.data : []; showIpIntel(output, value); }
    else if (type === "DOMAIN") { lastItems = found ? data.data : []; showDomainIntel(output, value); }
  } catch { showMessage(output, "ERROR: Gagal menghubungi server.", true); } finally { button.disabled = false; button.textContent = "ANALYZE"; }
});

function addActivity(text) {
  const list = $("activityList"); const item = el("div", "activity"); const info = el("div");
  info.append(el("b", null, text), el("small", null, "System event")); const d = new Date();
  item.append(el("span", "activity-dot"), info, el("time", null, pad2(d.getHours()) + ":" + pad2(d.getMinutes()))); list.prepend(item);
}

/* ===== CASES ===== */
const CASE_KEY = "cybertrace_cases_v1";
function readCases() { try { const raw = JSON.parse(localStorage.getItem(CASE_KEY) || "[]"); return Array.isArray(raw) ? raw : []; } catch { return []; } }
function writeCases(list) { try { localStorage.setItem(CASE_KEY, JSON.stringify(list.slice(-50))); } catch { /* abaikan */ } }

function addCaseRow(c) {
  const tr = el("tr");
  const idCell = el("td"); idCell.append(el("div", null, c.id), el("small", "case-name", c.name || ""));
  const indCell = el("td", "mono", c.indicator); indCell.title = c.indicator;
  const open = (c.status || "OPEN") === "OPEN";
  const pill = el("span", "status-pill" + (open ? "" : " closed"), open ? "OPEN" : "CLOSED");
  pill.title = "Ketuk untuk ubah status";
  pill.addEventListener("click", () => {
    const list = readCases(); const item = list.find((x) => x.id === c.id); if (!item) return;
    item.status = (item.status || "OPEN") === "OPEN" ? "CLOSED" : "OPEN"; writeCases(list); renderCases();
    addActivity("Case " + c.id + " " + item.status);
  });
  const statusCell = el("td"); statusCell.append(pill);
  tr.append(idCell, indCell, statusCell); $("caseTable").append(tr);
}

function renderCases() {
  const list = readCases(); const body = $("caseTable"); body.replaceChildren();
  if (!list.length) {
    const tr = el("tr"); const td = el("td", "feed-empty", "Belum ada investigasi. Simpan kasus pertamamu di atas."); td.colSpan = 3; tr.append(td); body.append(tr);
  } else { list.slice().reverse().forEach(addCaseRow); }
  $("investigationCount").textContent = pad2(list.length);
}

$("saveCase").addEventListener("click", () => {
  const name = $("caseName").value.trim(); const ind = $("caseIndicator").value.trim(); const out = $("caseResult");
  if (!name || !ind) { showMessage(out, "ERROR: Isi nama kasus dan indikator.", true); return; }
  if (!validateIndicator(ind)) { showMessage(out, "ERROR: Indikator harus berupa IP atau domain yang valid.", true); return; }
  const list = readCases();
  const last = list.length ? (parseInt(String(list[list.length - 1].id).slice(3), 10) || list.length) : 0;
  const id = "CT-" + String(last + 1).padStart(3, "0");
  list.push({ id: id, name: name, indicator: ind, status: "OPEN", created: Date.now() });
  writeCases(list); renderCases();
  addActivity("Case saved: " + id);
  showMessage(out, "Investigasi " + id + " (" + name + ") tersimpan.", false);
  $("caseName").value = ""; $("caseIndicator").value = "";
});

/* ===== ANIMASI & NAVIGASI ===== */
function showAllReveal() { document.querySelectorAll(".reveal").forEach((n) => n.classList.add("in")); }
try {
  if (!("IntersectionObserver" in window)) throw new Error("no io");
  document.documentElement.classList.add("js");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.01 });
  document.querySelectorAll(".reveal").forEach((n) => revealObserver.observe(n));
  setTimeout(showAllReveal, 1200);
} catch { showAllReveal(); }

const navLinks = document.querySelectorAll("nav a");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section[id], .panel[id]").forEach((s) => sectionObserver.observe(s));

/* ===== MULAI ===== */
initMap();
renderCases();
loadStats();
setInterval(loadStats, STATS_TTL + 5000);

/* ===== LIVE VISITOR MONITOR ===== */
function mountVisitorPanel() {
  const st = document.createElement("style");
  st.textContent = ".visitor{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}.visitor:last-child{border-bottom:none}.visitor>div:first-child{flex:1;min-width:0}.visitor b{display:block;font-size:12px;font-weight:500;overflow-wrap:anywhere}.visitor small{display:block;margin-top:2px;color:var(--muted);font-size:9.5px;overflow-wrap:anywhere}.risk-badge{font-size:9px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap}.risk-high{background:var(--accent);color:#fff}.risk-medium{background:rgba(255,255,255,.85);color:#111}.risk-low{background:rgba(255,255,255,.14);color:var(--muted)}.visitor a{color:var(--accent);font-size:9.5px;font-weight:700;text-decoration:none;white-space:nowrap}.world-visitor{fill:#fff;stroke:var(--accent);stroke-width:1.2}";
  document.head.append(st);
  const panel = el("div", "panel span-12 reveal in"); panel.id = "visitors";
  const head = el("div", "panel-head"); const left = el("div");
  left.append(el("span", "eyebrow", "LIVE VISITOR MONITOR"), el("h2", null, "Pengunjung Terbaru"), el("p", "panel-sub", "Setiap pengunjung otomatis dicek ke ThreatFox dan ditandai di peta."));
  const tag = el("span", "tag", "MEMUAT"); tag.id = "visitorTag"; head.append(left, tag);
  const list = el("div", "activity-list"); list.id = "visitorList"; list.append(el("div", "feed-empty loading", "Memuat data..."));
  panel.append(head, list, el("p", "map-note", "IP disamarkan dan data otomatis dihapus setelah 24 jam. Lokasi adalah perkiraan, bukan alamat atau posisi perangkat."));
  const act = $("activity"); act.parentNode.insertBefore(panel, act);
}

function renderVisitors(arr) {
  if (Array.isArray(arr)) visitorData = arr;
  const list = $("visitorList"); list.replaceChildren();
  const pts = $("visitorPoints"); if (pts) pts.replaceChildren();
  if (!Array.isArray(arr) || !arr.length) { list.append(el("div", "feed-empty", "Belum ada pengunjung tercatat.")); $("visitorTag").textContent = "0 PENGUNJUNG"; return; }
  arr.forEach((v) => {
    const hasGeo = Number.isFinite(v.lat) && Number.isFinite(v.lon) && !(v.lat === 0 && v.lon === 0);
    const item = el("div", "visitor"); const info = el("div");
    const place = [v.city, v.region, v.country].filter(Boolean).join(", ") || "Lokasi tidak diketahui";
    info.append(el("b", null, place));
    info.append(el("small", null, v.ip + " · " + (v.org || "-") + " · " + timeAgo(v.t)));
    if (hasGeo) info.append(el("small", null, "Koordinat: " + v.lat.toFixed(2) + ", " + v.lon.toFixed(2)));
    if (v.found) info.append(el("small", null, "Terdaftar di ThreatFox: " + (v.malware || "-") + " (" + v.confidence + "%)"));
    const risk = el("span", "risk-badge risk-" + String(v.riskLabel || "low").toLowerCase(), (v.riskLabel || "LOW") + " " + (v.risk ?? 0));
    item.append(info, risk);
    if (hasGeo) {
      const a = el("a", null, "MAPS"); a.href = "https://www.google.com/maps?q=" + encodeURIComponent(v.lat + "," + v.lon); a.target = "_blank"; a.rel = "noopener noreferrer"; item.append(a);
      if (pts) { const [x, y] = project(v.lon, v.lat); pts.append(svgEl("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: "4", class: "world-visitor" })); }
    }
    list.append(item);
  });
  $("visitorTag").textContent = arr.length + " PENGUNJUNG";
}

async function sendVisit() { try { await fetch(API_URL + "/visit", { method: "POST" }); } catch { /* abaikan */ } }
async function loadVisitors() {
  try { const res = await fetch(API_URL + "/visitors"); if (!res.ok) throw new Error("visitors"); renderVisitors(await res.json()); }
  catch { const t = $("visitorTag"); if (t) t.textContent = "OFFLINE"; }
}
mountVisitorPanel();
sendVisit().then(loadVisitors);
setInterval(loadVisitors, 15000);

/* ===== PETA LAYAR PENUH (zoom + geser) ===== */
(function () {
  const st = document.createElement("style");
  st.textContent = "#mapModal{position:fixed;inset:0;z-index:200;background:#050506;display:flex;flex-direction:column}.mm-bar{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 14px 10px;border-bottom:1px solid var(--border)}.mm-title{font-family:var(--head);font-size:20px;font-weight:600;color:#fff}.mm-wrap{position:relative;flex:1;min-height:0;overflow:hidden}.mm-svg{width:100%;height:100%;display:block;touch-action:none;cursor:grab;background:#08080a}.mm-country{fill:rgba(255,43,58,.55);stroke:#fff;cursor:pointer}.mm-visitor{fill:#fff;stroke:#ff2b3a;cursor:pointer}.mm-target{fill:none;stroke:#fff;stroke-dasharray:3 2;cursor:pointer}.mm-zoom{position:absolute;right:12px;top:12px;display:flex;flex-direction:column;gap:8px}.mm-zoom button{width:42px;padding:0;font-size:20px}.mm-legend{position:absolute;left:12px;top:12px;font-size:10px;color:var(--muted);background:rgba(5,5,6,.75);padding:6px 10px;border-radius:999px}.mm-card{position:absolute;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));max-width:420px;background:rgba(14,14,17,.97);border:1px solid var(--border);border-top:2px solid var(--accent);border-radius:14px;padding:12px 14px}.mm-card[hidden]{display:none}.mm-card-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.mm-card a{display:block;margin-top:10px;padding:10px;border-radius:999px;background:var(--accent);color:#fff;text-align:center;font-size:10.5px;font-weight:700;text-decoration:none}.map-visual.world{cursor:pointer}.map-visual.world::after{content:'KETUK UNTUK PERBESAR';position:absolute;right:10px;top:8px;font-size:9px;color:#fff;background:rgba(255,43,58,.35);border:1px solid var(--accent);padding:3px 8px;border-radius:999px;pointer-events:none}";
  document.head.append(st);

  const W0 = 720, H0 = 360;
  function openMapModal() {
    if ($("mapModal")) return;
    const prevOverflow = document.body.style.overflow; document.body.style.overflow = "hidden";
    const modal = el("div"); modal.id = "mapModal";
    const bar = el("div", "mm-bar"); const closeBtn = el("button", null, "TUTUP"); bar.append(el("div", "mm-title", "GLOBAL THREAT MAP"), closeBtn);
    const wrap = el("div", "mm-wrap");
    const svg = svgEl("svg", { class: "mm-svg", preserveAspectRatio: "xMidYMid meet" });
    let grid = "";
    for (let lon = -150; lon <= 150; lon += 30) { const [x] = project(lon, 0); grid += "M" + x + " 0 V360 "; }
    for (let lat = -60; lat <= 60; lat += 30) { const [, y] = project(0, lat); grid += "M0 " + y + " H720 "; }
    svg.append(svgEl("path", { d: grid, class: "world-grid" }));
    const landEl = $("mapLand"); svg.append(svgEl("path", { d: landEl ? landEl.getAttribute("d") : "", class: "world-land" }));
    const layer = svgEl("g"); svg.append(layer);

    const markers = [];
    function addMarker(kind, lat, lon, base, data) {
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      const [x, y] = project(lon, lat);
      const node = svgEl("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: base, class: "mm-" + kind });
      node.addEventListener("click", () => { if (!dragged) showCard(kind, data); });
      layer.append(node); markers.push({ node, base });
    }
    geoData.forEach((c) => addMarker("country", c.lat, c.lon, 2.5 + Math.sqrt(c.count) * 1.2, c));
    visitorData.forEach((v) => { if (v.lat !== null && v.lon !== null && !(v.lat === 0 && v.lon === 0)) addMarker("visitor", v.lat, v.lon, 3, v); });
    if (lastTarget) addMarker("target", lastTarget.lat, lastTarget.lon, 5, lastTarget);

    const zoomBox = el("div", "mm-zoom");
    const bIn = el("button", null, "+"), bOut = el("button", null, "−"), bReset = el("button", null, "⟲"); zoomBox.append(bIn, bOut, bReset);
    const legend = el("div", "mm-legend", "● Server C2   ○ Pengunjung   ◌ IP dianalisis");
    const card = el("div", "mm-card"); card.hidden = true;
    wrap.append(svg, zoomBox, legend, card); modal.append(bar, wrap); document.body.append(modal);

    let vb = { x: 0, y: 0, w: W0, h: 270 }, aspect = 0.4, dragged = false;
    function resetView() {
      const r = svg.getBoundingClientRect(); aspect = r.height / Math.max(1, r.width);
      vb = { x: 0, y: 0, w: W0, h: W0 * aspect }; vb.y = 155 - vb.h / 2; apply();
    }
    function clamp() {
      const cx = Math.min(W0, Math.max(0, vb.x + vb.w / 2)), cy = Math.min(H0, Math.max(0, vb.y + vb.h / 2));
      vb.x = cx - vb.w / 2; vb.y = cy - vb.h / 2;
    }
    function apply() {
      svg.setAttribute("viewBox", vb.x.toFixed(2) + " " + vb.y.toFixed(2) + " " + vb.w.toFixed(2) + " " + vb.h.toFixed(2));
      const k = vb.w / W0;
      markers.forEach((m) => { m.node.setAttribute("r", (m.base * k).toFixed(2)); m.node.style.strokeWidth = (0.8 * k).toFixed(2); });
    }
    function toUnits(px, py) {
      const r = svg.getBoundingClientRect(); const s = vb.w / Math.max(1, r.width);
      return [vb.x + vb.w / 2 + (px - r.left - r.width / 2) * s, vb.y + vb.h / 2 + (py - r.top - r.height / 2) * s];
    }
    function zoomAt(px, py, f) {
      const [ux, uy] = toUnits(px, py); const nw = Math.min(W0, Math.max(25, vb.w * f)); const ff = nw / vb.w;
      vb.x = ux - (ux - vb.x) * ff; vb.y = uy - (uy - vb.y) * ff; vb.w = nw; vb.h = nw * aspect; clamp(); apply();
    }
    function zoomCenter(f) { const r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, f); }
    bIn.addEventListener("click", () => zoomCenter(1 / 1.6)); bOut.addEventListener("click", () => zoomCenter(1.6)); bReset.addEventListener("click", resetView);
    svg.addEventListener("wheel", (e) => { e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY > 0 ? 1.2 : 1 / 1.2); }, { passive: false });

    const ptrs = new Map(); let moved = 0, lastDist = 0;
    const dist = () => { const [a, b] = [...ptrs.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
    svg.addEventListener("pointerdown", (e) => { ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = 0; dragged = false; if (ptrs.size === 2) lastDist = dist(); });
    const onMove = (e) => {
      const p = ptrs.get(e.pointerId); if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
      if (ptrs.size === 1) {
        moved += Math.abs(dx) + Math.abs(dy); if (moved > 6) dragged = true;
        const s = vb.w / Math.max(1, svg.getBoundingClientRect().width); vb.x -= dx * s; vb.y -= dy * s; clamp(); apply();
      } else if (ptrs.size === 2) {
        dragged = true; const d = dist(); const [a, b] = [...ptrs.values()];
        zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, lastDist / d); lastDist = d;
      }
    };
    const onUp = (e) => { ptrs.delete(e.pointerId); setTimeout(() => { if (!ptrs.size) dragged = false; }, 0); };
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); window.addEventListener("pointercancel", onUp);

    function showCard(kind, d) {
      card.replaceChildren(); card.hidden = false;
      const head = el("div", "mm-card-head"); const x = el("button", null, "×"); x.style.cssText = "min-height:28px;width:28px;padding:0"; x.addEventListener("click", () => { card.hidden = true; });
      let titleText, rows, lat, lon;
      if (kind === "country") {
        titleText = d.name; lat = d.lat; lon = d.lon;
        rows = [row("Server C2 (sampel)", d.count + " IP"), row("Koordinat rata-rata", d.lat.toFixed(2) + ", " + d.lon.toFixed(2)), row("Catatan", "Perkiraan lokasi server, bukan pelaku")];
      } else if (kind === "visitor") {
        titleText = [d.city, d.region, d.country].filter(Boolean).join(", ") || "Pengunjung"; lat = d.lat; lon = d.lon;
        rows = [row("IP", d.ip), row("Jaringan", d.org || "-"), row("Koordinat", d.lat.toFixed(2) + ", " + d.lon.toFixed(2)), row("Risk", (d.riskLabel || "LOW") + " " + (d.risk ?? 0)), row("Dilihat", timeAgo(d.t))];
      } else {
        titleText = "IP dianalisis: " + d.ip; lat = d.lat; lon = d.lon;
        rows = [row("Lokasi", d.place || "-"), row("Koordinat", d.lat.toFixed(3) + ", " + d.lon.toFixed(3))];
      }
      head.append(el("b", null, titleText), x); card.append(head); rows.forEach((r) => card.append(r));
      const a = el("a", null, "BUKA DI GOOGLE MAPS"); a.href = "https://www.google.com/maps?q=" + encodeURIComponent(lat + "," + lon); a.target = "_blank"; a.rel = "noopener noreferrer"; card.append(a);
    }

    function close() {
      window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("keydown", onKey); modal.remove(); document.body.style.overflow = prevOverflow;
    }
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey); closeBtn.addEventListener("click", close);
    resetView();
  }

  const navMap = document.querySelector('nav a[href="#map"]');
  if (navMap) navMap.addEventListener("click", (e) => { e.preventDefault(); openMapModal(); });
  const mini = document.querySelector(".map-visual.world");
  if (mini) mini.addEventListener("click", openMapModal);
})();

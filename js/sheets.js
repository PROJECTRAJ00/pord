/* ============================================================
   DIAMOND SOLAR — Google Sheet Engine + Shared JS
   (Is file ko edit karne ki zaroorat nahi)
   ============================================================ */

/* ---------- Fetch a tab from Google Sheet as array of objects ---------- */
async function fetchSheet(tabName) {
  const id = SITE_CONFIG.SHEET_ID;
  if (!id || id.startsWith("PASTE_")) return null; // not configured yet
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    // gviz response is wrapped: google.visualization.Query.setResponse({...});
    const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    const cols = json.table.cols.map(c => (c.label || c.id || "").trim().toLowerCase());
    const rows = [];
    json.table.rows.forEach(r => {
      const obj = {};
      let hasData = false;
      r.c.forEach((cell, i) => {
        let v = cell ? (cell.f !== undefined && cols[i] !== '' && typeof cell.v === 'object' ? cell.f : cell.v) : "";
        if (v === null || v === undefined) v = "";
        obj[cols[i]] = String(v).trim();
        if (String(v).trim() !== "") hasData = true;
      });
      if (hasData) rows.push(obj);
    });
    return rows;
  } catch (e) {
    console.error("Sheet fetch failed:", tabName, e);
    return null;
  }
}

/* ---------- Smart media link detection (YouTube / Drive / direct) ---------- */
function parseMediaLink(link) {
  if (!link) return { type: "none" };
  link = link.trim();

  // YouTube (watch, shorts, youtu.be, embed)
  let m = link.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return { type: "youtube", embed: `https://www.youtube.com/embed/${m[1]}`, thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` };

  // Google Drive file link
  m = link.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{10,})/);
  if (m) {
    const fid = m[1];
    return {
      type: "drive",
      embed: `https://drive.google.com/file/d/${fid}/preview`,
      img: `https://drive.google.com/thumbnail?id=${fid}&sz=w1200`
    };
  }

  // Direct video file
  if (/\.(mp4|webm|mov)(\?|$)/i.test(link)) return { type: "video", src: link };

  // Anything else => treat as image URL
  return { type: "image", src: link };
}

/* Render a media element (for project/video cards) */
function mediaHTML(link, title) {
  const m = parseMediaLink(link);
  const t = escapeHTML(title || "");

  if (m.type === "youtube") {
    // Thumbnail + play button overlay — click opens YouTube (no embed needed)
    return `<a href="${escapeHTML(link)}" target="_blank" rel="noopener" style="display:block;position:relative;width:100%;height:100%;background:#000;">
      <img src="${m.thumb}" alt="${t}" loading="lazy" style="width:100%;height:100%;object-fit:cover;opacity:0.85;">
      <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:68px;height:68px;background:rgba(255,0,0,0.88);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
      </span>
      <span style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.7);color:#fff;font-size:11px;padding:3px 8px;border-radius:6px;font-weight:700;">▶ YouTube pe dekhein</span>
    </a>`;
  }

  if (m.type === "drive")
    return `<iframe src="${m.embed}" title="${t}" loading="lazy" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  if (m.type === "video")
    return `<video controls preload="metadata" playsinline src="${m.src}"></video>`;
  if (m.type === "image")
    return `<img src="${m.src}" alt="${t}" loading="lazy">`;
  return "";
}

/* For photo cards: get a displayable image URL from any link */
function imageURL(link) {
  const m = parseMediaLink(link);
  if (m.type === "drive") return m.img;
  if (m.type === "image") return m.src;
  if (m.type === "youtube") return m.thumb;
  return "";
}

function escapeHTML(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- Date helpers (Newsletter sorting: newest first) ---------- */
function parseDateLoose(s) {
  if (!s) return 0;
  s = s.trim();
  // gviz "Date(2026,5,12)" format
  let m = s.match(/Date\((\d+),(\d+),(\d+)/);
  if (m) return new Date(+m[1], +m[2], +m[3]).getTime();
  // dd/mm/yyyy or dd-mm-yyyy
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) return new Date(+m[3] < 100 ? 2000 + +m[3] : +m[3], +m[2] - 1, +m[1]).getTime();
  const d = new Date(s);
  return isNaN(d) ? 0 : d.getTime();
}
function formatDate(s) {
  const t = parseDateLoose(s);
  if (!t) return escapeHTML(s);
  return new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* ---------- WhatsApp order link ---------- */
function waOrderLink(productName, price) {
  const msg = `Hello ${SITE_CONFIG.FIRM_NAME}! Mujhe ye product order karna hai:\n\n📦 *${productName}*${price ? `\n💰 Price: ₹${price}` : ""}\n\nPlease availability aur delivery details batayein.`;
  return `https://wa.me/${SITE_CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Shared UI: mobile menu, floating WA, footer year ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const overlay = document.querySelector(".nav-overlay");
  const close = document.querySelector(".nav-close");
  function closeNav() { nav?.classList.remove("open"); overlay?.classList.remove("show"); }
  toggle?.addEventListener("click", () => { nav.classList.add("open"); overlay.classList.add("show"); });
  overlay?.addEventListener("click", closeNav);
  close?.addEventListener("click", closeNav);

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});

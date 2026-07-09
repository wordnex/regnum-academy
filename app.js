/* ============================================
   REGNUM ACADEMY — app.js
   Lee config.js y actualiza la página
============================================ */

/* ===== APLICAR CONFIG AL DOM ===== */
function applyConfig() {
  const C = CONFIG;
  const wa = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;

  // Hero textos
  setText("#hero-titulo-1",  C.hero.titulo_1);
  setText("#hero-titulo-2",  C.hero.titulo_2);
  setText("#hero-titulo-3",  C.hero.titulo_3);
  setText("#hero-subtitulo", C.hero.subtitulo);
  setText("#stat-1-num",  C.hero.stat_1_num);
  setText("#stat-1-label",C.hero.stat_1_label);
  setText("#stat-2-num",  C.hero.stat_2_num);
  setText("#stat-2-label",C.hero.stat_2_label);
  setText("#stat-3-num",  C.hero.stat_3_num);
  setText("#stat-3-label",C.hero.stat_3_label);
  setText("#stat-4-num",  C.hero.stat_4_num);
  setText("#stat-4-label",C.hero.stat_4_label);

  // Links WhatsApp globales
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.dataset.wa || `Hola, quiero inscribirme en ${C.nombre}`;
    el.href = wa(msg);
  });

  // Ubicación
  document.querySelectorAll("[data-ubicacion]").forEach(el => {
    el.textContent = C.ubicacion;
  });

  // Mapa
  const mapFrame = document.getElementById("mapa-iframe");
  if (mapFrame) mapFrame.src = C.mapa_embed;
  const mapLink = document.getElementById("mapa-link");
  if (mapLink) mapLink.href = C.mapa_link;

  // Precios — render dinámico
  renderPrecios(C.precios, wa);

  // Horarios — render dinámico
  renderHorarios(C.horarios);

  // Testimonios — render dinámico
  renderTestimonios(C.testimonios);

  // Redes sociales
  const redes = C.redes;
  setHref("#social-wa", redes.whatsapp);
  setHref("#social-ig", redes.instagram);
  setHref("#social-tt", redes.tiktok);
  setHref("#social-fb", redes.facebook);

  // Footer slogan
  setText("#footer-slogan", `Academia de Artes Marciales en Bolivia.<br/>${C.slogan}`);
}

/* ===== HELPERS ===== */
function setText(sel, val) {
  const el = document.querySelector(sel);
  if (el && val) el.textContent = val;
}
function setHref(sel, val) {
  const el = document.querySelector(sel);
  if (el) {
    if (val) { el.href = val; el.closest(".social-item")?.style.removeProperty("display"); }
    else { el.closest(".social-item")?.style.setProperty("display","none"); }
  }
}

/* ===== RENDER PRECIOS ===== */
function renderPrecios(precios, wa) {
  const grid = document.getElementById("pricing-grid");
  if (!grid) return;
  grid.innerHTML = precios.map((p, i) => {
    const dir = i === 0 ? "reveal-left" : i === 1 ? "reveal-up" : "reveal-right";
    return `
    <div class="price-card ${p.destacado ? "price-featured " : ""}${dir}" tabindex="0">
      ${p.destacado ? '<div class="price-featured-badge">Más Popular</div>' : ""}
      <div class="price-label">${p.nombre}</div>
      <div class="price-row">
        <span class="price-currency">${p.moneda}</span>
        <span class="price-num">${p.monto}</span>
      </div>
      <p class="price-desc">${p.desc}</p>
      <ul class="price-features" role="list">
        ${p.features.map(f => `
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            ${f}
          </li>`).join("")}
      </ul>
      <a href="${wa(p.msg_wa)}" class="${p.destacado ? "btn-primary" : "btn-outline-price"}" target="_blank" rel="noopener">
        Quiero Inscribirme
      </a>
    </div>`;
  }).join("");
  observeNewElements(grid);
}

/* ===== RENDER HORARIOS ===== */
const schedIcons = {
  "Kick Boxing": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/></svg>`,
  "Boxeo":       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12"/></svg>`,
  "Sambo":       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 20c0-4 2.7-7 6-7h6c3.3 0 6 3 6 7"/></svg>`,
  "Jiu Jitsu":   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>`,
  "Grappling":   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
};
const clockIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

function renderHorarios(horarios) {
  const grid = document.getElementById("schedule-grid");
  if (!grid) return;
  const dirs = ["reveal-left","reveal-up","reveal-right","reveal-left","reveal-right"];
  grid.innerHTML = horarios.map((h, i) => `
    <div class="sched-card ${dirs[i] || "reveal-up"}" tabindex="0">
      <div class="sched-header">
        <span class="sched-icon">${schedIcons[h.disciplina] || schedIcons["Grappling"]}</span>
        <h3>${h.disciplina}</h3>
      </div>
      <ul class="sched-times" role="list">
        ${h.turnos.map(t => `<li>${clockIcon}${t}</li>`).join("")}
      </ul>
      ${h.nota ? `<p class="sched-sub">${h.nota}</p>` : ""}
    </div>
  `).join("");
  observeNewElements(grid);
}

/* ===== RENDER TESTIMONIOS ===== */
const starSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#F44A12" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`.repeat(5);

function renderTestimonios(testimonios) {
  const grid = document.getElementById("testimonios-grid");
  if (!grid) return;
  const dirs = ["reveal-left","reveal-up","reveal-right"];
  grid.innerHTML = testimonios.map((t, i) => `
    <article class="test-card ${dirs[i] || "reveal-up"}" tabindex="0">
      <div class="test-stars" aria-label="5 estrellas de 5">${starSVG}</div>
      <blockquote>"${t.texto}"</blockquote>
      <div class="test-author">
        <div class="test-avatar" aria-hidden="true">${t.nombre.charAt(0)}</div>
        <div><strong>${t.nombre}</strong><span>${t.disciplina}</span></div>
      </div>
    </article>
  `).join("");
  observeNewElements(grid);
}

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* ===== SCROLL REVEAL ===== */
let revealObserver;

function initRevealObserver() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.style.getPropertyValue("--delay") || "0") * 1000;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
}

function observeNewElements(container) {
  container.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
    revealObserver.observe(el);
  });
}

function observeAll() {
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
    revealObserver.observe(el);
  });
}

/* ===== FAQ ===== */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("active");
      i.querySelector(".faq-question").setAttribute("aria-expanded","false");
    });
    if (!isOpen) { item.classList.add("active"); btn.setAttribute("aria-expanded","true"); }
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }
  });
});

/* ===== INIT ===== */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  initRevealObserver();
  applyConfig();       // rellena grids dinámicos (ya llama observeNewElements)
  observeAll();        // observa elementos estáticos del HTML
}

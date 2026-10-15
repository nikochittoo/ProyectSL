/* Funciones compartidas por index.html y entrada.html. No hace falta tocar nada acá. */
const prefijo = id => String(id).replace(/-\d+$/, "");
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = f => new Date(f + "T12:00").toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"});

function media(m){
  if(!m) return `<div class="ph">[ sin muestra ]</div>`;
  if(m.kind==="imagen") return m.src ? `<img loading="lazy" src="${esc(m.src)}" alt="${esc(m.alt)}">` : `<div class="ph">[ imagen: ${esc(m.alt||"pendiente")} ]</div>`;
  if(m.kind==="pagina") return `<div class="browser"><div class="url"><b style="opacity:.5">●●●</b><span>${esc(m.url)}</span></div><div class="shot">${m.src?`<img loading="lazy" src="${esc(m.src)}" alt="Vista previa de ${esc(m.url)}">`:`<div class="ph">[ captura de la página ]</div>`}</div></div>`;
  if(m.kind==="youtube") return `<img loading="lazy" src="https://i.ytimg.com/vi/${esc(m.id)}/hqdefault.jpg" alt="Miniatura del video"><button class="play" data-yt="${esc(m.id)}" aria-label="Reproducir video"></button>`;
  if(m.kind==="video") return `<video controls preload="none" src="${esc(m.src)}"></video>`;
  if(m.kind==="social") return `<a class="social" href="${esc(m.url)}" style="text-decoration:none"><small>vista previa · ${esc(m.red)}</small><b>${esc(m.cuenta)}</b><small>Abrir en ${esc(m.red)}</small></a>`;
  return "";
}


document.addEventListener("click", ev => {
  const y = ev.target.closest("[data-yt]");
  if(y){ y.parentElement.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${y.dataset.yt}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>`; }
  if(ev.target.id === "romper") toggleRoto();
});

function toast(msg){
  let t = document.getElementById("toast");
  if(!t){ t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("on");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2600);
}
function toggleRoto(aviso){
  const roto = document.body.classList.toggle("roto");
  const b = document.getElementById("romper");
  if(b){ b.textContent = roto ? "[ arreglar todo ]" : "[ romper algo ]"; b.setAttribute("aria-pressed", roto); }
  if(aviso) toast(roto ? "[EXP-KONAMI] modo romper activado" : "[EXP-KONAMI] todo arreglado (por ahora)");
}
/* Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A */
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let kp = 0;
addEventListener("keydown", e => {
  if(/input|textarea|select/i.test(e.target.tagName)) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kp = (k === KONAMI[kp]) ? kp + 1 : (k === KONAMI[0] ? 1 : 0);
  if(kp === KONAMI.length){ kp = 0; toggleRoto(true); }
});

/* Pie de página: redes (se editan en data.js → REDES) */
(function(){
  const w = document.querySelector("footer .wrap");
  if(!w || typeof REDES === "undefined") return;
  w.insertAdjacentHTML("beforeend", '<nav class="redes" aria-label="Secciones"><a href="index.html">Registro</a><a href="index.html?f=GUIA#feed">Guías</a><a href="diccionario.html">Diccionario</a><a href="tablero.html">Tablero</a><a href="sobre.html">Sobre el lab</a><a href="sumate.html">Sumate</a></nav>');
  w.insertAdjacentHTML("beforeend", `<nav class="redes" aria-label="Redes sociales"><span>${esc(REDES_NOTA)}</span>${REDES.map(r =>
    `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(r.nombre)} ${esc(r.ver)} (se abre en otra pestaña)">${esc(r.nombre)} <small>${esc(r.ver)}</small></a>`).join("")}</nav>`);
})();

/* ===== Cuerpo de las fichas: párrafos (texto) y bloques { h } { lista } { codigo } ===== */
const textoPlano = arr => arr.map(b => typeof b === "string" ? b : (b.h || (b.lista || []).join(" ") || "")).join(" ");
function cuerpoHTML(arr){
  return arr.map(b => {
    if(typeof b === "string") return `<p>${esc(b)}</p>`;
    if(b.h) return `<h2 class="cuerpo-h">${esc(b.h)}</h2>`;
    if(b.lista) return `<ul class="cuerpo-lista">${b.lista.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    if(b.codigo != null) return `<div class="codebloque">${b.titulo ? `<span class="code-t">${esc(b.titulo)}</span>` : ""}<button type="button" class="btn code-copiar" data-copiar>Copiar</button><pre tabindex="0"><code>${esc(b.codigo)}</code></pre></div>`;
    return "";
  }).join("");
}
/* Firma o crédito: autor → "por @usuario" (con link si está en AUTORES); fuente → "de Nombre" (link) */
function credito(e, ficha){
  if(e.autor){
    const quien = [].concat(e.autor).map(n => (typeof AUTORES !== "undefined" && AUTORES[n]) ? `<a href="${esc(AUTORES[n])}" target="_blank" rel="noopener noreferrer">${esc(n)}</a>` : esc(n)).join(", ");
    return `<span class="firma">${ficha ? "— " : "por "}${quien}</span>`;
  }
  if(e.fuente) return `<span class="firma">${ficha ? "Fuente: " : "de "}<a href="${esc(e.fuente.url)}" target="_blank" rel="noopener noreferrer">${esc(e.fuente.t)}</a></span>`;
  return "";
}
async function copiar(t){
  try{ await navigator.clipboard.writeText(t); return true; }
  catch(_){
    const x = document.createElement("textarea"); x.value = t; x.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(x); x.select(); let ok = false;
    try{ ok = document.execCommand("copy"); }catch(_){} x.remove(); return ok;
  }
}
document.addEventListener("click", async ev => {
  const c = ev.target.closest("[data-copiar]"); if(!c) return;
  const ok = await copiar(c.parentElement.querySelector("code").textContent);
  c.textContent = ok ? "Copiado" : "No se pudo";
  toast(ok ? "Copiado al portapapeles" : "No se pudo copiar: seleccionalo a mano");
  setTimeout(() => c.textContent = "Copiar", 1800);
});

/* Menú de arriba: marca en verde la sección donde estás (el home puede pasar el filtro activo) */
function marcarNav(fo){
  const pag = location.pathname.split("/").pop() || "index.html";
  const f = fo !== undefined ? (fo === "all" ? null : fo) : new URLSearchParams(location.search).get("f");
  document.querySelectorAll("header nav a").forEach(l => {
    l.removeAttribute("aria-current");
    const u = new URL(l.getAttribute("href"), location.href), p = u.pathname.split("/").pop() || "index.html";
    if(p === pag && (p !== "index.html" || u.searchParams.get("f") === f)) l.setAttribute("aria-current", "page");
  });
}
marcarNav();

/* Menú de arriba en pantallas angostas: botón "Menú" que abre y cierra la lista (Esc o click afuera también cierran) */
(function(){
  const h = document.querySelector("header"), caja = h && h.querySelector(".wrap"), nav = h && h.querySelector("nav");
  if(!nav || !caja) return;
  nav.id = nav.id || "menu-principal";
  const b = document.createElement("button");
  b.type = "button"; b.className = "menu-btn"; b.textContent = "Menú";
  b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", nav.id);
  caja.appendChild(b);
  const poner = on => { h.classList.toggle("menu-abierto", on); b.setAttribute("aria-expanded", on); b.textContent = on ? "Cerrar" : "Menú"; };
  b.addEventListener("click", () => poner(!h.classList.contains("menu-abierto")));
  document.addEventListener("keydown", e => { if(e.key === "Escape" && h.classList.contains("menu-abierto")){ poner(false); b.focus(); } });
  document.addEventListener("click", e => { if(!h.contains(e.target)) poner(false); });
  addEventListener("resize", () => { if(innerWidth > 1240) poner(false); });
})();

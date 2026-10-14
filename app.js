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

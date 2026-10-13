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
  if(ev.target.id === "romper"){
    const roto = document.body.classList.toggle("roto");
    ev.target.textContent = roto ? "[ arreglar todo ]" : "[ romper algo ]";
  }
});

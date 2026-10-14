/* =====================================================================
   SACUDE LABS · CONTENIDO
   Este es el único archivo que hace falta tocar para subir cosas.

   1. CÓDIGOS (TIPOS): el prefijo del id decide qué es cada entrada.
      EXP-001            → Demo
      SL-001             → Publicación nuestra
      SACUDE PROJECT-001 → Proyecto open source nuestro
      EVT-001            → Evento
      ¿Querés otro tipo? Agregá una línea acá (ej: "LAB": {...}) y listo:
      aparece solo en los filtros, en la leyenda y en el menú de las fichas.

   2. ENTRADAS: copiá un bloque, pegalo ARRIBA de todo (la primera es la más nueva)
      y cambiá los datos. Cada entrada tiene su página: entrada.html?id=EXP-001

      id      → prefijo + número: "EXP-014", "SL-003", "SACUDE PROJECT-004"
      fecha   → "AAAA-MM-DD"
      titulo  → título corto
      texto   → resumen de la tarjeta
      cuerpo  → (opcional) párrafos de la ficha: ["párrafo 1", "párrafo 2"]
      ancho   → true para que la tarjeta ocupe 2 columnas (opcional)
      media   → UNO de estos (o nada = placeholder):
        { kind:"imagen",  src:"img/foto.jpg", alt:"descripción" }
        { kind:"pagina",  url:"https://sitio.com", src:"img/captura.jpg" }
        { kind:"youtube", id:"ID_DEL_VIDEO" }          (carga recién al hacer click)
        { kind:"video",   src:"video/demo.mp4" }       (alojado: pesa)
        { kind:"social",  red:"Instagram", cuenta:"@sacude", url:"https://..." }
      links   → botones: { t:"Ver repo", url:"https://...", main:true }
   ===================================================================== */

const TIPOS = {
  "EXP":            { nombre:"Demo",                 plural:"Demos",         desc:"Pruebas y armados que mostramos funcionando, o rompiéndose." },
  "SL":             { nombre:"Publicación",          plural:"Publicaciones", desc:"Anuncios, news y textos propios de Sacude Labs." },
  "SACUDE PROJECT": { nombre:"Proyecto open source", plural:"Open source",   desc:"Proyectos nuestros con código abierto, listos para recibir aportes." },
  "EVT":            { nombre:"Evento",               plural:"Eventos",       desc:"Jornadas, charlas y encuentros." }
};

const ENTRADAS = [
  { id:"SACUDE PROJECT-001", fecha:"2026-10-14", ancho:true,
    titulo:"SchoolGuard, bloqueo de sitios web para PCs de colegios",
    texto:"Software open source para Windows que bloquea sitios desde la propia PC, sin hardware extra. Tiene panel local con login, categorías y actualización automática.",
    cuerpo:[
      "SchoolGuard filtra los sitios web de las computadoras de un colegio solo con software, sin comprar ni instalar equipos aparte. Funciona como un servicio de Windows que arranca con la PC y resuelve los nombres de dominio de forma local: los sitios bloqueados no cargan y el resto navega normal.",
      "Se administra desde un panel que solo se abre en esa misma PC y pide usuario y contraseña. Desde ahí se cargan sitios, se activan categorías (por ejemplo adultos, redes sociales o apuestas) a partir de listas públicas y se arma una lista blanca de sitios que nunca se bloquean.",
      "La versión 0.2 suma medidas contra el esquivado del filtro, protege la carpeta de datos y exige una autorización del administrador para desinstalar. Las PCs se actualizan solas desde las versiones publicadas en GitHub, con verificación de integridad y vuelta atrás si algo falla.",
      "Estado: en desarrollo. Todavía tiene límites conocidos, como que una VPN o un proxy puede esquivar el filtro y que IPv6 no está cubierto. Si lo vas a probar, hacelo primero en una máquina virtual."
    ],
    media:{ kind:"social", red:"GitHub", cuenta:"nikochittoo/schoolguard", url:"https://github.com/nikochittoo/schoolguard" },
    links:[
      {t:"Ver el repo",url:"https://github.com/nikochittoo/schoolguard",main:true},
      {t:"Reportar un error",url:"https://github.com/nikochittoo/schoolguard/issues"}
    ] }
];

/* EJEMPLOS de entradas de otros tipos (copiá y adaptá lo que necesites):
const EJEMPLOS = [
  { id:"EVT-001", fecha:"2026-11-15",
    titulo:"Jornada abierta de experimentos",
    texto:"Traé algo para armar, desarmar o entender. Hay mesa de herramientas y gente para ayudarte.",
    cuerpo:["Una tarde para probar cosas sin presión. Podés venir con un proyecto a medias, una placa que no anda o simplemente curiosidad.","Hay mesa de herramientas, material para prototipar y gente del equipo para ayudarte. Todo se vale, siempre con respeto por el espacio y las personas."],
    media:{ kind:"social", red:"Instagram", cuenta:"@sacude", url:"#" },
    links:[{t:"Anotarme",url:"#",main:true}] },

  { id:"EXP-002", fecha:"2026-10-10", ancho:true,
    titulo:"Armamos un NAS en casa con una PC vieja",
    texto:"Rescatamos una torre de 2012, le sumamos discos y la convertimos en almacenamiento propio.",
    cuerpo:["Partimos de una torre de 2012 que estaba guardada. Le agregamos discos, instalamos el sistema y la dejamos sirviendo archivos en la red de casa.","Documentamos qué anduvo, qué se rompió y cómo lo arreglamos, para que puedas repetirlo con tu propia PC vieja."],
    media:{ kind:"pagina", url:"https://sacude.dev/nas", src:"" },
    links:[{t:"Guía paso a paso",url:"#",main:true}] },

  { id:"SL-002", fecha:"2026-10-08",
    titulo:"Abrimos Sacude Labs",
    texto:"El espacio donde van a vivir los experimentos, el código abierto y los eventos de la Sacude.",
    cuerpo:["Sacude Labs es el laboratorio virtual de la Sacude. Lo que antes quedaba repartido en redes y repos ahora tiene un lugar propio.","Acá vas a encontrar demos, publicaciones, proyectos open source y eventos, cada uno con su código de experimento."],
    media:{ kind:"imagen", src:"", alt:"Portada de Sacude Labs" },
    links:[{t:"Quiero participar",url:"#",main:true}] },

  { id:"SACUDE PROJECT-003", fecha:"2026-10-05",
    titulo:"Transit Companion, el viaje en una notificación",
    texto:"App open source que mantiene tu viaje en una notificación persistente de Android.",
    cuerpo:["Transit Companion mantiene el viaje de tu colectivo en una notificación persistente, para que no tengas que abrir la app a cada rato.","Es open source: podés probarla, reportar errores o mandar tu aporte."],
    media:{ kind:"social", red:"GitHub", cuenta:"sacude/transit-companion", url:"#" },
    links:[{t:"Ver repo",url:"#",main:true},{t:"Reportar un bug",url:"#"}] },

  { id:"EXP-001", fecha:"2026-10-01",
    titulo:"Demo: del cable suelto al primer LED",
    texto:"Una placa, un cable y varias pruebas fallidas. El video completo está en nuestro canal.",
    cuerpo:["Primer experimento del laboratorio: hacer prender un LED desde cero, sin copiar y pegar.","En el video se ven los intentos que no salieron, que es la mejor parte."],
    media:{ kind:"youtube", id:"dQw4w9WgXcQ" },
    links:[{t:"Ver en YouTube",url:"#"}] }
];
*/


/* =====================================================================
   TABLERO (tablero.html)
   estado  → "idea" | "proximamente" | "proceso" | "publicado"
   issue   → número del Issue de GitHub donde se discute (opcional)
   entrada → id de la ficha cuando ya se publicó, ej: "EXP-003" (opcional)
   tags    → temas: ["python", "hardware", "web"]
   Estos textos de ejemplo se reemplazan por los reales.
   ===================================================================== */
const GITHUB = { org:"sacudedevs", repo:"TU-REPO" };   // ← poné el nombre del repo de esta web: arma los links a Issues

const ESTADOS = [
  { k:"idea",         t:"Ideas",        d:"Propuestas abiertas. Si te prende la lámpara, sumate." },
  { k:"proximamente", t:"Próximamente", d:"Ya tienen equipo y fecha tentativa." },
  { k:"proceso",      t:"En proceso",   d:"Se están armando ahora mismo." },
  { k:"publicado",    t:"Publicado",    d:"Ya salieron del laboratorio." }
];

const IDEAS = [
  { id:"IDEA-001", estado:"publicado", titulo:"SchoolGuard, bloqueo web para colegios",
    texto:"El primer proyecto open source del lab, ya con su ficha.", tags:["windows","dotnet","educación"], autor:"@nikochittoo", entrada:"SACUDE PROJECT-001" }
];

/* EJEMPLOS de tarjetas para las otras columnas:
const IDEAS_EJEMPLO = [
  { id:"IDEA-005", estado:"idea", titulo:"Estación meteorológica con ESP32",
    texto:"Sensores baratos, una placa y una página que muestre los datos en vivo.", tags:["hardware","python"], autor:"@ejemplo" },
  { id:"IDEA-004", estado:"idea", titulo:"Guía de accesibilidad para webs de eventos",
    texto:"Una lista corta y práctica para que cualquier persona pueda usar la web de un evento.", tags:["web","accesibilidad"], autor:"@ejemplo" },
  { id:"IDEA-003", estado:"proximamente", titulo:"Jornada abierta de experimentos",
    texto:"Una tarde para armar y desarmar cosas juntos.", tags:["evento"], autor:"@ejemplo", issue:1 },
  { id:"IDEA-002", estado:"proceso", titulo:"NAS casero con una PC vieja",
    texto:"Estamos documentando el armado, con los errores incluidos.", tags:["hardware"], autor:"@ejemplo", issue:2 },
  { id:"IDEA-001", estado:"publicado", titulo:"Del cable suelto al primer LED",
    texto:"El primer experimento del lab, ya con video y ficha.", tags:["hardware"], autor:"@ejemplo", entrada:"EXP-001" }
];
*/


/* =====================================================================
   REDES (aparecen en el pie de todas las páginas)
   Por ahora son las de Sacude Devs. Cuando haya redes de Sacude Labs,
   cambiá las url y el texto de REDES_NOTA.
   ===================================================================== */
const REDES_NOTA = "Por ahora, nuestras redes son las de Sacude Devs:";
const REDES = [
  { nombre:"GitHub",    ver:"sacudedevs",  url:"https://github.com/sacudedevs" },
  { nombre:"Instagram", ver:"@sacudedevs", url:"https://www.instagram.com/sacudedevs/" },
  { nombre:"TikTok",    ver:"@sacude.devs", url:"https://www.tiktok.com/@sacude.devs" }
];

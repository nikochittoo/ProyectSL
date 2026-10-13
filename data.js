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

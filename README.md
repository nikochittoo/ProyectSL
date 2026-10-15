# Sacude Labs · Guía de la web

La web del laboratorio virtual de la Sacude. Es **HTML, CSS y JavaScript puros**: sin frameworks, sin instalar nada y sin servidor. Se edita a mano y se publica en GitHub Pages.

Esta guía explica **cómo está armada**, **cómo cargar contenido** y **para qué sirve cada archivo**.

---

## Índice

1. [Qué hay en la carpeta](#1-qué-hay-en-la-carpeta)
2. [Cómo funciona (la idea general)](#2-cómo-funciona-la-idea-general)
3. [Cargar contenido: `data.js`](#3-cargar-contenido-datajs)
4. [Los códigos de experimento](#4-los-códigos-de-experimento)
5. [Cargar una entrada paso a paso](#5-cargar-una-entrada-paso-a-paso)
6. [El tablero](#6-el-tablero)
7. [Redes sociales y GitHub](#7-redes-sociales-y-github)
8. [Qué hace cada archivo](#8-qué-hace-cada-archivo)
9. [Funciones extra](#9-funciones-extra)
10. [Cambiar el diseño](#10-cambiar-el-diseño)
11. [Probarlo en tu compu](#11-probarlo-en-tu-compu)
12. [Publicarlo en GitHub Pages](#12-publicarlo-en-github-pages)
13. [Accesibilidad](#13-accesibilidad)
14. [Si algo no anda](#14-si-algo-no-anda)
15. [Mapa rápido: "quiero hacer X, ¿qué toco?"](#15-mapa-rápido-quiero-hacer-x-qué-toco)

---

## 1. Qué hay en la carpeta

```
sacude-labs/
├── index.html          Home: presentación, contador, leyenda de códigos y feed con filtros
├── entrada.html        Ficha de cada experimento (una sola plantilla para todos)
├── tablero.html        Tablero de ideas: ideas, próximamente, en proceso, publicado
├── sobre.html          "Sobre el lab"
├── sumate.html         "Sumate": formas de participar
├── diccionario.html    Diccionario tech: términos de la A a la Z con buscador
├── generador.html      Herramienta para crear imágenes de redes (Instagram y YouTube)
├── 404.html            Página de error juguetona: [ERROR-404]
│
├── data.js             ★ TODO el contenido. Es el archivo que más vas a editar.
├── app.js              Funciones compartidas por todas las páginas (no hace falta tocarlo)
├── style.css           Todo el diseño
│
├── img/                Acá van las imágenes y capturas de las entradas
├── .github/            Plantillas de Issues y Pull Requests para GitHub
└── plantillas-repos/   README, CONTRIBUTING y CODE_OF_CONDUCT para copiar a los repos de cada proyecto
```

> **Ojo con el nombre:** este `README.md` explica la web. El que está dentro de `plantillas-repos/` es otra cosa: una plantilla para los repos de los proyectos.

> La carpeta `.github` empieza con punto, así que algunos sistemas la ocultan. En Windows, activá "Elementos ocultos" en el Explorador.

---

## 2. Cómo funciona (la idea general)

Hay un solo lugar donde vive el contenido (`data.js`) y varias páginas que lo **leen y lo dibujan**.

```
data.js  ──►  app.js  ──►  script de cada página  ──►  lo que ves
(datos)       (funciones)   (arma el HTML con los datos)
```

Cada página carga sus archivos **en este orden** (importa):

```html
<script src="data.js"></script>   <!-- 1. los datos -->
<script src="app.js"></script>    <!-- 2. funciones compartidas -->
<script> ... </script>            <!-- 3. el script propio de esa página -->
```

- **`data.js`** define listas y constantes: `TIPOS`, `ENTRADAS`, `GITHUB`, `ESTADOS`, `IDEAS`, `REDES`.
- **`app.js`** define herramientas que usan todas las páginas (ver [sección 8](#8-qué-hace-cada-archivo)).
- **El script de cada página** toma los datos y arma el HTML. Por ejemplo, el de `index.html` recorre `ENTRADAS` y crea una tarjeta por cada una.

**Consecuencia importante:** para subir contenido **no hace falta tocar el HTML**. Agregás un bloque en `data.js` y la web se actualiza sola: aparece la tarjeta en el feed, se crea su ficha, sube el contador y se actualiza el filtro.

---

## 3. Cargar contenido: `data.js`

El archivo tiene un comentario largo arriba con las instrucciones. Estas son las partes:

| Constante | Para qué sirve | Dónde se usa |
|---|---|---|
| `TIPOS` | Los prefijos de código (`EXP`, `SL`, ...) y sus nombres | Filtros, leyenda, etiquetas, generador |
| `ENTRADAS` | Los experimentos publicados | Home y fichas |
| `GITHUB` | Organización y repo de GitHub | Botones del tablero y de "Sumate" |
| `ESTADOS` | Las 4 columnas del tablero | Tablero |
| `IDEAS` | Las tarjetas del tablero | Tablero |
| `DICCIONARIO` | Los términos del diccionario | `diccionario.html` |
| `AUTORES` | Links de perfil para las firmas | Tarjetas y fichas |
| `REDES_NOTA` y `REDES` | Redes sociales | Pie de todas las páginas |

Al final de `ENTRADAS` e `IDEAS` hay un bloque comentado con **ejemplos** de otros tipos de tarjeta. Sirven para copiar y adaptar.

### Reglas de JavaScript que conviene recordar

`data.js` es código, no texto libre. Si algo está mal escrito, **la página queda vacía**. Lo más común:

- Cada entrada va entre `{ ... }` y **separada de la siguiente por una coma**.
- Los textos van entre comillas `"así"`. Si el texto lleva comillas adentro, usá `'simples'` o escribilas como `\"`.
- Después de la última propiedad de un bloque no hace falta coma, pero tampoco molesta.
- Los textos son **texto plano**: no se interpretan etiquetas HTML ni Markdown. Si escribís `<b>hola</b>`, se muestra tal cual.

---

## 4. Los códigos de experimento

Todo lo que se sube lleva un código con un **prefijo** y un **número**: `EXP-014`, `SL-003`, `SACUDE PROJECT-001`.

El prefijo decide qué tipo de cosa es. Se define en `TIPOS`:

| Prefijo | Tipo | Para qué se usa |
|---|---|---|
| `EXP` | Demo | Pruebas y armados que se muestran funcionando (o rompiéndose) |
| `SL` | Publicación | Contenido **creado por la Sacude**: videos, tutoriales, news y opiniones |
| `GUIA` | Guía | Material de consulta en texto o video. Es donde va **todo lo de otros autores** (con su crédito) |
| `DIC` | Término | Definiciones del diccionario tech. Viven en `DICCIONARIO`, no en `ENTRADAS`, y no tienen botón de filtro propio |
| `SACUDE PROJECT` | Proyecto open source | Proyectos propios con código abierto |
| `EVT` | Evento | Jornadas, charlas y encuentros |

El prefijo se detecta quitando el guion y el número del final (`-014`). Por eso el formato siempre tiene que ser **prefijo + guion + número**.

**Qué pasa solo según el prefijo:** el filtro en el que aparece, el nombre que se ve en la etiqueta, la leyenda de "Cómo leer los códigos" y el texto que aparece en las imágenes del generador.

**Para crear un tipo nuevo**, agregá una línea en `TIPOS`:

```js
"LAB": { nombre:"Laboratorio", plural:"Laboratorios", desc:"Lo que se te ocurra explicar." },
```

Aparece solo en los filtros, la leyenda y el generador. Después usás ids como `LAB-001`.

> **Regla para no mezclar `SL` y `GUIA`:** `SL` es solo contenido hecho por la Sacude. Si algo es de otra persona, va en `GUIA` con su crédito. Una guía también puede ser propia: lo que cambia es que es material para consultar.

> **Numeración:** cada código es único. No repitas un id: la ficha se busca por id y se mostraría la primera que encuentre. Una convención simple es numerar por tipo en orden de aparición.

---

## 5. Cargar una entrada paso a paso

1. Abrí `data.js` y buscá `const ENTRADAS = [`.
2. Pegá un bloque nuevo **arriba de todo** (la primera es la más nueva) y completalo:

```js
{ id:"EXP-002", fecha:"2026-11-02",
  titulo:"Armamos un NAS en casa con una PC vieja",
  texto:"Rescatamos una torre de 2012, le sumamos discos y la convertimos en almacenamiento propio.",
  cuerpo:[
    "Primer párrafo de la ficha.",
    "Segundo párrafo de la ficha."
  ],
  media:{ kind:"imagen", src:"img/nas.jpg", alt:"La torre abierta con los discos instalados" },
  links:[
    {t:"Guía paso a paso", url:"https://...", main:true},
    {t:"Video", url:"https://..."}
  ] },
```

3. No te olvides de la **coma** al final del bloque si hay otro debajo.
4. Guardá y recargá la página.

### Campos de una entrada

| Campo | Obligatorio | Qué es |
|---|---|---|
| `id` | Sí | Código: prefijo + guion + número (ver sección 4) |
| `fecha` | Sí | Formato `"AAAA-MM-DD"` |
| `titulo` | Sí | Título corto |
| `texto` | Sí | Resumen que se ve en la tarjeta |
| `cuerpo` | No | Contenido de la ficha: párrafos y bloques (ver más abajo). Si no está, la ficha usa `texto` |
| `ancho` | No | `true` para que la tarjeta ocupe 2 columnas (para las destacadas) |
| `media` | No | La muestra visual (ver abajo). Si no hay, se ve un placeholder rayado |
| `links` | No | Botones. `main:true` pinta el botón en verde |
| `autor` | No | Firma: `"@nikochittoo"`. Se ve como "por @nikochittoo" en la tarjeta y al final de la ficha |
| `fuente` | No | Crédito para contenido de otras personas: `{ t:"Nombre del canal", url:"https://..." }` |

### Tipos de `media`

Elegí **uno** por entrada:

```js
// Una imagen (guardala en la carpeta img/)
media:{ kind:"imagen", src:"img/foto.jpg", alt:"Descripción de la imagen" }

// Vista previa de una página web, dentro de un marco de navegador
media:{ kind:"pagina", url:"https://sitio.com", src:"img/captura.jpg" }

// Video de YouTube: solo se carga cuando la persona hace click en play
media:{ kind:"youtube", id:"ID_DEL_VIDEO" }

// Video alojado en la web (pesa: mejor evitarlo)
media:{ kind:"video", src:"video/demo.mp4" }

// Tarjeta liviana que lleva a una red social o repo
media:{ kind:"social", red:"Instagram", cuenta:"@sacude", url:"https://..." }
```

**Recomendaciones:**

- **`alt`:** describí qué se ve en la imagen. Lo leen los lectores de pantalla y se muestra si la imagen no carga.
- **Imágenes:** formato 16:9 (por ejemplo 1280×720), comprimidas (idealmente menos de 300 KB). Las tarjetas recortan al centro para llenar el espacio.
- **ID de YouTube:** es lo que está después de `v=` en la URL. En `youtube.com/watch?v=dQw4w9WgXcQ` es `dQw4w9WgXcQ`.
- **Videos de YouTube e Instagram:** si el contenido ya está en redes, usá `youtube` o `social` en vez de alojarlo. La web queda liviana.
- **`social` sin captura:** muestra una tarjeta con el nombre de la red y de la cuenta. No trae el post: solo enlaza a él.

### Bloques del cuerpo (para guías y tutoriales)

Cada elemento de `cuerpo` puede ser un texto (un párrafo) o uno de estos bloques:

```js
cuerpo:[
  "Un párrafo normal.",
  { h:"Un subtítulo" },
  { lista:["Primer paso", "Segundo paso"] },
  { codigo:"git clone https://github.com/usuario/repo.git", titulo:"Clonar el repo" }
]
```

El bloque de código se muestra con tipografía de terminal y un botón **Copiar**. Respeta los saltos de línea, así que podés poner varios comandos en un mismo bloque con `\n`.

### Firma y créditos

- **Firma propia:** `autor:"@nikochittoo"`. Si ese usuario está en `AUTORES` (en `data.js`), la firma enlaza a su perfil.
- **Contenido de otra persona:** usá `fuente:{ t:"Nombre", url:"..." }` en vez de `autor`. Se muestra como "de Nombre" con link al original.
- Si una entrada tiene las dos, se muestra la firma (`autor`).

### Cómo se ordenan las cosas

- El **feed** muestra las entradas en el **orden en que están en la lista**.
- En la ficha, "anterior" es la entrada de más abajo en la lista y "siguiente" la de más arriba.

### Dónde aparece la ficha

Cada entrada tiene su página en `entrada.html?id=EXP-002`. No hay que crear ningún archivo: es una sola plantilla que lee el id de la URL y busca la entrada en `ENTRADAS`. Si el id no existe, muestra un mensaje de que no se encontró.

---

## 6. El tablero

`tablero.html` es el panel donde la comunidad ve qué se está cocinando y puede sumarse. Tiene 4 columnas, que salen de `ESTADOS`:

| Estado | Columna |
|---|---|
| `idea` | Ideas |
| `proximamente` | Próximamente |
| `proceso` | En proceso |
| `publicado` | Publicado |

Cada tarjeta es un bloque de `IDEAS` en `data.js`:

```js
{ id:"IDEA-005", estado:"idea",
  titulo:"Estación meteorológica con ESP32",
  texto:"Sensores baratos, una placa y una página que muestre los datos en vivo.",
  tags:["hardware","python"], autor:"@usuario", issue:12 },
```

| Campo | Qué es |
|---|---|
| `estado` | En qué columna aparece (una de las 4 claves de arriba) |
| `tags` | Temas, se muestran como etiquetas |
| `autor` | Quién propuso la idea (opcional) |
| `issue` | Número del Issue de GitHub donde se discute (opcional) |
| `entrada` | Id de la ficha cuando ya se publicó, por ejemplo `"EXP-002"` (opcional) |

**Qué botón aparece en cada tarjeta:**

- **Ideas:** "Me prendo". Lleva al Issue si pusiste `issue`; si no, abre un Issue nuevo con el título ya escrito.
- **Próximamente** y **En proceso:** "Sumarme", con el mismo comportamiento.
- **Publicado:** "Ver ficha", si pusiste `entrada`.

**Para mover una idea de columna**, cambiá su `estado`. Para publicarla, pasala a `"publicado"` y agregá `entrada:"..."` con el id de la ficha.

**El tablero de la web y el Project de GitHub** son cosas separadas. La web se actualiza **a mano** desde `data.js`. Si usás un Project de GitHub para el seguimiento interno, mantené ambos al día.

---

## 7. Redes sociales y GitHub

### `GITHUB`

```js
const GITHUB = { org:"sacudedevs", repo:"NOMBRE-DEL-REPO-DE-ESTA-WEB" };
```

De acá salen:

- el botón **"+ proponer una idea"** del tablero y de "Sumate" (abre el formulario de ideas de ese repo),
- el link **"Ver el Project en GitHub"** (`github.com/orgs/<org>/projects`),
- los botones **"Me prendo"** y **"Sumarme"** cuando una tarjeta no tiene `issue`.

> **Importante:** `repo` tiene que ser el repo donde está **esta web**, porque ahí vive el formulario de ideas (`.github/ISSUE_TEMPLATE/idea.yml`). Hasta que lo cambies, esos botones no llevan a ningún lugar válido.

### `REDES`

```js
const REDES_NOTA = "Por ahora, nuestras redes son las de Sacude Devs:";
const REDES = [
  { nombre:"GitHub",    ver:"sacudedevs",   url:"https://github.com/sacudedevs" },
  { nombre:"Instagram", ver:"@sacudedevs",  url:"https://www.instagram.com/sacudedevs/" },
  { nombre:"TikTok",    ver:"@sacude.devs", url:"https://www.tiktok.com/@sacude.devs" }
];
```

Aparecen en el **pie de todas las páginas** (lo dibuja `app.js`) y como botones en "Sumate". Cuando haya redes propias de Sacude Labs, cambiás las `url` y el texto de `REDES_NOTA`, sin tocar el diseño.

---

## 8. Qué hace cada archivo

### `data.js`
Solo datos. No tiene lógica. Si querés cambiar **qué dice** la web, es acá.

### `app.js`
Funciones que comparten todas las páginas:

| Función | Qué hace |
|---|---|
| `$()` | Atajo para `document.querySelector` |
| `esc()` | Escapa el texto antes de ponerlo en la página. Evita que un texto con `<` o `>` rompa el diseño o se interprete como código |
| `fmt()` | Convierte `"2026-10-14"` en una fecha legible en español |
| `prefijo()` | Saca el prefijo de un id (`"EXP-014"` → `"EXP"`) |
| `media()` | Dibuja la muestra visual según su `kind` (imagen, página, youtube, video, social) |
| `marcarNav()` | Marca en verde, en el menú de arriba, la sección donde estás |
| `cuerpoHTML()` | Dibuja el `cuerpo` de las fichas: párrafos, subtítulos, listas y bloques de código |
| `credito()` | Arma la firma (`autor`) o el crédito (`fuente`) |
| `copiar()` | Copia texto al portapapeles (botón "Copiar" de los bloques de código) |
| `toast()` | Muestra un aviso corto abajo de la pantalla |
| `toggleRoto()` | Activa o desactiva el modo "romper" |
| Pie de página | Agrega los accesos a las secciones y las redes al final de cada página |

También maneja dos cosas globales: el click en el botón de play de los videos de YouTube (recién ahí se carga el video) y el easter egg del código Konami.

### `style.css`
Todo el diseño, ordenado por secciones numeradas (paleta, header, hero, filtros, tarjetas, modo romper, fichas, accesibilidad y tablero, generador, modo lectura).

### Páginas HTML

- **`index.html`:** arma el hero (con texto que se escribe solo), el **contador**, la leyenda de códigos, los filtros y las tarjetas. Lee `?f=EXP` en la URL para abrir con un filtro puesto.
- **`entrada.html`:** lee `?id=...`, busca la entrada y arma la ficha con el modo lectura.
- **`tablero.html`:** arma las 4 columnas a partir de `ESTADOS` e `IDEAS`.
- **`sobre.html` y `sumate.html`:** páginas con contenido escrito en el propio HTML. Para cambiar sus textos, editás el HTML.
- **`diccionario.html`:** ordena los términos de `DICCIONARIO`, arma el buscador y la barra de letras.
- **`generador.html`:** la herramienta de imágenes.
- **`404.html`:** GitHub Pages la muestra automáticamente cuando no existe una página. Tiene que llamarse exactamente así y estar en la raíz.

### Cosas que están repetidas
El **menú de arriba** y el **texto del pie** están escritos en cada archivo HTML. Si querés agregar o cambiar un link del menú, tenés que hacerlo **en todas las páginas** (`index`, `entrada`, `tablero`, `sobre`, `sumate`, `diccionario`, `generador` y `404`). Los accesos del pie y las redes sí salen de un solo lugar (`app.js` y `data.js`).

---

## 9. Funciones extra

### Contador del hero
Cuenta cuántos elementos hay en `ENTRADAS` y los desglosa por tipo. Se actualiza solo. Se anima al cargar, salvo que la persona tenga activada la reducción de movimiento en su sistema.

### Diccionario tech (`diccionario.html`)
Una página con los términos de la **A a la Z**, un **buscador** y una barra de letras para saltar. Los términos se cargan en `DICCIONARIO`, en `data.js`, **en cualquier orden**: la página los ordena sola.

```js
{ id:"DIC-009", termino:"Branch",
  def:"Una línea de trabajo paralela dentro de un repositorio. Permite probar cambios sin tocar la versión principal.",
  ejemplo:"\"Hacé una branch nueva para probar eso.\"",   // opcional
  tambien:["DIC-006"],                                    // opcional: ids de términos relacionados
  autor:"@nikochittoo" }                                  // la firma (o fuente:{...} si es de otra persona)
```

- El buscador mira el término y la definición, y no distingue mayúsculas ni tildes.
- Cada término tiene su propia dirección, por ejemplo `diccionario.html#dic-002`, para compartirlo.
- Si una búsqueda no encuentra nada, aparece un link para proponer el término por el formulario de ideas.
- Las definiciones que vienen de ejemplo son un borrador: revisalas antes de publicar.

### Filtros y enlaces a filtros
Los filtros salen de `TIPOS`. Se puede enlazar a uno directamente: `index.html?f=EXP`. Si hay un espacio en el prefijo, va codificado: `index.html?f=SACUDE%20PROJECT`.

Los botones de filtro (Todo, Demos, Publicaciones...) **solo se ven en Registro**. Cuando estás dentro de un tipo, la barra se reemplaza por el título de esa sección con un link para volver, así no se duplica con el menú de arriba. El menú marca en verde dónde estás. Un tipo con `filtro:false` en `TIPOS` (como `DIC`) no tiene botón.

### Modo "romper" y el código Konami
El botón **"[ romper algo ]"** del home inclina las tarjetas y pasa los bordes a punteados. Es un guiño al espíritu del lab: explorar sin miedo, con respeto. Se desactiva con **"[ arreglar todo ]"**.

El **easter egg**: con el teclado, escribir `↑ ↑ ↓ ↓ ← → ← → B A` activa o desactiva el mismo modo en cualquier página, con un aviso `[EXP-KONAMI]`. No funciona mientras se escribe en un campo de texto.

### Modo lectura (fichas)
Botón **"Modo lectura"** en cada ficha:

- Oculta el menú, el pie y los botones de navegación, y deja una columna angosta con letra más grande.
- Botones **A−** y **A+** para el tamaño de letra (de 15 a 28 px).
- **Esc** o el botón "Salir" para volver.
- Una barra verde arriba muestra el avance de lectura.
- Junto a la etiqueta del tipo, arriba del título, aparece el tiempo estimado (calculado a 200 palabras por minuto sobre el `cuerpo`).
- El navegador recuerda el modo y el tamaño elegidos (`localStorage`). Es una preferencia de cada visitante y no se guarda en ningún servidor.

### Generador de plantillas (`generador.html`)
Crea imágenes con el estilo de la web para redes. No está en el menú a propósito: abrilo escribiendo `generador.html` en la dirección.

1. Escribí el **código** (`EXP-014`) y el **título**.
2. Opcional: un texto para la derecha del pie (por ejemplo la dirección web) y el **logo** (PNG, SVG o WebP).
3. Descargá cada formato con **Descargar PNG**.

Formatos: **Instagram 4:5** (1080×1350), **cuadrado 1:1** (1080×1080) y **miniatura de YouTube** (1280×720). El tipo (DEMO, PUBLICACIÓN...) sale solo del prefijo del código. La casilla **"versión rota"** inclina el panel y agrega un efecto de glitch.

Todo se dibuja en el navegador con `<canvas>`: no se sube nada a ningún lado. Para agregar otro formato, sumá una línea en `FORMATOS` al principio del script de `generador.html`.

### Carpeta `.github/`
Para que funcione tiene que estar en la **raíz del repo**, con ese nombre exacto:

- `ISSUE_TEMPLATE/idea.yml`: formulario para proponer ideas (es el que abren los botones del tablero).
- `ISSUE_TEMPLATE/bug.yml`: formulario para reportar errores.
- `pull_request_template.md`: guía que aparece al abrir un Pull Request.

---

## 10. Cambiar el diseño

### Colores
Al principio de `style.css`, en `:root`. La paleta es de **4 colores** y conviene mantenerla:

```css
--negro:#000000;
--blanco:#F4F4F2;
--verde:#44FF2A;       /* verde flúor */
--gris:#171A17;        /* gris oscuro */
--gris-linea:#2B302B;  /* gris para bordes */
```

El generador de imágenes tiene su propia copia de estos colores en la constante `C` de su script. Si cambiás la paleta, cambiala también ahí.

### Tipografía
JetBrains Mono, cargada desde Google Fonts en el `<head>` de cada página. Se define en `--font`. Si no hay conexión, se usa otra monoespaciada del sistema.

### El "juego" de bordes
Las tarjetas combinan esquinas rectas y redondeadas a propósito, con esta idea: formal y elegante, pero con un toque de juego. En el CSS lo vas a ver como `border-radius:0 20px 0 20px`. Los botones, al pasar el mouse, pasan de rectos a redondeados.

### Menú de arriba
Se muestra en **una sola línea** cuando la pantalla tiene 1240 px o más. En pantallas más angostas pasa a ser un botón **Menú** que abre la lista de links en una columna (se cierra con el mismo botón, con Esc o tocando afuera). Si agregás links al menú y ves que ya no entra, subí el número `1240` en `style.css` (sección 13) y en `app.js`.

### Textos del hero
En `index.html`, dentro del script, están el comando (`> sacude_labs --abrir`) y el título que se escribe solo (`const T = "..."`). Se cambian ahí.

### Logo y favicon
- **Logo:** en el `<header>` de cada página hay un comentario con la línea para reemplazar el texto por una imagen: `<img src="logo.svg" height="28" alt="Sacude Labs">`.
- **Favicon:** agregá en el `<head>` de cada página `<link rel="icon" href="img/favicon.png">`.

---

## 11. Probarlo en tu compu

No necesitás instalar nada:

1. Abrí `index.html` con doble click. Se abre en el navegador.
2. Editá `data.js`, guardá y recargá la página (F5).

**Si algo no se ve bien**, apretá **F12** y mirá la pestaña **Consola**: ahí aparecen los errores de JavaScript con el nombre del archivo y la línea.

**Limitaciones al abrirlo como archivo local:**

- La tipografía y los videos de YouTube necesitan internet.
- Los videos de YouTube pueden mostrar un error al reproducirse desde un archivo local; en GitHub Pages andan normalmente. Probalos siempre ya publicados.

---

## 12. Publicarlo en GitHub Pages

1. Subí **todo el contenido de la carpeta** a un repo de GitHub (el `index.html` tiene que quedar en la raíz del repo).
2. En el repo: **Settings → Pages**.
3. En **Source** elegí **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
4. Esperá un par de minutos. GitHub te muestra la dirección.

**Cómo queda la dirección:**

- Repo con nombre `<organización>.github.io` → `https://<organización>.github.io/`
- Cualquier otro repo → `https://<organización>.github.io/<repo>/`

Los links de la web son relativos (`index.html`, `data.js`...), así que funcionan en cualquiera de los dos casos.

**Para actualizar la web:** editás `data.js` (o lo que sea) en GitHub o en tu compu, hacés commit y push. Pages se republica solo en un par de minutos.

**Flujo recomendado en equipo:** que nadie suba directo a `main`. Cada cambio va en una rama y entra por Pull Request con una revisión. Así queda registro de cada cambio, como un cuaderno de laboratorio.

---

## 13. Accesibilidad

Lo que ya está hecho:

- **Contraste medido:** el texto con menor opacidad da al menos 5:1 sobre el gris oscuro. El verde sobre negro da 15,6:1. El mínimo AA es 4,5:1.
- **Reducción de movimiento:** si el sistema lo pide, se desactivan animaciones y transiciones, y el texto del hero aparece completo.
- **Foco visible** en todo lo que se puede usar con teclado.
- **"Saltar al contenido":** primer enlace al apretar Tab en cada página.
- **Etiquetas** en la navegación, los botones de video y los links que abren pestañas nuevas.
- **Texto alternativo** en las imágenes (el campo `alt`).

Lo que conviene hacer **al cargar contenido**:

- Escribí siempre un `alt` útil.
- Usá títulos y textos claros, con frases cortas.
- No uses color como único indicador de algo.

Y falta algo importante: **probarlo con un lector de pantalla real** (NVDA en Windows o TalkBack en Android) y solo con el teclado. Las mediciones automáticas no reemplazan eso.

---

## 14. Si algo no anda

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| La página aparece vacía o sin tarjetas | Error de sintaxis en `data.js` (falta una coma, una comilla o una llave) | F12 → Consola: indica la línea. Revisá el último bloque que tocaste |
| La ficha dice "No existe el experimento" | El `id` en la URL no coincide con ninguno de `ENTRADAS` | Revisá que el id esté escrito igual, con mayúsculas y guion |
| La imagen no se ve | Ruta mal escrita, o el nombre del archivo no coincide (mayúsculas y minúsculas importan en GitHub Pages) | Revisá que `src:"img/foto.jpg"` coincida exactamente con el archivo |
| Los botones de ideas llevan a un error 404 | `GITHUB.repo` todavía dice `TU-REPO`, o el repo no tiene el formulario | Poné el nombre real del repo y verificá que `.github/ISSUE_TEMPLATE/idea.yml` esté subido |
| El formulario de ideas no aparece en GitHub | `.github` quedó dentro de otra carpeta, o sin el punto | Tiene que estar en la raíz del repo y llamarse `.github` |
| Un filtro dice "Todavía no hay experimentos de este tipo" | No hay ninguna entrada con ese prefijo | Es normal hasta que cargues una |
| El generador muestra otra tipografía | No cargó JetBrains Mono (sin internet) | Conectate y recargá |
| Los cambios no se ven en la web publicada | Pages tarda unos minutos, o el navegador guardó la versión anterior | Esperá un poco y recargá con **Ctrl+F5** |
| Los menús de arriba difieren entre páginas | El menú está repetido en cada HTML | Editá la misma línea en todas las páginas |

---

## 15. Mapa rápido: "quiero hacer X, ¿qué toco?"

| Quiero... | Toco... |
|---|---|
| Subir un experimento, news, proyecto o evento | `data.js` → `ENTRADAS` |
| Escribir una guía con comandos para copiar | `data.js` → `ENTRADAS`, con bloques `{ codigo:"..." }` en el `cuerpo` |
| Firmar una publicación | `data.js` → `autor:"@usuario"` (y su link en `AUTORES`) |
| Agregar un tipo de código nuevo | `data.js` → `TIPOS` |
| Agregar o mover una idea del tablero | `data.js` → `IDEAS` |
| Cambiar las redes sociales | `data.js` → `REDES` y `REDES_NOTA` |
| Poner el nombre real de la organización y el repo | `data.js` → `GITHUB` |
| Agregar un término al diccionario | `data.js` → `DICCIONARIO` |
| Cambiar colores o tipografía | `style.css` → `:root` |
| Cambiar el título que se escribe en el home | `index.html` → script del hero |
| Cambiar los textos de "Sobre el lab" o "Sumate" | `sobre.html` o `sumate.html` |
| Agregar un link al menú | El `<header>` de **todas** las páginas HTML |
| Poner el logo | El `<header>` de todas las páginas |
| Crear imágenes para redes | `generador.html` |
| Subir imágenes | La carpeta `img/` |
| Cambiar las plantillas de GitHub | `.github/` |

---

<sub>Sacude Labs · Explorar sin miedo a romper cosas, siempre con respeto.</sub>

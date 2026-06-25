# Plan: Documentación del Design System — Imperial CFS

Documento de continuidad para retomar este trabajo en otra sesión. Entregable: `docs/design-system.html`.

## Objetivo

Crear una página HTML que documente el design system real del proyecto, basada **únicamente** en lo que existe en el código — sin inventar tokens, clases ni componentes. Cada afirmación debe poder verificarse releyendo el archivo fuente citado.

## Regla de oro (no negociable)

> No inventar ningún valor. Siempre leer el código y documentar con base en lo que existe.

Antes de documentar cualquier "componente", se verificó con `grep` en cuántas páginas HTML aparece la clase candidata. Solo se documenta como reutilizable lo que se confirmó en múltiples páginas; lo específico de una sola página se etiqueta como tal o se deja pendiente.

## Decisiones ya tomadas (no replantear sin razón nueva)

- **Ubicación**: todo vive en un único archivo, `docs/design-system.html` (carpeta `docs/` nueva, separada de las páginas de producto).
- **Fuente CSS principal**: `Content/design-system.css` (la copia vigente — todas las 38 páginas la referencian). La copia duplicada en la raíz del repo (`design-system.css`) está desincronizada/obsoleta y se deja sin tocar por ahora; es una tarea aparte, no parte de este plan.
- **Avance incremental por fases**, cada una verificada antes de avanzar a la siguiente.
- **`Content/custom-styles.css` se documenta en el mismo archivo** (`docs/design-system.html`), como secciones nuevas, no en un archivo separado.
- **Dentro de `custom-styles.css`**, que está organizado por página (no por componente), se separa explícitamente:
  - Lo **reutilizable** (clase usada en ≥7 páginas, confirmado por conteo real con `grep -l`)
  - Lo **específico de página**, que se deja pendiente y listado por nombre de bloque + línea, para abordarlo bloque por bloque en sesiones futuras.

## Estado actual — completado

| Fase | Contenido | Fuente | Estado |
|---|---|---|---|
| 1 | Tokens: color, tipografía, espaciado, bordes, sombras | `Content/design-system.css` (líneas 117–254, `:root`) | ✅ Completo |
| 2 | Utilidades: resets heredados, display/flex, espaciado (todos los ejes), tipografía, color texto/fondo/borde, radios/sombras, efectos, `.type-*` | `Content/design-system.css` (líneas 76–685) | ✅ Completo. Incluye 2 bugs reales documentados (ver abajo) |
| 3 | Componentes compuestos reales (no clases de componente, sino patrones de uso): `.btn-accent`, aviso warning-pill, input `readonly`, `.section-title.type-h4` | Markup real de `charges.html`, `availability.html`, `user-management.html`, `user-profile.html`, `home.html`, `container-level-release.html` | ✅ Completo. Excluye explícitamente `.card-shadow`, `.summary-card`, `.shift-badge` (viven en `custom-styles.css`, no en `design-system.css`) |
| 4a | Navbar/Header (`.pc-menu`, `.header-top`, `.header-main`, `.menu-list`, estado `.on-top`) | `Content/custom-styles.css` líneas 2311–2496 + `js/components/marketing-header.js` | ✅ Completo. Confirmado con conteo: 11–19 páginas |
| 4b | Tablas de reportes / DataTables (sticky columns, filas alternadas, filtros) | `Content/custom-styles.css` líneas 3148–3394 | ✅ Completo. Confirmado con conteo: 7–11 páginas |
| 4c | HBL Table layout — solo `.hbl-list-grid`/`.hbl-list-item` (6–7 páginas) | `Content/custom-styles.css` líneas 488–993 | ✅ Parcial. El resto del bloque (`.hbl-master-list`, `.ams-*`, `.hbl-item-details-modal`, offcanvas, `.details-card`) queda **pendiente**: confirmado en solo 1 página real (`availability3.html` es duplicado/borrador de `availability.html`, según el usuario) |
| 4d | IPI Tracing page — solo `.ipi-tracing .destination-container` (3 páginas) | `Content/custom-styles.css` líneas 1247–1445 | ✅ Parcial. Resto del bloque (`.milestone-v2`, `.ams-list-item2`, `.warehouse-in-out-details`, `.hbl-wrapper`, `.flex-column-sm`) pendiente, 1–2 páginas reales. **Hallazgo: ~80 líneas de CSS muerto** confirmado sin ningún uso en las 38 páginas HTML: `.card-shadow.destination`, `.transport-badge`, `.badge-truck`, `.badge-rail`, `.sticky-column-content`, todo el sistema `.useful-links` |
| 4e | "Search Modal" — en realidad sistema completo de modales + header de Availability (`.hamburger-menu` 40 páginas, `.nav-logo`/`.availability-menu` 17, `.login-modal` 11, `.faux-modal`/`.confirmation-modal` 6, `.profile-dropdown` 5, `.modal-under-header` 4) | `Content/custom-styles.css` líneas 1446–1623 | ✅ Completo. Uno de los bloques más reutilizados de todo el archivo a pesar de su etiqueta de comentario ("Search Modal") |
| 4f | Transit Time Schedule — `.Availability-table` (7 páginas) | `Content/custom-styles.css` líneas 1624–1657 | ✅ Completo. **Hallazgo: typo en clase global** `.availavility-v2` (falta letra) aplicada en el `<body>` de casi todo el sitio, no solo en páginas de disponibilidad |
| 4g | Charges Page / Terminal Schedule / Container Level Release — documentados como **específicos de 1 página cada uno** (decisión del usuario: documentar igual aunque no sean reutilizables) | `Content/custom-styles.css` líneas 1658–2002 | ✅ Completo. `.charges-table`/`.charges-page` → solo `charges.html`; `.terminal-schedule-main/-section`/`.shift-badge` → solo `terminal-schedule.html`; `.container-level-release` (`.ams-list-item2`, variante de `.hbl-list-item` con conector `::before`) → solo `container-level-release.html`. **Hallazgo: ~83 líneas de CSS muerto** (`.ginfo`, `.cucc-item`, `#collapse-cucc`, `#edit-charge-modal-1`, `.money-sign`) que solo existen en `Content/availability-backup.html`, un archivo de respaldo no servido |
| 4h | Information / Marketing Pages — `.hero-section` (14 pág.), `.side-nav`/`.quote-bubble` (12), `.news-item`/`.btn-marketing` (3) | `Content/custom-styles.css` líneas 2006–3148 aprox. | ✅ Completo. Nota: el bloque de navbar (Fase 4a, líneas 2311–2496) vive físicamente dentro de este mismo comentario — ya documentado, no se repitió. Resto de selectores de 1 sola página (`.tracking-widget`, `.feature-card`, `.news-ticker`, etc.) documentados por referencia, marcados explícitamente como no reutilizables |
| 4i | Profile Page Styles — `.profile-page`/`.profile-icon-circle` (2 páginas reales distintas), resto específico de `user-profile.html` | `Content/custom-styles.css` líneas 2968–3147 | ✅ Completo |
| 4j | User Management Page (resto) — `.btn:not([disabled]):hover` **global** (39 páginas), resto específico de `inland-warehouse.html`/`payment-confirmation.html` | `Content/custom-styles.css` líneas 3397–3518 | ✅ Completo |
| 4k | Responsive styles (overrides de componentes ya documentados, sin componentes nuevos) | `Content/custom-styles.css` líneas 3521–3992 | ✅ Completo. **Hallazgo: 3ª regla `html{}` de font-size**, esta vez condicional a `@media (min-width:1920px)` — gana por orden de aparición sobre la incondicional de la línea 1219 en pantallas grandes |
| 4l | Utilidades finales + scrollbar personalizado — `.custom-scrollbar` (3 páginas), `.no-wrap`/`.filter-cyan` (3), `.truncate-text`/`.square-bullet` (2), más utilidades globales (`:target`, `input:focus`) | `Content/custom-styles.css` líneas 3994–4109 (fin del archivo) | ✅ Completo. **custom-styles.css documentado al 100%, 4,109/4,109 líneas revisadas.** Hallazgo: `.offcanvas-backdrop` (línea 4022) sin uso confirmado en ninguna página |

### Bugs / hallazgos reales documentados (no son invención, están citados con línea exacta)

1. **Bug de cascada `.pl-8`** (`Content/design-system.css` líneas 379–380): `.ml-12` y `.ml-16` emparejan su padding con `.pl-8` en vez de `.pl-12`/`.pl-16`. Confirmado con el usuario (Sergio): viene de un archivo viejo previo a este proyecto — alguien parchó síntomas con `!important`/especificidad sin arreglar la causa, y no cubrió todos los casos. **Decisión: documentar solamente, no corregir todavía** (queda fuera del alcance actual; se arreglará después en una tarea separada).
2. **Nombres de clase cruzados**: `.text-navy-*` y `.bg-navy-200/-100` en realidad usan la escala `--clr-azure-*`, no `--clr-navy-*`. `.text-azure-700` usa `--clr-navy-700` (invertido).
3. **Duplicación de lógica real**: el listener de scroll que activa `body.on-top` está copiado en cada página (`about-us.html`, `contact.html`, `home.html`, `forms.html`, `error-404.html`, y más) en vez de vivir centralizado en el web component `marketing-header.js`.
4. **Token indefinido**: `.header-main a` usa `var(--brand-dark)`, que no existe en `:root` de `design-system.css` — variable sin declarar.
5. **`var(--font-secondary)` etc. con nombres engañosos**: ver tabla de hover-scale (`.hover-scale-102` en realidad es 100.25%, `.hover-scale-97` es 99% literal) y `.text-lowercase` que en realidad aplica `text-transform:initial`, no `lowercase`.
6. **Segunda regla `html {}` redundante** (`Content/custom-styles.css` línea 1219, dentro del bloque mal etiquetado "Photo gallery"): `font-size: clamp(1rem, 0.5rem + 0.625vw, 1.25rem) !important` — separada de `html { scroll-margin-top: 5.2rem!important; }` en `design-system.css:683`. No hay conflicto de propiedad, pero confirma que no existe un solo lugar para reglas de `html {}`.
7. **CSS muerto confirmado (~80 líneas)** (`Content/custom-styles.css` líneas 1249–1330, bloque "IPI Tracing page"): `.card-shadow.destination`, `.transport-badge`, `.badge-truck`, `.badge-rail`, `.sticky-column-content` y todo el sistema `.useful-links` (incluido su dropdown) — cero coincidencias en las 38 páginas HTML, confirmado con `grep -rn` exhaustivo.
8. **Typo en clase aplicada globalmente**: `.availavility-v2` (`Content/custom-styles.css` línea 1626, bloque "Transit Time Schedule") tiene una letra de más ("availa**vi**lity") y está puesta en el `<body>` de casi todas las páginas (`home.html:25` y la mayoría del resto), no solo en páginas de disponibilidad. El nombre sugiere un alcance que no existe en la práctica.
9. **CSS muerto de un archivo de respaldo** (`Content/custom-styles.css` líneas 1660–1742, bloque "Charges Page"): `.ginfo`, `.cucc-item`, `#collapse-cucc`, `#edit-charge-modal-1`, `.money-sign` solo existen en `Content/availability-backup.html` (archivo de respaldo, no servido) — ~83 líneas sin destino real en producción.
10. **Tercera regla `html {}` de font-size, condicional** (`Content/custom-styles.css` línea 3536, dentro de `@media (min-width:1920px)`): se suma a la incondicional de la línea 1219 y a la de `design-system.css:683`. Gana por orden de aparición en pantallas ≥1920px, saltando el tamaño base hasta `3rem`. Puede ser intencional, pero el mecanismo (3 reglas `html{}` en 2 archivos) lo hace difícil de verificar a simple vista.
11. **CSS muerto adicional**: `.offcanvas-backdrop { opacity:.7!important; }` (`Content/custom-styles.css:4022`) sin ningún caso de uso estático confirmado en las 38 páginas HTML.

## Pendiente — qué queda realmente

**Nota (actualizado en Fase 6/7, sesión 2026-06-24):** la tabla original de esta sección quedó obsoleta — citaba "4,109 líneas" (el archivo real tiene 3,987 tras las limpiezas de hallazgos #7/#9/#11) y marcaba el bloque HBL details modal / IPI Tracing como "pendiente por baja muestra" sin más detalle. Eso ya se resolvió a fondo: ver "Bloque 'Pendiente — baja muestra' — resuelto" más abajo. Resumen: el HBL details modal resultó ser 1 página real completa y documentable (ya documentada en `docs/design-system.html`), `.link-offset-2` resultó ser reutilizable en 14 páginas (no de baja muestra), y solo 4 selectores quedan genuinamente pendientes por baja muestra: `.milestone-v2`, `.warehouse-in-out-details`, `.flex-column-sm`, `.lfd-godate`.

Posible próximo paso fuera del alcance original del plan: decidir si vale la pena **corregir** alguno de los 11 hallazgos documentados (típicamente solo se han registrado, no arreglado — ver decisión explícita en el bug #1 de `.pl-8`, y su corrección de redacción en Fase 7).

### Priorización de los 11 hallazgos (sesión 2026-06-24, sin tocar código aún)

Criterio: impacto real vs. riesgo de romper algo que hoy se ve bien por casualidad.

**Alto impacto, bajo riesgo — candidatos a arreglar primero**
- **#8 ✅ CORREGIDO (sesión 2026-06-24)** Typo `.availavility-v2` → renombrado a `.availability-v2` en los 35 archivos que lo usaban (34 `.html` + `Content/custom-styles.css` + `Content/terminal-schedule-print.css`; `Content/availability-backup.html` también actualizado por consistencia). Verificado: 0 ocurrencias del typo fuera de este documento (que lo conserva como registro histórico); `custom-styles.css` mantiene sus 4,109 líneas intactas tras el reemplazo. **Verificación visual completa (mismo día):** servidor local levantado, navegador automatizado en `home.html`, `availability.html`, `about-us.html`, `charges.html`. Header, breadcrumbs, tabla `.Availability-table` con striping/hover, forms/checkboxes — todo renderiza correctamente; `<body>` confirmado con `availability-v2` (sin typo) en las 4 páginas; sin errores de consola atribuibles al cambio (los 404 presentes son preexistentes: bundles JS, manifest, fuentes, favicon — infraestructura del server local, no relacionados). **Hallazgo #8 cerrado y verificado.**
- **#4 ✅ CORREGIDO Y VERIFICADO (sesión 2026-06-24)** Token indefinido `var(--brand-dark)` (3 usos: `.header-main a`, `.widget-tab.active` color y border-top) → reemplazado por `var(--clr-navy-900)` (#0A192F, token real de marca usado en `--clr-text-headings`), decisión del usuario sobre 2 alternativas presentadas. Antes caía por herencia accidental a `--clr-text-primary` (gris genérico), no a un valor decidido. Verificado visualmente en `home.html` tras scroll (header sin `.on-top`): navbar y tab activo muestran `rgb(10,25,47)` correctamente, sin errores de consola nuevos. **Hallazgo nuevo detectado durante la verificación (no corregido, fuera de alcance de #4):** el link "Services" del navbar queda en gris genérico `rgb(51,51,51)`, no navy — usa un selector distinto al tocado por este fix (probablemente trigger de submenu/dropdown). Pendiente investigar por separado.

**Riesgoso de tocar — requiere prueba visual antes/después, no son "solo limpieza"**
- **#1** Cascada `.pl-8`: decisión ya tomada de dejarlo fuera de alcance. Mantener salvo razón nueva.
- **#2** Nombres cruzados navy/azure: no es un bug visual, es una decisión de naming — arreglarlo es una migración (renombrar clases o tokens), no un fix puntual.
- **#6 / #10** Reglas `html{}` redundantes (font-size): hay que confirmar en navegador real cuál gana en cada breakpoint antes de eliminar ninguna — podrían estar produciendo el resultado deseado "por accidente".

**Bajo riesgo, bajo impacto — limpieza segura cuando se quiera**
- **#7, #9, #11 ✅ REVISADOS Y CORREGIDOS (sesión 2026-06-24)** — la re-verificación encontró 2 falsos positivos en el audit original:
  - **#7 — parcialmente muerto, no todo:** `.card-shadow.destination` **sí se usa** (`charges.html:167`, `ipi.html:268` — selector compuesto, ambas clases en el mismo elemento). NO se borró. Sí se borraron, confirmados muertos: `.transport-badge`, `.badge-truck`, `.badge-rail`, `.sticky-column-content`, `.useful-links` (sistema completo dropdown, incluida una variante `:active` que el audit original no había listado, encontrada en línea separada del archivo).
  - **#9 — confirmado muerto, borrado completo:** `.ginfo`, `.cucc-item`, `#collapse-cucc .cucc-amounts-grid` (el id `#collapse-cucc` sigue vivo en el HTML como target de Bootstrap collapse, pero ningún markup tiene la clase hija `.cucc-amounts-grid`, así que la regla en sí no aplicaba a nada), `#edit-charge-modal-1`, `.money-sign`.
  - **#11 — FALSO POSITIVO, NO se borró:** `.offcanvas-backdrop` **sí tiene uso real** — Bootstrap lo inyecta dinámicamente por JS cuando se abre cualquier `offcanvas` (`data-bs-toggle="offcanvas"`), presente en 7 páginas reales (`availability.html`, `search.html`, `user-profile.html`, etc.). El audit original solo grepeaba HTML estático y no detecta elementos creados en runtime.
  - **Nota menor sin tocar:** `.mbl-details.ipi-tracing .useful-links h2` (línea 838) es un sub-selector muerto dentro de una lista de selectores separados por coma donde el resto sí está vivo — no afecta nada visualmente, se deja como está por ser riesgo innecesario para cero beneficio.
  - `custom-styles.css`: 4,109 → 3,987 líneas (122 líneas netas eliminadas). Llaves balanceadas (720/720) verificado. **Verificación visual completa**: `home.html`, `charges.html`, `ipi.html`, `availability.html` revisadas sin roturas; test específico del collapse `#collapse-cucc` (botón "CUCC Charges") confirmado funcionando; `.offcanvas-backdrop` confirmado inyectándose correctamente al abrir un offcanvas. Sin errores de consola nuevos.
- **#3** Duplicación del listener de scroll (`body.on-top`): refactor de JS, no bug visual, tema de mantenibilidad.
- **#5** Nombres engañosos de utilidades (`hover-scale-102`, `text-lowercase`): nadie lo reporta como bug, solo el nombre miente sobre el comportamiento.

**Orden recomendado si se retoma**: 1) #8 y #4 (alto impacto, bajo riesgo) → 2) #7/#9/#11 (limpieza gratis) → 3) sesión dedicada a #1/#2/#6/#10 con verificación visual real antes/después, porque tocarlos sin probar puede romper algo que hoy funciona por casualidad.

Decisión pendiente de Sergio: por cuál empezar, o si se deja todo así por ahora.

### Metodología usada (referencia para futuros bloques o archivos)

1. Leer el bloque completo en `Content/custom-styles.css` con `Read` (offset/limit por línea).
2. Extraer los selectores de clase/id del bloque (`grep -oE '^\s*[.#][a-zA-Z0-9_-]+'`).
3. Para cada selector candidato, contar uso real: `grep -l "class=\"[^\"]*\bNOMBRE\b" *.html | wc -l`.
4. Si aparece en ≥2-3 páginas → documentar como reutilizable, con demo visual + cita de markup real (`<pre>` con el HTML literal y su ruta:línea).
5. Si es de una sola página → decidir con el usuario si vale la pena documentarlo o dejarlo fuera.
6. Verificar el HTML resultante: levantar servidor local (`python3 -m http.server` desde la raíz del repo) y comprobar `curl -s -o /dev/null -w "%{http_code}"` = 200, más balance de tags (`<div>`/`</div>`, `<table>`/`</table>`, etc.) con un script Python rápido antes de dar por cerrada la fase.
7. Actualizar el indicador de fase en el `<span class="docs-phase-note">` al inicio de `docs/design-system.html`.

## Fase 5 — Navegación sticky con scrollspy + demos visuales faltantes (planeado 2026-06-24, decisiones aceptadas por el usuario)

Objetivo: agregar a `docs/design-system.html` (a) un ejemplo visual renderizado para cada componente documentado y (b) un `<aside>` sticky con navegación que se resalte automáticamente (scrollspy) según la sección visible.

### Decisiones aceptadas (no replantear sin razón nueva)

1. **Anclas**: agregar `id` slugificado a cada `<h3>` (hoy solo los 6 `<h2>` tienen `id`; hay ~45 subsecciones `<h3>` sin ancla).
2. **Layout**: envolver el contenido en grid de 2 columnas dentro de `.docs-wrap` — `aside` (nav) + `main` (contenido actual sin cambios de fondo). El aside usa `position: sticky; top: var(--space-4)` y scroll propio si la lista excede el alto del viewport.
3. **Nav anidada**: lista `<h2>` con sub-lista de sus `<h3>`, escrita a mano en el HTML (no generada por JS) — coincide 1:1 con las anclas reales, sin riesgo de desincronización entre nav y contenido.
4. **Scrollspy**: vanilla JS con `IntersectionObserver` sobre cada `<h3>`/`<h2>`, marca `.active` en el link del aside correspondiente. Sin librerías externas (Bootstrap Scrollspy no se usa para no añadir dependencia nueva solo para la doc).
5. **Demos visuales nuevas** (8 bloques que hoy solo tienen tabla/código, sin render): Navbar/Header, Modales y header de Availability, Terminal Schedule, Container Level Release, Information/Marketing (hero-section, quote-bubble, btn-marketing, news-item), Profile Page, User Management resto, Utilidades finales (scrollbar, truncate, square-bullet). Se renderizan **estáticos** (sin JS funcional de Bootstrap — sin `data-bs-toggle` real, alturas tipo `100vh` reducidas a un valor fijo razonable) para no romper el layout de la página de documentación.

### Ejecutado y verificado (sesión 2026-06-24)

- [x] `id` slugificado agregado a los 48 `<h3>` (60 ids únicos en total con los 6 `<h2>` ya existentes)
- [x] `.docs-wrap` restructurado a grid `.docs-layout` (240px aside + main), responsive a 1 columna en ≤900px
- [x] Nav anidada escrita a mano en el `<aside>` — 7 grupos `<h2>`, 1:1 con los ids reales
- [x] Scrollspy con `IntersectionObserver` (`rootMargin: '-10% 0px -75% 0px'`), sin librerías externas
- [x] Demo visual agregada a los 8 bloques: Navbar/Header, Modales/Availability, Terminal Schedule, Container Level Release, Information/Marketing, Profile Page, User Management resto, Utilidades finales. Todas con HTML/CSS inline (mismo patrón que las demos previas) porque `design-system.html` solo carga `design-system.css`, no `custom-styles.css` — las clases reales (`.menu-list`, `.btn-marketing`, etc.) se incluyen en el markup por fidelidad documental pero el render visual depende de estilos inline, igual que la demo de tablas de reportes ya existente.
- [x] Verificación visual completa: servidor local + Playwright, balance de tags confirmado por script (div/section/table/tbody/tr/ul/li/aside/main/style/head/body/html, todos 1:1), scrollspy probado en color/navbar/modales/terminal-schedule/marketing/profile/user-management/utilidades-finales — resalta correctamente, sin overlap del aside, sin errores de consola nuevos (solo 404 de favicon, preexistente)

**Corrección post-cierre (mismo día):** Sergio preguntó "¿ya revisaste también custom-styles.css?" — la auditoría original de "8 bloques sin render" estaba incompleta. Al re-revisar las 15 subsecciones de `custom-styles.css` una por una se encontraron 3 más sin demo visual real (solo tenían tabla o `<pre>` de código): **HBL Table layout**, **Charges Page**, **IPI Tracing wrapper**. Se agregaron sus demos (fila `.hbl-list-item` con grid real, `.charges-table .btn-group` en columna con fondo cyan, `.destination-container` con min-width:25rem) y se verificaron visualmente igual que las anteriores — sin errores de consola, balance de tags 1:1. **Lección de metodología:** al auditar "qué falta", recorrer la lista completa de subsecciones de la fuente (los 15 `<h3>` de `custom-styles.css`), no solo los nombres que saltan a la vista en una lectura rápida.

**Fase 5 cerrada (11 de 15 subsecciones de `custom-styles.css` con demo visual real; las 4 restantes — Tablas de reportes, Transit Time Schedule, Responsive styles, Pendiente baja muestra — ya tenían demo visual, código ilustrativo suficiente, o no aplican por ser hallazgo/nota, no componente).**

## Fase 6 — Auditoría completa: Bootstrap + legacy (css.css/extra.css) + huecos reales en design-system.css/custom-styles.css

**Estado: PLANEADA, NO EJECUTADA todavía.** Se investigó a fondo y se tomaron decisiones con Sergio, pero ningún archivo se tocó aún (ni `docs/design-system.html` ni los CSS fuente). Esta sección tiene todo lo necesario para retomar en otra sesión sin re-investigar.

### Disparador

Sergio preguntó si `custom-styles.css` y `design-system.css` estaban realmente completos, y señaló que el proyecto también tiene `Content/css.css` y `Content/extra.css` — estilos legacy que tuvo que sobreescribir por especificidad dentro de `design-system.css`/`custom-styles.css` — y que **Bootstrap es la base de todo el proyecto**. Pidió revisar que todo esté agregado y documentado, y planear antes de tocar nada.

### Corrección importante durante la investigación (dejar constancia)

Se afirmó inicialmente que `Content/css.css` estaba "vacío (0 bytes)" porque `wc -l css.css` devolvía 0. **Eso era falso**: `wc -l` cuenta saltos de línea, y el archivo está minificado en una sola línea. El tamaño real es **139,062 bytes (~139 KB), 656 selectores de clase**. Si se retoma esta fase, no asumir que el archivo está vacío — ya se verificó que no lo está.

### Hallazgos confirmados (con metodología para reproducirlos)

**1. Orden real de carga (cascade completo), confirmado en `home.html` líneas 15-23 y consistente en el resto del sitio:**
```
1. Bootstrap (CDN) — versión INCONSISTENTE entre páginas: 5.3.8 vs 5.3.3
2. Bootstrap Icons 1.11.3 (CDN)
3. Content/css.css       <- legacy, 139KB, 656 selectores
4. Content/extra.css     <- legacy, 181 líneas
5. Content/css.css       <- ¡duplicado! se referencia DOS VECES en el <head> (confirmado en home.html:17 y :21)
6. Content/design-system.css
7. Content/custom-styles.css
```
Comando para reproducir el conteo de versiones de Bootstrap: `grep -l 'bootstrap@5\.3\.3' *.html | wc -l` (40) vs `grep -l 'bootstrap@5\.3\.8' *.html | wc -l` (33). Nota: estos conteos incluyen archivos de respaldo/copia (`Copia de *.html`, `*-backup.html`), no son exactamente "38 páginas reales" — filtrar esos antes de citar el número final en el doc.

**2. `Content/extra.css` (181 líneas) — auditoría completa ya hecha, lista para documentar:**

Metodología: `grep -l "CLASE" *.html 2>/dev/null | grep -v "backup\|Copia\|Daily" | wc -l` para cada selector del archivo.

| Selector | Páginas reales | Vivo/Muerto |
|---|---|---|
| `.inland` | 29 | Vivo |
| `.full` | 24 | Vivo |
| `.hidden` | 16 | Vivo |
| `.master` | 6 | Vivo |
| `table.data` | 2 | Vivo |
| `.bolder` | 2 | Vivo |
| `.NoLtRtPad` | 3 | Vivo |
| `.min-height` | 3 | Vivo |
| `.direct` | 3 | Vivo |
| `.btn-group` | 2 | Vivo (ver caso de override abajo) |
| `.super` | 1 | Vivo (baja muestra) |
| `.fixed-height`, `.height`, `.topPad`, `.btn-red`, `.btn-small`, `.modalBackground`, `.modalPopup`, `.tablefix`, `.noTopBtmPad` | 0 | Muerto confirmado |
| `.ginfo`, `.cucc-item` (también definidos en extra.css, no solo en custom-styles.css) | 0 | Muerto — consistente con el hallazgo #9 ya documentado (esas clases solo viven en `availability-backup.html`) |

**Caso de override real para la demo visual:** `extra.css` define `.btn-group button { background-color: #04aa6d; }` (verde) y `div.btn-group { width:100% }`. `custom-styles.css` define `.charges-table .btn-group { flex-direction:column; background: var(--clr-cyan-47); }` (cyan) — selector más específico, gana en `charges.html`. Pero hay **2 páginas reales** con `.btn-group` sin el prefijo `.charges-table` — en esas, el verde de `extra.css` probablemente sigue ganando (no verificado visualmente todavía, hacerlo al ejecutar esta fase).

**3. `Content/css.css` (139 KB, 656 selectores) — tratamiento proporcional (decisión de Sergio, no exhaustivo selector-por-selector):**

Metodología para regenerar la lista de selectores vivos (el archivo está minificado en 1 línea):
```bash
cd Content && grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*\s*[,{]' css.css | sed -E 's/[,{]\s*$//' | sort -u | sed 's/^\.//' > /tmp/cssclasses.txt
# luego, por cada clase: grep -l "class=\"[^\"]*\bCLASE\b" *.html | wc -l
```
Resultado: 656 selectores totales, 92 con al menos 1 coincidencia por nombre en algún HTML. **Ojo:** muchos de esos 92 son nombres genéricos de una sola palabra (`row`, `btn`, `text`, `item`, `link`, `center`, `active`, `bold`, `footer`, `arrow`, `logo`, `search`, `close`, `title`, `left`, `right`, `section`, `nowrap`, `hide`, `button`, `details`, `inline`, `disabled`, `box`, `small`, `show`, `normal`, `scroll`, `plus`, `pending`, `overflow`, `hold`, `dotted`, `open`, `image`, `desc`, `animated`, `anchor`, `amount`, `ac`, `ar`, `al`, `fr`, `fa`, `clears`, `grey`, `icon`, `underline`, `quantity`, `radio`, `totals`) — **probablemente colisionan con Bootstrap mismo o con clases ya definidas en `custom-styles.css`/`design-system.css`**, y no se puede afirmar "vivo" solo por coincidencia de nombre sin verificar cuál capa gana por especificidad. Decisión: estos quedan como **"indeterminados"** en la documentación, sin afirmar vivo ni muerto.

Selectores **distintivos y no ambiguos** (nombres compuestos/capitalizados, baja probabilidad de colisión) confirmados vivos — éstos sí van con tabla + demo visual:

| Selector | Páginas reales |
|---|---|
| `container-fluid` | 41 (probable colisión con Bootstrap, revisar) |
| `footer-top` / `footer-main` / `footer-bottom` | 36 cada uno |
| `col-sm-4` / `col-sm-8` / `col-xs-12` | 36 / 25 / 3 (clases grid de Bootstrap 3 — versión vieja, el sitio ya usa Bootstrap 5; investigar si esto es vestigio de una migración incompleta de BS3→BS5) |
| `sub-menu` / `mob-sub-menu` | 29 cada uno |
| `hamburger-menu` | 29 (¡también documentado ya en `custom-styles.css`! verificar cuál capa realmente define el estilo visible) |
| `fa-phone` / `fa-angle-down` / `fa` | 29 (Font Awesome —¿se carga el CDN de Font Awesome en algún lado? Verificar, no confirmado en esta sesión) |
| `btn-primary` | 29 (clase de Bootstrap, probable colisión) |
| `form-control` | 26 (clase de Bootstrap, probable colisión — y ya redefinida en `design-system.css`) |
| `menu-list` | 19 (¡también documentado ya en `custom-styles.css` Fase 4a! verificar cuál capa gana) |
| `pc-menu` / `pc-logo` | 11 cada uno (¡ya documentado en `custom-styles.css` Fase 4a!) |
| `mob-menu-child` / `mob-menu` / `mob-logo` / `main-menu` / `header-top` | 11 cada uno (`header-top` también ya documentado en Fase 4a) |
| `Availability-search` | 9 |
| `reports` / `page-wrap` | 8 cada uno |
| `page-main` / `Services-page-main` / `hbl` | 7 cada uno |
| `CustomerLogin` / `CustomerLogin-box` | 4 cada uno |
| `Availability-info` | 3 |

**Hallazgo importante sin resolver:** varios de los nombres "distintivos" de `css.css` (`hamburger-menu`, `menu-list`, `pc-menu`, `pc-logo`, `header-top`, `mob-menu`, `mob-logo`) son selectores que **ya están documentados como definidos en `custom-styles.css`** (Fase 4a, Navbar/Header). Esto sugiere que `css.css` define una versión vieja de estos mismos componentes que `custom-styles.css` sobreescribe por orden de cascada (carga después) — exactamente el patrón "legacy sobreescrito por especificidad" que describió Sergio. **Falta verificar con el navegador (no solo grep) cuál regla gana realmente para 2-3 casos representativos** antes de afirmarlo como hallazgo cerrado.

**4. PT Serif — investigado y DESCARTADO explícitamente por Sergio, no documentar:**
Se encontró `.availability-menu-child a { font-family: 'PT Serif', serif; }` en `custom-styles.css` (línea ~127), con el contenedor `.availability-menu-child` presente en 18 páginas reales y el font de Google cargado en 41 páginas. Pese a que técnicamente la regla aplicaría, Sergio confirmó directamente: "PT Serif es completamente legacy. Ya no se usa en absoluto." **No crear ninguna sección ni hallazgo sobre esto.**

**5. `design-system.css` (684 líneas) — 2 huecos reales confirmados (todo lo demás que se sospechaba duplicado/roto ya estaba documentado de sesiones previas):**
- Los 16 `@font-face` (Archivo Narrow ×4 — regular/italic/bold/bold-italic, DM Serif Text ×2 — regular/italic, Sora ×4 — light/regular/bold/extrabold), líneas 1-71 del archivo. El doc actual solo muestra los tokens `var(--font-*)` ya aplicados, nunca el mecanismo de carga real (rutas a `../fonts/*.woff`).
- `Roboto Mono` se carga distinto a las otras 3 familias: `@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono...')` (línea 73, Google Fonts CDN) en vez de `@font-face` local — inconsistencia no documentada.
- (Verificado y YA documentado correctamente, no son huecos: duplicado de `.mb-3`, duplicado de `.gap-4`/`.gap-8` con `!important` agregado después, duplicado de `.p-5`/`.px-5`.)

**6. `custom-styles.css` (3,987 líneas actuales, NO 4,109 — ya bajó por las 2 limpiezas de hallazgos #7/#9 documentadas en Fase previa) — problema sistémico de citas de línea:**

Todas las citas "línea X" del documento que apuntan a contenido **posterior** al primer punto de borrado (~línea 1247-1330 en numeración vieja) están desactualizadas. Líneas actuales ya verificadas en esta sesión (usar estas, no re-derivar):

| Contenido | Línea actual (post-limpieza) | Línea citada en el doc (vieja) |
|---|---|---|
| `.card-shadow.destination` | 1249 | 1249 (sin cambio, antes del borrado) |
| `.shift-badge` | 1694 | — |
| `.summary-card` | 2710 | 2832 (desactualizada) |
| Bug `html{font-size:clamp(1rem...)}` ("Photo gallery") | 1219-1220 | 1219 (sin cambio) |
| Comentario "HBL Table layout" | 488 | — |
| Comentario "IPI Tracing page" | 1247 | — |
| Comentario "Search Modal" | 1384 | — |
| Comentario "Transit Time Schedule" | 1562 | — |
| Comentario "Charges Page" | 1596 | — |
| Comentario "Information / Marketing Pages" | 1884 | — |
| Comentario "Navbar in marketing pages" | 2189 | (doc dice "líneas 2311–2496", desactualizada) |
| Comentario "HEADER SCROLL EFFECT CSS" | 2278 | — |
| Comentario "Profile Page Styles" | 2846 | — |
| Comentario "User Management Page" | 3026 | — |
| Comentario "KEVIN: Report Tables" (Tablas de reportes, Fase 4b) | 3029 | (doc dice "líneas 3148–3394", desactualizada) |
| `.btn:not([disabled]):hover` (Microinteraction) | 3275 | — |
| `.animated-success-icon` | 3281 | — |
| Comentario "Responsive styles" | 3399 | (doc dice "líneas 3521-3992", desactualizada) |
| 3ª regla `html{font-size}` condicional `@media min-width:1920px` | 3409 | (doc dice línea 3536, desactualizada) |
| `.custom-scrollbar` (bloque utilidades finales) | 3872 | — |
| `scroll-margin-top` global final | 3918 | — |
| Total de líneas del archivo | **3987** | doc dice "4,109" en varios lugares (Fin de archivo, utilidades-finales "3994-4109") — TODOS desactualizados |

**Bloque "Pendiente — baja muestra" (sección `pendiente-baja-muestra` del doc):** su contenido real está en las líneas **303-485 actuales** (`.mbl-master-table`, `.terminal-appt-status`, `.milestone-v2`, `.hbl-master-list`, `.hide-label`) — el doc cita rangos viejos ("573–1246" y "1247–1445"). **No re-verificado con grep fresco en esta sesión** — antes de escribir el texto corregido, correr `grep -l "milestone-v2\|mbl-master-table\|terminal-appt-status" *.html | grep -v backup | wc -l` para confirmar si la conclusión "1-2 páginas reales, baja muestra" sigue siendo cierta o cambió.

### Decisiones tomadas por Sergio (no replantear sin razón nueva)

1. **`extra.css`**: mismo rigor que `custom-styles.css` — tabla completa de vivo/muerto con conteo real + demo visual del caso de override (`.btn-group`).
2. **`css.css`**: tratamiento proporcional — documentar el archivo como bloque (qué es, tamaño, orden de carga) + tabla solo de los selectores distintivos no ambiguos que están vivos (con demo visual), marcando los genéricos como "indeterminados" sin afirmar vivo/muerto.
3. **Inconsistencia de versión de Bootstrap** (5.3.3 vs 5.3.8): documentar como hallazgo, sin corregir.
4. **PT Serif**: NO documentar — confirmado legacy/sin uso real por Sergio directamente, descartar el hallazgo aunque el grep sugiera lo contrario.

### Ejecutado y verificado (sesión 2026-06-24, continuación)

- [x] **Corregidas todas las citas de línea desactualizadas en `docs/design-system.html`** (no solo en este plan): `.summary-card` 2832→2710, `.shift-badge` 1816→1694, comentario "KEVIN" 3151→3029, bloque Navbar+Header-scroll "2311–2496"→"2189–2845" (eran 2 comentarios contiguos, no 1), bloque User Management "3397–3518"→"3026–3398", bloque Responsive "3521–3992"→"3399–3871", 3ª regla `html{}` condicional "custom-styles.css:3536"→"3414" (línea exacta de la regla, no del `@media` que la contiene), bloque utilidades finales "3994–4109"→"3872–3987", y 3 ocurrencias de "4,109 líneas" → "3,987 líneas". Todo verificado contra el archivo real con `grep -n`, no copiado de la tabla de la sección 6 sin confirmar.
- [x] Re-verificado con grep fresco el bloque "Pendiente — baja muestra": la nota de la sección 6 ("líneas 303-485 actuales") era **incorrecta** — el contenido real del primer ítem (HBL details modal/AMS/offcanvas/Photo gallery) ya estaba bien citado en el doc como "573–1246" (sin cambio necesario). El segundo ítem (resto de "IPI Tracing page") se corrigió a "1247–1383 aprox." (antes citaba "1247-1445", que se extendía 60+ líneas dentro del bloque "Search Modal" siguiente). Conteo de páginas reactualizado y confirmado: `.milestone-v2` → `ipi.html`, `availability.html` (más `availability3.html`, duplicado, no cuenta) = 2 páginas reales; `.ams-list-item2` → solo `container-level-release.html` (1 página); `.warehouse-in-out-details` → solo `ipi.html` (1); `.hbl-wrapper` → solo `container-level-release.html` (1); `.flex-column-sm` → solo `availability.html` (1). La conclusión "1–2 páginas reales, pendiente por baja muestra" se mantiene correcta.
- [x] Balance de tags verificado tras los cambios (div/section/table/tbody/tr/ul/li/aside/main/style/head/body/html, todos 1:1) — sin romper el render.

**Hallazgo de `.ams-list-item2` — investigado y CORREGIDO (sesión 2026-06-24, continuación):** era un error real, no solo una cita de rango equivocada. La tabla de `docs/design-system.html` (sección Container Level Release) afirmaba el selector compuesto `.container-level-release .ams-list-item2` como si estuviera anidado dentro del bloque `.container-level-release {}` — **ese selector no existe en el código fuente**. La verdad verificada en `custom-styles.css`:
- `.ams-list-item2` es una clase **global, sin anidar**, definida en la línea 1360, dentro del bloque "IPI Tracing page" (1247–1383) — no dentro de "Charges Page" (1596–1884) donde vive `.container-level-release`. En la práctica solo se usa en `container-level-release.html` (1 página, confirmado).
- La clase que sí está anidada dentro de `.container-level-release {}` (línea 1753) es `.ams-list-item` (**sin el "2"**) — y, al revés de lo que decía la tabla, **sí tiene** el pseudo-elemento conector `::before` (ícono `\F132`), igual que `.hbl-list-item` en el mismo bloque.
- La atribución "variante distinta a `.ams-list-item` (Fase 4c)" también era falsa: Fase 4c documenta `.hbl-list-grid`/`.hbl-list-item`, nunca `.ams-list-item`.

Corregido en `docs/design-system.html` (tabla de la sección "Container Level Release"): ambas filas reescritas con la ubicación real y la cita de línea correcta. Balance de tags re-verificado tras el cambio (div/table/tbody/tr/td, todos 1:1).

### Fase 6 — EJECUTADA Y CERRADA (sesión 2026-06-24, continuación)

**Hallazgo previo a todo lo planeado, que cambió el alcance de la fase:** al re-auditar `extra.css` (paso "fácil" de la lista original) con matching exacto de token de clase en vez de `grep -l`/`\b`, **7 de 10 clases "vivas" del plan resultaron estar muertas** (`.inland`, `.full`, `.hidden`, `.master`, `.bolder`, `.min-height`, `.super` → 0 páginas reales, no 29/24/16/6/2/3/1 como afirmaba este mismo plan). Eso obligó a auditar el baseline "38 páginas reales" usado en **todo** el documento ya publicado (Fases 1–5), no solo en lo nuevo de Fase 6. Decisión del usuario: auditar también lo publicado, en la misma sesión.

**Baseline corregido: 35 páginas reales (no 38).** De los 44 archivos `.html` de la raíz, 9 no son páginas navegables: `Copia de search-ipi.html` (duplicado por nombre), `availability3.html` (borrador/duplicado confirmado), `email.html` (plantilla de email), `mbl.html` (artefacto legacy ASP.NET MVC, rutas `/Content/css?v=...`, no carga ninguna hoja del proyecto), `Daily Container Status Table.html` / `Daily_Container_Status_Table.html` (fragmentos de tabla sin `<html>`/`<body>`), y 3 huérfanos con espacio en el nombre (`Reports - Daily_Container_Status.html`, `Reports - IPI Destination.html`, `Reports - InvoiceSearch.html`, 0 hojas de estilo del proyecto enlazadas — duplicados rotos de las versiones con guión que sí son reales).

**Todas las cifras de "N páginas" de Fases 1–5 ya publicadas fueron recalculadas y corregidas en `docs/design-system.html`** contra el baseline de 35, con matching exacto por token de clase (no substring, no `\b` con guión). Cambios aplicados: Navbar/Header 11–19→7–15; Tablas de reportes 7–11→4–8; HBL Table layout 6–7→5 (unificado); **IPI Tracing wrapper reescrito por completo** — el wrapper `.ipi-tracing` aparece en 4 páginas pero la regla CSS documentada (`.ipi-tracing .destination-container`) solo tiene efecto real en 1 (`ipi.html`), las otras 3 tienen el wrapper sin el hijo que activa la regla; "38 páginas HTML" del hallazgo de CSS muerto →35; Modales/Availability 4–40→3–23, y se corrigió `.login-modal` (no es clase, es `id`, selector real `#login-modal.modal`); Transit Time Schedule 7→5 con lista de páginas corregida, `.availability-v2` "prácticamente 32"→"30 de 35"; Information/Marketing — se separó `.side-nav` (12) de `.quote-bubble` (3), que el doc anterior trataba como el mismo conteo sin serlo; `.btn:not([disabled]):hover` 39→35 (todas); utilidades finales — se separaron `.no-wrap` (1) de `.filter-cyan` (3) y `.truncate-text` (1) de `.square-bullet` (2), mismo error de pares falsos; `.offcanvas-backdrop` 7→5 páginas con disparador funcional, y se documentó que `user-profile.html` tiene botones `data-bs-dismiss="offcanvas"` sin ningún offcanvas que cerrar en esa página.

**Sección nueva "Stack base: Bootstrap + legacy" creada en `docs/design-system.html`**, antes de "Color", con 3 subsecciones:
- **Bootstrap**: CSS 5.3.8 en 31 páginas / 5.3.3 en las 4 de Reports (split limpio, no aleatorio); JS 5.3.3 en 34 de 35 páginas — la mayoría del sitio sirve CSS 5.3.8 + JS 5.3.3 cruzado. `.btn-accent` reutiliza `--bs-btn-*` nativas, confirmado en `design-system.css:495`. Verificado en navegador (no solo grep) quién gana en 3 casos: `.menu-list` (no compiten, propiedades distintas, se combinan), `.pc-menu` (override parcial real — `custom-styles.css` pisa `background-color`/`box-shadow` pero `position`/`width`/`font-family` de `css.css` sobreviven sin tocar), `.hamburger-menu` (hipótesis descartada — `custom-styles.css` no tiene ninguna regla para esta clase, es 100% legacy sin competencia).
- **`extra.css`**: hallazgo mayor — el archivo **no se carga en 7 de las 35 páginas** (`availability.html`, `terminal-schedule.html`, `reports.html`, los 4 `Reports-*.html`), a diferencia de `css.css`/`design-system.css`/`custom-styles.css` que cargan en las 35 sin excepción. Cruzando "páginas con la clase en el markup" contra "páginas que cargan `extra.css`", la intersección es **vacía para los 21 selectores del archivo, sin excepción** — confirmado además en navegador (el botón en `.btn-group` de `availability.html:507` renderiza con el estilo de Bootstrap, no el verde de `extra.css`, porque la hoja no está cargada ahí). El caso de "override real" planeado para la demo (`.btn-group` en `charges.html`) no existe — se documentó la conclusión real en su lugar.
- **`css.css`**: bloque (139 KB minificado, 656 selectores) + tabla de ~25 selectores distintivos con conteo exacto recalculado, + nota de "indeterminados" para los genéricos. Se encontraron y corrigieron 3 falsos positivos del mismo tipo de error (frontera de guión en `\b`): `sub-menu` (29→14, confundido con `mob-sub-menu`), `reports` (8→0, el nombre real único es `reports-banner`), `CustomerLogin` (4→0, el nombre real único es `CustomerLogin-box`).

**Nav/scrollspy**: 3 ids nuevos agregados al `<aside>` (`#stack-bootstrap`, `#stack-extra-css`, `#stack-css-css`, más `#stack-base` y `#font-face`) — el scrollspy existente los detecta automáticamente (deriva los targets de los `href` del nav, sin necesidad de tocar el JS).

**Verificación visual completa**: servidor local + Playwright. Balance de tags confirmado 1:1 (div/section/table/tbody/tr/td/ul/li/aside/main/style/head/body/html/p/code/strong/em) antes y después de cada bloque de cambios. Consola sin errores nuevos (0 errores en la verificación final; el único 404 visto en una corrida intermedia fue el favicon, preexistente). `<span class="docs-phase-note">` actualizado.

**Pendiente real, fuera de esta fase:** los selectores "indeterminados" de `css.css` (~67 de los ~92 con coincidencia de nombre) no se verificaron uno por uno contra qué capa gana — quedan explícitamente sin clasificar como vivo/muerto, por diseño (decisión de tratamiento proporcional, no por falta de tiempo). Si en el futuro se quiere cerrar ese resto, repetir la metodología de esta sesión (matching exacto de token + intersección con páginas que cargan la hoja) en vez de relanzar `grep -l` simple.

## Bloque "Pendiente — baja muestra" — resuelto (sesión 2026-06-24, continuación)

Se pidió específicamente cerrar este punto. Al investigar a fondo (no solo recontar páginas, sino leer el CSS real y el markup citado), el bloque resultó tener 3 componentes distintos mezclados, no 1 solo "pendiente genérico":

1. **HBL Details Modal (offcanvas) — específico de `availability.html`** (`custom-styles.css` líneas 573–992): ~25 selectores, todos confirmados en 1 sola página real. Documentado como componente completo (igual que Charges Page/Terminal Schedule en Fase 4g), con tabla, demo visual de la línea de tiempo de estado IPI (3 estados: success/disabled/danger) y markup citado de `availability.html:962-1051`.
2. **`.link-offset-2` — en realidad reutilizable, 14 páginas.** Estaba escondida dentro del bloque del modal y por eso nunca se clasificó correctamente — no es de baja muestra, está muy por encima del umbral de ≥3 que usa el resto del documento. Se sacó a su propia sección con tabla y demo.
3. **Resto genuino de baja muestra**: solo lo que queda tras separar 1 y 2 — `.milestone-v2` (2 páginas), `.warehouse-in-out-details` (1), `.flex-column-sm` (1), `.lfd-godate` (2, hallazgo nuevo de esta revisión). `.ams-list-item2` y `.hbl-wrapper` ya estaban documentadas en "Container Level Release", no se repitieron.

**Hallazgos nuevos durante esta investigación:**
- **Bug real**: `custom-styles.css:662`, `padding: var(--space) var());` — `--space` no existe como token y `var()` sin argumento es inválido; el navegador descarta toda la declaración. Documentado, no corregido (mismo criterio que el resto de bugs de esta sesión).
- **CSS muerto adicional**: `.info-bar`, `.hbl-subheader`, `.info-item-holds`, `.ipi-warehouse-buttons`, `.search-error` — 0 coincidencias en las 35 páginas reales, incluida `availability.html` donde vive el resto del bloque. Documentado, no borrado.
- **Defecto de render preexistente, no introducido en esta sesión**: `docs/design-system.html` nunca cargó Bootstrap Icons — varios demos anteriores (Fases 4f/4h/4i/4l) ya usaban `<i class="bi ...">` como ícono real sin que la hoja estuviera enlazada. Se agregó `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/...">` al `<head>` — corrige todos los íconos de la página, no solo el demo nuevo.

Balance de tags verificado tras todos los cambios (1:1 en div/section/table/tbody/tr/td/ul/li/aside/main/style/head/body/html/p/code/strong/em/a/i/span). Verificado en navegador: sin errores de consola nuevos (solo el favicon 404 preexistente).

## Fase 7 — Demos reales con CSS real (no inline), documento de punta a punta (sesión 2026-06-24, continuación)

**Disparador:** Sergio pidió incluir muestras visuales del design system en `docs/design-system.html` y, al planear, aclaró un punto crítico: los demos no deben ser recreaciones con `style="..."` inline — deben usar las clases reales del proyecto, cargando los CSS reales.

**Decisión de arquitectura (con el usuario):** cargar el stack completo en el `<head>` del documento, en el mismo orden que producción: Bootstrap CSS → Bootstrap Icons → `Content/css.css` → `Content/design-system.css` → `Content/custom-styles.css` (se omitió `extra.css` a propósito: confirmado en Fase 6 que sus 21 selectores no tienen ningún efecto real en el sitio). Riesgo aceptado explícitamente: las reglas globales legacy (la regla `html{font-size}` triplicada, `.container-fluid`, etc.) podrían afectar la maquetación de la página de documentación misma, no solo los demos. Verificado en navegador en 2 viewports (1440px y 1920px): sin rotura visible, sin overflow horizontal, sin errores de consola nuevos.

**Ejecutado:**
- Las ~14 secciones de `custom-styles.css` (Navbar, Tablas de reportes, HBL Table layout, Modales/Availability, Transit Time Schedule, Charges Page, Terminal Schedule, Container Level Release, Information/Marketing, Profile Page, User Management, Utilidades finales, HBL Details Modal, `.link-offset-2`) se reescribieron con markup real citado de la página correspondiente y clases reales, no inline.
- Las ~14 secciones sin demo visual (varias de Utilidades de `design-system.css`, `@font-face`, Stack base) recibieron un demo real mínimo con las clases verdaderas.
- Componentes Bootstrap controlados por JS (el modal, el offcanvas) se forzaron a su estado abierto agregando la clase real `.show` (+ `style="display:block"`, que es lo que el propio JS de Bootstrap haría) en vez de recrear el aspecto a mano. Elementos `position:fixed` (`.pc-menu`, `.modal`, `.quote-bubble`) se contuvieron con un wrapper `transform:translateZ(0)` (crea un containing block nuevo) en vez de tocar su `position` real.
- Se agregó `Bootstrap Icons` CDN al `<head>` — corrigió un defecto de render **preexistente** (de Fases 4f/4h/4i/4l) donde varios `<i class="bi ...">` nunca se veían porque la hoja nunca se cargó.

**Hallazgos nuevos durante la reescritura (verificados en navegador, no solo leyendo CSS):**
- `.charges-table .btn-group` (Charges Page): confirmado que el selector real `.availability-v2 .charges-table .btn-group` **nunca se activa** — `charges.html` no tiene ningún elemento con clase `btn-group`. El demo de esa fila se marcó explícitamente como sintético (clases reales, markup no citado de ninguna página real).
- Bug de `.pl-8` (Espaciado direccional): la redacción original sugería que el bug solo aparecía al combinarse con `.ml-12`/`.ml-16`. El demo en vivo reveló que es más simple y más severo: `.pl-8` se declara 3 veces en `design-system.css` (líneas 378-380), cada vez con un valor distinto, y la última gana **siempre** — no depende de con qué otra clase se combine. Corregido el texto y el demo para reflejar esto.
- Patrón repetido de "falta un ancestro": varias reglas reales viven anidadas con sintaxis de *CSS nesting* (`&`) bajo 2-3 niveles de ancestro que no eran obvios solo leyendo el bloque aislado. Se encontraron y corrigieron 5 casos donde el demo carecía del ancestro real necesario y por eso no renderizaba el efecto documentado: `.hbl-list-grid` (necesita `.hbl-master-list`, no funciona sola), `.profile-icon-circle`/`.report-btn`/`.nav-link-custom` (necesitan `.profile-page`), `.hero-section.template` (necesita `.availability-v2`), `td.closed`/`.port-header` (necesitan `.terminal-schedule-main` Y `.table-responsive`, dos niveles), `.charges-table-heading`/`.charges-table-item` (necesitan `.mbl-details.charges-page` Y `.charge-steps`, dos niveles). Metodología: para cada demo se verificó con `getComputedStyle()` en navegador real que la propiedad documentada (display, color, border-radius, min-height, etc.) coincidiera con lo esperado — no se asumió que "usar la clase real" bastaba sin confirmar el árbol de ancestros.

**Verificación final:** balance de tags 1:1 (incluye nuevas etiquetas `header`, `footer`, `nav`, `ol`, `style` además de las ya verificadas en fases previas), consola sin errores nuevos (los 5 errores presentes son 404 preexistentes de infraestructura local: `footer-logo.png`, fuentes Nunito/Font Awesome — confirmados idénticos en la página de producción real).

## Fase 8 — Reordenar por reutilizable vs. específico de página (sesión 2026-06-24, continuación)

**Disparador:** Sergio pidió un reorden de `docs/design-system.html` "para que tenga más sentido y esté mejor ordenado". El problema raíz: dentro del h2 "Content/custom-styles.css" (17 subsecciones), lo reutilizable (Navbar, Modales, Tablas de reportes, Transit Time Schedule, `.link-offset-2`) estaba intercalado sin ningún criterio con lo específico de 1 página (Charges Page, Terminal Schedule, Container Level Release, HBL Details Modal) y con lo pendiente de clasificar — la estructura reflejaba el orden en que se auditó cada hoja CSS (cronología de sesión), no el criterio que un lector necesita ("¿esto se reusa o es de una sola página?").

**Decisión de alcance (elegida por Sergio entre 3 opciones presentadas):** la más amplia — fusionar "Componentes" (patrones de `design-system.css`, Fase 3) con los bloques reutilizables de `custom-styles.css` en una sola sección, sin que la hoja CSS de origen determine el orden. Se descartó agregar un índice nuevo de hallazgos (quedan inline, sin tocar).

**Estructura nueva del documento:** Stack base → Tokens (Color/Tipografía/Espaciado/Bordes y sombras) → Utilidades → **Componentes reutilizables** (fusión: los 4 patrones de Fase 3 + Navbar/Header + Tablas de reportes + HBL Table layout + Modales/Availability + Transit Time Schedule + `.link-offset-2` + la parte reutilizable de Information/Marketing + microinteracción global de hover, extraída como subsección propia + Utilidades finales de `custom-styles.css`) → **Patrones específicos de página** (sección nueva: Charges Page, Terminal Schedule, Container Level Release, IPI Tracing wrapper, resto específico de Information/Marketing, Profile Page Styles completo, resto específico de User Management, HBL Details Modal) → Overrides responsive → Pendiente — baja muestra real.

**Casos límite resueltos sin volver a preguntar:**
- **Profile Page Styles** se mantuvo como bloque único en Patrones específicos, sin partir, aunque 2 de sus 5 selectores (`.profile-page`/`.profile-icon-circle`, 2 páginas) son técnicamente reutilizables — su único demo real muestra esas 2 clases junto con 3 específicas de `user-profile.html` (`.report-btn`, `.nav-link-custom`, `.mobile-nav-profile`) porque están anidadas bajo `.profile-page` en el CSS fuente y no renderizan aisladas. Partir la sección habría roto el demo o forzado a duplicar markup real.
- **Information/Marketing** y **User Management — resto** sí partieron limpio porque cada selector reutilizable o específico tenía su propio demo independiente, sin dependencia de ancestro compartido entre el lado reutilizable y el específico.
- El docs-note "Fuera de alcance, a propósito" al inicio de la sección fusionada (`.card-shadow`, `.summary-card`, `.shift-badge`) ya estaba parcialmente desactualizado antes de este reorden — `.shift-badge` había terminado documentado en Fase 4g (Terminal Schedule) pero seguía listado como "fuera de alcance". Corregido: ahora enlaza a Terminal Schedule en vez de afirmar que no se documenta.
- Las 4 menciones visibles de "Fase 4a/4b/4g" en prosa de cara al lector se reemplazaron por enlaces de anclaje a la sección correspondiente, porque "Fase N" dejó de ubicar nada para el lector una vez que el documento ya no sigue el orden cronológico de las sesiones. El párrafo huérfano "Fin de `custom-styles.css` — documentación completa" se eliminó (ya no hay un punto lineal de "fin de esa hoja", el contenido vive repartido en 2 secciones).

**Verificación:** balance de tags 1:1 recalculado tras la reestructuración completa (incluye conteo de `header`/`footer`/`nav`/`ol` además de las etiquetas ya verificadas). Los 64 `href="#..."` del `<aside>` resuelven contra un `id` real en el documento (0 anchors rotos, 0 ids duplicados, verificado con script). Servidor local + Playwright: consola con los mismos 5 errores 404 preexistentes de siempre (favicon/fuentes), sin errores nuevos; scrollspy probado con scroll programático gradual (no solo `scrollIntoView` instantáneo, que puede saltarse el cambio de estado del `IntersectionObserver` en secciones envolventes grandes) — confirma que el mecanismo sigue funcionando sin tocar el JS, tal como exigía el plan. `docs/design-system.html` quedó con 10 secciones `<h2>` de nivel superior (antes 8, una de ellas — "custom-styles.css" — era un cajón de 17 subsecciones heterogéneas).

## Fase 9 — Mecanismo de variantes por clase de body: `.marketing` vs `.availability-v2` (sesión 2026-06-25)

**Disparador:** al revisar el reorden de Fase 8, Sergio señaló que `index.html` (las páginas de marketing) usa un navbar distinto del de `availability.html`/`ipi.html`/`charges.html` (webapp), y que ambos "tienen bases similares" — es decir, sospechaba un mecanismo de variante sobre la misma base de tokens, no dos design systems separados. Se verificó en código, no se aceptó la hipótesis de plano.

**Verificado:**
- Las 35 páginas reales cargan exactamente las mismas 3 hojas (`css.css`, `design-system.css`, `custom-styles.css`) — no hay dos builds ni dos archivos. La "variante" no es a nivel de archivo, es a nivel de **clase en `<body>`**.
- `.availability-v2` (ya documentada, ex-typo corregido en Fase 6/sesión previa) la llevan 35/35 páginas reales — no es el diferenciador entre marketing/webapp.
- `.marketing` sí lo es: presente en **16 de las 35** páginas reales (`about-us`, `contact`, `error-404`, `footer`, `forms`, `home`, `inland`, `news-post`, `news`, `our-services`, `privacy-policy`, `security`, `technology`, `template`, `terms`, `trucking`); ausente en las otras 19 (`availability`, `charges`, `ipi`, `container-level-release`, `inland-warehouse`, `search*`, `terminal-schedule`, `transit`, `whse-in-out`, `payment-confirmation`, `user-management`, `user-profile`, `reports`, y 3 de los 4 `Reports-*.html`). Conteo verificado con matching exacto de clase de `<body>`, no substring.
- `Content/custom-styles.css` tiene ~20 reglas reales gateadas por `.marketing` (ejemplos citados con línea exacta): `.marketing .pc-menu` (2191), `.availability-v2.marketing #header/.header-top/.header-main/.header-main .menu-list` (2195–2241, bajo el comentario "Navbar in marketing pages" línea 2189), `body:not(.marketing) .hamburger-menu`/`.bar*` (55–103, la animación del ícono de hamburguesa solo se activa **sin** `.marketing`), `.marketing .photo-banner` (2132), `.marketing .core-capabilities` / `.core-capabilities a:hover` (2140, 2146), `.marketing .integration-security .card` (2183), `.marketing .pc-logo` (2242), `.marketing .pc-menu .sub-menu` (2370), `.marketing aside .sticky-top` (2545), `.marketing .container-fluid` (3418, dentro de un `@media`), `.marketing .main-content`/`.main-content ul li ul` (2020, 3930), `.marketing .list-group` (3961), `.marketing .breadcrumb-item+.breadcrumb-item::before` y `body.availability-v2.marketing .breadcrumb` (3975, 3980). Tratamiento proporcional (no se afirma que esta lista sea exhaustiva al 100%, igual que el criterio usado con `css.css` en Fase 6).
- El navbar (`.pc-menu` vía `marketing-header.js`, vs. `.availability-menu`, un header distinto) **correlaciona** con `.marketing` pero el verdadero interruptor de CSS es la clase de body — el navbar es una de las cosas que cambia, no la causa.
- Caso mixto real: `marketing-header.js` se invoca como web component (`<marketing-header></marketing-header>`) en la mayoría de páginas marketing (ej. `about-us.html:27`), pero `home.html` tiene el markup de `.pc-menu` **hardcodeado** en HTML estático en vez de usar el componente — por eso un grep simple de `pc-menu` no detecta por igual a todas las páginas marketing (subestima el conteo en las que usan el web component, donde el string solo existe en el JS, no en el HTML fuente).

**Decisión:** Sergio pidió documentar este mecanismo tanto aquí como en `docs/design-system.html`. Se agregó un nuevo `<h3>` dentro de "Stack base: Bootstrap + legacy" (mismo lugar donde ya se documentan otros mecanismos transversales de cascada), no una sección nueva — es conceptualmente del mismo tipo que el resto de "Stack base": cómo el mismo código produce resultados distintos según el contexto de carga/clase, antes de llegar a tokens/componentes individuales.

## Fase 10 — Agregar Font Awesome Kit al documento (sesión 2026-06-25)

**Disparador:** Sergio pidió agregar íconos de Font Awesome a `docs/design-system.html`, señalando que el código real del proyecto está en (sus palabras) "index.html" — no existe un `index.html` literal en el repo; el mecanismo real se confirmó en `home.html:625` y `availability.html:1260`: `<script src="https://kit.fontawesome.com/4006f6b372.js" crossorigin="anonymous"></script>`, presente al final del `<body>` en las páginas reales.

**Ejecutado:** se agregó el mismo `<script>` (idéntica URL del kit) al final del `<body>` de `docs/design-system.html`, después del script de scrollspy — mismo patrón que el resto del documento (carga el stack real, no una recreación). 6 demos del documento usan clases <code>fa</code>/<code>fa-solid</code>/<code>fa-regular</code> que antes no tenían ningún Font Awesome cargado (Navbar: `fa-phone`, `fa-angle-down`, `fa-angle-right`; Profile Page: `fa-regular fa-user`, `fa-solid fa-list-ul`, `fa-regular fa-calendar-check`).

**Limitación verificada, no oculta:** el Kit de Font Awesome está restringido por dominio. En pruebas locales (`localhost`) el script devuelve **403** — exactamente el mismo comportamiento ya documentado en Fase 6 para este mismo recurso en el sitio real ("`fa-phone` / `fa-angle-down` / `fa` … el CDN de Font Awesome Kit sí se carga, confirmado … aunque devuelve 403 en pruebas locales"). Esto significa que **no se pudo verificar visualmente que los íconos se rendericen** — ni en este documento ni en el sitio real — probando en local; solo se puede confirmar en el dominio de producción autorizado por el kit. Se agregó el script porque es fiel a producción (mismo mecanismo, misma URL), no porque se haya confirmado el render. Balance de tags verificado 1:1 tras el cambio.

## Archivos relevantes

- `docs/design-system.html` — el entregable (documentación viva, Fases 1–7 completas; ahora carga el stack CSS real completo — Bootstrap, css.css, design-system.css, custom-styles.css — no solo design-system.css)
- `Content/design-system.css` — fuente de tokens/utilidades (684 líneas, Fases 1–3 y @font-face de Fase 6 completas)
- `Content/custom-styles.css` — fuente de componentes específicos (3,987 líneas, Fase 4 completa, citas de línea corregidas en Fase 6, demos con clases reales en Fase 7)
- `Content/extra.css` — legacy, 181 líneas, auditoría completa en Fase 6 (confirmado: 0 efectivas en las 35 páginas reales) — deliberadamente NO cargado en `docs/design-system.html`
- `Content/css.css` — legacy, 139 KB minificado en 1 línea, 656 selectores, **NO está vacío** (corrección de Fase 6) — sí cargado en `docs/design-system.html` desde Fase 7
- `design-system.css` (raíz del repo, fuera de `Content/`) — copia duplicada y desincronizada (454 líneas vs 684), fuera de alcance, no tocar
- Bootstrap 5.3.8 / 5.3.3 (CDN, split real por tipo de página, ver Fase 6) + Bootstrap Icons 1.11.3 (CDN) — base del proyecto, documentado en Fase 6, cargado de verdad en el doc desde Fase 7
- `js/components/marketing-header.js` — web component del header, referenciado en Fase 4a, su markup real recortado se usa en el demo de Navbar desde Fase 7
- `README.md` (raíz del repo) — contexto general del proyecto, ya leído y resumido en sesiones anteriores

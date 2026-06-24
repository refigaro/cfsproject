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

`Content/custom-styles.css` (4,109 líneas) está **100% revisado** (Fases 4a–4l). No quedan bloques sin evaluar. Lo único abierto:

| Bloque | Línea aprox. | Nota |
|---|---|---|
| HBL details modal / AMS sections / offcanvas / "Photo gallery" | 573–1246 | Evaluado: solo 1 página real de uso (`availability3.html` es duplicado, no cuenta) — pendiente por baja muestra, no por falta de revisión |
| Resto de "IPI Tracing page" (`.milestone-v2`, `.ams-list-item2`, `.warehouse-in-out-details`, `.hbl-wrapper`, `.flex-column-sm`) | 1247–1445 | 1–2 páginas reales, pendiente por baja muestra |

Posible próximo paso fuera del alcance original del plan: decidir si vale la pena **corregir** alguno de los 11 hallazgos documentados (típicamente solo se han registrado, no arreglado — ver decisión explícita en el bug #1 de `.pl-8`).

### Metodología usada (referencia para futuros bloques o archivos)

1. Leer el bloque completo en `Content/custom-styles.css` con `Read` (offset/limit por línea).
2. Extraer los selectores de clase/id del bloque (`grep -oE '^\s*[.#][a-zA-Z0-9_-]+'`).
3. Para cada selector candidato, contar uso real: `grep -l "class=\"[^\"]*\bNOMBRE\b" *.html | wc -l`.
4. Si aparece en ≥2-3 páginas → documentar como reutilizable, con demo visual + cita de markup real (`<pre>` con el HTML literal y su ruta:línea).
5. Si es de una sola página → decidir con el usuario si vale la pena documentarlo o dejarlo fuera.
6. Verificar el HTML resultante: levantar servidor local (`python3 -m http.server` desde la raíz del repo) y comprobar `curl -s -o /dev/null -w "%{http_code}"` = 200, más balance de tags (`<div>`/`</div>`, `<table>`/`</table>`, etc.) con un script Python rápido antes de dar por cerrada la fase.
7. Actualizar el indicador de fase en el `<span class="docs-phase-note">` al inicio de `docs/design-system.html`.

## Archivos relevantes

- `docs/design-system.html` — el entregable (documentación viva, Fases 1–4l completas)
- `Content/design-system.css` — fuente de tokens/utilidades (Fases 1–3)
- `Content/custom-styles.css` — fuente de componentes específicos (Fase 4, documentado al 100%, 4,109/4,109 líneas)
- `js/components/marketing-header.js` — web component del header, referenciado en Fase 4a
- `README.md` (raíz del repo) — contexto general del proyecto, ya leído y resumido en sesiones anteriores

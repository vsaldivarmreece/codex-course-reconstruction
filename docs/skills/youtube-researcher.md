# YouTube Researcher

## Proposito

`YouTube Researcher` es una skill conceptual para convertir videos largos de IA, coding o producto en conocimiento accionable y verificable.

No esta pensada para "resumir por resumir". Esta pensada para:

- extraer estructura del video;
- registrar timestamps utiles;
- capturar prompts;
- separar hechos de supuestos;
- traducir el contenido a backlog, PRD o pasos reproducibles.

## Caso de uso

Usar esta skill cuando:

- un video contiene un workflow tecnico que quieres recrear;
- necesitas localizar prompts usados por el expositor;
- quieres convertir un curso largo en una ruta de aprendizaje;
- necesitas evidencia trazable antes de construir algo inspirado en el video.

## Entradas esperadas

- URL del video
- objetivo de investigacion
- tipo de salida deseada:
  - resumen
  - capitulos
  - prompts
  - backlog
  - PRD
  - checklist de reconstruccion

## Salidas esperadas

### 1. Mapa del video

- capitulos
- minutos aproximados
- tema de cada segmento
- artefactos mostrados

### 2. Matriz de prompts

- minuto
- prompt literal o aproximado
- estado:
  - original verificado
  - reconstruido aproximadamente
  - educativo sugerido
  - pendiente
- objetivo del prompt
- resultado esperado

### 3. Matriz de evidencia

- claim
- fuente
- confianza:
  - verificado
  - inferido
  - pendiente
- impacto en el build

### 4. Traduccion a ejecucion

- backlog inicial
- roadmap por fases
- supuestos abiertos
- riesgos de interpretacion

## Flujo recomendado

1. Identificar el video y su duracion.
2. Localizar capitulos o cambios de tema.
3. Extraer claims importantes.
4. Buscar prompts visibles o hablados.
5. Etiquetar cada item por nivel de confianza.
6. Traducir el contenido a artefactos ejecutables.
7. Dejar huecos explicitados en vez de inventarlos.

## Guardrails

- No inventar prompts si no fueron observados.
- No tratar fuentes secundarias como si fueran fuente primaria.
- No convertir una demo inspiracional en especificacion cerrada sin validacion.
- No construir features sin anclar cada una a evidencia o a un supuesto explicito.

## Formato sugerido de salida

```md
# Video Research Report

## Metadata
- Video:
- Duracion:
- Objetivo:

## Capitulado
| Minuto | Tema | Notas |
|--------|------|-------|

## Prompts
| Minuto | Estado | Prompt | Objetivo | Resultado |
|--------|--------|--------|----------|-----------|

## Claims
| ID | Claim | Confianza | Fuente | Impacto |
|----|-------|-----------|--------|---------|

## Backlog sugerido
- 

## Supuestos abiertos
- 
```

## Aplicacion a este repo

En este proyecto, `YouTube Researcher` sirve para:

- analizar el curso de Codex referenciado en el PRD;
- alimentar `docs/evidence/video-claims.md`;
- alimentar `docs/evidence/prompt-matrix.md`;
- mejorar la reconstruccion educativa de `web`, `mobile` y `backend`.

## Nota

Segun una referencia secundaria del curso, el expositor menciona una skill llamada `YouTube Researcher` alrededor del minuto `31:34` en el contexto de investigar contenido de YouTube con IA. Este documento la toma como referencia conceptual, no como copia literal de su implementacion original.

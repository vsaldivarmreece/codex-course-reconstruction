# Source Intelligence Memory

## Proposito

Convencion para que plugins, skills o agentes que analicen YouTube, Reddit, documentacion, blogs, papers o novedades de IA dejen memoria derivada reutilizable.

La salida conversacional no es suficiente. Cada investigacion util debe terminar en un artefacto trazable dentro de `knowledge/`.

## Cuándo usarla

Usar esta convencion cuando una fuente pueda producir:

- nuevas implementaciones;
- mejoras de arquitectura;
- procesos repetibles;
- casos de uso monetizables;
- prompts o workflows;
- cambios recientes en IA;
- riesgos, limitaciones o decisiones tecnicas.

## Destinos

- `knowledge/raw/<source>/`: payload original, export, transcript bruto o referencia de captura.
- `knowledge/processed/transcripts/`: transcripciones limpias de videos o audio.
- `knowledge/processed/threads/`: threads Reddit o discusiones normalizadas.
- `knowledge/processed/summaries/`: resumen estructurado de una fuente.
- `knowledge/processed/insights/`: hallazgos atomicos accionables.
- `knowledge/projects/ia-learning/`: memoria curada por area del proyecto.
- `knowledge/briefs/`: sintesis recurrentes por semana o tema.

## Regla para otros workspaces

Si otro workspace necesita esta memoria antes de que exista Supabase:

1. Crear un `AGENTS.md` local que apunte a este repo como referencia.
2. Mantener en el otro workspace solo briefs o enlaces derivados.
3. No duplicar raw data grande sin necesidad.
4. Cuando el volumen crezca, migrar a Supabase como hub compartido.

Ejemplo de instruccion portable:

```md
This workspace uses source intelligence memory. First check:
`/Users/vladimir.saldivar/Documents/IntelliJProyects/ia-learning/knowledge/README.md`

For new source analysis, preserve raw evidence, write normalized outputs, and link insights to the relevant project.
```

## Formato minimo de insight

Usar `knowledge/schema/insight.template.md`.

Campos obligatorios:

- fuente;
- URL o permalink;
- titulo;
- fecha de captura;
- confidence;
- evidencia puntual;
- aplicacion al proyecto;
- siguiente accion recomendada.

## Promocion a docs/backlog

Un insight debe moverse desde `knowledge/` a `docs/`, `docs/backlog/` o una implementacion solo cuando:

- tiene fuente trazable;
- su confianza es `verified`, `inferred` o `experimental`;
- existe una accion clara;
- el impacto en el proyecto esta descrito.

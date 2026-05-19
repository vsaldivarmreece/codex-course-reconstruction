# ia-learning

Repositorio local para reconstruir de forma educativa el proyecto y workflow del video `Codex Full Course 2026: The NEW Best AI Coding Tool`.

## Objetivo

Este workspace esta organizado para avanzar en tres tracks del PRD:

- `Track A`: workflow de Codex, skills, multi-agent y validacion.
- `Track B`: web app demo.
- `Track C`: mobile companion tipo Remodex.

## Estructura

- `apps/web`: frontend web.
- `apps/mobile`: companion mobile.
- `services/backend`: backend, integraciones y MCP-adjacent services.
- `packages/shared`: codigo compartido entre apps y servicios.
- `docs`: PRD, evidencia, backlog y runbooks.
- `knowledge`: memoria local derivada de YouTube, Reddit, fuentes web, tendencias de IA, patrones de implementacion e ideas de monetizacion.

## Siguiente paso cuando exista el remoto

```bash
git remote add origin <URL_DEL_REPO>
git status
```

## Estado actual

- Git local inicializado en rama `main`.
- Estructura base creada.
- PRD inicial disponible en `docs/specs/codex-course-reconstruction/PRD.md`.
- Stack educativo fijado para arrancar la reconstruccion:
  - `apps/web`: `Next.js + TypeScript + Supabase`.
  - `apps/mobile`: `Expo + React Native + TypeScript`.
  - `services/backend`: `Supabase` como backend principal y punto de integracion MCP.
  - `packages/shared`: tipos, contratos y modelos compartidos.

## Orden recomendado de trabajo

1. Completar `docs/evidence/` con claims, prompts y minutos verificados.
2. Guardar investigacion reutilizable en `knowledge/` siguiendo `knowledge/README.md`.
3. Ejecutar `Track A` y dejar bitacora en `docs/learning-log/`.
4. Construir MVP de `apps/web`.
5. Integrar `services/backend` y validar flujo MCP.
6. Solo despues abrir `apps/mobile`.

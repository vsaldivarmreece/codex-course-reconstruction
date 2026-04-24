# Video Claims Matrix

Usa este archivo para registrar afirmaciones del video y clasificarlas por confianza.

## Convenciones

- `Verificado`: confirmado manualmente contra el video.
- `Inferido`: soportado por fuente secundaria fiable.
- `Pendiente`: aun sin comprobacion suficiente.

## Claims

| ID | Minuto | Claim | Confianza | Fuente | Impacto en build | Nota |
|----|--------|-------|-----------|--------|------------------|------|
| C-01 | Pendiente | El video recorre un workflow completo con Codex, no solo snippets | Verificado | YouTube | Alto | Base del proyecto |
| C-02 | 01:02:13-01:04:27 aprox. | Existe un flujo MCP con Supabase | Inferido | Fuente secundaria | Alto | Afecta `services/backend` |
| C-03 | ~62:13 aprox. | Se menciona `Remodex`, companion iOS para controlar Codex | Inferido | Fuente secundaria | Alto | Afecta `apps/mobile` |
| C-04 | Pendiente | Se muestran prompts concretos para setup y scaffolding | Pendiente | Video | Alto | Afecta `Track A` |
| C-05 | Pendiente | Se cierra con deploy o publicación | Pendiente | Video | Medio | Afecta roadmap |

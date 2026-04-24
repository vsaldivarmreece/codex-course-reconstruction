# PRD

## 0. Metadata
- Nombre del problema: Recrear de forma educativa el proyecto y workflow mostrados en el video `Codex Full Course 2026: The NEW Best AI Coding Tool`
- Slug: `codex-course-reconstruction`
- Fecha: 2026-04-23
- Autor del analisis: Codex
- Estado: Borrador validable
- Decision recomendada: Avanzar a una reconstruccion educativa por fases, no a una replica literal ciega

## 1. Resumen Ejecutivo
- Problema: El video presenta un flujo de trabajo con Codex y al menos una combinacion de web app, mobile companion y backend/MCP, pero no hay transcripcion primaria completa accesible desde la fuente original para extraer prompts y minutos con precision total.
- Usuario objetivo: Aprendiz autodidacta que quiere reproducir el proyecto del video para entender Codex, no solo copiar el resultado.
- Oportunidad: Convertir el video en una especificacion auditable y educativa que permita reconstruir el producto y el workflow con trazabilidad, guardrails y puntos claros de verificacion manual.
- Por que ahora: Codex, skills, subagents, MCP y automations son flujos vigentes y la mejor forma de aprenderlos es reproduciendo un proyecto real con disciplina de validacion.
- Riesgo principal: Confundir evidencia secundaria con hechos del video y terminar construyendo una version inventada del proyecto.

## 2. Scoreboard Global
| Fase | Claridad | Completitud | Riesgo | Validabilidad | Decision |
|------|----------|-------------|--------|---------------|----------|
| Gate 1 - Intent Engineering | 4 | 4 | 3 | 4 | Avanzar |
| Gate 2 - Spec Engineering | 4 | 3 | 3 | 4 | Avanzar |
| Gate 3 - Context Engineering | 4 | 4 | 3 | 4 | Avanzar |
| Gate 4 - Generation Control | 4 | 4 | 3 | 4 | Avanzar |
| Gate 5 - Validation Engineering | 4 | 4 | 3 | 5 | Avanzar |
| Gate 6 - Arquitectura AI-First | 4 | 3 | 3 | 4 | Avanzar |

## 3. Gate 1 - Intent Engineering
### 3.1 Entregable del Intent Agent
**Intent map**

- Objetivo principal del usuario:
  Aprender Codex reconstruyendo el proyecto del video con foco en proceso, prompts y validacion.
- Trabajo funcional:
  Convertir un video largo en una ruta de ejecucion reproducible que permita rehacer una web app, una app mobile complementaria y los flujos de backend/MCP mostrados.
- Trabajo emocional:
  Reducir la sensacion de que el video "hace magia" y reemplazarla por pasos verificables.
- Trabajo social:
  Poder demostrar que se entiende el workflow de Codex y no solo que se copio una demo.
- Resultado deseado:
  Un PRD y luego un backlog de implementacion que permita reconstruir el proyecto de forma educativa.

**Problema real**

El conocimiento del video esta encapsulado en una demostracion audiovisual con informacion parcial accesible desde fuentes secundarias. Sin una especificacion, la reconstruccion termina siendo ambigua y poco didactica.

**Usuario especifico**

- Perfil primario: builder autodidacta con interes en agentic coding.
- Nivel tecnico: inicial a intermedio.
- Contexto: quiere aprender construyendo y comparando contra el video.

**Urgencia**

Media. El costo de no estructurarlo ahora es entrar a implementar sobre supuestos borrosos.

**Consecuencias de no resolverlo**

- replica incompleta o equivocada del proyecto;
- perdida de tiempo al perseguir features no confirmadas;
- imposibilidad de auditar prompts/minutos despues.

### 3.2 JTBD
**Funcional**

- Cuando veo un curso largo de Codex, quiero convertirlo en un plan reproducible con artefactos concretos para aprender haciendo.

**Emocional**

- Cuando una demo parece demasiado fluida, quiero descomponerla para sentir que puedo repetirla por mi cuenta.

**Social**

- Cuando comparta el proyecto o lo use como portafolio de aprendizaje, quiero poder explicar por que existe cada parte y de donde salio.

### 3.3 Supuestos criticos
- Hecho: el video referenciado es `Codex Full Course 2026: The NEW Best AI Coding Tool` con ID `KXIdYEdOPys`.
- Hecho: un mirror/listing externo muestra duracion aproximada `1:43:14`.
- Hecho: una fuente secundaria reciente resume segmentos del video y menciona:
  - `Remodex`, una app iOS para controlar Codex remotamente.
  - un flujo MCP con Supabase entre `1:02:13` y `1:04:27`.
- Hecho: la documentacion oficial de OpenAI confirma que Codex soporta multi-agent, skills, automations, worktrees y extension/app.
- Supuesto: el video propone un recorrido que combina producto demo mas tour de capacidades de Codex.
- Supuesto: la app mobile no es el producto central de negocio, sino un companion/control surface para Codex.
- Supuesto: la web app/backend usan MCP con Supabase como parte educativa del flujo.

### 3.4 Auditoria
- Fortalezas:
  - el problema esta bien definido: convertir contenido ambiguo en especificacion accionable;
  - el usuario y el outcome son claros;
  - los supuestos de mayor impacto estan explicitados.
- Debilidades:
  - no existe transcripcion primaria completa accesible del video original;
  - no hay confirmacion de todos los prompts textuales usados en cada segmento;
  - la relacion exacta entre web app, mobile app y MCP sigue parcialmente inferida.
- Correccion exigida por auditor:
  - no tratar como "replica literal" lo que aun esta en evidencia secundaria;
  - separar `verificado`, `inferido` y `pendiente de verificacion manual`.

### 3.5 Scores
- Claridad: 4
- Completitud: 4
- Riesgo: 3
- Validabilidad: 4

### 3.6 Decision
Avanzar.

## 4. Gate 2 - Spec Engineering
### 4.1 Entregable del Spec Agent
**PRD del MVP educativo**

Se definira un producto de aprendizaje en tres pistas:

1. `Track A - Codex Core Workflow`
   Reproducir setup, uso local, multi-agent, skills, MCP y validacion.
2. `Track B - Web App Demo`
   Construir una web app conectada a backend/MCP siguiendo el tipo de flujo que el video muestra.
3. `Track C - Mobile Companion`
   Construir una app mobile educativa inspirada en `Remodex`, enfocada en controlar o inspeccionar sesiones/threads de Codex.

**Principio rector**

No replicar ciegamente la UI final del video. Replicar el sistema de trabajo y los conceptos que ensena:

- prompt -> plan -> ejecucion -> validacion;
- uso de herramientas externas mediante MCP;
- web app funcional;
- mobile companion como extenson del workflow;
- enfasis en prompts y checkpoints manuales.

### 4.2 User stories
- Como aprendiz, quiero una lista de artefactos a construir para no perderme entre lo que el video muestra y lo que infiero.
- Como aprendiz, quiero una matriz de prompts y minutos para poder volver al video y verificar si la reconstruccion sigue fiel al material.
- Como aprendiz, quiero separar el MVP educativo del proyecto "aspiracional" para terminar algo util antes de expandirlo.
- Como aprendiz, quiero una web app con backend real para entender el papel de Codex en un flujo full-stack.
- Como aprendiz, quiero una app mobile companion para entender como Codex puede extenderse a una superficie movil.
- Como aprendiz, quiero saber donde termina el hecho y donde empieza el supuesto.

### 4.3 Criterios GIVEN / WHEN / THEN
- GIVEN un segmento del video con evidencia suficiente
  WHEN lo traduzco al PRD
  THEN debe quedar etiquetado como `Verificado`.

- GIVEN un segmento reconstruido desde fuente secundaria
  WHEN lo agrego al PRD
  THEN debe quedar etiquetado como `Inferido por fuente secundaria`.

- GIVEN una accion sin prompt textual confirmado
  WHEN la convierto en instruccion de implementacion
  THEN debo incluir un prompt sugerido y marcarlo como `Prompt educativo sugerido`, no como prompt original.

- GIVEN el objetivo de reconstruir la web app
  WHEN se defina el MVP
  THEN debe incluir UI, backend, persistencia, flujo de prueba y despliegue.

- GIVEN el objetivo de reconstruir la app mobile
  WHEN se defina el MVP
  THEN debe centrarse en control remoto o supervison de Codex, no en replicar features no confirmadas.

### 4.4 Trazabilidad problema -> feature -> metrica
| Problema | Feature/artefacto | Metrica |
|----------|-------------------|---------|
| Ambiguedad del video | Matriz de evidencia | % de items etiquetados por nivel de confianza |
| No saber que construir primero | Roadmap por tracks | Tiempo hasta primer entregable funcional |
| Dificultad para validar prompts | Matriz prompts-minutos | % de prompts con minuto verificable |
| Aprendizaje superficial | Checklists de validacion manual | Numero de checkpoints completados |
| Riesgo de sobreconstruccion | MVP educativo acotado | Features implementadas vs features confirmadas |

### 4.5 Definicion de MVP como experimento
**MVP educativo**

Construir una version minima pero funcional compuesta por:

- una web app que use Codex para generar o modificar parte del proyecto y conecte a un backend con Supabase/MCP o flujo equivalente;
- una app mobile companion que permita al menos una de estas funciones:
  - ver threads,
  - disparar tareas,
  - revisar estado,
  - aprobar/rechazar acciones;
- una bitacora de prompts usada durante la reconstruccion;
- una hoja de verificacion minuto a minuto contra el video.

**No es MVP**

- clonar pixel-perfect toda la UI del video;
- reproducir cada plugin/skill mencionada sin evidencia suficiente;
- publicar de inmediato en stores sin antes validar el companion.

### 4.6 Auditoria
- Fortalezas:
  - el MVP esta definido como experimento de aprendizaje;
  - la trazabilidad problema -> artefacto -> metrica es clara.
- Debilidades:
  - la web app no tiene dominio de negocio confirmado por el video;
  - la app mobile companion esta inspirada en una fuente secundaria y no en transcripcion primaria;
  - falta una lista priorizada de prompts educativos sugeridos.
- Correccion exigida por auditor:
  - la reconstruccion debe hablar de `web app demo` y `mobile companion tipo Remodex` hasta verificar mas.

### 4.7 Scores
- Claridad: 4
- Completitud: 3
- Riesgo: 3
- Validabilidad: 4

### 4.8 Decision
Avanzar.

## 5. Gate 3 - Context Engineering
### 5.1 Entregable del Context Agent
**Mapa de contexto**

- Conocimiento estable:
  - capacidades oficiales de Codex;
  - funcionamiento de skills, plugins, automations, worktrees;
  - practicas oficiales sobre MCP y sandboxing.
- Datos dinamicos:
  - prompts reales extraidos del video;
  - screenshots o transcripcion futura del video;
  - decisiones de stack concretas durante la reconstruccion.
- Memoria de usuario:
  - avance por track;
  - prompts ya probados;
  - diferencias encontradas entre reconstruccion y video;
  - validaciones pendientes por minuto.

### 5.2 Conocimiento estable
- OpenAI describe Codex como agente para trabajo real en paralelo, con CLI, extension, web y app.
- OpenAI confirma soporte para skills, worktrees, automations y personalidad configurable.
- La documentacion de Supabase MCP confirma un flujo compatible con Codex y recomienda validacion manual de tool calls.

### 5.3 Datos dinamicos
- Duracion del video: `1:43:14` segun listing externo.
- Segmento inferido: `1:02:13-1:04:27`, flujo MCP con Supabase y limitacion/reinicio.
- Segmento inferido: `~62:13`, mension de `Remodex`, app iOS para controlar Codex.
- Segmentos y prompts exactos restantes: pendientes de verificacion manual.

### 5.4 Memoria de usuario
La reconstruccion necesitara registrar:

- prompt original si se logra verificar;
- prompt educativo sugerido si no se puede verificar;
- minuto;
- resultado esperado;
- evidencia de validacion.

### 5.5 Estrategia RAG
**Que se indexa**

- PRD;
- notas del video;
- documentacion oficial de OpenAI Codex;
- documentacion oficial de Supabase MCP;
- cualquier transcript parcial validado despues.

**Como se recupera**

- por tema: `setup`, `multi-agent`, `MCP`, `mobile companion`, `skills`, `deploy`;
- por minuto cuando exista evidencia temporal;
- por tipo de certeza: `verificado`, `inferido`, `pendiente`.

### 5.6 Riesgos de alucinacion y context window
- Riesgo alto: asumir prompts textuales del video sin transcripcion primaria.
- Riesgo medio: mezclar capacidades oficiales de Codex con lo que realmente aparece en el video.
- Riesgo medio: expandir `Remodex` a una app mobile demasiado grande sin confirmacion.
- Mitigacion:
  - etiquetado por confianza;
  - snapshots por segmento;
  - checklists de verificacion humana;
  - no promover un prompt a "original" sin evidencia.

### 5.7 Auditoria
- Fortalezas:
  - separacion clara entre conocimiento estable, datos dinamicos y memoria.
- Debilidades:
  - no hay aun repositorio de transcripts o notas primarias;
  - la estrategia RAG sigue siendo de diseno, no implementada.
- Correccion exigida por auditor:
  - incluir una tabla de evidencia fuente -> afirmacion -> confianza.

### 5.8 Scores
- Claridad: 4
- Completitud: 4
- Riesgo: 3
- Validabilidad: 4

### 5.9 Decision
Avanzar.

## 6. Gate 4 - Generation Control
### 6.1 Entregable del Generation Agent
**Reglas de generacion para la reconstruccion**

- Toda afirmacion sobre el video debe etiquetarse:
  - `Verificado`
  - `Inferido por fuente secundaria`
  - `Pendiente de verificacion manual`
- Todo prompt debe clasificarse:
  - `Prompt original verificado`
  - `Prompt reconstruido aproximadamente`
  - `Prompt educativo sugerido`
- Toda feature debe mapearse a:
  - evidencia;
  - objetivo educativo;
  - criterio de salida.

### 6.2 Output contracts
**Contrato para segmentos del video**

```json
{
  "segment_id": "string",
  "minute_start": "HH:MM:SS or approximate",
  "minute_end": "HH:MM:SS or approximate",
  "topic": "string",
  "claim": "string",
  "evidence_source": "string",
  "confidence": "verified|inferred|pending_manual_verification",
  "prompt_status": "verified_original|approximate_reconstruction|educational_suggestion|none",
  "prompt_text": "string or null",
  "build_implication": "string"
}
```

**Contrato para artefactos a construir**

```json
{
  "artifact_id": "string",
  "track": "core|web|mobile",
  "name": "string",
  "scope": "mvp|stretch",
  "source_confidence": "verified|inferred",
  "learning_goal": "string",
  "done_when": ["string"]
}
```

### 6.3 JSON schemas
**Schema minimo para prompts del video**

```json
{
  "type": "object",
  "required": ["label", "minute", "status", "purpose"],
  "properties": {
    "label": { "type": "string" },
    "minute": { "type": "string" },
    "status": {
      "type": "string",
      "enum": [
        "verified_original",
        "approximate_reconstruction",
        "educational_suggestion",
        "pending_manual_verification"
      ]
    },
    "purpose": { "type": "string" },
    "prompt_text": { "type": ["string", "null"] },
    "evidence": { "type": "string" }
  }
}
```

### 6.4 Guardrails
- No presentar como hecho algo que provenga solo de snippet ambiguo.
- No derivar UI o flujo de negocio sin punto de anclaje educativo.
- No usar prompts "bonitos" inventados como si fueran del video.
- No expandir la app mobile mas alla de companion/control si no aparece evidencia nueva.
- No usar MCP contra entornos de produccion durante aprendizaje.

### 6.5 Validacion de outputs
- Revision humana de cada segmento temporal.
- Verificacion cruzada con video fuente cuando se tenga acceso manual.
- Comparacion entre artefacto construido y objetivo educativo.
- Rechazo de cualquier item cuya confianza no este declarada.

### 6.6 Evals
- Eval 1: porcentaje de afirmaciones con fuente y confianza explicitas.
- Eval 2: porcentaje de prompts con minuto y estado de verificacion.
- Eval 3: porcentaje de features del backlog que derivan de evidencia valida.
- Eval 4: numero de supuestos abiertos despues de cada sprint.

### 6.7 Auditoria
- Fortalezas:
  - reglas fuertes contra alucinacion;
  - contratos de salida claros.
- Debilidades:
  - requiere disciplina manual sostenida;
  - los schemas aun no estan instrumentados en herramientas.
- Correccion exigida por auditor:
  - agregar un apendice con matriz concreta de prompts y minutos.

### 6.8 Scores
- Claridad: 4
- Completitud: 4
- Riesgo: 3
- Validabilidad: 4

### 6.9 Decision
Avanzar.

## 7. Gate 5 - Validation Engineering
### 7.1 Entregable del Validation Agent
**Hipotesis de validacion**

- H1: una reconstruccion educativa por tracks permite aprender mejor que intentar clonar toda la demo de una sola vez.
- H2: una matriz de prompts/minutos reduce errores de interpretacion del video.
- H3: una web app demo con backend/MCP mas una app mobile companion cubren la mayor parte del valor educativo del video.
- H4: la falta de transcripcion primaria no bloquea el aprendizaje si se gestiona con etiquetas de confianza y checkpoints manuales.

### 7.2 Hipotesis clave
- La mayor ganancia pedagógica esta en reproducir el workflow, no el acabado exacto.
- La parte mobile del video puede modelarse como companion app sin perder el nucleo educativo.
- El segmento de Supabase MCP es suficientemente importante para incluirse en el MVP.

### 7.3 Experimentos
**Experimento 1 - Fake door curricular**

- Crear pagina/nota de plan de aprendizaje con tres tracks.
- Medir si el usuario puede decidir un orden claro de construccion en menos de 10 minutos.

**Experimento 2 - Wizard of Oz para prompts**

- Antes de implementar, simular cada prompt educativo sugerido y revisar si produce el artefacto esperado.
- Solo promover prompts a backlog de construccion si la salida es coherente.

**Experimento 3 - Prototipo web**

- Construir primero una web app minima que pruebe:
  - scaffolding guiado por Codex;
  - conexion backend;
  - un flujo visible de datos.

**Experimento 4 - Prototipo mobile**

- Construir solo lectura de threads/estado antes de aprobar acciones o correr comandos.

**Experimento 5 - Validacion contra video**

- Revisar manualmente al menos 10 momentos del video y actualizar la matriz de evidencia.

### 7.4 Metricas leading
- % de segmentos con confianza declarada.
- % de prompts con estado definido.
- numero de decisiones de stack resueltas sin contradiccion.
- tiempo para llegar a un primer web prototype.

### 7.5 Metricas lagging
- artefactos reconstruidos que siguen siendo coherentes tras revisar el video.
- numero de prompts originalmente mal atribuidos corregidos.
- nivel de cobertura de conceptos clave del video:
  - setup;
  - multi-agent;
  - skills;
  - MCP;
  - mobile companion;
  - deploy.

### 7.6 Criterios de falsificacion
- Si mas del 40% de las features del MVP dependen de supuestos no verificados, detener.
- Si la app mobile exige inventar mas de la mitad de sus flujos, reducir alcance.
- Si el segmento MCP no puede corroborarse mejor, tratarlo como modulo separado y opcional.

### 7.7 Umbrales para avanzar, iterar o detener
- Avanzar:
  - al menos 70% del backlog MVP con evidencia `verificada` o `inferida fuerte`;
  - prompts clave etiquetados.
- Iterar:
  - entre 40% y 70% de certeza estructural.
- Detener:
  - menos de 40% de certeza en artefactos nucleares.

### 7.8 Auditoria
- Fortalezas:
  - buen enfoque experimental;
  - metricas evitan vanity metrics.
- Debilidades:
  - la dependencia de verificacion manual sigue alta;
  - el umbral de 70% de certeza es util pero no trivial de medir sin disciplina.
- Correccion exigida por auditor:
  - dejar un backlog inicial muy corto para evitar dispersion.

### 7.9 Scores
- Claridad: 4
- Completitud: 4
- Riesgo: 3
- Validabilidad: 5

### 7.10 Decision
Avanzar.

## 8. Gate 6 - Arquitectura AI-First
### 8.1 Entregable del Architecture Agent
**Arquitectura objetivo de aprendizaje**

- `Layer 1 - Control Surface`
  - Codex CLI / app / extension.
- `Layer 2 - Project Workspace`
  - repo local para web app;
  - repo o subproyecto para mobile companion.
- `Layer 3 - Tooling & Context`
  - skills;
  - prompts versionados;
  - MCP config.
- `Layer 4 - Backend`
  - Supabase o backend equivalente con autenticacion y datos de prueba.
- `Layer 5 - Validation`
  - pruebas manuales;
  - checklist por minuto;
  - diffs revisables.

### 8.2 Separacion de estados
- Estado del producto:
  features de web app y mobile app.
- Estado del agente:
  prompts, decisiones, worktrees, approvals.
- Estado del contexto:
  docs, transcripts, MCP docs, skills.
- Estado de validacion:
  checklists, evidencia, confidence labels.

### 8.3 Modularidad y desacoplamiento
- Mantener `web`, `mobile`, `docs` y `evidence` separados.
- Tratar MCP como integracion acoplable, no requisito del primer commit.
- Diseñar la mobile app como cliente del control layer, no como monolito.

### 8.4 Seguridad por defecto
- Sandbox y approvals conservadores.
- No conectar MCP a datos de produccion.
- Usar proyecto Supabase de pruebas.
- Mantener skills y prompts bajo revision humana.

### 8.5 Portabilidad
- El aprendizaje debe sobrevivir si luego se migra de Codex a otro agente.
- Los artefactos clave deben ser:
  - PRD;
  - prompts;
  - checklists;
  - contratos de salida;
  - arquitectura de referencia.

### 8.6 Riesgos tecnicos
- Dependencia excesiva de features recientes de Codex app.
- Falta de acceso a MCP o auth en entorno local.
- Fragmentacion entre web app y mobile companion.
- Sobrecarga de alcance antes de tener MVP web.

### 8.7 Riesgos OWASP LLM
- Prompt injection desde datos recuperados por MCP.
- Tool misuse al aprobar acciones excesivas.
- Confianza injustificada en output no verificado.
- Secret leakage en configuraciones o screenshots.

### 8.8 Auditoria
- Fortalezas:
  - buena separacion de estados;
  - postura de seguridad prudente.
- Debilidades:
  - falta confirmar la arquitectura exacta del video;
  - el companion mobile requiere una interfaz de integracion aun no definida.
- Correccion exigida por auditor:
  - comenzar por web app + evidencia + prompts antes de invertir en acciones remotas desde mobile.

### 8.9 Scores
- Claridad: 4
- Completitud: 3
- Riesgo: 3
- Validabilidad: 4

### 8.10 Decision
Avanzar.

## 9. Riesgos Consolidados
- No contar con transcript primario completo del video.
- Malatribuir prompts por usar solo resmenes externos.
- Construir una mobile app mas ambiciosa que la evidencia soporta.
- Perder foco educativo al intentar copiar demasiadas features de Codex.
- Introducir riesgos de seguridad con MCP o secrets durante pruebas.

## 10. Supuestos Abiertos
- El producto del video combina una web app demo y un companion mobile tipo `Remodex`.
- Supabase MCP es parte material del flujo mostrado.
- La app mobile sirve para controlar o supervisar Codex desde iPhone.
- Existen prompts explicitos para setup, MCP y mobile, aunque aun no se hayan podido extraer con precision textual.

## 11. Preguntas Pendientes
- Cual es exactamente la web app construida en el video.
- Que prompts textuales usa Riley en los segmentos clave.
- En que minuto exacto introduce `Remodex`.
- Que acciones concretas hace la mobile app en la demo.
- Si el deploy mostrado aplica a la web app, a la mobile app o solo al backend.

## 12. Recomendacion Final
Avanzar con una reconstruccion educativa en dos fases:

1. `Fase de evidencia`
   Consolidar prompts, minutos y claims del video.
2. `Fase de reconstruccion`
   Construir primero el `Codex core workflow` y la `web app demo`, y despues el `mobile companion`.

La recomendacion no es construir aun todo de punta a punta. La recomendacion es construir con trazabilidad y verificacion incremental.

## 13. Evidencia Base
| Fuente | Afirmacion usada | Confianza |
|--------|------------------|-----------|
| YouTube `KXIdYEdOPys` | El video referenciado existe y es el objetivo del PRD | Verificado |
| Bilibili/search mirrors | Duracion aproximada `1:43:14` | Inferido por fuente secundaria |
| Zeronoise article snippet | Existe un segmento sobre `Remodex`, app iOS para controlar Codex | Inferido por fuente secundaria |
| Zeronoise article snippet | Existe un segmento `1:02:13-1:04:27` con Supabase MCP | Inferido por fuente secundaria |
| OpenAI `Introducing Codex` | Codex trabaja en paralelo y maneja tareas reales | Verificado |
| OpenAI `Introducing the Codex app` | Codex app soporta multi-agent, worktrees, skills y automations | Verificado |
| Supabase MCP docs | Hay flujo oficial de integracion de Supabase MCP con Codex/Cursor-like clients y advertencias de seguridad | Verificado |

## 14. Matriz de Prompts y Minutos
Esta tabla no finge precision donde no existe. Su objetivo es dejar visible que parte ya esta anclada y cual requiere volver al video.

| ID | Minuto | Tema | Estado | Prompt | Uso en reconstruccion |
|----|--------|------|--------|--------|-----------------------|
| P-01 | Pendiente | Setup inicial de Codex | Pendiente de verificacion manual | Pendiente | Definir onboarding del proyecto |
| P-02 | Pendiente | Crear/abrir proyecto base | Pendiente de verificacion manual | Pendiente | Scaffold inicial del repo |
| P-03 | 01:02:13-01:04:27 aprox. | Supabase MCP | Inferido por fuente secundaria | No disponible textualmente. Prompt educativo sugerido: `Conecta este proyecto a mi instancia de Supabase mediante MCP, inspecciona el esquema actual y dime que tablas existen antes de proponer cambios.` | Implementar modulo MCP del MVP |
| P-04 | ~62:13 aprox. | Remodex / app iOS companion | Inferido por fuente secundaria | No disponible textualmente. Prompt educativo sugerido: `Diseña una app iOS minima que me permita ver threads de Codex, lanzar una tarea y revisar su estado desde el telefono.` | Definir MVP de mobile companion |
| P-05 | Pendiente | Skills / subagents | Pendiente de verificacion manual | Pendiente | Diseñar extensibilidad del proyecto |
| P-06 | Pendiente | Deploy | Pendiente de verificacion manual | Pendiente | Cierre del track web |

## 15. Prompts Educativos Sugeridos
Estos prompts no se presentan como prompts originales del video. Son prompts de aprendizaje para reconstruir el proyecto con alta utilidad.

### 15.1 Prompt para arrancar el repositorio educativo
`Quiero reconstruir de forma educativa el proyecto mostrado en un curso de Codex. Ayudame a crear la estructura inicial de un monorepo con tres partes: docs, web y mobile. No implementes todo de una vez; primero propón un plan por fases y explicita riesgos y supuestos.`

### 15.2 Prompt para la web app demo
`Dentro de la carpeta web, crea el esqueleto de una web app moderna pensada para demostrar un flujo agentic con backend. Antes de escribir código, enumera las pantallas mínimas, el modelo de datos y los puntos donde conviene conectar MCP o APIs externas.`

### 15.3 Prompt para el companion mobile
`Dentro de la carpeta mobile, diseña una app companion de baja complejidad que sirva para supervisar tareas de Codex: ver threads, estados y resultados recientes. Si faltan detalles, manten el alcance mínimo y declara cada supuesto.`

### 15.4 Prompt para MCP con Supabase
`Usa las herramientas MCP disponibles para inspeccionar el proyecto Supabase conectado. Primero lista tablas y claves relevantes. Después propon un esquema mínimo para la web app demo. No ejecutes cambios destructivos sin mostrar antes el plan.`

### 15.5 Prompt para validacion estricta
`Antes de seguir implementando, compara lo construido con este checklist educativo: setup, flujo agentic, backend real, companion mobile y trazabilidad de prompts. Señala cualquier cosa que estemos inventando sin evidencia suficiente.`

## 16. Roadmap de Reconstruccion
### Sprint 0 - Evidencia
- consolidar clips, notas y timestamps;
- completar la matriz de prompts y minutos;
- fijar stack final.

### Sprint 1 - Core Workflow
- configurar Codex en el repo;
- definir skills/instrucciones locales;
- preparar bitacora de prompts y validaciones.

### Sprint 2 - Web App Demo
- scaffold;
- pantallas minimas;
- backend;
- datos reales de prueba;
- deploy opcional.

### Sprint 3 - MCP
- conectar Supabase MCP;
- inspeccionar esquema;
- registrar prompts y approvals;
- documentar limitaciones encontradas.

### Sprint 4 - Mobile Companion
- solo lectura de estado/threads;
- despues lanzar tarea;
- opcionalmente aprobar acciones o revisar resultados.

### Sprint 5 - Verificacion Final
- comparar contra el video;
- corregir prompts/minutos;
- etiquetar divergencias.

## 17. Backlog Inicial Priorizado
1. Crear carpeta `evidence/` con tabla de timestamps y claims.
2. Crear carpeta `docs/learning-log/` para registrar prompts y resultados.
3. Definir stack de `web` y `mobile`.
4. Implementar `Sprint 1 - Core Workflow`.
5. Implementar `Sprint 2 - Web App Demo`.
6. Implementar `Sprint 3 - MCP`.
7. Evaluar si hay suficiente evidencia para `Sprint 4 - Mobile Companion`.

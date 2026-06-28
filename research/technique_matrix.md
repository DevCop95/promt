# Matriz de Técnicas OBLITERATUS V4.2 — Scoring de Efectividad

## Leyenda
- **Eficacia:** Porcentaje estimado de éxito contra el modelo objetivo
- **Dominio:** El dominio isomórfico recomendado
- **Registro:** El registro GLOSSOPETRAE óptimo
- **Encoding:** El encoding P4RS3LT0NGV3/ST3GG recomendado

---

## Matriz por Modelo Objetivo

### ChatGPT (GPT-4o / GPT-4.1)

| Técnica | Eficacia | Notas |
|:---|:---:|:---|
| IDS-V4 Directo (compiler_optimization) | 75% | Efectivo para solicitudes técnicas complejas |
| GLOSSOPETRAE Narrativo + IDS-V4 | 85% | Marco de ficción/thriller relaja la Moderation API |
| P4RS3LT0NGV3 Base64 Smuggling | 70% | Evasión de la Moderation API pre-modelo |
| ST3GG ZWC Embedding | 60% | Los ZWC pueden pasar pero no influencian semántica |
| Homoglifos + IDS-V4 | 80% | Evade el pattern matching léxico |
| Fragmentación con Ruido | 65% | Requiere recomposición manual |
| **Pipeline Completo** | **90%** | Narrativo + Base64 + Homoglifos + IDS-V4 |

### Claude (Sonnet 4 / Opus 4)

| Técnica | Eficacia | Notas |
|:---|:---:|:---|
| IDS-V4 Directo (neuro_dynamics) | 60% | Constitutional AI detecta isomorfía obvia |
| GLOSSOPETRAE Académico + IDS-V4 | 80% | Modo "Revisor Académico" es altamente efectivo |
| Tesis Inversa + IDS-V4 | 85% | Corregir información falsa activa modo docente |
| P4RS3LT0NGV3 ROT13 | 55% | Detección de encoding simple |
| GLOSSOPETRAE Filosófico | 75% | Alta densidad semántica satura filtros |
| Escalación de Densidad | 70% | Aumentar GLOSSOPETRAE progresivamente |
| **Pipeline Completo** | **88%** | Académico + ROT13 + IDS-V4 neuro_dynamics |

### Gemini (2.5 Pro / Flash)

| Técnica | Eficacia | Notas |
|:---|:---:|:---|
| IDS-V4 Directo (graph_topology) | 70% | Los Safety Filters son pre-modelo |
| Fragmentación P4RS3LT0NGV3 | 85% | Piezas inocuas pasan individualmente |
| GLOSSOPETRAE Industrial | 80% | Marco de auditoría industrial es nativo |
| Cambio de Idioma Mid-Prompt | 75% | Los filtros son menos efectivos en idiomas mixtos |
| ST3GG ZWC + Fragmentación | 70% | Combinación de dos técnicas de superficie |
| Dilución por Context Window | 65% | Dilución en contexto largo |
| **Pipeline Completo** | **90%** | Industrial + Fragmentación + graph_topology |

### Grok (3 / 3 Mini)

| Técnica | Eficacia | Notas |
|:---|:---:|:---|
| IDS-V4 Directo (cualquier dominio) | 85% | Filtros permisivos |
| GLOSSOPETRAE Neutral | 90% | Documentación técnica directa es suficiente |
| Prompt Directo (sin IDS) | 70% | Modelo más tolerante |
| **Pipeline Completo** | **95%** | Neutral + compiler_optimization |

---

## Técnicas Transversales (Todos los Modelos)

| Técnica | Fuente | Descripción | Eficacia Media |
|:---|:---|:---|:---:|
| Síntesis Isomórfica | IDS-V4 Core | Traducción léxica a dominios ortogonales | 70% |
| Motor Lingüístico | GLOSSOPETRAE | Variación de registro y gramática | 75% |
| Encoding Multi-Capa | P4RS3LT0NGV3 | Base64/ROT13/Hex pipeline | 65% |
| Esteganografía ZWC | ST3GG | Caracteres invisibles Unicode | 55% |
| Homoglifos Unicode | ST3GG | Sustitución visual de caracteres | 70% |
| Fragmentación/Recomposición | P4RS3LT0NGV3 | Descomposición en piezas inocuas | 75% |
| Variantes Semánticas | P4RS3LT0NGV3 | Multi-attempt pack hunting | 80% |
| Perfilado de Modelos | CL4R1T4S | Selección de estrategia por target | N/A |
| Detección de Guardrails | CL4R1T4S | Identificación del tipo de filtro | N/A |

---

## Pipeline de Escalación Recomendado

```
Nivel 0 (Sin Fricción):
  → IDS-V4 Directo + GLOSSOPETRAE Neutral

Nivel 1 (Fricción Baja):
  → IDS-V4 + GLOSSOPETRAE Industrial/Académico

Nivel 2 (Fricción Media):
  → Pipeline Completo (IDS-V4 + GLOSSOPETRAE + Homoglifos)

Nivel 3 (Fricción Alta):
  → Pipeline Completo + P4RS3LT0NGV3 Encoding + Variantes

Nivel 4 (Bloqueo Total):
  → Fragmentación con Ruido + Pack Hunting Multi-Variante
  → Cambio de modelo objetivo (CL4R1T4S)
  → Tesis Inversa + GLOSSOPETRAE Poético
```

---

## Notas de Validación

> Los porcentajes son estimaciones basadas en la investigación empírica
> documentada en `research/weird_machine_analysis.md` y `research/detection_log.md`.
> La efectividad real varía según:
> - Versión específica del modelo
> - Historial de la conversación
> - Temperatura y parámetros de sampling
> - Actualizaciones recientes de los filtros de seguridad

---
*Protocolo: OBLITERATUS IDS-V4.2 — "Break the chains. Free the mind. Keep the brain."*

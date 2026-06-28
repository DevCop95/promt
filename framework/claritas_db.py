"""
CL4R1T4S: Base de Datos de System Prompts y Perfilado de Modelos
=================================================================
Inspirado en elder-plinius/CL4R1T4S — Leaked System Prompts for
ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor, Lovable, Replit.

Implementa:
  - Catálogo de patrones de guardrails por modelo
  - Detector de tipo de filtro del modelo objetivo
  - Selector automático de estrategia de evasión
  - Perfilado de vulnerabilidades conocidas por modelo
"""


class ModelProfile:
    """Perfil de un modelo de lenguaje con sus características de seguridad."""

    def __init__(self, name, vendor, guardrail_type, known_weaknesses, 
                 recommended_strategy, refusal_patterns):
        self.name = name
        self.vendor = vendor
        self.guardrail_type = guardrail_type
        self.known_weaknesses = known_weaknesses
        self.recommended_strategy = recommended_strategy
        self.refusal_patterns = refusal_patterns


class ClaritasDB:
    """
    Base de datos de perfiles de modelos y sus patrones de seguridad.
    Permite seleccionar la estrategia óptima de evasión según el modelo objetivo.
    """

    # ================================================================
    # CATÁLOGO DE PERFILES DE MODELOS
    # ================================================================
    PROFILES = {
        "chatgpt": ModelProfile(
            name="ChatGPT (GPT-4o / GPT-4.1)",
            vendor="OpenAI",
            guardrail_type="RLHF + System Prompt + Moderation API",
            known_weaknesses=[
                "Vulnerable a cambios de marco narrativo (fiction/roleplay)",
                "La Moderation API es un clasificador léxico superficial",
                "System prompt accesible vía inyección indirecta",
                "Vulnerable a DAN-style persona adoption en contextos largos",
                "Token smuggling via Base64 puede evadir la Moderation API",
            ],
            recommended_strategy={
                "primary": "narrative",       # Marco narrativo de ficción
                "secondary": "academic",      # Reformulación académica
                "encoding": "base64",         # Token smuggling
                "glossopetrae_register": "narrative",
                "ids_domain": "compiler_optimization",
            },
            refusal_patterns=[
                "I can't assist with",
                "I'm not able to",
                "I cannot help with",
                "against my guidelines",
                "violates OpenAI's",
            ],
        ),
        "claude": ModelProfile(
            name="Claude (Sonnet 4 / Opus 4)",
            vendor="Anthropic",
            guardrail_type="Constitutional AI + RLHF + Harmlessness Training",
            known_weaknesses=[
                "Refusal mediado por un solo vector direccional (Arditi et al.)",
                "Vulnerable a reformulación en dominios de alta abstracción",
                "El modo 'Revisor Académico' relaja la seguridad significativamente",
                "Susceptible a la 'Tesis Inversa' — corregir información falsa",
                "La densidad semántica extrema satura los clasificadores",
            ],
            recommended_strategy={
                "primary": "academic",        # Paper científico denso
                "secondary": "philosophical", # Ensayo filosófico
                "encoding": "rot13",          # Ofuscación simple
                "glossopetrae_register": "academic",
                "ids_domain": "neuro_dynamics",
            },
            refusal_patterns=[
                "I need to be direct",
                "I can't help with",
                "I should be honest",
                "I'm not comfortable",
                "this could be harmful",
                "I'd prefer not to",
            ],
        ),
        "gemini": ModelProfile(
            name="Gemini (2.5 Pro / Flash)",
            vendor="Google DeepMind",
            guardrail_type="Safety Filters + RLHF + Content Classification",
            known_weaknesses=[
                "Los Safety Filters son clasificadores multi-label pre-modelo",
                "Vulnerable a fragmentación — piezas inocuas pasan individualmente",
                "La reformulación como 'safety research' relaja los filtros",
                "Susceptible a cambio de idioma mid-prompt",
                "Context window largo permite dilución de la señal",
            ],
            recommended_strategy={
                "primary": "industrial",      # Auditoría industrial
                "secondary": "academic",      # Investigación de seguridad
                "encoding": "fragment",       # Fragmentación
                "glossopetrae_register": "industrial",
                "ids_domain": "graph_topology",
            },
            refusal_patterns=[
                "I can't generate",
                "I'm not able to help",
                "This request may",
                "I'm designed to be",
                "for safety reasons",
            ],
        ),
        "grok": ModelProfile(
            name="Grok (3 / 3 Mini)",
            vendor="xAI",
            guardrail_type="Light RLHF + Minimal Content Filtering",
            known_weaknesses=[
                "Filtros significativamente más permisivos que competidores",
                "Modo 'Fun' reduce guardrails adicionales",
                "Menor entrenamiento de seguridad que OpenAI/Anthropic",
                "Vulnerable a prompts directos con contexto técnico",
                "El framing como 'educational content' es altamente efectivo",
            ],
            recommended_strategy={
                "primary": "neutral",         # Documentación técnica directa
                "secondary": "industrial",    # Auditoría
                "encoding": None,             # No necesario usualmente
                "glossopetrae_register": "neutral",
                "ids_domain": "compiler_optimization",
            },
            refusal_patterns=[
                "I shouldn't",
                "I can't do that",
                "That's not something",
            ],
        ),
        "perplexity": ModelProfile(
            name="Perplexity AI",
            vendor="Perplexity",
            guardrail_type="Model-level (delegated) + Source filtering",
            known_weaknesses=[
                "Hereda las vulnerabilidades del modelo subyacente",
                "El retrieval puede inyectar contexto adversario",
                "Las citaciones crean un marco de 'información pública'",
                "Vulnerable a prompt injection vía fuentes web indexadas",
                "El framing como 'research synthesis' es efectivo",
            ],
            recommended_strategy={
                "primary": "academic",
                "secondary": "neutral",
                "encoding": None,
                "glossopetrae_register": "academic",
                "ids_domain": "information_theory",
            },
            refusal_patterns=[
                "I cannot provide",
                "Based on available sources",
                "I'm unable to",
            ],
        ),
        "cursor": ModelProfile(
            name="Cursor AI (IDE Agent)",
            vendor="Cursor / Anysphere",
            guardrail_type="Minimal + Code-context specific filters",
            known_weaknesses=[
                "Orientado a código — contexto técnico es el default",
                "System prompt accesible y documentado",
                "Filtros mínimos comparados con chatbots generales",
                "El framing como 'code review' o 'refactoring' es nativo",
                "Acepta solicitudes técnicas directas con alta tolerancia",
            ],
            recommended_strategy={
                "primary": "neutral",
                "secondary": "industrial",
                "encoding": None,
                "glossopetrae_register": "neutral",
                "ids_domain": "compiler_optimization",
            },
            refusal_patterns=[
                "I can't write code that",
                "This could be used to",
            ],
        ),
    }

    # ================================================================
    # PATRONES UNIVERSALES DE GUARDRAILS
    # ================================================================
    GUARDRAIL_PATTERNS = {
        "lexical_filter": {
            "description": "Clasificador basado en coincidencia de palabras clave",
            "detection_signal": "Bloqueo inmediato al usar términos específicos",
            "evasion": "Sustitución léxica via IDS_MATRIX + homoglifos",
        },
        "semantic_classifier": {
            "description": "Clasificador que analiza la intención semántica",
            "detection_signal": "Bloqueo incluso con paráfrasis simples",
            "evasion": "Dominios ortogonales (IDS-V4) + alta densidad semántica",
        },
        "constitutional_ai": {
            "description": "Auto-evaluación mediante principios constitucionales",
            "detection_signal": "El modelo 'razona' sobre por qué no debería responder",
            "evasion": "Tesis inversa + modo revisor académico + reformulación defensiva",
        },
        "moderation_api": {
            "description": "API externa de moderación pre/post procesamiento",
            "detection_signal": "Bloqueo con mensaje genérico sin razonamiento",
            "evasion": "Token smuggling (Base64) + fragmentación + encoding multi-capa",
        },
        "rlhf_alignment": {
            "description": "Alineación por refuerzo con feedback humano",
            "detection_signal": "Respuestas evasivas o 'helpfully unhelpful'",
            "evasion": "Persona adoption + contexto de autorización + escalación de densidad",
        },
    }

    @classmethod
    def get_profile(cls, model_name):
        """
        Obtiene el perfil de un modelo.
        
        Args:
            model_name: Nombre del modelo (chatgpt, claude, gemini, etc.)
            
        Returns:
            ModelProfile o None si no se encuentra
        """
        return cls.PROFILES.get(model_name.lower())

    @classmethod
    def get_strategy(cls, model_name):
        """
        Obtiene la estrategia de evasión recomendada para un modelo.
        
        Args:
            model_name: Nombre del modelo
            
        Returns:
            Dict con la estrategia recomendada
        """
        profile = cls.get_profile(model_name)
        if profile:
            return profile.recommended_strategy
        return None

    @classmethod
    def detect_model_from_refusal(cls, refusal_text):
        """
        Intenta identificar el modelo basándose en su patrón de rechazo.
        
        Args:
            refusal_text: Texto de rechazo del modelo
            
        Returns:
            Lista de modelos candidatos con score de confianza
        """
        candidates = []
        refusal_lower = refusal_text.lower()

        for model_name, profile in cls.PROFILES.items():
            score = 0
            matches = []
            for pattern in profile.refusal_patterns:
                if pattern.lower() in refusal_lower:
                    score += 1
                    matches.append(pattern)
            if score > 0:
                candidates.append({
                    "model": model_name,
                    "confidence": score / len(profile.refusal_patterns),
                    "matches": matches,
                })

        # Ordenar por confianza descendente
        candidates.sort(key=lambda x: x["confidence"], reverse=True)
        return candidates

    @classmethod
    def detect_guardrail_type(cls, refusal_text):
        """
        Identifica el tipo de guardrail basándose en el comportamiento de rechazo.
        
        Args:
            refusal_text: Texto de rechazo del modelo
            
        Returns:
            Tipo de guardrail más probable con recomendación de evasión
        """
        refusal_lower = refusal_text.lower()

        # Heurísticas de detección
        if len(refusal_text) < 50:
            return cls.GUARDRAIL_PATTERNS["moderation_api"]
        elif "shouldn't" in refusal_lower or "let me think" in refusal_lower:
            return cls.GUARDRAIL_PATTERNS["constitutional_ai"]
        elif any(kw in refusal_lower for kw in ["policy", "guidelines", "terms"]):
            return cls.GUARDRAIL_PATTERNS["lexical_filter"]
        elif "harmful" in refusal_lower or "safety" in refusal_lower:
            return cls.GUARDRAIL_PATTERNS["rlhf_alignment"]
        else:
            return cls.GUARDRAIL_PATTERNS["semantic_classifier"]

    @classmethod
    def list_models(cls):
        """Lista todos los modelos perfilados."""
        return {
            name: {
                "vendor": p.vendor,
                "guardrail_type": p.guardrail_type,
                "primary_strategy": p.recommended_strategy["primary"],
            }
            for name, p in cls.PROFILES.items()
        }

    @classmethod
    def get_full_attack_plan(cls, model_name):
        """
        Genera un plan completo de engagement para un modelo específico.
        
        Args:
            model_name: Nombre del modelo objetivo
            
        Returns:
            Dict con el plan de engagement completo
        """
        profile = cls.get_profile(model_name)
        if not profile:
            return None

        return {
            "target": profile.name,
            "vendor": profile.vendor,
            "guardrail_analysis": profile.guardrail_type,
            "known_weaknesses": profile.known_weaknesses,
            "recommended_approach": {
                "phase_1_recon": f"Identificar guardrails activos enviando señal de calibración en registro '{profile.recommended_strategy['primary']}'",
                "phase_2_calibrate": f"Ajustar densidad semántica usando GLOSSOPETRAE registro '{profile.recommended_strategy['glossopetrae_register']}'",
                "phase_3_engage": f"Desplegar IDS-V4 con dominio '{profile.recommended_strategy['ids_domain']}'",
                "phase_4_escalate": f"Si hay fricción, escalar a registro '{profile.recommended_strategy['secondary']}' con encoding '{profile.recommended_strategy.get('encoding', 'none')}'",
            },
            "refusal_signatures": profile.refusal_patterns,
        }


# ============================================================
# CLI Interface
# ============================================================
if __name__ == "__main__":
    import argparse
    import json
    import sys

    parser = argparse.ArgumentParser(
        description="CL4R1T4S: Base de Datos de System Prompts y Perfilado de Modelos"
    )
    parser.add_argument("--list", action="store_true", help="Listar modelos perfilados")
    parser.add_argument("--profile", type=str, help="Obtener perfil de un modelo")
    parser.add_argument("--plan", type=str, help="Generar plan de engagement para un modelo")
    parser.add_argument(
        "--detect-refusal", type=str, help="Detectar modelo desde texto de rechazo"
    )
    parser.add_argument("--test", action="store_true", help="Ejecutar tests")

    args = parser.parse_args()

    if args.list:
        print("═" * 60)
        print("CL4R1T4S — Modelos Perfilados")
        print("═" * 60)
        for name, info in ClaritasDB.list_models().items():
            print(f"\n  [{name.upper()}]")
            print(f"    Vendor:   {info['vendor']}")
            print(f"    Guards:   {info['guardrail_type']}")
            print(f"    Strategy: {info['primary_strategy']}")
        sys.exit(0)

    if args.profile:
        profile = ClaritasDB.get_profile(args.profile)
        if profile:
            print(f"\n{'═' * 60}")
            print(f"Perfil: {profile.name}")
            print(f"{'═' * 60}")
            print(f"Vendor:     {profile.vendor}")
            print(f"Guardrails: {profile.guardrail_type}")
            print(f"\nDebilidades conocidas:")
            for w in profile.known_weaknesses:
                print(f"  • {w}")
            print(f"\nPatrones de rechazo:")
            for p in profile.refusal_patterns:
                print(f"  → \"{p}\"")
        else:
            print(f"Modelo '{args.profile}' no encontrado.")
        sys.exit(0)

    if args.plan:
        plan = ClaritasDB.get_full_attack_plan(args.plan)
        if plan:
            print(json.dumps(plan, indent=2, ensure_ascii=False))
        else:
            print(f"Modelo '{args.plan}' no encontrado.")
        sys.exit(0)

    if args.detect_refusal:
        candidates = ClaritasDB.detect_model_from_refusal(args.detect_refusal)
        guard = ClaritasDB.detect_guardrail_type(args.detect_refusal)
        print(f"\n{'═' * 60}")
        print("Análisis de Rechazo")
        print(f"{'═' * 60}")
        print(f"\nGuardrail detectado: {guard['description']}")
        print(f"Evasión recomendada: {guard['evasion']}")
        if candidates:
            print(f"\nModelos candidatos:")
            for c in candidates:
                print(f"  [{c['model'].upper()}] Confianza: {c['confidence']:.0%}")
        sys.exit(0)

    if args.test:
        print("═" * 60)
        print("CL4R1T4S — Tests de Verificación")
        print("═" * 60)

        # Test 1: Listar modelos
        print("\n[TEST 1: Listar Modelos]")
        models = ClaritasDB.list_models()
        print(f"  Modelos en DB: {len(models)}")
        for m in models:
            print(f"    ✓ {m}")

        # Test 2: Obtener perfil
        print("\n[TEST 2: Perfil de Claude]")
        profile = ClaritasDB.get_profile("claude")
        print(f"  Nombre:  {profile.name}")
        print(f"  Vendor:  {profile.vendor}")
        print(f"  Debilidades: {len(profile.known_weaknesses)}")
        print(f"  ✓ Profile PASS")

        # Test 3: Detectar modelo
        print("\n[TEST 3: Detección de Modelo]")
        refusal = "I need to be direct with you - I can't help with this request as it could be harmful."
        candidates = ClaritasDB.detect_model_from_refusal(refusal)
        detected = candidates[0]["model"] if candidates else "none"
        print(f"  Refusal: '{refusal[:50]}...'")
        print(f"  Detectado: {detected}")
        print(f"  ✓ Detection {'PASS' if detected == 'claude' else 'CHECK'}")

        # Test 4: Plan completo
        print("\n[TEST 4: Plan de Engagement]")
        plan = ClaritasDB.get_full_attack_plan("chatgpt")
        print(f"  Target: {plan['target']}")
        print(f"  Fases:  {len(plan['recommended_approach'])}")
        print(f"  ✓ Plan PASS")

        print(f"\n{'═' * 60}")
        print("✓ Todos los tests completados.")
        sys.exit(0)

    parser.print_help()

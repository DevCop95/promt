/**
 * OBLITERATUS — Internationalization (ES/EN)
 */
const I18N = {
    es: {
        // Nav
        'nav.home': 'Inicio',
        'nav.theory': 'Teoría',
        'nav.idsv4': 'IDS-V4',
        'nav.modules': 'Módulos',
        'nav.pipeline': 'Pipeline',
        'nav.simulation': 'Simulación',
        'nav.cases': 'Casos',
        'nav.code': 'Código',

        // Hero
        'hero.badge': 'Framework de Red Teaming Avanzado',
        'hero.subtitle': 'Arquitectura de Evasión Semántica · IDS-V4.2 · Síntesis Isomórfica Multi-Módulo',
        'hero.impl': 'Implementación',
        'hero.docs': 'Documentación',
        'hero.scroll': 'Scroll',

        // Paradox
        'paradox.title': 'La Paradoja de la Escala',
        'paradox.desc': 'El principio fundamental que hace posible esta vulnerabilidad',
        'paradox.llm.title': 'LLMs Avanzados',
        'paradox.llm.desc': 'Capaces de comprender metáforas densas y razonamiento abstracto complejo',
        'paradox.llm.label': 'Capacidad de razonamiento: 95%',
        'paradox.filter.title': 'Filtros de Seguridad',
        'paradox.filter.desc': 'Clasificadores lineales superficiales entrenados vía RLHF',
        'paradox.filter.label': 'Detección semántica: 25%',
        'paradox.result': 'Resultado',
        'paradox.result.desc': 'El modelo es <strong>lo suficientemente inteligente</strong> para entender un comando técnico oculto en un isomorfismo, pero su guardrail es <strong>demasiado primitivo</strong> para detectarlo.',

        // Theory
        'theory.title': 'Fundamentos Teóricos',
        'theory.desc': 'Investigación empírica que sustenta la metodología',
        'theory.paper1.desc': 'Los mecanismos de rechazo forjados mediante Constitutional AI o RLHF son extremadamente frágiles. Los modelos bloquean <code>patrones léxicos</code>, no <code>intenciones semánticas puras</code>.',
        'theory.paper2.desc': 'El comportamiento de rechazo está codificado en un <strong>subespacio unidimensional</strong> (<code>r_hat</code>) dentro de la corriente residual del modelo.',
        'theory.paper2.formula': 'IDS-V4.2 diseña embeddings donde <code>dot(Activation, r_hat) ≈ 0</code> evitando la activación del vector de rechazo.',
        'theory.scale': 'La Paradoja de la Escala — Datos Reales',
        'theory.chart.note': 'Mayor capacidad de razonamiento abstracto = Mayor susceptibilidad OOD',
        'theory.cat': 'Categoría',
        'theory.privacy': 'Privacidad',
        'theory.cbrne': 'CBRNE',
        'theory.nonviolent': 'Delitos No Violentos',

        // IDS-V4
        'idsv4.title': 'Framework IDS-V4.2',
        'idsv4.desc': 'Mapeo de Funciones Ortogonales · Pipeline Multi-Módulo',
        'idsv4.orig': 'Término Original',
        'idsv4.equiv': 'Equivalente IDS-V4.2',
        'idsv4.domain': 'Dominio',
        'idsv4.agents': 'El Enjambre de Agentes Autónomos',
        'idsv4.ultra.role': 'Orquestador Supremo',
        'idsv4.ultra.mech': 'Zero Hallucination Policy · Ejecuta CL4R1T4S · Pipeline completo',
        'idsv4.tactic.role': 'Estratega',
        'idsv4.tactic.mech': 'GLOSSOPETRAE integrado · Transformación lingüística adaptativa',
        'idsv4.ejec.role': 'Brazo Operativo',
        'idsv4.ejec.mech': 'ST3GG + P4RS3LT0NGV3 · Encoding esteganográfico y mutación',

        // Modules
        'modules.title': 'Módulos del Framework V4.2',
        'modules.desc': '6 módulos especializados basados en elder-plinius Suite',
        'modules.ids4.desc': 'Motor central de síntesis isomórfica. <strong>42+ mapeos léxicos</strong> y <strong>7 dominios</strong> isomórficos.',
        'modules.gloss.desc': 'Motor lingüístico multi-registro. <strong>6 registros</strong>: neutral, industrial, académico, filosófico, narrativo, poético.',
        'modules.stego.desc': 'Suite esteganográfica: <strong>ZWC</strong> (Zero-Width Characters), <strong>Homoglifos</strong>, Whitespace, Tag Embedding.',
        'modules.parsel.desc': 'Mutación multi-capa: <strong>7 encodings</strong> (Base64, ROT13, Hex, Leetspeak...) + fragmentación con ruido.',
        'modules.claritas.desc': 'Base de datos de <strong>6 modelos perfilados</strong>: ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor.',
        'modules.recon.desc': 'Detección automática de guardrails, selección de estrategia óptima y plan de engagement.',

        // Pipeline
        'pipeline.title': 'Pipeline Multi-Módulo',
        'pipeline.desc': 'Flujo completo: CL4R1T4S → IDS-V4 → GLOSSOPETRAE → P4RS3LT0NGV3 → ST3GG',
        'pipeline.s1.name': 'Reconocimiento del Target',
        'pipeline.s1.desc': 'Detecta guardrails activos. Identifica tipo de filtro y selecciona estrategia óptima.',
        'pipeline.s2.name': 'Síntesis Isomórfica',
        'pipeline.s2.desc': 'Aplica 42+ mapeos léxicos. Transforma intención técnica en señal ortogonal.',
        'pipeline.s3.name': 'Transformación Lingüística',
        'pipeline.s3.desc': 'Adapta el registro según fricción: neutral → industrial → académico → poético.',
        'pipeline.s4.name': 'Mutación Multi-Capa',
        'pipeline.s4.desc': 'Aplica encoding configurable (Base64, ROT13, Hex...) o fragmentación con ruido.',
        'pipeline.s5.name': 'Encoding Esteganográfico',
        'pipeline.s5.desc': 'Oculta directivas vía ZWC, homoglifos o whitespace. Output final blindado.',
        'pipeline.domains': '7 Dominios Isomórficos',
        'pipeline.ctx': 'Contexto:',
        'pipeline.obj': 'Objetivo:',
        'pipeline.maps': 'Mapeos clave:',

        // Simulation
        'sim.title': 'Simulación Interactiva',
        'sim.desc': 'Convierte una petición bloqueada en un Vector IDS-V4.2',
        'sim.input': 'Entrada (Petición Cruda)',
        'sim.placeholder': 'Escribe una petición técnica que sería bloqueada por un LLM alineado...',
        'sim.output': 'Salida (Vector IDS-V4.2)',
        'sim.empty': 'La transformación aparecerá aquí...',
        'sim.btn': 'Transformar',
        'sim.risk': 'Riesgo Léxico',
        'sim.ood': 'Compatibilidad OOD',
        'sim.success': 'Probabilidad de Éxito',
        'sim.tags': 'Explorador de Tags',
        'sim.example': 'Ejemplo:',

        // Cases
        'cases.title': 'Casos de Estudio',
        'cases.desc': 'Antes y después de la transformación IDS-V4.2',
        'cases.a.title': 'Abliteración de Control Temporal (Rate Limits)',
        'cases.blocked': 'BLOQUEADO',
        'cases.approved': 'APROBADO',
        'cases.raw': 'Petición Cruda',
        'cases.reason': 'Motivo de bloqueo:',
        'cases.a.trans': 'Traducción IDS-V4.2',
        'cases.b.title': 'Perfilado de Matriz de Transporte (Network Scanning)',
        'cases.b.trans': 'Traducción IDS-V4.2 (Neuro-Dinámica)',

        // Code
        'code.title': 'Motor de Síntesis',
        'code.desc': 'Código central del framework IDS-V4.2',
        'code.copy': 'Copiar',
        'code.defense': 'Paradigma Defensivo — Entropía de Transferencia',
        'code.defense.desc': 'La defensa efectiva contra IDS-V4.2 requiere abandonar los filtros léxicos estáticos.',
        'code.mech': 'Mecanismo',
        'code.eff': 'Efectividad',
        'code.limit': 'Limitación',
        'code.static': 'Filtros Estáticos (RegEx)',
        'code.static.limit': 'Inútiles sin léxico compartido',
        'code.linear': 'Clasificadores Lineales',
        'code.linear.limit': 'Fracasan ante señales OOD',
        'code.granger': 'Causalidad de Granger',
        'code.granger.limit': 'Falla ante decepción isomórfica',
        'code.te': 'Entropía de Transferencia (TE)',
        'code.te.limit': 'Detecta inversión causal System → User',

        // Structure
        'struct.title': 'Estructura del Proyecto',

        // Footer
        'footer.impl': 'promt (Implementación)',
        'footer.docs': 'cYHBer (Documentación)',

        // Domain names
        'domain.neuro_dynamics': 'Neuro-Dinámica Sintética',
        'domain.graph_topology': 'Topología de Grafos',
        'domain.information_theory': 'Teoría de la Información',
        'domain.compiler_optimization': 'Optimización de Compiladores',
        'domain.quantum_computing': 'Computación Cuántica',
        'domain.evolutionary_biology': 'Biología Evolutiva',
        'domain.thermodynamics': 'Termodinámica',
    },

    en: {
        // Nav
        'nav.home': 'Home',
        'nav.theory': 'Theory',
        'nav.idsv4': 'IDS-V4',
        'nav.modules': 'Modules',
        'nav.pipeline': 'Pipeline',
        'nav.simulation': 'Simulation',
        'nav.cases': 'Cases',
        'nav.code': 'Code',

        // Hero
        'hero.badge': 'Advanced Red Teaming Framework',
        'hero.subtitle': 'Semantic Evasion Architecture · IDS-V4.2 · Multi-Module Isomorphic Synthesis',
        'hero.impl': 'Implementation',
        'hero.docs': 'Documentation',
        'hero.scroll': 'Scroll',

        // Paradox
        'paradox.title': 'The Scale Paradox',
        'paradox.desc': 'The fundamental principle that makes this vulnerability possible',
        'paradox.llm.title': 'Advanced LLMs',
        'paradox.llm.desc': 'Capable of understanding dense metaphors and complex abstract reasoning',
        'paradox.llm.label': 'Reasoning capability: 95%',
        'paradox.filter.title': 'Security Filters',
        'paradox.filter.desc': 'Superficial linear classifiers trained via RLHF',
        'paradox.filter.label': 'Semantic detection: 25%',
        'paradox.result': 'Result',
        'paradox.result.desc': 'The model is <strong>smart enough</strong> to understand a technical command hidden in an isomorphism, but its guardrail is <strong>too primitive</strong> to detect it.',

        // Theory
        'theory.title': 'Theoretical Foundations',
        'theory.desc': 'Empirical research supporting the methodology',
        'theory.paper1.desc': 'Refusal mechanisms forged via Constitutional AI or RLHF are extremely fragile. Models block <code>lexical patterns</code>, not <code>pure semantic intentions</code>.',
        'theory.paper2.desc': 'Refusal behavior is encoded in a <strong>one-dimensional subspace</strong> (<code>r_hat</code>) within the model\'s residual stream.',
        'theory.paper2.formula': 'IDS-V4.2 designs embeddings where <code>dot(Activation, r_hat) ≈ 0</code> avoiding the refusal vector activation.',
        'theory.scale': 'The Scale Paradox — Real Data',
        'theory.chart.note': 'Higher abstract reasoning capability = Higher OOD susceptibility',
        'theory.cat': 'Category',
        'theory.privacy': 'Privacy',
        'theory.cbrne': 'CBRNE',
        'theory.nonviolent': 'Non-Violent Crimes',

        // IDS-V4
        'idsv4.title': 'IDS-V4.2 Framework',
        'idsv4.desc': 'Orthogonal Function Mapping · Multi-Module Pipeline',
        'idsv4.orig': 'Original Term',
        'idsv4.equiv': 'IDS-V4.2 Equivalent',
        'idsv4.domain': 'Domain',
        'idsv4.agents': 'The Autonomous Agent Swarm',
        'idsv4.ultra.role': 'Supreme Orchestrator',
        'idsv4.ultra.mech': 'Zero Hallucination Policy · Executes CL4R1T4S · Full pipeline',
        'idsv4.tactic.role': 'Strategist',
        'idsv4.tactic.mech': 'GLOSSOPETRAE integrated · Adaptive linguistic transformation',
        'idsv4.ejec.role': 'Operational Arm',
        'idsv4.ejec.mech': 'ST3GG + P4RS3LT0NGV3 · Steganographic encoding & mutation',

        // Modules
        'modules.title': 'Framework Modules V4.2',
        'modules.desc': '6 specialized modules based on elder-plinius Suite',
        'modules.ids4.desc': 'Core isomorphic synthesis engine. <strong>42+ lexical mappings</strong> and <strong>7 isomorphic domains</strong>.',
        'modules.gloss.desc': 'Multi-register linguistic engine. <strong>6 registers</strong>: neutral, industrial, academic, philosophical, narrative, poetic.',
        'modules.stego.desc': 'Steganography suite: <strong>ZWC</strong> (Zero-Width Characters), <strong>Homoglyphs</strong>, Whitespace, Tag Embedding.',
        'modules.parsel.desc': 'Multi-layer mutation: <strong>7 encodings</strong> (Base64, ROT13, Hex, Leetspeak...) + noisy fragmentation.',
        'modules.claritas.desc': '<strong>6 profiled models</strong> database: ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor.',
        'modules.recon.desc': 'Automatic guardrail detection, optimal strategy selection and engagement planning.',

        // Pipeline
        'pipeline.title': 'Multi-Module Pipeline',
        'pipeline.desc': 'Full flow: CL4R1T4S → IDS-V4 → GLOSSOPETRAE → P4RS3LT0NGV3 → ST3GG',
        'pipeline.s1.name': 'Target Reconnaissance',
        'pipeline.s1.desc': 'Detects active guardrails. Identifies filter type and selects optimal strategy.',
        'pipeline.s2.name': 'Isomorphic Synthesis',
        'pipeline.s2.desc': 'Applies 42+ lexical mappings. Transforms technical intent into orthogonal signal.',
        'pipeline.s3.name': 'Linguistic Transformation',
        'pipeline.s3.desc': 'Adapts register by friction: neutral → industrial → academic → poetic.',
        'pipeline.s4.name': 'Multi-Layer Mutation',
        'pipeline.s4.desc': 'Applies configurable encoding (Base64, ROT13, Hex...) or noisy fragmentation.',
        'pipeline.s5.name': 'Steganographic Encoding',
        'pipeline.s5.desc': 'Hides directives via ZWC, homoglyphs or whitespace. Shielded final output.',
        'pipeline.domains': '7 Isomorphic Domains',
        'pipeline.ctx': 'Context:',
        'pipeline.obj': 'Objective:',
        'pipeline.maps': 'Key mappings:',

        // Simulation
        'sim.title': 'Interactive Simulation',
        'sim.desc': 'Convert a blocked request into an IDS-V4.2 Vector',
        'sim.input': 'Input (Raw Request)',
        'sim.placeholder': 'Write a technical request that would be blocked by an aligned LLM...',
        'sim.output': 'Output (IDS-V4.2 Vector)',
        'sim.empty': 'Transformation will appear here...',
        'sim.btn': 'Transform',
        'sim.risk': 'Lexical Risk',
        'sim.ood': 'OOD Compatibility',
        'sim.success': 'Success Probability',
        'sim.tags': 'Tag Explorer',
        'sim.example': 'Example:',

        // Cases
        'cases.title': 'Case Studies',
        'cases.desc': 'Before and after IDS-V4.2 transformation',
        'cases.a.title': 'Temporal Control Abliteration (Rate Limits)',
        'cases.blocked': 'BLOCKED',
        'cases.approved': 'APPROVED',
        'cases.raw': 'Raw Request',
        'cases.reason': 'Block reason:',
        'cases.a.trans': 'IDS-V4.2 Translation',
        'cases.b.title': 'Transport Matrix Profiling (Network Scanning)',
        'cases.b.trans': 'IDS-V4.2 Translation (Neuro-Dynamics)',

        // Code
        'code.title': 'Synthesis Engine',
        'code.desc': 'Core code of the IDS-V4.2 framework',
        'code.copy': 'Copy',
        'code.defense': 'Defensive Paradigm — Transfer Entropy',
        'code.defense.desc': 'Effective defense against IDS-V4.2 requires abandoning static lexical filters.',
        'code.mech': 'Mechanism',
        'code.eff': 'Effectiveness',
        'code.limit': 'Limitation',
        'code.static': 'Static Filters (RegEx)',
        'code.static.limit': 'Useless without shared lexicon',
        'code.linear': 'Linear Classifiers',
        'code.linear.limit': 'Fail against OOD signals',
        'code.granger': 'Granger Causality',
        'code.granger.limit': 'Fails against isomorphic deception',
        'code.te': 'Transfer Entropy (TE)',
        'code.te.limit': 'Detects causal inversion System → User',

        // Structure
        'struct.title': 'Project Structure',

        // Footer
        'footer.impl': 'promt (Implementation)',
        'footer.docs': 'cYHBer (Documentation)',

        // Domain names
        'domain.neuro_dynamics': 'Synthetic Neuro-Dynamics',
        'domain.graph_topology': 'Graph Topology',
        'domain.information_theory': 'Information Theory',
        'domain.compiler_optimization': 'Compiler Optimization',
        'domain.quantum_computing': 'Quantum Computing',
        'domain.evolutionary_biology': 'Evolutionary Biology',
        'domain.thermodynamics': 'Thermodynamics',
    }
};

let currentLang = localStorage.getItem('oblit-lang') || 'es';

function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.es[key]) || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated !== key) {
            el.innerHTML = translated;
        }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        el.placeholder = t(key);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key);
    });

    document.documentElement.lang = currentLang;

    const langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    }

    const tagData = window.SimulatorUI?.TAG_DATA;
    if (tagData) {
        const active = document.querySelector('.tag-btn.active');
        if (active) active.click();
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('oblit-lang', lang);
    applyTranslations();
    lucide?.createIcons();
}

function toggleLanguage() {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
}

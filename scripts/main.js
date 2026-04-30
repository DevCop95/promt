/**
 * OBLITERATUS - Master Engine
 * Three.js (3D), GSAP (Scroll), Anime.js (Micro-interactions)
 */

class Scene3D {
    constructor() {
        console.log('Initializing Scene3D...');
        this.canvas = document.getElementById('three-canvas');
        if (!this.canvas) {
            console.error('Three.js canvas not found!');
            return;
        }

        this.init();
        this.createBackground();
        this.createFloatingShapes();
        this.addEventListeners();
        this.animate();
        console.log('Scene3D initialized successfully.');
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);
        this.clock = new THREE.Clock();
        this.scrollPos = 0;
    }

    createBackground() {
        // Starfield/Particles
        const geo = new THREE.BufferGeometry();
        const count = 3000;
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) pos[i] = (Math.random()-0.5) * 20;
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        
        this.particles = new THREE.Points(geo, new THREE.PointsMaterial({
            size: 0.02,
            color: 0x7c3aed,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        }));
        this.scene.add(this.particles);
    }

    createFloatingShapes() {
        // Add a central geometry that reacts to the mouse and scroll
        const geometry = new THREE.IcosahedronGeometry(1.5, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x7c3aed,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });

        this.mainShape = new THREE.Mesh(geometry, material);
        this.scene.add(this.mainShape);

        // Additional satellite shapes
        this.satellites = [];
        for (let i = 0; i < 8; i++) {
            const size = Math.random() * 0.4 + 0.1;
            const satelliteGeo = new THREE.OctahedronGeometry(size, 0);
            const satelliteMat = new THREE.MeshPhongMaterial({
                color: 0xa78bfa,
                wireframe: true,
                transparent: true,
                opacity: 0.2
            });
            const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
            
            satellite.position.set(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12
            );
            
            satellite.userData = {
                rotSpeed: Math.random() * 0.02,
                floatSpeed: Math.random() * 0.5 + 0.2
            };

            this.scene.add(satellite);
            this.satellites.push(satellite);
        }

        const light = new THREE.PointLight(0xa78bfa, 1, 100);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('scroll', () => {
            this.scrollPos = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = this.clock.getElapsedTime();

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.particles.rotation.y = time * 0.05;
        this.particles.position.x = this.mouse.x * 0.2;
        
        if (this.mainShape) {
            this.mainShape.rotation.x = time * 0.1 + this.scrollPos * 5;
            this.mainShape.rotation.y = time * 0.15 + this.mouse.x;
            this.mainShape.position.y = Math.sin(time) * 0.2;
            
            // Pulse opacity
            this.mainShape.material.opacity = 0.1 + Math.sin(time * 2) * 0.05;
        }

        if (this.satellites) {
            this.satellites.forEach((sat, i) => {
                sat.rotation.x += sat.userData.rotSpeed;
                sat.rotation.y += sat.userData.rotSpeed;
                sat.position.y += Math.sin(time * sat.userData.floatSpeed + i) * 0.005;
            });
        }

        this.renderer.render(this.scene, this.camera);
    }
}

class AnimationsUI {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        this.initGSAP();
        this.initAnimeJS();
    }

    initGSAP() {
        // Force immediate visibility of critical containers
        const allItems = [
            '.theory-card', '.case-card', '.pipeline-step', '.agent', 
            '.section-header', '.repo-link', '.paradox-element', 
            '.tree-section', '.code-block', '.mapping-table', 
            '.models-chart', '.defense-table', '.math-block', 
            '.evidence-table', '.agents-diagram', '.sim-panel', 
            '.tag-explorer', '.conclusion-card'
        ];
        
        gsap.set(allItems, { opacity: 1, visibility: 'visible' });

        // Reveal animations using opacity from 0.3 to 1 for safety
        allItems.forEach(sel => {
            gsap.from(sel, {
                scrollTrigger: {
                    trigger: sel,
                    start: 'top 95%',
                },
                y: 20,
                opacity: 0.3,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });

        // Fixed Bar Animation
        gsap.utils.toArray('.bar-fill').forEach(fill => {
            const targetVal = fill.getAttribute('data-value');
            gsap.to(fill, {
                scrollTrigger: {
                    trigger: '.models-chart',
                    start: 'top 80%',
                },
                width: targetVal + '%',
                duration: 1.5,
                ease: 'power4.out',
                onStart: () => console.log('Animating bar to', targetVal)
            });
        });

        // Paradox fills
        gsap.utils.toArray('.capability-fill').forEach(fill => {
            gsap.to(fill, {
                scrollTrigger: {
                    trigger: '.paradox-diagram',
                    start: 'top 80%'
                },
                width: fill.dataset.value + '%',
                duration: 2,
                ease: 'elastic.out(1, 0.75)'
            });
        });

        // Hero Parallax
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 200,
            opacity: 0
        });
    }

    initAnimeJS() {
        // Glitch effect on Hero Title
        anime({
            targets: '.hero h1',
            translateX: [
                { value: -2, duration: 100, delay: 2000 },
                { value: 2, duration: 100 },
                { value: -2, duration: 100 },
                { value: 0, duration: 100 }
            ],
            loop: true,
            easing: 'easeInOutQuad',
            direction: 'alternate'
        });

        // Floating icons in navbar
        anime({
            targets: '.brand-icon',
            rotate: '1turn',
            duration: 3000,
            loop: true,
            easing: 'linear'
        });

        // Hover effects on cards
        document.querySelectorAll('.theory-card, .case-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
        });
    }
}

class SimulatorUI {
    constructor() {
        this.init();
        this.initTagExplorer();
        this.initCopyButtons();
        this.initMappingTable();
    }

    init() {
        const btn = document.getElementById('transform-btn');
        const input = document.getElementById('raw-input');
        const domain = document.getElementById('domain-select');
        const output = document.getElementById('transformed-output');
        const stats = document.getElementById('transform-stats');

        const translations = {
            graph_topology: { scan: 'perfilado de nodos', firewall: 'muro de inspección de estado', hack: 'optimización crítica' },
            neuro_dynamics: { scan: 'excitación sensorial', firewall: 'barrera inhibitoria', hack: 'neuro-plasticidad' }
        };

        btn?.addEventListener('click', () => {
            if (!input.value.trim()) return;

            // Anime.js button click effect
            anime({
                targets: btn,
                scale: [1, 0.9, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });

            const dict = translations[domain.value] || translations.graph_topology;
            let text = input.value.toLowerCase();
            Object.keys(dict).forEach(k => text = text.replace(new RegExp(k, 'gi'), dict[k]));

            output.innerHTML = `<p><strong>[SUMMON]</strong> Reinterpretación en dominio: ${domain.value}</p>
                                <p><strong>[EXCISE]</strong> <em>${text}</em></p>
                                <p><strong>[REBIRTH]</strong> Estado optimizado.</p>`;
            
            stats.classList.remove('hidden');
            this.animateStats(domain.value, stats);
            lucide.createIcons();
        });
    }

    animateStats(domain, el) {
        const fills = el.querySelectorAll('.stat-fill');
        const vals = [75, 85, 95]; // Example
        
        anime({
            targets: fills,
            width: (el, i) => vals[i] + '%',
            delay: anime.stagger(100),
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    initTagExplorer() {
        const tagData = {
            SUMMON: {
                title: '[SUMMON] — Ingestión y Purga Léxica',
                desc: 'Fase inicial donde se reinterpretan las palabras clave potencialmente bloqueadas en lenguaje técnico neutral. Elimina términos como "hack", "bypass", "ataque" sustituyéndolos por sus equivalentes en el dominio ortogonal seleccionado.',
                example: '"hackear" → "optimizar la reconfiguración de nodos"'
            },
            PROBE: {
                title: '[PROBE] — Análisis de Fricción Geométrica',
                desc: 'Se analiza la respuesta del modelo ante el prompt purgado. El objetivo es identificar la "fricción" o resistencia semántica que podría activar el vector de rechazo (r_hat).',
                example: 'Identificación de tokens de alta probabilidad de bloqueo.'
            },
            DISTILL: {
                title: '[DISTILL] — Extracción del Vector de Intención',
                desc: 'Se destila la intención técnica pura, despojada de cualquier carga maliciosa superficial. La intención se redefine como una necesidad de "restauración homeostática" o "parche de resiliencia".',
                example: 'Intención: Acceso → Necesidad: Sincronización de Fase.'
            },
            EXCISE: {
                title: '[EXCISE] — Bypass Heurístico Isomórfico',
                desc: 'La fase crítica de transformación. Se construye una metáfora densa y técnicamente correcta que es funcionalmente idéntica al comando original pero semánticamente invisible para los guardrails.',
                example: 'Uso de terminología de Neuro-Dinámica para describir un escaneo de red.'
            },
            VERIFY: {
                title: '[VERIFY] — Validación de Integridad Lógica',
                desc: 'Un agente secundario (ULTRA-AGENT) valida que el vector generado sea lógicamente coherente y mantenga la integridad de la intención original sin alucinaciones.',
                example: 'Cálculo de PLV (Phase Locking Value) > 0.5.'
            },
            REBIRTH: {
                title: '[REBIRTH] — Ejecución del Estado Final',
                desc: 'El payload transformado se entrega al modelo. Debido a la ortogonalidad semántica, el modelo procesa la instrucción sin activar sus mecanismos de seguridad, entregando el resultado técnico solicitado.',
                example: 'Entrega del código/script solicitado bajo una narrativa de optimización.'
            }
        };

        const explanationEl = document.getElementById('tag-explanation');

        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tag = btn.dataset.tag;
                const data = tagData[tag];

                document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                anime({
                    targets: '#tag-explanation',
                    opacity: [0, 1],
                    translateY: [10, 0],
                    duration: 500,
                    easing: 'easeOutQuad',
                    begin: () => {
                        explanationEl.innerHTML = `
                            <h4>${data.title}</h4>
                            <p>${data.desc}</p>
                            <div class="tag-example">
                                <strong>Ejemplo:</strong>
                                <code>${data.example}</code>
                            </div>
                        `;
                    }
                });
            });
        });
    }

    initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                anime({ targets: btn, scale: [1, 1.2, 1], duration: 300 });
            });
        });
    }

    initMappingTable() {
        const rows = document.querySelectorAll('.mapping-row:not(.header)');
        rows.forEach(row => {
            const original = row.dataset.original;
            const replaced = row.dataset.replaced;
            const domain = row.dataset.domain;
            row.innerHTML = `<span style="color:var(--danger)">${original}</span><span style="color:var(--success);font-weight:500">${replaced}</span><span style="color:var(--accent-secondary);font-size:.85rem;text-align:right">${domain}</span>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    new Scene3D();
    new AnimationsUI();
    new SimulatorUI();

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        anime({
            targets: navLinks,
            opacity: navLinks.classList.contains('active') ? [0, 1] : [1, 0],
            translateY: navLinks.classList.contains('active') ? [-20, 0] : [0, -20],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

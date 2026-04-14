/* ╔══════════════════════════════════════════════════════╗
   ║  🎂 HAPPY BIRTHDAY SALONI — Script Engine          ║
   ║  GSAP ScrollTrigger + Confetti + Interactions      ║
   ╚══════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    const checkGSAP = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(checkGSAP);
            initApp();
        }
    }, 100);
});

function initApp() {
    gsap.registerPlugin(ScrollTrigger);

    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
        setTimeout(() => {
            initHeroAnimation();
            initSparkleParticles();
        }, 300);
    }, 1800);

    // Init all sections
    initIntroAnimation();
    initPhotoReveal();
    initGallery();
    initParallax();
    initTimeline();
    initPhotoGrid();
    initLoveCards();
    initSpecialMessage();
    initSurpriseTease();
    initSurpriseSection();
    initFloatingHearts();
    initCursorSparkles();
}


/* ═══════════════════════════════════════════
           HERO ENTRANCE ANIMATION
   ═══════════════════════════════════════════ */

function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-photo', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)'
    })
    .to('.hero-sparkle-text', {
        opacity: 1,
        duration: 0.8,
        y: 0
    }, '-=0.6')
    .to('.hero-line-1', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-line-2', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-name', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.4')
    .to('.hero-aka', {
        opacity: 1,
        duration: 0.6
    }, '-=0.3')
    .to('.hero-age-badge', {
        opacity: 1,
        y: 0,
        duration: 0.7
    }, '-=0.3')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8
    }, '-=0.2');

    // Scroll indicator fades out on scroll
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '30% top',
            scrub: true
        },
        opacity: 0,
        y: -20
    });

    // Hero parallax on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        opacity: 0
    });

    gsap.to('.hero-photo-wrapper', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        scale: 0.9,
        opacity: 0
    });
}


/* ═══════════════════════════════════════════
            SPARKLE PARTICLES (HERO)
   ═══════════════════════════════════════════ */

function initSparkleParticles() {
    const container = document.getElementById('hero-particles');
    const symbols = ['✦', '✧', '⋆', '✨', '·', '♡'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('span');
        particle.className = 'sparkle-particle';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 14 + 6) + 'px';
        particle.style.setProperty('--duration', (Math.random() * 4 + 3) + 's');
        particle.style.setProperty('--delay', (Math.random() * 5) + 's');
        particle.style.color = ['#FFD1DC', '#E6E6FA', '#FFE5D9', '#DCC6F0', '#fff'][Math.floor(Math.random() * 5)];
        container.appendChild(particle);
    }
}


/* ═══════════════════════════════════════════
          JOURNEY INTRO - WORD BY WORD
   ═══════════════════════════════════════════ */

function initIntroAnimation() {
    const textEl = document.getElementById('intro-text');
    const originalText = textEl.textContent.trim();
    const words = originalText.split(' ');

    textEl.innerHTML = words.map(word =>
        `<span class="word">${word}&nbsp;</span>`
    ).join('');

    gsap.to('.word', {
        scrollTrigger: {
            trigger: '#intro',
            start: 'top 70%',
            end: 'center 50%',
            scrub: 1
        },
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'power2.out'
    });
}


/* ═══════════════════════════════════════════
       CINEMATIC PHOTO REVEAL (Blur-Focus)
   ═══════════════════════════════════════════ */

function initPhotoReveal() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#photo-reveal',
            start: 'top 80%',
            end: 'center 40%',
            scrub: 1
        }
    });

    tl.to('.reveal-photo', {
        filter: 'blur(0px) brightness(1)',
        scale: 1,
        duration: 1
    })
    .to('.reveal-intro', {
        opacity: 1,
        duration: 0.5
    }, '-=0.5')
    .to('.reveal-name', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.3')
    .to('.reveal-sub', {
        opacity: 1,
        duration: 0.4
    }, '-=0.2');
}


/* ═══════════════════════════════════════════
             PHOTO GALLERY (Polaroids)
   ═══════════════════════════════════════════ */

function initGallery() {
    // Section heading
    gsap.to('#gallery .section-heading', {
        scrollTrigger: {
            trigger: '#gallery',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Polaroids stagger in
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((p, i) => {
        const rotations = [-4, 3, -2];
        gsap.to(p, {
            scrollTrigger: {
                trigger: p,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            rotation: rotations[i] || 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.5)'
        });
    });
}


/* ═══════════════════════════════════════════
          PARALLAX SUNSET SECTION
   ═══════════════════════════════════════════ */

function initParallax() {
    gsap.to('.parallax-img-container', {
        scrollTrigger: {
            trigger: '#parallax-photo',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: '15%',
        ease: 'none'
    });

    gsap.to('.parallax-quote', {
        scrollTrigger: {
            trigger: '#parallax-photo',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to('.parallax-sub', {
        scrollTrigger: {
            trigger: '#parallax-photo',
            start: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });
}


/* ═══════════════════════════════════════════
            MEMORIES TIMELINE
   ═══════════════════════════════════════════ */

function initTimeline() {
    // Heading
    gsap.to('#memories .section-heading', {
        scrollTrigger: {
            trigger: '#memories',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8
    });

    gsap.to('#memories .section-subheading', {
        scrollTrigger: {
            trigger: '#memories',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        duration: 0.6,
        delay: 0.2
    });

    // Timeline entries
    const entries = document.querySelectorAll('.timeline-entry');
    entries.forEach((entry, i) => {
        gsap.to(entry, {
            scrollTrigger: {
                trigger: entry,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out'
        });
    });

    // Animate timeline line height
    gsap.fromTo('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center'
    }, {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true
        },
        scaleY: 1,
        ease: 'none'
    });
}


/* ═══════════════════════════════════════════
           PHOTO SHOWCASE GRID
   ═══════════════════════════════════════════ */

function initPhotoGrid() {
    const items = document.querySelectorAll('.showcase-item');
    items.forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.3)'
        });
    });
}


/* ═══════════════════════════════════════════
         THINGS I LOVE ABOUT YOU
   ═══════════════════════════════════════════ */

function initLoveCards() {
    // Heading
    gsap.to('#love-section .section-heading', {
        scrollTrigger: {
            trigger: '#love-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8
    });

    // Cards
    const cards = document.querySelectorAll('.love-card');
    cards.forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });
}


/* ═══════════════════════════════════════════
            SPECIAL MESSAGE
   ═══════════════════════════════════════════ */

function initSpecialMessage() {
    gsap.to('.message-heading', {
        scrollTrigger: {
            trigger: '#special-message',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    const lines = document.querySelectorAll('.msg-line');
    lines.forEach((line, i) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
}


/* ═══════════════════════════════════════════
            SURPRISE TEASE
   ═══════════════════════════════════════════ */

function initSurpriseTease() {
    const lines = document.querySelectorAll('.tease-line');
    lines.forEach((line, i) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}


/* ═══════════════════════════════════════════
          THE BIG SURPRISE SECTION
   ═══════════════════════════════════════════ */

function initSurpriseSection() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#surprise',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    tl.to('.cake-wrapper', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.5)',
        onComplete: () => {
            launchConfetti();
        }
    })
    .to('.surprise-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .to('.surprise-name', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.4')
    .to('.surprise-date', {
        opacity: 1,
        duration: 0.6
    }, '-=0.3')
    .to('.wish-btn', {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, '-=0.2')
    .to('.final-collage', {
        opacity: 1,
        duration: 0.5
    }, '-=0.1');

    // Collage items stagger
    ScrollTrigger.create({
        trigger: '.final-collage',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.collage-item', {
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(2)'
            });
        }
    });

    // Footer
    gsap.to('.footer-credit', {
        scrollTrigger: {
            trigger: '.footer-credit',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        duration: 1
    });

    // Wish button interaction
    const wishBtn = document.getElementById('wish-btn');
    const wishResult = document.getElementById('wish-result');

    wishBtn.addEventListener('click', () => {
        // Blow out candles
        document.querySelector('.candle-row').classList.add('candles-blown');

        // Show wish message
        wishResult.textContent = '🕯️ Your wish has been sent to the stars... ✨ May all your dreams come true, Celonyy! 🌟';
        wishResult.classList.add('visible');

        // More confetti!
        launchConfetti();
        setTimeout(() => launchConfetti(), 500);
        setTimeout(() => launchConfetti(), 1000);

        // Disable button
        wishBtn.style.pointerEvents = 'none';
        wishBtn.textContent = '🌟 Wish Made! 🌟';
    });
}


/* ═══════════════════════════════════════════
           CONFETTI CANVAS ENGINE
   ═══════════════════════════════════════════ */

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = [
        '#FFD1DC', '#E6E6FA', '#FFE5D9', '#FFFACD',
        '#DCC6F0', '#FFB5A7', '#C7ECEE', '#F8C8DC',
        '#FF9FB5', '#D4AAFF', '#FFB6C7'
    ];

    const particles = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 1) * 15 - 5,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            gravity: 0.15 + Math.random() * 0.1,
            opacity: 1,
            decay: 0.005 + Math.random() * 0.005
        });
    }

    let animFrame;

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            if (p.opacity <= 0) return;
            alive = true;

            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (alive) {
            animFrame = requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animFrame);
        }
    }

    animateConfetti();
}


/* ═══════════════════════════════════════════
          FLOATING HEARTS (MESSAGE SECTION)
   ═══════════════════════════════════════════ */

function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const hearts = ['♡', '♥', '❤', '💕', '💖', '✿'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = 0;
        container.appendChild(heart);
    }
}


/* ═══════════════════════════════════════════
        CURSOR SPARKLE TRAIL (Desktop)
   ═══════════════════════════════════════════ */

function initCursorSparkles() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const sparkles = [];
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add sparkle every N frames
        if (Math.random() > 0.6) {
            sparkles.push({
                x: mouseX + (Math.random() - 0.5) * 20,
                y: mouseY + (Math.random() - 0.5) * 20,
                size: Math.random() * 3 + 1,
                opacity: 1,
                decay: 0.02 + Math.random() * 0.02,
                color: ['#FFD1DC', '#E6E6FA', '#FFE5D9', '#DCC6F0', '#FFB6C7'][Math.floor(Math.random() * 5)],
                vy: -Math.random() * 1 - 0.5,
                vx: (Math.random() - 0.5) * 1
            });
        }
    });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.opacity -= s.decay;
            s.x += s.vx;
            s.y += s.vy;
            s.size *= 0.98;

            if (s.opacity <= 0) {
                sparkles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = s.opacity;
            ctx.fillStyle = s.color;
            ctx.shadowColor = s.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Keep max sparkles reasonable
        if (sparkles.length > 100) {
            sparkles.splice(0, 20);
        }

        requestAnimationFrame(animateSparkles);
    }

    animateSparkles();
}


/* ═══════════════════════════════════════════
           WINDOW RESIZE HANDLER
   ═══════════════════════════════════════════ */

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

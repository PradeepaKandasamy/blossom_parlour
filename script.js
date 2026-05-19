// Initialize AOS Animation
AOS.init({
    once: true,
    offset: 100,
    duration: 1000,
    easing: 'ease-out-cubic'
});

// Dynamic Bridal Packages Data Store
const packageData = {
    party: {
        basic: {
            price: "4,000",
            includes: ["Makeup", "Hairdo", "Saree Draping"],
            packageName: "Basic Party Makeup Package"
        },
        hd: {
            price: "6,000",
            includes: ["HD Makeup", "Premium Hairdo", "Saree Draping"],
            packageName: "HD Party Makeup Package"
        }
    },
    bridal: {
        basic: {
            price: "12,000",
            includes: ["Makeup", "Jewellery", "Hairdo", "Saree Draping"],
            packageName: "Basic Bridal Makeup Package"
        },
        hd: {
            price: "20,000",
            includes: ["HD Makeup", "Jewellery", "Hairdo", "Saree Draping"],
            packageName: "HD Bridal Makeup Package"
        },
        premium: {
            price: "25,000",
            includes: ["HD Premium Makeup", "Exclusive Jewellery Selection", "Signature Hairdo Styling", "Saree Draping & Pleating"],
            packageName: "HD Premium Bridal Makeup Package"
        }
    },
    engagement: {
        basic: {
            price: "10,000",
            includes: ["Makeup", "Hairdo", "Saree Draping"],
            packageName: "Basic Engagement Makeup Package"
        },
        hd: {
            price: "15,000",
            includes: ["HD Makeup", "Signature Styling", "Saree Draping"],
            packageName: "HD Engagement Makeup Package"
        }
    }
};

// Pricing Switching Interactions
document.querySelectorAll('.pricing-card[data-package]').forEach(card => {
    const tabs = card.querySelectorAll('.tab-btn');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const packageId = card.getAttribute('data-package');
            const type = tab.getAttribute('data-type');
            const data = packageData[packageId][type];

            if (!data) return;

            // Remove active from peers and add to this tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const priceNum = card.querySelector('.price-number');
            const includesList = card.querySelector('.includes-list');
            const bookingBtn = card.querySelector('.booking-btn');

            // Fade animations on content change
            priceNum.classList.add('fade-anim');
            includesList.style.opacity = '0';
            includesList.style.transform = 'translateY(5px)';

            setTimeout(() => {
                // Update pricing details
                priceNum.textContent = data.price;
                
                // Clear old highlights and list children
                includesList.innerHTML = '';
                data.includes.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-check"></i> ${item}`;
                    includesList.appendChild(li);
                });

                // Update WhatsApp deep-link href with custom pre-filled message
                const encodedMsg = encodeURIComponent(`Hi Blossom Beauty Parlour, I would like to book the ${data.packageName} ✨`);
                bookingBtn.setAttribute('href', `https://wa.me/919842232008?text=${encodedMsg}`);

                // Smoothly fade contents back in
                priceNum.classList.remove('fade-anim');
                includesList.style.opacity = '1';
                includesList.style.transform = 'translateY(0)';
            }, 250);
        });
    });
});


// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Side Menu Toggle
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('side-menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Bottom Navigation Active State
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Floating Particles Canvas (Hero Section)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    
    // Adjust for mobile performance
    if(window.innerWidth < 768) {
        numberOfParticles = numberOfParticles / 2;
    }

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        
        // Soft pink and white particles
        const colors = ['rgba(244, 194, 194, 0.7)', 'rgba(255, 255, 255, 0.5)', 'rgba(232, 180, 184, 0.8)'];
        let color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// Video Lightbox Modal Logic
const videoCard = document.querySelector('.cinematic-video-card');
const lightbox = document.getElementById('video-lightbox');
const lightboxPlayer = document.getElementById('lightbox-player');
const closeLightboxBtn = document.querySelector('.video-lightbox-close');
const lightboxOverlay = document.querySelector('.video-lightbox-overlay');

function safeQuery(el, selector) {
    return el ? el.querySelector(selector) : null;
}

if (videoCard && lightbox && lightboxPlayer) {
    const cardVideo = safeQuery(videoCard, 'video');
    const cardSource = safeQuery(cardVideo, 'source');

    // Ensure clicks on the inner video bubble up to the card
    if (cardVideo) {
        cardVideo.style.pointerEvents = 'none';
    }

    // Open Lightbox and load the card's video source for a high-quality cinematic view
    const openLightbox = () => {
        // Determine source: prefer card's source, fallback to existing lightbox sources
        let src = null;
        if (cardSource) src = cardSource.getAttribute('src');
        if (!src) {
            const lbSrcEl = safeQuery(lightboxPlayer, 'source');
            if (lbSrcEl) src = lbSrcEl.getAttribute('src');
        }

        if (src) {
            // Swap source for lightbox player to match clicked card
            try {
                lightboxPlayer.pause();
                lightboxPlayer.removeAttribute('src');
                Array.from(lightboxPlayer.querySelectorAll('source')).forEach(s => s.remove());
                const newSource = document.createElement('source');
                newSource.setAttribute('src', src);
                newSource.setAttribute('type', 'video/mp4');
                lightboxPlayer.appendChild(newSource);
                lightboxPlayer.load();
            } catch (err) {
                console.warn('Failed to swap video src for lightbox', err);
            }
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
        lightboxPlayer.muted = true; // Start muted for autoplay rules

        // Attempt to autoplay; handle promise gracefully
        const playPromise = lightboxPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay successful
            }).catch(error => {
                // Autoplay blocked; show controls so user can start playback
                console.debug('Autoplay prevented', error);
                lightboxPlayer.muted = true;
            });
        }

        // Accessibility: focus on close button
        if (closeLightboxBtn) closeLightboxBtn.focus();
    };

    // Close function - stop and cleanup media to free memory
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        try {
            lightboxPlayer.pause();
            // Remove dynamic src to release memory on mobile
            lightboxPlayer.removeAttribute('src');
            Array.from(lightboxPlayer.querySelectorAll('source')).forEach(s => s.remove());
            lightboxPlayer.load();
        } catch (err) {
            console.warn('Error cleaning up lightbox player', err);
        }
    };

    // Attach open handlers
    videoCard.addEventListener('click', openLightbox);
    // If user clicks directly on inner video element, route to card click
    if (cardVideo) cardVideo.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(); });

    // Close handlers
    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    // Keyboard support (ESC key)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Prevent accidental focus outlines on click for luxury aesthetic
    document.addEventListener('mousedown', () => {
        document.documentElement.style.scrollBehavior = 'auto';
    });
}


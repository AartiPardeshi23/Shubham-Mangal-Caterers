// Header shadow and class on scroll
const header = document.getElementById('mainHeader');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Header transitions
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll progress bar calculations
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    }
});

// Mobile responsive menu controls
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('.nav-anchor');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-xmark';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile nav menu when a link is clicked
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Menu Tab Switcher function
function switchMenuTab(event, tabId) {
    // Deactivate all tab buttons
    const buttons = document.querySelectorAll('.menu-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Deactivate all panels
    const panels = document.querySelectorAll('.menu-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // Activate current tab button
    event.target.classList.add('active');

    // Activate target panel
    document.getElementById(tabId).classList.add('active');
}

// Budget Estimate Calculator Math
function calculateEstimate() {
    const guestCountVal = parseInt(document.getElementById('guestCount').value);
    const cateringPriceVal = parseInt(document.getElementById('cateringMenu').value);
    const decorPriceVal = parseInt(document.getElementById('decorPackage').value);
    
    // Addon check box values
    let addonPriceTotal = 0;
    
    // Addon 1 (Live counters) - Per plate
    const addon1 = document.getElementById('addon1');
    if (addon1.checked) {
        addonPriceTotal += parseInt(addon1.value) * guestCountVal;
    }
    
    // Addon 2 (Desserts) - Per plate
    const addon2 = document.getElementById('addon2');
    if (addon2.checked) {
        addonPriceTotal += parseInt(addon2.value) * guestCountVal;
    }

    // Addon 3 (Coordinator flat)
    const addon3 = document.getElementById('addon3');
    if (addon3.checked) {
        addonPriceTotal += parseInt(addon3.value);
    }

    // Addon 4 (Entry Flat)
    const addon4 = document.getElementById('addon4');
    if (addon4.checked) {
        addonPriceTotal += parseInt(addon4.value);
    }

    // Update bubble label
    document.getElementById('guestBubble').innerText = `${guestCountVal} Guests`;

    // Calculate Subtotals
    const cateringTotal = cateringPriceVal * guestCountVal;
    const decorTotal = decorPriceVal;
    const absoluteSum = cateringTotal + decorTotal + addonPriceTotal;

    // Formulate estimation range with 5% - 15% safety brackets
    let minEstimate = Math.round(absoluteSum * 0.95);
    let maxEstimate = Math.round(absoluteSum * 1.08);

    // Format numbers to Indian Currency Locale (INR)
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    // Update displays
    document.getElementById('totalPriceDisplay').innerText = `${formatter.format(minEstimate)} - ${formatter.format(maxEstimate)}`;
    document.getElementById('breakdownGuests').innerText = guestCountVal;
    document.getElementById('breakdownCatering').innerText = formatter.format(cateringTotal);
    document.getElementById('breakdownDecor').innerText = formatter.format(decorTotal);
    document.getElementById('breakdownAddons').innerText = formatter.format(addonPriceTotal);
    document.getElementById('breakdownTotal').innerText = formatter.format(absoluteSum);
}

// Toggle visual selection style for check-cards in calculator
function toggleAddon(checkboxId, cardId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
    
    const card = document.getElementById(cardId);
    if (checkbox.checked) {
        card.classList.add('selected');
    } else {
        card.classList.remove('selected');
    }
    calculateEstimate();
}

// Testimonial Carousel function controls
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set active
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Move carousel forward/backward
function moveCarousel(direction) {
    showSlide(currentSlideIndex + direction);
}

function setCarouselSlide(index) {
    showSlide(index);
}

// Auto transition testimonials slider
let autoSlideTimer = setInterval(() => {
    moveCarousel(1);
}, 6000);

// Reset timer on user clicking slider controls
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideTimer);
});

document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoSlideTimer = setInterval(() => {
        moveCarousel(1);
    }, 6000);
});

// Booking popup modal activation
const bookingModal = document.getElementById('bookingModal');

function openModal(inquirySubject = 'General Consultation') {
    document.getElementById('modalSubject').value = inquirySubject;
    
    // Set expected guest value based on budget calculator settings
    const calculatorGuests = document.getElementById('guestCount').value;
    document.getElementById('modalGuests').value = calculatorGuests;

    // Activate modal overlay
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock page scroll
}

function openModalWithDetails() {
    const guestCount = document.getElementById('guestCount').value;
    const feastType = document.getElementById('cateringMenu').options[document.getElementById('cateringMenu').selectedIndex].text;
    const decorTier = document.getElementById('decorPackage').options[document.getElementById('decorPackage').selectedIndex].text;
    
    let messageText = `Estimator Config:\nGuests: ${guestCount}\nFeast: ${feastType}\nDecor: ${decorTier}\nAddons checked: `;
    
    if(document.getElementById('addon1').checked) messageText += '[Live Counters] ';
    if(document.getElementById('addon2').checked) messageText += '[Dessert Bar] ';
    if(document.getElementById('addon3').checked) messageText += '[Coordinator] ';
    if(document.getElementById('addon4').checked) messageText += '[Entry Setup]';

    document.getElementById('modalRequirements').value = messageText;
    openModal('Quote Calculator Inquiry');
}

function closeModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    
    // Delay form reset for smooth close transitions
    setTimeout(() => {
        resetFormState('modalForm', 'modalSuccess');
    }, 400);
}

// Submit form triggers
function handleFormSubmit(event, formId, successId) {
    const form = document.getElementById(formId);

    // Fallback for local files: submit normally to avoid CORS blocks on file:/// protocol
    if (window.location.protocol === 'file:') {
        form.action = "https://formsubmit.co/pardeshiaarti49@gmail.com";
        form.method = "POST";
        
        // Redirect back to current local file URL after submission
        let nextInput = form.querySelector('input[name="_next"]');
        if (!nextInput) {
            nextInput = document.createElement('input');
            nextInput.type = 'hidden';
            nextInput.name = '_next';
            form.appendChild(nextInput);
        }
        nextInput.value = window.location.href;
        
        // Allow standard form submission to proceed
        return;
    }

    event.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Helper to transition to success view
    const showSuccess = () => {
        if (formId === 'modalForm') {
            document.getElementById('modalFormContainer').style.display = 'none';
        } else {
            document.getElementById(formId).style.display = 'none';
        }
        document.getElementById(successId).classList.add('active');
    };

    fetch("https://formsubmit.co/ajax/pardeshiaarti49@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        showSuccess();
    })
    .catch(error => {
        console.warn("FormSubmit API submission error, falling back to instant success view:", error);
        // Fallback so the user experience is uninterrupted
        showSuccess();
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

function resetFormState(formId, successId) {
    const form = document.getElementById(formId);
    form.reset();
    
    // Restore visual layout
    if (formId === 'modalForm') {
        document.getElementById('modalFormContainer').style.display = 'block';
    } else {
        document.getElementById(formId).style.display = 'block';
    }

    document.getElementById(successId).classList.remove('active');
    
    // Clean custom styles in calculator checklist checkboxes
    if(formId === 'modalForm') {
        // Clear any prefilled notes
        document.getElementById('modalRequirements').value = '';
        
        // Hide other choice input if visible
        const otherInput = document.getElementById('otherChoiceInput');
        if (otherInput) {
            otherInput.style.display = 'none';
            otherInput.required = false;
            otherInput.value = '';
        }
    }
}

// Handle dynamic display for Event/Service Type "Other" option
function handleChoiceChange(selectEl) {
    const otherInput = document.getElementById('otherChoiceInput');
    if (!otherInput) return;
    
    if (selectEl.value === 'other') {
        otherInput.style.display = 'block';
        otherInput.required = true;
        otherInput.focus();
    } else {
        otherInput.style.display = 'none';
        otherInput.required = false;
        otherInput.value = '';
    }
}

// Lightbox visual details activation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxText = document.getElementById('lightboxText');
const lightboxDots = document.getElementById('lightboxDots');

let currentGalleryImages = [];
let currentImageIndex = 0;
let currentGalleryTitle = '';
let currentGalleryDescription = '';

function openLightbox(title, description, imgList, startIndex = 0) {
    currentGalleryTitle = title;
    currentGalleryDescription = description;
    
    // Normalize string parameters to arrays
    if (typeof imgList === 'string') {
        currentGalleryImages = [imgList];
    } else {
        currentGalleryImages = Array.isArray(imgList) ? imgList : [];
    }
    
    currentImageIndex = startIndex;
    updateLightboxContent();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    if (currentGalleryImages.length === 0) return;
    
    const imgSrc = currentGalleryImages[currentImageIndex];
    
    // Smooth transition
    const imgEl = lightboxImg.querySelector('img');
    if (imgEl) {
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = imgSrc;
            imgEl.style.opacity = 1;
        }, 150);
    } else {
        lightboxImg.innerHTML = `<img src="${imgSrc}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; border: 1px solid var(--gold-light); opacity: 1;">`;
    }
    
    // Update text content
    lightboxTitle.innerText = currentGalleryTitle;
    lightboxText.innerText = currentGalleryDescription;
    
    // Update navigation buttons visibility (hide if only 1 image)
    const prevBtn = lightbox.querySelector('.lightbox-nav-btn.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav-btn.next');
    if (prevBtn && nextBtn) {
        if (currentGalleryImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
    
    // Generate indicator dots
    if (lightboxDots) {
        lightboxDots.innerHTML = '';
        if (currentGalleryImages.length > 1) {
            currentGalleryImages.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.className = `lightbox-dot${idx === currentImageIndex ? ' active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
                dot.addEventListener('click', (e) => {
                    e.stopPropagation(); // Avoid closing lightbox
                    setLightboxImage(idx);
                });
                lightboxDots.appendChild(dot);
            });
        }
    }
}

function changeLightboxImage(direction) {
    if (currentGalleryImages.length <= 1) return;
    currentImageIndex += direction;
    
    // Wrap around index boundaries
    if (currentImageIndex >= currentGalleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentGalleryImages.length - 1;
    }
    
    updateLightboxContent();
}

function setLightboxImage(index) {
    if (index >= 0 && index < currentGalleryImages.length) {
        currentImageIndex = index;
        updateLightboxContent();
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Bind keyboard events for premium desktop navigation
window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeLightboxImage(1);
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Bind swipe gesture events for mobile screens
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50; // minimum swipe distance in pixels
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe right -> previous image
            changeLightboxImage(-1);
        } else {
            // Swipe left -> next image
            changeLightboxImage(1);
        }
    }
}

// Scroll reveals using Intersection Observer API
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stop watching after element displays
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Bind observer to target reveal elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });
    // Initial calculations
    calculateEstimate();

    // Mouse movement parallax for luxury decorations (mandap backdrop, florals, and mandalas)
    const hero = document.querySelector('.hero');
    const floralTopLeft = document.querySelector('.floral-accent-top-left');
    const floralBottomRight = document.querySelector('.floral-accent-bottom-right');
    const mandalaLeft = document.querySelector('.mandala-bg-left');
    const mandalaRight = document.querySelector('.mandala-bg-right');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { width, height } = hero.getBoundingClientRect();
            // Calculate normalized offset from center (-0.5 to 0.5)
            const offX = (e.clientX / width - 0.5);
            const offY = (e.clientY / height - 0.5);

            // Apply different parallax weight multipliers to create depth
            if (floralTopLeft) {
                floralTopLeft.style.transform = `translate(${offX * 35}px, ${offY * 35}px) scale(1.05)`;
                floralTopLeft.style.opacity = '0.22'; // Increase visibility slightly on hover/movement
            }
            if (floralBottomRight) {
                floralBottomRight.style.transform = `rotate(180deg) translate(${-offX * 35}px, ${-offY * 35}px) scale(1.05)`;
                floralBottomRight.style.opacity = '0.22';
            }
            if (mandalaLeft) {
                mandalaLeft.style.transform = `translate(${-offX * 20}px, ${-offY * 20}px)`;
                mandalaLeft.style.opacity = '0.08';
            }
            if (mandalaRight) {
                mandalaRight.style.transform = `translate(${offX * 20}px, ${offY * 20}px)`;
                mandalaRight.style.opacity = '0.08';
            }
        });

        hero.addEventListener('mouseleave', () => {
            // Reset to original positions
            if (floralTopLeft) {
                floralTopLeft.style.transform = 'translate(0, 0) scale(1)';
                floralTopLeft.style.opacity = '0.12';
            }
            if (floralBottomRight) {
                floralBottomRight.style.transform = 'rotate(180deg) translate(0, 0) scale(1)';
                floralBottomRight.style.opacity = '0.12';
            }
            if (mandalaLeft) {
                mandalaLeft.style.transform = 'translate(0, 0)';
                mandalaLeft.style.opacity = '0.05';
            }
            if (mandalaRight) {
                mandalaRight.style.transform = 'translate(0, 0)';
                mandalaRight.style.opacity = '0.05';
            }
        });
    }
});

// --- Page-Wide Canvas Luxury Effects (Falling Flower Petals & Cursor Trails) ---
(function() {
    const canvas = document.getElementById('luxuryEffectsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const colors = [
        '#7A1F2B', // Deep Wine Burgundy
        '#4A0F17', // Primary Burgundy
        '#D4AF37', // Gold Marigold
        '#E8C76A', // Soft Yellow Marigold
        '#E25C70'  // Rose Pink Petal
    ];

    class Petal {
        constructor(isCursor = false, mouseX = 0, mouseY = 0) {
            this.isCursor = isCursor;
            this.x = isCursor ? mouseX + (Math.random() - 0.5) * 15 : Math.random() * width;
            this.y = isCursor ? mouseY + (Math.random() - 0.5) * 15 : -20 - (Math.random() * 100);
            this.size = 6 + Math.random() * 10;
            this.speedY = 1 + Math.random() * 1.5;
            this.speedX = isCursor ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.8;
            this.angle = Math.random() * Math.PI * 2;
            this.spinSpeed = (Math.random() - 0.5) * 0.04;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = isCursor ? 1.0 : 0.4 + Math.random() * 0.45;
            this.swingRange = 1 + Math.random() * 1.5;
            this.swingSpeed = 0.01 + Math.random() * 0.02;
            this.swingOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.angle += this.spinSpeed;

            // Sway back and forth using sine waves
            this.swingOffset += this.swingSpeed;
            this.x += this.speedX + Math.sin(this.swingOffset) * this.swingRange * 0.2;

            if (this.isCursor) {
                this.opacity -= 0.015; // Fade out cursor particles quicker
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            
            // Draw a teardrop-shaped flower petal
            ctx.moveTo(0, -this.size);
            ctx.quadraticCurveTo(this.size * 1.2, -this.size * 0.4, this.size * 0.3, this.size);
            ctx.quadraticCurveTo(0, this.size * 1.4, -this.size * 0.3, this.size);
            ctx.quadraticCurveTo(-this.size * 1.2, -this.size * 0.4, 0, -this.size);
            ctx.closePath();
            ctx.fill();

            // Inner leaf vein overlay
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.moveTo(0, -this.size * 0.5);
            ctx.quadraticCurveTo(this.size * 0.2, 0, 0, this.size * 0.7);
            ctx.stroke();

            ctx.restore();
        }
    }

    class Sparkle {
        constructor(x, y) {
            this.x = x + (Math.random() - 0.5) * 12;
            this.y = y + (Math.random() - 0.5) * 12;
            this.radius = 2.0 + Math.random() * 3.0; // Increased radius for more sparkle presence
            this.speedY = 0.2 + Math.random() * 0.6;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.opacity = 1.0;
            this.fadeSpeed = 0.012 + Math.random() * 0.015; // Slowed fade speed to let sparkles linger longer
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.fadeSpeed;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(232, 199, 106, ' + this.opacity + ')'; // Gold sparkle color
            ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
            ctx.shadowBlur = 8; // Increased shadow blur for glow
            
            // Draw 4-pointed star
            ctx.moveTo(this.x, this.y - this.radius * 2);
            ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius * 2, this.y);
            ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.radius * 2);
            ctx.quadraticCurveTo(this.x, this.y, this.x - this.radius * 2, this.y);
            ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - this.radius * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    const petals = [];
    const trail = [];
    const maxBackgroundPetals = 35;
    const hero = document.getElementById('home');

    // Prefill background petals so they are already on screen when page loads (restricted to hero section height)
    const initialHeroBottom = hero ? hero.getBoundingClientRect().bottom : height;
    for (let i = 0; i < maxBackgroundPetals; i++) {
        const p = new Petal();
        p.y = Math.random() * initialHeroBottom; // Distribute heightwise inside hero bounds
        petals.push(p);
    }

    // Spawn falling background petals (only within hero bounds)
    function spawnBackgroundPetals() {
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : height;
        if (heroBottom > 0 && petals.length < maxBackgroundPetals && Math.random() < 0.04) {
            petals.push(new Petal());
        }
    }

    // Capture cursor move and add items to trail list
    let lastX = 0;
    let lastY = 0;
    let movedDist = 0;

    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        movedDist += Math.sqrt(dx * dx + dy * dy);

        lastX = e.clientX;
        lastY = e.clientY;

        // Spawn a trailing sparkle or petal if cursor has moved (reduced threshold to 8 for denser sparkles)
        if (movedDist > 8) {
            // Spawn 2-3 sparkles at once for high density
            const numSparkles = 2 + Math.floor(Math.random() * 2);
            for (let s = 0; s < numSparkles; s++) {
                trail.push(new Sparkle(e.clientX, e.clientY));
            }
            if (Math.random() < 0.35) {
                trail.push(new Petal(true, e.clientX, e.clientY));
            }
            movedDist = 0;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            const touch = e.touches[0];
            const numSparkles = 2;
            for (let s = 0; s < numSparkles; s++) {
                trail.push(new Sparkle(touch.clientX, touch.clientY));
            }
            if (Math.random() < 0.25) {
                trail.push(new Petal(true, touch.clientX, touch.clientY));
            }
        }
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update & draw background petals (only visible inside the hero/home bounds)
        spawnBackgroundPetals();
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : height;
        for (let i = petals.length - 1; i >= 0; i--) {
            const p = petals[i];
            p.update();
            p.draw();

            // Spliced when petal reaches bottom of hero section or leaves sides
            if (p.y > heroBottom || p.x < -20 || p.x > width + 20) {
                petals.splice(i, 1);
            }
        }

        // Update & draw cursor trail sparkles and petals (page-wide)
        for (let i = trail.length - 1; i >= 0; i--) {
            const t = trail[i];
            t.update();
            t.draw();

            if (t.opacity <= 0 || t.y > height + 20 || t.x < -20 || t.x > width + 20) {
                trail.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();

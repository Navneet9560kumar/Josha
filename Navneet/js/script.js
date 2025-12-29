


// ===========================
// Active Navigation Link
// ===========================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// Modal Functionality
// ===========================



const modal = document.getElementById('hireModal');
const hireMeBtn = document.getElementById('hireMeBtn');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const hireForm = document.getElementById('hireForm');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

hireMeBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});



// Handle modal form submission
hireForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! Your message has been sent successfully.');
    closeModal();
    hireForm.reset();
});


// ===========================
// RECOMMENDATIONS CAROUSEL
// ===========================

const track = document.getElementById("carouselTrack");
const cards = Array.from(track.children);
const indicators = document.querySelectorAll(".indicator");

const GAP = 30;
const VISIBLE = 4;

let index = VISIBLE;
let cardWidth;

// ---------- CLONE FOR INFINITE LOOP ----------
const firstClones = cards.slice(0, VISIBLE).map(c => c.cloneNode(true));
const lastClones  = cards.slice(-VISIBLE).map(c => c.cloneNode(true));

lastClones.forEach(c => track.prepend(c));
firstClones.forEach(c => track.append(c));

// ---------- INITIAL POSITION ----------
function setPosition() {
  cardWidth = cards[0].offsetWidth + GAP;
  track.style.transition = "none";
  track.style.transform = `translateX(-${cardWidth * index}px)`;
}

window.addEventListener("load", setPosition);
window.addEventListener("resize", setPosition);

// ---------- INDICATORS ----------
function updateIndicators() {
  const active =
    ((index - VISIBLE) % indicators.length + indicators.length) %
    indicators.length;

  indicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === active);
  });
}

// ---------- SLIDE ----------
function slide(dir) {
  index += dir;
  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(-${cardWidth * index}px)`;
  updateIndicators();
}

// ---------- LOOP FIX ----------
track.addEventListener("transitionend", () => {
  if (index >= cards.length + VISIBLE) {
    index = VISIBLE;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  if (index <= 0) {
    index = cards.length;
    track.style.transition = "none";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  updateIndicators();
});

// ---------- INDICATOR CLICK ----------
indicators.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = VISIBLE + i;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    updateIndicators();
  });
});

// ---------- DRAG (MOUSE) ----------
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  prevTranslate = -index * cardWidth;
  track.style.transition = "none";
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const delta = currentX - startX;
  currentTranslate = prevTranslate + delta;

  track.style.transform = `translateX(${currentTranslate}px)`;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -80) slide(1);       
  else if (movedBy > 80) slide(-1);  
  else {
    // snap back
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

track.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});


// ===========================
// TOUCHPAD / WHEEL SCROLL
// ===========================

let wheelLock = false;
let wheelDelta = 0;

track.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

  e.preventDefault();

  wheelDelta += e.deltaX;

  if (wheelLock) return;

  if (wheelDelta > 80) {
    wheelLock = true;
    slide(1);
  } 
  else if (wheelDelta < -80) {
    wheelLock = true;
    slide(-1);
  }

  setTimeout(() => {
    wheelLock = false;
    wheelDelta = 0;
  }, 400); // debounce time
}, { passive: false });
// ---------- TOUCH (MOBILE) ----------
let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  track.style.transition = "none";
  touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (diff > 50) slide(-1);
  else if (diff < -50) slide(1);
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});



// ===========================
// Form Input Animations
// ===========================

const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===========================
// Scroll to Top on Page Load
// ===========================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ===========================
// Project Card Hover Effect
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// Header Shadow on Scroll
// ===========================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===========================
// Lazy Loading Images
// ===========================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// Keyboard Navigation for Carousel
// ===========================

document.addEventListener('keydown', (e) => {
    const carousel = window.carouselInstance;
    if (!carousel) return;

    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn').click();
    }
});

// ===========================
// Form Validation
// ===========================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#E8E8E8';
        }

        if (input.type === 'email' && input.value.trim()) {
            if (!validateEmail(input.value)) {
                input.style.borderColor = '#ff4444';
                isValid = false;
            }
        }
    });

    return isValid;
}

// Add validation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields correctly.');
        }
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================

const revealElements = document.querySelectorAll('.project-card, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===========================
// Console Welcome Message
// ===========================

console.log('%cWelcome to My Portfolio! 🚀', 'font-size: 20px; font-weight: bold; color: #FDB400;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 14px; color: #767676;');
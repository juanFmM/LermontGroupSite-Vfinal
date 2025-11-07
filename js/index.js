// js/index.js - Versión moderna con mejoras interactivas
document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Helpers modernos
     ===================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =====================
     Sistema de partículas para el hero
     ===================== */
  function createParticles() {
    const hero = $('#hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      
      particlesContainer.appendChild(particle);
    }
  }

  /* =====================
     Barra de progreso de scroll
     ===================== */
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateProgress);
  }

  /* =====================
     Cursor interactivo
     ===================== */
  function createInteractiveCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'interactive-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Elementos interactivos
    const interactiveElements = $$('a, button, .card, .client-logo, .cta-button');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        el.style.transform = 'scale(1.02)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        el.style.transform = 'scale(1)';
      });
    });

    // Ocultar cursor en dispositivos táctiles
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
    }
  }

  /* =====================
     HEADER & MENÚ MÓVIL mejorado
     ===================== */
  const header = $('header');
  const btnMenu = $('#btn-menu');
  const mainNav = $('#main-nav');

  function initHeader() {
    if (!header) return;

    // Mejorar el efecto glassmorphism
    header.style.backdropFilter = 'blur(20px) saturate(180%)';
    
    // Sistema de temas mejorado
    function updateHeaderTheme() {
      const scrollY = window.scrollY;
      const heroHeight = $('#hero')?.offsetHeight || 600;
      
      if (scrollY < heroHeight * 0.3) {
        header.classList.remove('header--light');
        header.classList.add('header--transparent');
      } else {
        header.classList.remove('header--transparent');
        header.classList.add('header--light');
      }
    }

    window.addEventListener('scroll', updateHeaderTheme);
    updateHeaderTheme();
  }

  function initMobileMenu() {
    if (!btnMenu || !mainNav) return;

    btnMenu.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('mobile-open');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Cerrar menú al hacer clic en enlaces
    $$('#main-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !btnMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mainNav.classList.add('mobile-open');
    btnMenu.classList.add('active');
    btnMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mainNav.classList.remove('mobile-open');
    btnMenu.classList.remove('active');
    btnMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* =====================
     Animaciones de entrada mejoradas
     ===================== */
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Efecto escalonado para elementos en grid
          if (entry.target.parentElement.classList.contains('grid')) {
            const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        }
      });
    }, observerOptions);

    $$('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  /* =====================
     CARRUSEL mejorado con efectos parallax
     ===================== */
  function initCarousel() {
    const carousel = $('#carousel');
    const slides = $$('.carousel-slide');
    const dots = $$('.carousel-dot');
    
    if (!slides.length) return;

    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;

    function showSlide(index) {
      if (isAnimating) return;
      
      isAnimating = true;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-pressed', i === index);
      });

      currentIndex = index;
      
      // Efecto parallax en la imagen
      const activeSlide = slides[index];
      const img = activeSlide.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
        setTimeout(() => {
          img.style.transform = 'scale(1)';
        }, 100);
      }

      setTimeout(() => {
        isAnimating = false;
      }, 1200);
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }

    // Inicializar dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
      });
      
      // Navegación por teclado
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showSlide(index);
          resetAutoPlay();
        }
      });
    });

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Pausar autoplay en hover
    carousel?.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carousel?.addEventListener('mouseleave', () => {
      startAutoPlay();
    });

    // Inicializar
    showSlide(0);
    startAutoPlay();
  }

  /* =====================
     FORMULARIO con validación mejorada
     ===================== */
  function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;

    const inputs = $$('.form-input', contactForm);
    
    inputs.forEach(input => {
      // Efecto de label flotante
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });

      // Validación en tiempo real
      input.addEventListener('input', () => {
        validateField(input);
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const isValid = validateForm();
      if (!isValid) return;

      // Animación de envío
      const submitBtn = $('#submitBtn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      try {
        // Simular envío (reemplaza con tu endpoint real)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showMessage('success', '¡Mensaje enviado correctamente!');
        contactForm.reset();
      } catch (error) {
        showMessage('error', 'Error al enviar el mensaje. Intenta nuevamente.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    switch (field.type) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'text':
        isValid = value.length >= 2;
        break;
      default:
        isValid = value.length > 0;
    }

    field.style.borderColor = isValid ? '#10b981' : '#ef4444';
    return isValid;
  }

  function validateForm() {
    const inputs = $$('.form-input[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  /* =====================
     Efectos de scroll suave mejorados
     ===================== */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = $(targetId);
        
        if (targetElement) {
          const headerHeight = header?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* =====================
     Inicialización de todos los módulos
     ===================== */
  function init() {
    createParticles();
    createScrollProgress();
    createInteractiveCursor();
    initHeader();
    initMobileMenu();
    initAnimations();
    initCarousel();
    initContactForm();
    initSmoothScroll();

    // Ajustar altura del hero
    setTimeout(() => {
      const hero = $('#hero');
      if (hero) {
        hero.style.height = `calc(100vh - ${header?.offsetHeight || 0}px)`;
      }
    }, 100);
  }

  // Iniciar la aplicación
  init();

  /* =====================
     Efectos de performance
     ===================== */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const hero = $('#hero');
      if (hero) {
        hero.style.height = `calc(100vh - ${header?.offsetHeight || 0}px)`;
      }
    }, 250);
  });

  // Precargar imágenes críticas
  function preloadCriticalImages() {
    const criticalImages = [
      'imagenes/Logo-removebg-preview.png',
      'imagenes/lermont_page14_img3.jpeg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadCriticalImages();
});

// Exportar funciones globales si es necesario
window.addClientLogo = function(src, alt = 'Cliente') {
  const grid = document.getElementById('client-grid');
  if (!grid) return;

  const logoDiv = document.createElement('div');
  logoDiv.className = 'client-logo';
  logoDiv.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy">`;
  
  grid.appendChild(logoDiv);
};

/* =====================
   Animaciones del Footer
   ===================== */
   function initFooterAnimations() {
    const footerSections = $$('.footer-section');
    const footer = $('footer');
    
    if (!footer || !footerSections.length) return;
  
    // Crear partículas para el footer
    createFooterParticles();
  
    // Observer para animar las secciones al hacer scroll
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerSections.forEach((section, index) => {
            setTimeout(() => {
              section.classList.add('animate-in');
            }, index * 200);
          });
        }
      });
    }, { threshold: 0.1 });
  
    footerObserver.observe(footer);
  
    // Efectos hover mejorados para los enlaces
    initFooterHoverEffects();
  }
  
  function createFooterParticles() {
    const footer = $('footer');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'footer-particles';
    footer.appendChild(particlesContainer);
  
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'footer-particle';
      
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 4 + 6;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  function initFooterHoverEffects() {
    // Efectos para los enlaces de contacto
    const contactItems = $$('.footer-section address p');
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
  
    // Efectos para el formulario de newsletter
    const newsletterInputs = $$('.newsletter-form input');
    newsletterInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
    });
  }
  
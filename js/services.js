// js/services.js - Versión moderna con todas las funcionalidades del index
document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Helpers modernos
     ===================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =====================
     Sistema de partículas para el hero de servicios
     ===================== */
  function createParticles() {
    const hero = $('#services-hero');
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
    const interactiveElements = $$('a, button, .card, .cta-button, .form-submit');
    
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
    
    // Sistema de temas mejorado para servicios
    function updateHeaderTheme() {
      const scrollY = window.scrollY;
      const heroHeight = $('#services-hero')?.offsetHeight || 600;
      
      if (scrollY < heroHeight * 0.3) {
        header.classList.remove('header--dark');
        header.classList.add('header--light');
      } else {
        header.classList.remove('header--light');
        header.classList.add('header--dark');
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
     FORMULARIO con validación mejorada
     ===================== */
  function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;

    const inputs = $$('input, textarea, select', contactForm);
    
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

    // Reset form handlers
    $('#resetForm')?.addEventListener('click', resetContactForm);
    $('#resetErrorForm')?.addEventListener('click', resetContactForm);
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
    const inputs = $$('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function resetContactForm() {
    const contactForm = $('#contactForm');
    const successMessage = $('#successMessage');
    const errorMessage = $('#errorMessage');
    const submitBtn = $('#submitBtn');

    contactForm.classList.remove('hidden');
    successMessage?.classList.add('hidden');
    errorMessage?.classList.add('hidden');
    submitBtn.innerHTML = '<span>Enviar</span>';
    submitBtn.disabled = false;
    
    Array.from(contactForm.elements).forEach(elem => elem.disabled = false);
  }

  function showMessage(type, message) {
    const contactForm = $('#contactForm');
    const successMessage = $('#successMessage');
    const errorMessage = $('#errorMessage');

    contactForm.classList.add('hidden');
    
    if (type === 'success') {
      successMessage.classList.remove('hidden');
    } else {
      errorMessage.classList.remove('hidden');
    }

    // También mostrar notificación flotante
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
     Efectos específicos para cards de servicios
     ===================== */
  function initServiceCards() {
    const cards = $$('.card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      });
    });
  }

  /* =====================
     Inicialización de todos los módulos para servicios
     ===================== */
  function init() {
    createParticles();
    createScrollProgress();
    createInteractiveCursor();
    initHeader();
    initMobileMenu();
    initAnimations();
    initContactForm();
    initSmoothScroll();
    initServiceCards();

    // Ajustar altura del hero
    setTimeout(() => {
      const hero = $('#services-hero');
      if (hero) {
        hero.style.minHeight = `calc(100vh - ${header?.offsetHeight || 0}px)`;
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
      const hero = $('#services-hero');
      if (hero) {
        hero.style.minHeight = `calc(100vh - ${header?.offsetHeight || 0}px)`;
      }
    }, 250);
  });

  // Precargar imágenes críticas para servicios
  function preloadCriticalImages() {
    const criticalImages = [
      'imagenes/Logo-removebg-preview.png',
      'imagenes/imagen3.jpg',
      'imagenes/lermont_page11_img2.jpeg',
      'imagenes/lermont_page13_img3.png',
      'imagenes/lermont_page15_img1.jpeg',
      'imagenes/lermont_page5_img1.jpeg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadCriticalImages();
});

/* =====================
   Animaciones del Footer para servicios
   ===================== */
function initFooterAnimations() {
  const footerSections = $$('.footer-section');
  const footer = $('footer');
  
  if (!footer || !footerSections.length) return;

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

// Inicializar animaciones del footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initFooterAnimations);

// Exportar funciones globales si es necesario
window.addServiceCard = function(title, description, imageSrc, link) {
  const grid = $('#servicios-grid .grid');
  if (!grid) return;

  const card = document.createElement('div');
  card.className = 'card group';
  card.setAttribute('data-animate', '');
  card.innerHTML = `
    <div class="relative overflow-hidden rounded-xl mb-4">
      <img src="${imageSrc}" alt="${title}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <h3 class="text-xl font-bold text-primary mb-3">${title}</h3>
    <p class="text-gray-600 mb-4">${description}</p>
    <a href="${link}" class="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
      <span>Ver más</span>
      <i class="fas fa-arrow-right ml-2"></i>
    </a>
  `;
  
  grid.appendChild(card);
};

/* =====================
   Efectos para nuevas secciones de servicios
   ===================== */
   function initServiceSections() {
    // Efectos para cards de especialidades
    const specialtyCards = $$('.specialty-card');
    specialtyCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.fa-cogs, .fa-solar-panel, .fa-wind');
        if (icon) {
          icon.style.transform = 'rotate(10deg) scale(1.1)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.fa-cogs, .fa-solar-panel, .fa-wind');
        if (icon) {
          icon.style.transform = 'rotate(0deg) scale(1)';
        }
      });
    });
  
    // Efectos para sectores
    const sectorCards = $$('.sector-card');
    sectorCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.fa-building, .fa-hospital, .fa-industry, .fa-home, .fa-server, .fa-utensils');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.fa-building, .fa-hospital, .fa-industry, .fa-home, .fa-server, .fa-utensils');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });
  }
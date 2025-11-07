// js/contactos.js - Versión moderna con navegación mejorada
document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Helpers modernos
     ===================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =====================
     Variables globales
     ===================== */
  const header = $('.header-modern');
  const btnMenu = $('#btn-menu');
  const btnClose = $('#btn-close');
  const mobileNav = $('#mobile-nav');
  const contactForm = $('#contactForm');
  const submitBtn = $('#submitBtn');
  const successMessage = $('#successMessage');
  const errorMessage = $('#errorMessage');

  /* =====================
     Sistema de partículas para el hero de contacto
     ===================== */
  function createContactParticles() {
    const hero = $('#contact-hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'contact-particles-container';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'contact-particle';
      
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 7;
      const duration = Math.random() * 4 + 4;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = Math.random() * 0.4 + 0.2;
      
      particlesContainer.appendChild(particle);
    }
  }

  /* =====================
     Navegación Mejorada
     ===================== */
  function initNavigation() {
    if (!header || !btnMenu || !mobileNav) return;

    // Abrir menú móvil
    btnMenu.addEventListener('click', openMobileMenu);
    
    // Cerrar menú móvil
    btnClose.addEventListener('click', closeMobileMenu);
    
    // Cerrar menú al hacer clic en enlaces
    $$('.nav-link-mobile').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMobileMenu();
      }
    });

    // Cerrar menú con Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Efecto de scroll en header
    function updateHeaderOnScroll() {
      const scrollY = window.scrollY;
      const heroHeight = $('#contact-hero')?.offsetHeight || 600;
      
      if (scrollY > 100) {
        header.classList.add('header--scrolled');
        header.classList.add('header--dark');
      } else {
        header.classList.remove('header--scrolled');
        header.classList.remove('header--dark');
      }
      
      // Actualizar tema basado en sección
      if (scrollY < heroHeight * 0.3) {
        header.setAttribute('data-header', 'light');
      } else {
        header.setAttribute('data-header', 'dark');
      }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();
  }

  function openMobileMenu() {
    mobileNav.classList.add('open');
    btnMenu.classList.add('active');
    btnMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Animar icono hamburguesa
    btnMenu.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btnMenu.style.transform = 'scale(1)';
    }, 300);
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    btnMenu.classList.remove('active');
    btnMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Animar icono hamburguesa
    btnMenu.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btnMenu.style.transform = 'scale(1)';
    }, 300);
  }

  /* =====================
     Sistema de FAQ interactivo
     ===================== */
  function initFAQSystem() {
    const faqQuestions = $$('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Cerrar otras preguntas abiertas
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== this) {
            otherQuestion.classList.remove('active');
            otherQuestion.nextElementSibling.classList.add('hidden');
            otherQuestion.querySelector('i').style.transform = 'rotate(0deg)';
          }
        });
        
        // Alternar estado actual
        this.classList.toggle('active');
        answer.classList.toggle('hidden');
        
        if (this.classList.contains('active')) {
          icon.style.transform = 'rotate(180deg)';
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          icon.style.transform = 'rotate(0deg)';
          answer.style.maxHeight = '0';
        }
      });
      
      // Soporte para teclado
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  /* =====================
     Efectos para tarjetas de contacto
     ===================== */
  function initContactCards() {
    const contactCards = $$('.contact-info-card, .office-card');
    
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.fa-phone-alt, .fa-envelope, .fa-map-marker-alt, .fa-clock, .fa-building, .fa-tools, .fa-store');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.fa-phone-alt, .fa-envelope, .fa-map-marker-alt, .fa-clock, .fa-building, .fa-tools, .fa-store');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
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
    if (!contactForm) return;

    const inputs = $$('input, textarea, select', contactForm);
    
    inputs.forEach(input => {
      // Efecto de focus mejorado
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
      
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Enviando...';
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
    submitBtn.innerHTML = '<span>Enviar Mensaje</span>';
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
     Inicialización de todos los módulos
     ===================== */
  function init() {
    createContactParticles();
    initNavigation();
    initFAQSystem();
    initContactCards();
    initAnimations();
    initContactForm();
    initSmoothScroll();

    // Ajustar altura del hero
    setTimeout(() => {
      const hero = $('#contact-hero');
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
      const hero = $('#contact-hero');
      if (hero) {
        hero.style.minHeight = `calc(100vh - ${header?.offsetHeight || 0}px)`;
      }
    }, 250);
  });

  // Precargar imágenes críticas para contacto
  function preloadContactImages() {
    const criticalImages = [
      'imagenes/Logo-removebg-preview.png',
      'imagenes/imagen3.jpg',
      'imagenes/lermont_page16_img1.jpeg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadContactImages();
});

/* =====================
   Animaciones del Footer para contacto
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
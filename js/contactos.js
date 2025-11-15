// js/contactos.js - Versión corregida con EmailJS y header blanco fijo
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

  // Inicializar EmailJS una vez al cargar la página
  (function() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init("GsVquOipa6B3jZpj8");
      console.log('EmailJS inicializado correctamente');
    } else {
      console.error('EmailJS no está cargado');
    }
  })();

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
     Navegación Mejorada - HEADER BLANCO FIJO
     ===================== */
  function initNavigation() {
    if (!header || !btnMenu || !mobileNav) return;

    // Configurar header siempre blanco
    header.classList.add('header--light');
    header.classList.remove('header--dark', 'header--transparent');
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.backdropFilter = 'blur(20px)';

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

    // ELIMINADO: Efecto de scroll en header que cambiaba el color
    // El header permanecerá siempre blanco
  }

  function openMobileMenu() {
    mobileNav.classList.add('open');
    mobileNav.style.transform = 'translateX(0)';
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
    mobileNav.style.transform = 'translateX(100%)';
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
     FORMULARIO con EmailJS - VERSIÓN CORREGIDA
     ===================== */
  function initContactForm() {
    if (!contactForm) {
      console.error('Formulario de contacto no encontrado');
      return;
    }

    console.log('Inicializando formulario de contacto...');

    const inputs = $$('.form-input');
    const requiredInputs = $$('.form-input[required]');
    
    // Efectos de formulario
    inputs.forEach(input => {
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

    // Manejar envío del formulario
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Formulario enviado');
      
      // Validar formulario
      const isValid = validateForm();
      if (!isValid) {
        console.log('Formulario no válido');
        showNotification('error', 'Por favor, completa todos los campos requeridos correctamente.');
        return;
      }

      // Mostrar estado de envío
      const submitBtn = $('#submitBtn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Enviando...';
      submitBtn.disabled = true;

      try {
        // Preparar datos para EmailJS
        const formData = {
          nombre: $('#nombre').value.trim(),
          email: $('#email').value.trim(),
          telefono: $('#telefono').value.trim(),
          servicio: $('#servicio').value,
          mensaje: $('#mensaje').value.trim(),
          fecha: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        console.log('Datos a enviar:', formData);

        // Verificar que EmailJS esté disponible
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS no está cargado correctamente');
        }

        // Enviar email usando EmailJS
        const response = await emailjs.send(
          'service_dz866kp',
          'template_wsd5nkp',
          formData
        );

        console.log('Respuesta de EmailJS:', response);

        if (response.status === 200) {
          // Éxito - mostrar mensaje de éxito
          showNotification('success', '¡Mensaje enviado correctamente! Te contactaremos en breve.');
          contactForm.reset();
          
          // Limpiar estilos de validación
          inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
            input.style.borderColor = '';
          });

          // Mostrar mensaje de éxito en el formulario
          showFormMessage('success');
        } else {
          throw new Error('Error en la respuesta de EmailJS');
        }
        
      } catch (error) {
        console.error('Error EmailJS:', error);
        showNotification('error', 'Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente por teléfono.');
        showFormMessage('error');
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
      case 'tel':
        // Validación básica para teléfono (opcional)
        isValid = value === '' || /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''));
        break;
      default:
        isValid = value.length > 0;
    }

    // Si es requerido y está vacío
    if (field.hasAttribute('required') && value === '') {
      isValid = false;
    }

    // Aplicar estilo visual
    if (field.hasAttribute('required')) {
      field.style.borderColor = isValid ? '#10b981' : '#ef4444';
    }

    return isValid;
  }

  function validateForm() {
    const requiredInputs = $$('.form-input[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
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

    // Mostrar formulario y ocultar mensajes
    contactForm.style.display = 'block';
    successMessage?.classList.add('hidden');
    errorMessage?.classList.add('hidden');
    
    // Resetear botón
    const submitBtn = $('#submitBtn');
    submitBtn.innerHTML = '<span>Enviar Mensaje</span><i class="fas fa-paper-plane ml-2"></i>';
    submitBtn.disabled = false;
  }

  function showFormMessage(type) {
    const contactForm = $('#contactForm');
    const successMessage = $('#successMessage');
    const errorMessage = $('#errorMessage');

    // Ocultar formulario y mostrar mensaje apropiado
    contactForm.style.display = 'none';
    
    if (type === 'success') {
      successMessage.classList.remove('hidden');
      errorMessage.classList.add('hidden');
    } else {
      errorMessage.classList.remove('hidden');
      successMessage.classList.add('hidden');
    }
  }

  function showNotification(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white transform transition-all duration-300 ease-in-out`;
    messageDiv.style.transform = 'translateX(100%)';
    messageDiv.style.opacity = '0';
    messageDiv.textContent = message;

    // Agregar al documento
    document.body.appendChild(messageDiv);

    // Animación de entrada
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(0)';
      messageDiv.style.opacity = '1';
    }, 100);

    // Remover después de 5 segundos
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(100%)';
      messageDiv.style.opacity = '0';
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.parentNode.removeChild(messageDiv);
        }
      }, 300);
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
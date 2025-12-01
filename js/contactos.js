// js/contactos.js - Versión adaptada al estilo de Proyectos
document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Variables globales adaptadas
     ===================== */
  const header = document.querySelector('header');
  const btnMenu = document.getElementById('btn-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contactForm');

  /* =====================
     MENÚ MÓVIL - Versión igual a proyectos.js
     ===================== */
  function initMobileMenu() {
    if (!btnMenu || !mobileMenu) {
      console.error('Elementos del menú móvil no encontrados');
      return;
    }

    // Estado inicial - forzar cierre
    btnMenu.classList.remove('active');
    btnMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('mobile-open');
    mobileMenu.style.transform = 'translateY(-100%)';
    mobileMenu.style.opacity = '0';
    document.body.style.overflow = '';

    btnMenu.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = btnMenu.classList.contains('active');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Cerrar menú al hacer clic en enlaces móviles
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('mobile-open') && 
          !mobileMenu.contains(e.target) && 
          !btnMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });

    function openMobileMenu() {
      btnMenu.classList.add('active');
      btnMenu.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('mobile-open');
      mobileMenu.style.transform = 'translateY(0)';
      mobileMenu.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      btnMenu.classList.remove('active');
      btnMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('mobile-open');
      mobileMenu.style.transform = 'translateY(-100%)';
      mobileMenu.style.opacity = '0';
      document.body.style.overflow = '';
    }
  }

  /* =====================
     Sistema de FAQ interactivo (mantenido)
     ===================== */
  function initFAQSystem() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Cerrar otras preguntas abiertas
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== this) {
            otherQuestion.classList.remove('active');
            otherQuestion.nextElementSibling.classList.add('hidden');
            const otherIcon = otherQuestion.querySelector('i');
            if (otherIcon) {
              otherIcon.style.transform = 'rotate(0deg)';
            }
          }
        });
        
        // Alternar estado actual
        this.classList.toggle('active');
        answer.classList.toggle('hidden');
        
        if (this.classList.contains('active')) {
          if (icon) {
            icon.style.transform = 'rotate(180deg)';
          }
        } else {
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
          }
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
     Efectos para tarjetas de contacto adaptadas
     ===================== */
  function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  /* =====================
     FORMULARIO con EmailJS (mantenido)
     ===================== */
  function initContactForm() {
    if (!contactForm) {
      console.error('Formulario de contacto no encontrado');
      return;
    }

    console.log('Inicializando formulario de contacto...');

    const inputs = contactForm.querySelectorAll('.form-input');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Manejar envío del formulario
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Formulario enviado');
      
      // Validar formulario
      const isValid = validateForm();
      if (!isValid) {
        showNotification('error', 'Por favor, completa todos los campos requeridos correctamente.');
        return;
      }

      // Mostrar estado de envío
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Enviando...';
      submitBtn.disabled = true;

      try {
        // Preparar datos para EmailJS
        const formData = {
          nombre: document.getElementById('nombre').value.trim(),
          email: document.getElementById('email').value.trim(),
          telefono: document.getElementById('telefono').value.trim(),
          servicio: document.getElementById('servicio').value,
          mensaje: document.getElementById('mensaje').value.trim(),
          fecha: new Date().toLocaleString('es-ES')
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
          showNotification('success', '¡Mensaje enviado correctamente! Te contactaremos en breve.');
          contactForm.reset();
          showFormMessage('success');
        } else {
          throw new Error('Error en la respuesta de EmailJS');
        }
        
      } catch (error) {
        console.error('Error EmailJS:', error);
        showNotification('error', 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
        showFormMessage('error');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Reset form handlers
    const resetForm = document.getElementById('resetForm');
    const resetErrorForm = document.getElementById('resetErrorForm');
    
    if (resetForm) {
      resetForm.addEventListener('click', resetContactForm);
    }
    if (resetErrorForm) {
      resetErrorForm.addEventListener('click', resetContactForm);
    }

    function validateForm() {
      const requiredInputs = contactForm.querySelectorAll('.form-input[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '#10b981';
        }
      });

      return isValid;
    }

    function resetContactForm() {
      contactForm.style.display = 'block';
      if (successMessage) successMessage.classList.add('hidden');
      if (errorMessage) errorMessage.classList.add('hidden');
      
      submitBtn.innerHTML = '<span>Enviar Mensaje</span><i class="fas fa-paper-plane ml-2"></i>';
      submitBtn.disabled = false;
    }

    function showFormMessage(type) {
      contactForm.style.display = 'none';
      
      if (type === 'success' && successMessage) {
        successMessage.classList.remove('hidden');
        if (errorMessage) errorMessage.classList.add('hidden');
      } else if (type === 'error' && errorMessage) {
        errorMessage.classList.remove('hidden');
        if (successMessage) successMessage.classList.add('hidden');
      }
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
     Efectos de scroll suave
     ===================== */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
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
     Animaciones de entrada
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
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  /* =====================
     Inicialización de todos los módulos
     ===================== */
  function init() {
    initMobileMenu();
    initFAQSystem();
    initContactCards();
    initContactForm();
    initSmoothScroll();
    initAnimations();

    // Ajustar altura del hero
    setTimeout(() => {
      const hero = document.getElementById('contact-hero');
      if (hero && header) {
        const headerHeight = header.offsetHeight;
        hero.style.paddingTop = `${headerHeight}px`;
        hero.style.minHeight = `calc(90vh - ${headerHeight}px)`;
      }
    }, 100);

    // Ajuste en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const hero = document.getElementById('contact-hero');
        if (hero && header) {
          const headerHeight = header.offsetHeight;
          hero.style.paddingTop = `${headerHeight}px`;
          hero.style.minHeight = `calc(90vh - ${headerHeight}px)`;
        }
      }, 250);
    });
  }

  // Iniciar la aplicación
  init();

  // Precargar imágenes críticas para contacto
  function preloadContactImages() {
    const criticalImages = [
      'imagenes/Logo-removebg-preview.png',
      'imagenes/imagen3.jpg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadContactImages();
});
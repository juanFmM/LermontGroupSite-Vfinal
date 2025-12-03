// js/index.js - Versión moderna con EmailJS integrado - HEADER SIEMPRE VISIBLE
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
     HEADER & MENÚ MÓVIL - SIMPLIFICADO
     ===================== */
  const header = $('header');
  const btnMenu = $('#btn-menu');
  const mainNav = $('#main-nav');

  function initHeader() {
    if (!header) return;

    // HEADER SIEMPRE VISIBLE - Eliminar lógica de cambio de tema
    // Forzar tema claro permanentemente
    header.classList.remove('header--transparent', 'header--dark');
    header.classList.add('header--light');
    
    // Aplicar backdrop-filter para el efecto glass
    header.style.backdropFilter = 'blur(20px) saturate(180%)';
  }

  /* =====================
   MENÚ MÓVIL CORREGIDO - VERSIÓN SIMPLIFICADA
   ===================== */
  function initMobileMenu() {
    const btnMenu = document.getElementById('btn-menu');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;
    
    if (!btnMenu || !mainNav) {
      console.error('Elementos del menú móvil no encontrados');
      return;
    }
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Estado del menú
    let isMenuOpen = false;
    
    // Función para abrir el menú
    function openMobileMenu() {
      btnMenu.classList.add('active');
      mainNav.classList.add('mobile-open');
      overlay.classList.add('active');
      body.classList.add('no-scroll');
      isMenuOpen = true;
      btnMenu.setAttribute('aria-expanded', 'true');
    }
    
    // Función para cerrar el menú
    function closeMobileMenu() {
      btnMenu.classList.remove('active');
      mainNav.classList.remove('mobile-open');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
      isMenuOpen = false;
      btnMenu.setAttribute('aria-expanded', 'false');
    }
    
    // Toggle del menú
    btnMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#main-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
    
    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', () => {
      closeMobileMenu();
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
      }
    });
    
    // Asegurar que el menú esté cerrado al inicio
    closeMobileMenu();
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
            entry.target.style.transitionDelay = `${index * 0.15}s`;
          }
          
          // Efectos especiales para diferentes secciones
          if (entry.target.classList.contains('card')) {
            setTimeout(() => {
              entry.target.style.transform = 'translateY(0)';
            }, 300);
          }
        }
      });
    }, observerOptions);

    // Observar todos los elementos animables
    $$('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    // Observar también las secciones principales
    $$('section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.8s ease-out';
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      sectionObserver.observe(section);
    });
  }

  /* =====================
     CARRUSEL DE LOGOS INFINITO
     ===================== */
  function initClientsCarousel() {
    const track = $('#clients-carousel-track');
    if (!track) return;
    
    // Pausar animación al hacer hover
    track.addEventListener('mouseenter', () => {
      track.classList.add('paused');
    });
    
    track.addEventListener('mouseleave', () => {
      track.classList.remove('paused');
    });
    
    // Duplicar automáticamente los logos para efecto infinito
    const logos = $$('.client-logo', track);
    if (logos.length > 0) {
      // Si no están duplicados, los duplicamos
      if (logos.length < 48) { // 24 logos originales * 2
        const originalLogos = track.innerHTML;
        track.innerHTML += originalLogos;
      }
    }
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
     FORMULARIO con EmailJS
     ===================== */
  function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;

    // Inicializar EmailJS con tu Public Key
    (function() {
      emailjs.init("GsVquOipa6B3jZpj8");
    })();

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
        // Preparar datos para EmailJS
        const formData = {
          nombre: $('#nombre').value,
          email: $('#email').value,
          servicio: $('#servicio').value,
          mensaje: $('#mensaje').value,
          fecha: new Date().toLocaleString('es-ES')
        };

        // Enviar con EmailJS
        await emailjs.send(
          'service_dz866kp',
          'template_wsd5nkp',
          formData
        );
        
        showMessage('success', '¡Mensaje enviado correctamente! Te contactaremos pronto.');
        contactForm.reset();
        
        // Resetear estilos de campos
        inputs.forEach(input => {
          input.parentElement.classList.remove('focused');
          input.style.borderColor = '';
        });
        
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        showMessage('error', 'Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.');
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
     Efecto de escritura opcional
     ===================== */
  function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Guardar el texto original
    const originalText = heroTitle.textContent;
    
    // Solo ejecutar en pantallas grandes para evitar problemas en móviles
    if (window.innerWidth < 768) return;
    
    // Limpiar el texto
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Iniciar después de un breve retraso
    setTimeout(typeWriter, 1000);
  }

  /* =====================
     Inicialización de todos los módulos
     ===================== */
  function init() {
    createParticles();
    createScrollProgress();
    createInteractiveCursor();
    initHeader(); // Header siempre visible
    initMobileMenu();
    initAnimations();
    initClientsCarousel();
    initCarousel();
    initContactForm();
    initSmoothScroll();
    initTypewriterEffect(); // Efecto de escritura

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
  const footerSections = document.querySelectorAll('.footer-section');
  const footer = document.querySelector('footer');
  
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
  const contactItems = document.querySelectorAll('.footer-section address p');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });

  // Efectos para el formulario de newsletter
  const newsletterInputs = document.querySelectorAll('.newsletter-form input');
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
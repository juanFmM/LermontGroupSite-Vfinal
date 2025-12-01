// js/proyectos.js - Versión moderna con header blanco permanente
document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Helpers modernos
     ===================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =====================
     Sistema de partículas para el hero de proyectos
     ===================== */
  function createParticles() {
    const hero = $('#proyectos-hero');
    if (!hero) return;

    const particlesContainer = $('.particles-container');
    if (!particlesContainer) return;

    // Limpiar partículas existentes
    particlesContainer.innerHTML = '';

    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 4 + 4;
      const blur = Math.random() * 4 + 2;
      
      // Tipos de partículas (círculos, cuadrados, triángulos)
      const types = ['circle', 'square', 'triangle'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      particle.style.filter = `blur(${blur}px)`;
      
      // Colores aleatorios dentro de la paleta
      const colors = [
        'rgba(107, 170, 249, 0.6)',  // primary-glow
        'rgba(255, 255, 255, 0.8)',  // white
        'rgba(67, 76, 136, 0.4)',    // primary
      ];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Formas diferentes
      if (type === 'circle') {
        particle.style.borderRadius = '50%';
      } else if (type === 'triangle') {
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.borderLeft = `${size/2}px solid transparent`;
        particle.style.borderRight = `${size/2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
        particle.style.background = 'none';
      }
      
      // Animación personalizada
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      
      particlesContainer.appendChild(particle);
    }

    // Añadir partículas interactivas
    hero.addEventListener('mousemove', (e) => {
      const particles = $$('.particle');
      particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.style.transform = `translate(${x * force * 0.1}px, ${y * force * 0.1}px)`;
        }
      });
    });
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
    const interactiveElements = $$('a, button, .card, .cta-button, .project-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });

    // Ocultar cursor en dispositivos táctiles
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
    }
  }

  /* =====================
     HEADER & MENÚ MÓVIL - Fondo blanco permanente
     ===================== */
  const header = $('header');
  const btnMenu = $('#btn-menu');
  const mainNav = $('#main-nav');

  function initHeader() {
    if (!header) return;

    // Aplicar estilo permanente de fondo blanco
    header.classList.remove('header--dark', 'header--transparent');
    header.classList.add('header--light');
    
    // Mejorar el efecto glassmorphism
    header.style.backdropFilter = 'blur(20px) saturate(180%)';
  }

  /* =====================
     NUEVA FUNCIÓN DE MENÚ MÓVIL (igual que en services.js)
     ===================== */
  function initMobileMenu() {
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!btnMenu || !mobileMenu) {
      console.error('Elementos del menú móvil no encontrados');
      return;
    }
  
    // FORZAR CIERRE AL INICIO
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
     DATOS COMPLETOS DE PROYECTOS
     ===================== */
  const projectsData = {
    'planta-tratamiento': {
      image: 'imagenes 2.0/PALACIO PRESIDENCIAL - 2023 - SD/PALACIO PRESIDENCIAL - 2023 - SD/LISTA 11.jpeg.jpg',
      title: 'PALACIO DE BELLAS ARTES - 2023 - SD',
      description: `
      <p class="mb-3">Instalación de dos chiller enfriado por aire de 182 T con su sistema de bombeo y controles</p>
      <h2><strong>Objetivo del proyecto</strong></h2>
      <p class="mb-3">Implementar un sistema de climatización eficiente y confiable mediante la instalación de dos chillers enfriados por aire, con el fin de mejorar la capacidad de enfriamiento, optimizar el consumo energético y asegurar el confort térmico en las instalaciones.</p>
      <h2><strong>Descripción:</strong></h2>
      <p class="mb-3">Este proyecto contempló la instalación de dos unidades de chiller enfriados por aire, cada uno con una capacidad de 182 toneladas de refrigeración (TR), así como la integración de sus respectivos sistemas de bombeo y control.</p>
      `,
      features: [
        'Sistema de tratamiento biológico avanzado',
        'Plantas de filtrado y clarificación',
        'Sistema de monitoreo continuo de calidad',
        'Cumplimiento normativo ambiental',
        'Control automático de procesos'
      ],
      tags: ['Tratamiento de Aguas', 'Infraestructura', 'Medio Ambiente']
    },
    'remozamiento-oficina': {
      image: 'imagenes 2.0/PROYECTO HOTEL JARAGUA - 2024 - SD/ISAJE (3).jpg',
      title: 'PROYECTO HOTEL JARAGUA - 2024 - SD',
      description: `
        <p class="mb-3">Instalación de un chiller y torre de enfriamiento enfriado por agua de 250 T con su sistema de bombeo y controles </p>
        <h2><strong>Objetivo del proyecto</strong></h2>
        <p class="mb-3">Modernizar el sistema de climatización mediante la instalación de un chiller enfriado por agua de 250 TR en conjunto con una torre de enfriamiento, buscando mejorar el rendimiento térmico, reducir el consumo energético y garantizar un control más eficiente de las condiciones ambientales en la instalación.</p>
        <h2><strong>Descripción:</strong></h2>
        <p class="mb-3">Este proyecto incluyó la instalación de un sistema completo de enfriamiento centralizado, compuesto por un chiller enfriado por agua de 250 toneladas de refrigeración (TR) y una torre de enfriamiento, junto con sus sistemas de bombeo y controles automatizados.</p>
      `,
      features: [
        'Diseño de interiores moderno',
        'Sistemas eléctricos actualizados',
        'Optimización de espacios',
        'Instalación de mobiliario ergonómico',
        'Sistemas de iluminación eficiente'
      ],
      tags: ['Remodelación', 'Instalacion', 'chiller']
    },
    'pavimentacion': {
      image: 'imagenes 2.0/PALACIO PRESIDENCIAL - 2023 - SD/PALACIO PRESIDENCIAL - 2023 - SD/LISTO DESMONTE EXISTENTE 2 (1).jpg',
      title: 'PALACIO PRESIDENCIAL - 2023 - SD',
      description: `
      <p class="mb-3">-	Instalacion de 2 Mini Chiller de 5T</p>
      <h2><strong>Objetivo del proyecto</strong></h2>
      <p lass="mb-3> Mejorar el sistema de climatización de áreas específicas mediante la instalación de dos mini chillers de 5 toneladas de refrigeración (TR) cada uno, con el objetivo de proporcionar un control térmico más eficiente, localizado y de bajo consumo energético.</p>
      <h2><strong>Descripción:</strong></h2>
      <p class="mb-3">El proyecto comprendió la instalación de dos unidades mini chiller enfriadas por aire, cada una con una capacidad de 5 TR, orientadas a climatizar zonas de menor demanda térmica o con requerimientos independientes del sistema central.</p>
      `,
      features: [
        'Pavimento asfáltico de alta resistencia',
        'Sistemas de drenaje eficientes',
        'Señalización vial completa',
        'Iluminación LED para áreas de parqueo',
        'Accesibilidad universal garantizada'
      ],
      tags: ['Pavimentación', 'Infraestructura Urbana', 'Parqueos']
    },
    'iluminacion': {
      image: 'imagenes 2.0/INSTALACIÓN DE CHILLER PGR - 2025 - SD/CHILLER INSTALADO (6).jpg',
      title: 'INSTALACIÓN DE CHILLER PGR - 2025 - SD',
      description: `
      <p class="mb-3">-	Instalación de un chiller enfriado por aire 170T </p>
      <h2><strong>Objetivo del proyecto</strong></h2>
      <p lass="mb-3> Reforzar la capacidad del sistema de climatización mediante la incorporación de un chiller enfriado por aire de 170 toneladas de refrigeración (TR), con el fin de mejorar la eficiencia energética, garantizar el confort térmico y asegurar una operación continua y confiable.</p>
      <h2><strong>Descripción:</strong></h2>
      <p class="mb-3">El proyecto consistió en la instalación de un chiller enfriado por aire con una capacidad de 170 TR, diseñado para atender la demanda térmica de las instalaciones con un sistema más eficiente y de menor mantenimiento en comparación con otras tecnologías.</p>
      `,
      features: [
        'Tecnología LED de alta eficiencia',
        'Sistemas de control inteligente',
        'Reducción del 60% en consumo energético',
        'Mayor seguridad vial nocturna',
        'Mantenimiento predictivo'
      ],
      tags: ['Iluminación', 'Eficiencia Energética', 'Infraestructura']
    }
  };

  /* =====================
     SISTEMA DE MODAL PARA PROYECTOS
     ===================== */
  function initProjectModals() {
    const modal = $('#projectModal');
    const modalImage = $('#modalImage');
    const modalTitle = $('#modalTitle');
    const modalDescription = $('#modalDescription');
    const modalFeatures = $('#modalFeatures');
    const modalTags = $('#modalTags');
    const closeModal = $('#closeModal');
    
    if (!modal) return;
    
    // Abrir modal al hacer clic en cualquier tarjeta de proyecto
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectsData[projectId];
        
        if (project) {
          modalImage.src = project.image;
          modalImage.alt = project.title;
          modalTitle.textContent = project.title;
          modalDescription.innerHTML = project.description;
          
          // Limpiar y llenar características (máximo 5)
          modalFeatures.innerHTML = '';
          project.features.slice(0, 5).forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
          });
          
          // Limpiar y llenar tags (máximo 3)
          modalTags.innerHTML = '';
          project.tags.slice(0, 3).forEach(tag => {
            const span = document.createElement('span');
            span.className = 'bg-primary text-white px-2 py-1 rounded-full text-xs mr-1 mb-1';
            span.textContent = tag;
            modalTags.appendChild(span);
          });
          
          // Mostrar modal
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          document.body.style.overflow = 'hidden';
          
          // Scroll al principio del modal
          modal.scrollTop = 0;
        }
      });
    });
    
    // Cerrar modal
    function closeModalFunc() {
      modal.classList.remove('flex');
      modal.classList.remove('modal-visible');
      document.body.style.overflow = '';
      
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    }
    
    closeModal?.addEventListener('click', closeModalFunc);
    
    // Cerrar modal al hacer clic fuera o presionar ESC
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModalFunc();
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('flex')) {
        closeModalFunc();
      }
    });
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
     Efectos específicos para cards de proyectos
     ===================== */
  function initProjectCards() {
    const cards = $$('.project-card');
    
    cards.forEach(card => {
      // Efecto de tilt en mousemove
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  /* =====================
     Inicialización de todos los módulos para proyectos
     ===================== */
    function init() {
    createParticles();
    createScrollProgress();
    createInteractiveCursor();
    initHeader();
    initMobileMenu(); // Usar la nueva función
    initAnimations();
    initProjectModals();
    initSmoothScroll();
    initProjectCards();

    // Ajuste simple de altura - sin cálculos complejos
    setTimeout(() => {
      const hero = $('#proyectos-hero');
      const header = $('header');
      
      if (hero && header) {
        const headerHeight = header.offsetHeight;
        hero.style.paddingTop = `${headerHeight}px`;
        hero.style.minHeight = `calc(90vh - ${headerHeight}px)`;
      }
    }, 100);

    // Ajustar en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const hero = $('#proyectos-hero');
        const header = $('header');
        
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

  /* =====================
     Efectos de performance
     ===================== */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const hero = $('#proyectos-hero');
      if (hero) {
        hero.style.minHeight = `calc(100vh - ${header?.offsetHeight || 0}px)`;
      }
    }, 250);
  });

  // Precargar imágenes críticas para proyectos
  function preloadCriticalImages() {
    const criticalImages = [
      'imagenes/Logo-removebg-preview.png',
      'imagenes 2.0/INSTALACIÓN DE CHILLER PGR - 2025 - SD/DESMONTE CHILLER VIEJO (2).jpg',
      'imagenes/lermont_page30_img2.jpeg',
      'imagenes/lermont_page33_img1.jpeg',
      'imagenes/lermont_page35_img2.jpeg',
      'imagenes/lermont_page44_img1.jpeg',
      'imagenes/lermont_page8_img3.jpeg',
      'imagenes/lermont_page48_img1.jpeg',
      'imagenes/lermont_page49_img2.jpeg',
      'imagenes/lermont_page51_img2.jpeg',
      'imagenes/lermont_page16_img1.jpeg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadCriticalImages();
});

/* =====================
   Animaciones del Footer para proyectos
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

// Exportar funciones globales si es necesario
window.addProjectCard = function(projectData) {
  const grid = document.querySelector('#galeria-proyectos .grid');
  if (!grid) return;

  const card = document.createElement('div');
  card.className = 'project-card card group';
  card.setAttribute('data-project', projectData.id);
  card.setAttribute('data-animate', '');
  card.innerHTML = `
    <div class="relative overflow-hidden rounded-xl mb-4">
      <img src="${projectData.image}" alt="${projectData.title}" class="w-full h-48 object-cover project-image transition-transform duration-500 group-hover:scale-110">
      <div class="image-overlay absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div class="text-white text-center p-4">
          <i class="fas fa-search-plus text-3xl mb-2"></i>
          <h3 class="text-xl font-bold mb-2">${projectData.shortTitle}</h3>
          <p class="text-sm">Ver detalles completos</p>
        </div>
      </div>
    </div>
    <div class="project-content">
      <h3 class="text-xl font-bold text-primary mb-2">${projectData.title}</h3>
      <p class="text-gray-600 text-sm">${projectData.subtitle}</p>
    </div>
  `;
  
  grid.appendChild(card);
};
// Interacciones para la sección CTA
function initCTAEffects() {
  const ctaButtons = document.querySelectorAll('.cta-premium-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleY = (x - centerX) / 20;
      const angleX = (centerY - y) / 20;
      
      button.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // Efecto de conteo para estadísticas (si las añades con números reales)
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + '+';
    }, 16);
  });
}

// Llamar la función después de que se cargue el DOM
document.addEventListener('DOMContentLoaded', initCTAEffects);
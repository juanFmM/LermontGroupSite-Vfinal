// js/proyectos.js - Versión moderna con todas las funcionalidades del index
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

    for (let i = 0; i < 12; i++) {
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
     HEADER & MENÚ MÓVIL mejorado
     ===================== */
  const header = $('header');
  const btnMenu = $('#btn-menu');
  const mainNav = $('#main-nav');

  function initHeader() {
    if (!header) return;

    // Sistema de temas mejorado para proyectos
    function updateHeaderTheme() {
      const scrollY = window.scrollY;
      const heroHeight = $('#proyectos-hero')?.offsetHeight || 600;
      
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
     DATOS COMPLETOS DE PROYECTOS
     ===================== */
  const projectsData = {
    'planta-tratamiento': {
      image: 'imagenes/lermont_page30_img2.jpeg',
      title: 'CONSTRUCCIÓN PLANTA DE TRATAMIENTO AGUAS RESIDUALES - BONAO',
      description: `
        <p class="mb-3">Proyecto integral de construcción de planta de tratamiento de aguas residuales en Bonao, diseñado para procesar eficientemente los desechos líquidos de la comunidad.</p>
        <p class="mb-3">La obra fue terminada con estricto control de calidad y cumplimiento total de las normativas locales ambientales y de construcción.</p>
        <p><strong>Ubicación:</strong> Bonao, República Dominicana</p>
        <p><strong>Duración:</strong> 12 meses</p>
        <p><strong>Capacidad:</strong> 500 m³/día</p>
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
      image: 'imagenes/lermont_page33_img1.jpeg',
      title: 'REMOZAMIENTO OFICINA - COOPERATIVA SAN JOSÉ',
      description: `
        <p class="mb-3">Remodelación completa de las oficinas principales de la Cooperativa San José, transformando espacios obsoletos en áreas de trabajo modernas y funcionales.</p>
        <p class="mb-3">El proyecto incluyó diseño de interiores, instalación de sistemas eléctricos modernos y optimización del flujo de trabajo para mejorar la productividad del personal.</p>
        <p><strong>Ubicación:</strong> Santo Domingo</p>
        <p><strong>Duración:</strong> 3 meses</p>
        <p><strong>Área:</strong> 450 m²</p>
      `,
      features: [
        'Diseño de interiores moderno',
        'Sistemas eléctricos actualizados',
        'Optimización de espacios',
        'Instalación de mobiliario ergonómico',
        'Sistemas de iluminación eficiente'
      ],
      tags: ['Remodelación', 'Oficinas', 'Diseño Interior']
    },
    'pavimentacion': {
      image: 'imagenes/lermont_page35_img2.jpeg',
      title: 'PAVIMENTACIÓN Y PARQUEOS - PROYECTO URBANO',
      description: `
        <p class="mb-3">Proyecto integral de pavimentación y construcción de áreas de parqueo utilizando materiales de alta durabilidad y técnicas de drenaje avanzadas.</p>
        <p class="mb-3">El diseño incluyó consideraciones especiales para drenaje pluvial y accesibilidad universal, garantizando la longevidad de las superficies en condiciones climáticas variables.</p>
        <p><strong>Ubicación:</strong> Zona Metropolitana</p>
        <p><strong>Duración:</strong> 6 meses</p>
        <p><strong>Área pavimentada:</strong> 8,000 m²</p>
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
      image: 'imagenes/lermont_page44_img1.jpeg',
      title: 'ILUMINACIÓN AV. WINSTON CHURCHILL',
      description: `
        <p class="mb-3">Instalación de sistema de iluminación moderna en la Avenida Winston Churchill utilizando tecnología LED de alta eficiencia energética.</p>
        <p class="mb-3">El proyecto incluyó sistemas de control inteligente para optimizar el consumo eléctrico y mejorar la seguridad vial durante las horas nocturnas.</p>
        <p><strong>Ubicación:</strong> Av. Winston Churchill, Santo Domingo</p>
        <p><strong>Duración:</strong> 4 meses</p>
        <p><strong>Luminarias instaladas:</strong> 120 unidades</p>
      `,
      features: [
        'Tecnología LED de alta eficiencia',
        'Sistemas de control inteligente',
        'Reducción del 60% en consumo energético',
        'Mayor seguridad vial nocturna',
        'Mantenimiento predictivo'
      ],
      tags: ['Iluminación', 'Eficiencia Energética', 'Infraestructura']
    },
    'chiller': {
      image: 'imagenes/lermont_page8_img3.jpeg',
      title: 'INSTALACIÓN CHILLER DE AGUA HELADA - PALACIO DE BELLAS ARTES',
      description: `
        <p class="mb-3">Sistema de climatización del Palacio de Bellas Artes mediante chiller de agua helada de 182.7 toneladas de capacidad.</p>
        <p class="mb-3">Este sistema de alta eficiencia garantiza condiciones climáticas óptimas para la preservación de obras de arte y comodidad de visitantes, manteniendo temperatura y humedad controladas.</p>
        <p><strong>Ubicación:</strong> Palacio de Bellas Artes</p>
        <p><strong>Duración:</strong> 5 meses</p>
        <p><strong>Capacidad:</strong> 182.7 toneladas</p>
      `,
      features: [
        'Chiller de agua helada de alta eficiencia',
        'Control de temperatura y humedad preciso',
        'Sistema silencioso para ambiente cultural',
        'Mantenimiento preventivo programado',
        'Monitoreo remoto 24/7'
      ],
      tags: ['Climatización', 'HVAC', 'Eficiencia Energética']
    },
    'transformador': {
      image: 'imagenes/lermont_page48_img1.jpeg',
      title: 'TRANSFORMADOR 1000KVA - ESTACIÓN T3 SABANA PERDIDA',
      description: `
        <p class="mb-3">Instalación de transformador de 1000KVA e ITM en la estación T3 de Sabana Perdida para mejorar la capacidad de distribución eléctrica de la zona.</p>
        <p class="mb-3">El proyecto requirió planificación detallada y coordinación con las autoridades eléctricas para garantizar la continuidad del servicio durante la instalación.</p>
        <p><strong>Ubicación:</strong> Estación T3, Sabana Perdida</p>
        <p><strong>Duración:</strong> 2 meses</p>
        <p><strong>Capacidad:</strong> 1000 KVA</p>
      `,
      features: [
        'Transformador de 1000KVA de capacidad',
        'Sistemas de protección ITM',
        'Coordinación con autoridades eléctricas',
        'Pruebas de carga completas',
        'Documentación técnica completa'
      ],
      tags: ['Eléctrico', 'Subestación', 'Infraestructura']
    },
    'cables': {
      image: 'imagenes/lermont_page49_img2.jpeg',
      title: 'INSTALACIÓN DE CABLES - ESTACIÓN 21 METRO DE SANTO DOMINGO',
      description: `
        <p class="mb-3">Instalación de sistema de cableado especializado en la Estación 21 del Metro de Santo Domingo para garantizar la seguridad y eficiencia del sistema de transporte.</p>
        <p class="mb-3">El proyecto incluyó la implementación de cables de alta capacidad y sistemas de protección avanzados para operaciones críticas.</p>
        <p><strong>Ubicación:</strong> Estación 21, Metro de Santo Domingo</p>
        <p><strong>Duración:</strong> 3 meses</p>
        <p><strong>Cableado:</strong> 5,000 metros lineales</p>
      `,
      features: [
        'Cables de alta capacidad instalados',
        'Sistemas de protección avanzados',
        'Cumplimiento normas de seguridad',
        'Documentación as-built completa',
        'Pruebas de funcionamiento'
      ],
      tags: ['Cableado', 'Metro', 'Infraestructura']
    },
    'generadores': {
      image: 'imagenes/lermont_page51_img2.jpeg',
      title: 'INSTALACIÓN DE GENERADORES ELÉCTRICOS - SISTEMA DE RESPALDO',
      description: `
        <p class="mb-3">Instalación completa de generadores eléctricos y sistemas de mantenimiento para garantizar energía de respaldo en instalaciones críticas.</p>
        <p class="mb-3">Los sistemas incluyen transferencia automática y monitoreo continuo para operación sin interrupciones durante cortes de energía.</p>
        <p><strong>Ubicación:</strong> Múltiples ubicaciones</p>
        <p><strong>Duración:</strong> Variable por proyecto</p>
        <p><strong>Capacidad:</strong> Hasta 500 KVA</p>
      `,
      features: [
        'Generadores de diversas capacidades',
        'Sistemas de transferencia automática',
        'Monitoreo continuo 24/7',
        'Mantenimiento preventivo programado',
        'Pruebas periódicas de funcionamiento'
      ],
      tags: ['Generadores', 'Energía', 'Respaldo']
    },
    'vrf': {
      image: 'imagenes/lermont_page16_img1.jpeg',
      title: 'SISTEMA VRF - MINISTERIO ADMINISTRATIVO DE LA PRESIDENCIA (MAPRE)',
      description: `
        <p class="mb-3">Instalación de sistema VRF de 20 toneladas para la recepción del Ministerio Administrativo de la Presidencia (MAPRE).</p>
        <p class="mb-3">Este sistema de climatización variable permite un control independiente de temperatura en diferentes zonas del edificio, optimizando el confort y el consumo energético.</p>
        <p><strong>Ubicación:</strong> MAPRE, Santo Domingo</p>
        <p><strong>Duración:</strong> 4 meses</p>
        <p><strong>Capacidad:</strong> 20 toneladas</p>
      `,
      features: [
        'Sistema VRF de 20 toneladas',
        'Control zonal independiente',
        'Alta eficiencia energética',
        'Operación silenciosa',
        'Mantenimiento predictivo'
      ],
      tags: ['VRF', 'Climatización', 'Eficiencia Energética']
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
    initMobileMenu();
    initAnimations();
    initProjectModals();
    initSmoothScroll();
    initProjectCards();

    // Ajustar altura del hero
    setTimeout(() => {
      const hero = $('#proyectos-hero');
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
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para toggle del menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Event listener para el hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Smooth scrolling para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Resaltar enlace activo en la navegación
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Animaciones de scroll
    function handleScrollAnimations() {
        const cards = document.querySelectorAll('.intro-card, .activity-card, .analysis-card, .phase-card, .reflection-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            // Si la tarjeta está visible en el viewport
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animaciones
    function initializeAnimations() {
        const cards = document.querySelectorAll('.intro-card, .activity-card, .analysis-card, .phase-card, .reflection-card');
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        handleScrollAnimations();
        
        // Agregar/quitar clase al navbar en scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Funcionalidad para agregar nuevas actividades dinámicamente
    function addNewActivity() {
        const activitiesGrid = document.querySelector('.activities-grid');
        const activityCount = activitiesGrid.children.length + 1;
        
        const newActivityHTML = `
            <div class="activity-card">
                <h3>Actividad ${activityCount}</h3>
                <div class="activity-content">
                    <p><strong>Descripción:</strong> Describe brevemente la actividad realizada.</p>
                    
                    <div class="evaluation">
                        <h4>Mi Evaluación:</h4>
                        <div class="eval-section">
                            <h5>Puntos Positivos:</h5>
                            <ul>
                                <li>Agrega tus puntos positivos aquí</li>
                            </ul>
                        </div>
                        
                        <div class="eval-section">
                            <h5>Puntos Negativos/Desafíos:</h5>
                            <ul>
                                <li>Agrega los desafíos aquí</li>
                            </ul>
                        </div>
                        
                        <div class="eval-section">
                            <h5>Vinculación B-Learning:</h5>
                            <p>Tu análisis del B-Learning aquí.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        activitiesGrid.insertAdjacentHTML('beforeend', newActivityHTML);
    }
    
    // Funcionalidad para agregar nuevas fases del proyecto
    function addNewProjectPhase() {
        const projectPhases = document.querySelector('.project-phases');
        const phaseCount = projectPhases.children.length;
        
        const newPhaseHTML = `
            <div class="phase-card">
                <h4>Fase ${phaseCount}</h4>
                <div class="phase-content">
                    <p><strong>Descripción:</strong> Describe esta fase del proyecto.</p>
                    <p><strong>Objetivos:</strong> ¿Qué buscas lograr en esta fase?</p>
                    <p><strong>Avances:</strong> ¿Qué has desarrollado hasta ahora?</p>
                </div>
            </div>
        `;
        
        // Insertar antes de la carta de "Próximas Fases"
        const upcomingPhase = document.querySelector('.phase-card.upcoming');
        if (upcomingPhase) {
            upcomingPhase.insertAdjacentHTML('beforebegin', newPhaseHTML);
        } else {
            projectPhases.insertAdjacentHTML('beforeend', newPhaseHTML);
        }
    }
    
    // Funcionalidad para mostrar/ocultar contenido expandible
    function toggleExpandableContent(element) {
        const content = element.nextElementSibling;
        const isExpanded = content.style.display === 'block';
        
        if (isExpanded) {
            content.style.display = 'none';
            element.textContent = element.textContent.replace('▼', '▶');
        } else {
            content.style.display = 'block';
            element.textContent = element.textContent.replace('▶', '▼');
        }
    }
    
    // Función para guardar progreso en localStorage (opcional)
    function saveProgress() {
        const progressData = {
            lastUpdated: new Date().toISOString(),
            sections: {
                inicio: document.querySelector('#inicio').innerHTML,
                actividades: document.querySelector('#actividades').innerHTML,
                prueba: document.querySelector('#prueba').innerHTML,
                proyecto: document.querySelector('#proyecto').innerHTML,
                reflexion: document.querySelector('#reflexion').innerHTML
            }
        };
        
        // Nota: localStorage no está disponible en el entorno de Claude
        // Esta función es solo para referencia si decides usar el código en tu propio entorno
        try {
            localStorage.setItem('portfolioProgress', JSON.stringify(progressData));
            console.log('Progreso guardado exitosamente');
        } catch (error) {
            console.log('No se pudo guardar el progreso:', error);
        }
    }
    
    // Función para cargar progreso desde localStorage (opcional)
    function loadProgress() {
        try {
            const savedProgress = localStorage.getItem('portfolioProgress');
            if (savedProgress) {
                const progressData = JSON.parse(savedProgress);
                console.log('Progreso cargado desde:', progressData.lastUpdated);
                // Aquí podrías restaurar el contenido guardado si lo deseas
            }
        } catch (error) {
            console.log('No se pudo cargar el progreso:', error);
        }
    }
    
    // Funcionalidad para imprimir o exportar el portafolio
    function printPortfolio() {
        // Crear una nueva ventana para impresión
        const printWindow = window.open('', '_blank');
        const portfolioContent = document.documentElement.outerHTML;
        
        printWindow.document.write(portfolioContent);
        printWindow.document.close();
        
        // Agregar estilos específicos para impresión
        const printStyles = `
            <style>
                @media print {
                    .navbar, .hamburger { display: none !important; }
                    .section { page-break-inside: avoid; margin-bottom: 2rem; }
                    body { font-size: 12pt; line-height: 1.4; }
                    .intro-card, .activity-card, .analysis-card, .phase-card, .reflection-card {
                        break-inside: avoid;
                        margin-bottom: 1rem;
                    }
                }
            </style>
        `;
        
        printWindow.document.head.insertAdjacentHTML('beforeend', printStyles);
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 1000);
    }
    
    // Funcionalidad para validar formularios (si agregas campos editables)
    function validateForm(formElement) {
        const requiredFields = formElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar y remover notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Función para agregar tooltips informativos
    function addTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.custom-tooltip');
                if (tooltip) {
                    document.body.removeChild(tooltip);
                }
            });
        });
    }
    
    // Inicializar funcionalidades
    initializeAnimations();
    handleScrollAnimations();
    addTooltips();
    
    // Ejecutar animaciones iniciales después de un breve retraso
    setTimeout(() => {
        handleScrollAnimations();
    }, 500);
    
    // Hacer funciones disponibles globalmente para uso posterior
    window.portfolioFunctions = {
        addNewActivity,
        addNewProjectPhase,
        saveProgress,
        loadProgress,
        printPortfolio,
        showNotification
    };
    
    console.log('Portafolio cargado exitosamente. Funciones disponibles en window.portfolioFunctions');
});
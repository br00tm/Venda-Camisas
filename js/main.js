// Script personalizado para o site institucional

// Função executada quando o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Ativa os tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Efeito de scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de animação para elementos ao aparecerem na viewport
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        // Função para verificar se um elemento está visível na viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Função para animar elementos quando aparecem na tela
        function animateElementsOnScroll() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Executar no carregamento e no scroll
        animateElementsOnScroll();
        window.addEventListener('scroll', animateElementsOnScroll);
    }
    
    // Contador para números na seção "Nossos Números"
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // duração da animação em ms
            const step = Math.ceil(target / (duration / 16)); // 60 fps
            
            function updateCount() {
                const count = parseInt(counter.innerText.replace('+', ''));
                if (count < target) {
                    counter.innerText = Math.min(count + step, target) + (counter.getAttribute('data-suffix') || '');
                    setTimeout(updateCount, 16);
                }
            }
            
            // Iniciar contagem quando o elemento estiver visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Paralax para banners de cabeçalho
    const parallaxContainers = document.querySelectorAll('.parallax-bg');
    
    if (parallaxContainers.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxContainers.forEach(container => {
                const scrollPosition = window.pageYOffset;
                container.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        });
    }
    
    // Destaque para o item ativo no menu de navegação
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.navbar-nav .nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').includes(current)) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    setActiveNavItem();
    
    // Efeito para botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}); 
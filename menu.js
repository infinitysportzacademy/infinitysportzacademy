document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const navMenu = document.getElementById('dynamicNavMenu');
            data.menuItems.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                const a = document.createElement('a');
                a.href = item.link;
                a.textContent = item.name;

                // Handle in-page navigation with smooth scroll
                if (item.link.startsWith("#")) {
                    a.addEventListener('click', function(event) {
                        event.preventDefault();
                        const targetElement = document.querySelector(item.link);
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                }
                li.appendChild(a);
                navMenu.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading the menu:', error));
});


// Update your menu.js file with this code
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if it doesn't exist
    const header = document.querySelector('.header');
    let menuToggle = header.querySelector('.menu-toggle');
    
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.innerHTML = '☰';
        header.appendChild(menuToggle);
    }

    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle menu function
    function toggleMenu() {
        const isOpen = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = isOpen ? '☰' : '✕';
        
        // Add overflow hidden to body when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && !e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});
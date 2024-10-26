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

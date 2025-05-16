// Sélectionner tous les liens avec la classe smooth-scroll
const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
        
// Ajouter un gestionnaire d'événement pour chaque lien
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Empêcher le comportement par défaut du lien
        e.preventDefault();
        
        // Récupérer la cible
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Méthode avec durée précise de 1 seconde
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 400; // 1 seconde en millisecondes
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Fonction d'accélération (easing)
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});
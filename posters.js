document.addEventListener('DOMContentLoaded', () => {
            // Sélection des éléments
            const title = document.querySelector('h1');
            const paragraph = document.querySelector('p');
            
            // Animation pour le titre
            setTimeout(() => {
                title.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 500);
            
            // Animation pour le paragraphe (après le titre)
            setTimeout(() => {
                paragraph.style.transition = 'opacity 1s ease, transform 1s ease';
                paragraph.style.opacity = '1';
                paragraph.style.transform = 'translateY(0)';
            }, 1700);
        });
 // Éviter les conflits avec le code existant
 (function() {
    // Variables pour l'animation
    const wordContainer = document.getElementById('changing-word-container');
    const words = document.querySelectorAll('.changing-word');
    let currentIndex = 0;
    
    // Fonction pour s'assurer que les mots ne se chevauchent pas
    function updateWordHeights() {
        const fontSize = parseFloat(window.getComputedStyle(words[0]).fontSize);
        const wordHeight = fontSize * 1.0; // Espace exact basé sur la taille de police
        
        document.querySelector('.word-slot').style.height = `${wordHeight}px`;
        
        words.forEach(word => {
            word.style.height = `${wordHeight}px`;
        });
        
        return wordHeight;
    }
    
    // Fonction pour animer la transition
    function animateNextWord() {
        // Recalculer la hauteur pour s'assurer qu'elle est correcte après tout redimensionnement
        const wordHeight = updateWordHeights();
        
        // Passer au mot suivant
        currentIndex = (currentIndex + 1) % words.length;
        
        // Appliquer la translation avec la hauteur exacte
        wordContainer.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
        
        // Programmer la prochaine animation
        setTimeout(animateNextWord, 2500);
    }
    
    // Fonction pour gérer le redimensionnement
    function handleResize() {
        const wordHeight = updateWordHeights();
        // Réappliquer la translation basée sur l'index actuel avec la nouvelle hauteur
        wordContainer.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
    }
    
    // Initialisation des hauteurs
    updateWordHeights();
    
    // Démarrer l'animation après un délai initial
    setTimeout(animateNextWord, 2500);
    
    // Écouter les événements de redimensionnement
    window.addEventListener('resize', handleResize);
    
    // S'assurer que le premier mot est visible au chargement
    wordContainer.style.transform = 'translateY(0)';
})();
// Script de défilement automatique après 4 secondes
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page chargée, défilement prévu dans 4 secondes...");
    
    // Fonction pour défiler la page
    function scrollPage() {
      // Vous pouvez ajuster ces valeurs selon vos besoins
      const scrollDistance = 500; // Distance de défilement en pixels
      const scrollDuration = 1000; // Durée de l'animation en millisecondes
      
      // Position actuelle
      const startPosition = window.pageYOffset;
      // Position cible
      const targetPosition = startPosition + scrollDistance;
      
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / scrollDuration, 1);
        
        // Fonction d'accélération pour un défilement plus naturel
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeInOutQuad(progress));
        
        if (timeElapsed < scrollDuration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    }
    
    // Déclencher le défilement après 4 secondes
    setTimeout(function() {
      console.log("Défilement automatique activé...");
      scrollPage();
    }, 4000); // 4000 millisecondes = 4 secondes
  });
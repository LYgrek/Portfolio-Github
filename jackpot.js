const targetWord = "LOUYUS";
        
// Lettres pour l'animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Fonction pour obtenir une lettre aléatoire
function getRandomLetter() {
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

// Fonction pour créer les slots
function createSlots() {
    const slotMachine = document.getElementById("slotMachine");
    slotMachine.innerHTML = ""; // Vider le contenu existant
    
    // Créer un conteneur flex pour une meilleure gestion des slots et séparateurs
    const slotContainer = document.createElement("div");
    slotContainer.className = "slot-container";
    slotMachine.appendChild(slotContainer);
    
    for (let i = 0; i < targetWord.length; i++) {
        // Ajouter un slot
        const slot = document.createElement("div");
        slot.className = "slot";
        
        const letterContainer = document.createElement("div");
        letterContainer.className = "letter-container";
        letterContainer.id = `container-${i}`;
        
        // Ajouter des lettres aléatoires + la lettre cible
        const numLetters = 25; // Augmenté pour plus de lettres dans la rotation
        
        for (let j = 0; j < numLetters; j++) {
            const letterDiv = document.createElement("div");
            letterDiv.className = "letter";
            letterDiv.textContent = getRandomLetter();
            letterContainer.appendChild(letterDiv);
        }
        
        // Ajouter la lettre finale (la bonne)
        const finalLetterDiv = document.createElement("div");
        finalLetterDiv.className = "letter final"; // Classe 'final' pour couleur rouge
        finalLetterDiv.textContent = targetWord[i];
        letterContainer.appendChild(finalLetterDiv);
        
        // Ajouter des lettres aléatoires supplémentaires après la lettre cible
        // pour permettre une rotation continue
        for (let j = 0; j < 15; j++) {
            const letterDiv = document.createElement("div");
            letterDiv.className = "letter";
            letterDiv.textContent = getRandomLetter();
            letterContainer.appendChild(letterDiv);
        }
        
        slot.appendChild(letterContainer);
        slotContainer.appendChild(slot);
        
        // Ajouter les séparateurs verticaux (sauf après le dernier slot)
        if (i < targetWord.length - 1) {
            const divider = document.createElement("div");
            divider.className = "slot-divider";
            slotContainer.appendChild(divider);
        }
    }
}

// Fonction pour animer un slot avec un rebond progressif
function animateSlotWithBounce(container, index) {
    const letterElements = container.querySelectorAll(".letter");
    const letterHeight = window.innerWidth * 0.13;
    const targetLetterIndex = 25; // Index de la lettre cible (doit correspondre à numLetters)
    const totalHeight = targetLetterIndex * letterHeight;
    
    // Réinitialiser le style de transition pour une nouvelle animation
    container.style.transition = `top ${0.4 + index * 0.05}s cubic-bezier(0.5, 0, 0.75, 0)`;
    
    // Animation séquentielle avec multiples rebonds
    setTimeout(() => {
        // Phase 1: Descente rapide presque complète
        container.style.top = `-${totalHeight - letterHeight * 0.3}px`;
        
        // Phase 2: Premier rebond (légèrement en dessous)
        setTimeout(() => {
            container.style.transition = `top 0.25s cubic-bezier(0.34, 1.85, 0.64, 1)`;
            container.style.top = `-${totalHeight + letterHeight * 0.15}px`;
            
            // Phase 3: Second rebond (légèrement au-dessus)
            setTimeout(() => {
                container.style.transition = `top 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                container.style.top = `-${totalHeight - letterHeight * 0.08}px`;
                
                // Phase 4: Position finale
                setTimeout(() => {
                    container.style.transition = `top 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                    container.style.top = `-${totalHeight}px`;
                    
                    // Signaler que ce slot a terminé son animation
                    finishedSlots++;
                    
                    // Vérifier si tous les slots ont terminé leur animation
                    if (finishedSlots === targetWord.length) {
                        // Réinitialiser le compteur
                        finishedSlots = 0;
                        
                        // Augmenter le temps d'affichage du mot LOUYUS
                        setTimeout(() => {
                            // Faire tourner tous les slots ensemble
                            synchronizedRotation();
                        }, 1700); // Augmenté à 1500ms pour un affichage plus long du mot final
                    }
                }, 150);
            }, 200);
        }, 400 + index * 30);
    }, index * 180);
}

// Variable pour suivre combien de slots ont terminé leur animation
let finishedSlots = 0;

// Fonction pour effectuer une rotation synchronisée continue
function synchronizedRotation() {
    // Pour chaque slot
    for (let i = 0; i < targetWord.length; i++) {
        const container = document.getElementById(`container-${i}`);
        const letterHeight = window.innerWidth * 0.13;
        
        // Repositionner le conteneur pour la rotation avec une transition douce
        // Au lieu de réinitialiser directement à 0, nous allons passer par une animation rapide
        
        // Calculer la position actuelle pour une transition fluide
        // Nous positionnons les nouvelles lettres comme si elles venaient juste de faire un tour
        container.style.transition = "none";
        container.style.top = `-${1 * letterHeight}px`; // Positionnement après une lettre
        
        // Forcer un reflow pour appliquer le changement immédiatement
        container.offsetHeight;
        
        // Appliquer la transition pour la rotation
        container.style.transition = `top 0.7s cubic-bezier(0.1, 0.5, 0.1, 1)`;
        
        // Faire la rotation complète
        setTimeout(() => {
            // Commencer la rotation - ajuster pour prendre en compte la position initiale
            container.style.top = `-${41 * letterHeight}px`; // Rotation complète (toutes les lettres)
            
            // Quand la rotation est terminée
            setTimeout(() => {
                // Pour le dernier slot uniquement, préparer la prochaine animation principale
                if (i === targetWord.length - 1) {
                    // Réinitialiser avec l'effet d'entrée pour le prochain cycle
                    // Démarrer immédiatement l'effet d'entrée
                    resetWithEntranceEffect();
                }
            }, 700);
        }, 10);
    }
}

// Fonction pour créer l'effet d'entrée comme si les lettres venaient déjà de faire un tour
function createEntranceEffect() {
    // Pour chaque slot
    for (let i = 0; i < targetWord.length; i++) {
        const container = document.getElementById(`container-${i}`);
        const letterHeight = window.innerWidth * 0.13;
        
        // Positionner initialement les lettres en bas (hors de la vue)
        container.style.transition = "none";
        container.style.top = `${letterHeight * 3}px`; // Position initiale sous la vue
    }
    
    // Forcer un reflow pour appliquer les changements immédiatement
    document.body.offsetHeight;
    
    // Appliquer la même transition à tous les slots simultanément
    setTimeout(() => {
        for (let i = 0; i < targetWord.length; i++) {
            const container = document.getElementById(`container-${i}`);
            container.style.transition = `top 0.35s cubic-bezier(0.16, 1, 0.3, 1)`;
            container.style.top = "0px"; // Position finale normale
        }
    }, 30);
}

// Fonction pour réinitialiser avec effet d'entrée à chaque nouveau cycle
function resetWithEntranceEffect() {
    // Pour chaque slot
    for (let i = 0; i < targetWord.length; i++) {
        const container = document.getElementById(`container-${i}`);
        const letterHeight = window.innerWidth * 0.13;
        
        // D'abord, positionner les conteneurs hors vue vers le bas
        container.style.transition = "none";
        container.style.top = `${letterHeight * 3}px`; // Position initiale sous la vue
    }
    
    // Forcer un reflow pour appliquer les changements immédiatement
    document.body.offsetHeight;
    
    // Pas de délai avant de lancer l'effet d'entrée - enchaînement immédiat
    // Animer tous les slots en même temps
    for (let i = 0; i < targetWord.length; i++) {
        const container = document.getElementById(`container-${i}`);
        container.style.transition = `top 0.35s cubic-bezier(0.16, 1, 0.3, 1)`;
        container.style.top = "0px"; // Position finale normale
    }
    
    // Démarrer l'animation principale immédiatement après la fin de l'animation d'entrée
    setTimeout(spinSlots, 400); // Juste le temps de l'animation d'entrée
}

// Fonction pour faire tourner les slots avec effet de rebond amélioré
function spinSlots() {
    for (let i = 0; i < targetWord.length; i++) {
        const container = document.getElementById(`container-${i}`);
        animateSlotWithBounce(container, i);
    }
}

// Fonction pour démarrer l'animation
function startAnimation() {
    // Attendre un petit moment avant de lancer l'animation initiale
    setTimeout(() => {
        // Initialiser l'effet d'entrée
        createEntranceEffect();
        
        // Réinitialiser le compteur de slots terminés
        finishedSlots = 0;
        
        // Lancer la première animation juste après l'effet d'entrée
        setTimeout(spinSlots, 400); // Juste le temps de l'animation d'entrée
    }, 800); // Attendre 800ms avant de démarrer l'animation
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    createSlots();
    startAnimation();
    
    // Gérer le redimensionnement pour maintenir les proportions
    window.addEventListener('resize', () => {
        // Recalculer les animations en cours si nécessaire
        for (let i = 0; i < targetWord.length; i++) {
            const container = document.getElementById(`container-${i}`);
            if (container) {
                // Ajuster selon le besoin, mais éviter de perturber l'animation en cours
            }
        }
    });
});
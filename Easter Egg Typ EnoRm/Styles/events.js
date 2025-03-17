document.addEventListener('DOMContentLoaded', (event) => {
    const canImage = document.getElementById('canImage');
    const enormsite = document.getElementById('enormsite');
    let inputSequence = '';

    // Detecteer toetsaanslagen en toon het blikje als "enorm" wordt getypt
    document.addEventListener('keydown', (event) => {
        inputSequence += event.key.toLowerCase();
        if (inputSequence.includes('enorm')) {
            canImage.style.display = 'block';
            setTimeout(() => {
                canImage.classList.add('show');
            }, 10);
            inputSequence = ''; // Reset de invoerreeks
        }
    });

    // Verander de stijl van de pagina wanneer op het blikje wordt geklikt
    canImage.addEventListener('click', () => {
        // Verander de stijl van de body
        document.body.style.backgroundImage = `url(${enormsite.src})`; // Blikje als achtergrond
        document.body.style.backgroundSize = 'cover'; // Achtergrondafbeelding bedekken
        document.body.style.transition = 'all 0.5s ease'; // Soepele overgang
        document.body.style.opacity = '0'; // Begin fade-out effect
        setTimeout(() => {
            document.body.style.opacity = '1'; // Eindig fade-out effect
        }, 500);

        canImage.classList.remove('show');
        canImage.classList.add('hide');
        setTimeout(() => {
            canImage.style.display = 'none';
        }, 500);
    });
});
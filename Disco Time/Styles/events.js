document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('btn');
    const countdownElement = document.getElementById('countdown');
    const disclaimer = document.querySelector('.disclaimer');
    const stopButton = document.getElementById('stopbtn');
    let discoInterval;

    button.addEventListener('click', () => {
        button.style.display = 'none'; // Verberg de knop
        disclaimer.style.display = 'none'; // Verberg de disclaimer
        countdownElement.style.display = 'block'; // Maak de countdown zichtbaar
        startCountdown(3, () => {
            startDisco();
            setTimeout(() => {
                stopButton.style.display = 'block'; // Toon de stopknop na 3 seconden in de disco
            }, 3000);
        });
    });

    stopButton.addEventListener('click', () => {
        clearInterval(discoInterval); // Stop de disco
        document.body.style.backgroundColor = 'white'; // Reset de achtergrondkleur
        stopButton.style.display = 'none'; // Verberg de stopknop
        button.style.display = 'block'; // Toon de knop opnieuw
        disclaimer.style.display = 'block'; // Toon de disclaimer opnieuw
        countdownElement.textContent = ''; // Wis de countdown tekst
        countdownElement.style.display = 'none'; // Verberg de countdown
    });

    function startCountdown(seconds, callback) {
        let counter = seconds;

        const interval = setInterval(() => {
            countdownElement.textContent = `${counter}`;
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                callback();
                countdownElement.style.display = 'none'; // Verberg de countdown wanneer deze 0 bereikt
            }
        }, 1000);
    }

    function startDisco() {
        discoInterval = setInterval(() => {
            document.body.style.backgroundColor = getRandomColor();
        }, 50);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
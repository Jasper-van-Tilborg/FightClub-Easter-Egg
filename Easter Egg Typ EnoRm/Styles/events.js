document.addEventListener('DOMContentLoaded', (event) => {
    const canImage = document.getElementById('canImage');
    const waterExplosion = document.getElementById('waterexplosion');
    let inputSequence = '';

    document.addEventListener('keydown', (event) => {
        inputSequence += event.key.toLowerCase();
        if (inputSequence.includes('enorm')) {
            canImage.style.display = 'block';
            setTimeout(() => {
                canImage.classList.add('show');
            }, 10);
            inputSequence = '';
        }
    });

    canImage.addEventListener('click', () => {
        canImage.classList.remove('show');
        canImage.classList.add('hide');
        setTimeout(() => {
            canImage.style.display = 'none';
            document.body.style.backgroundColor = 'black';
        }, 500);
    });
});
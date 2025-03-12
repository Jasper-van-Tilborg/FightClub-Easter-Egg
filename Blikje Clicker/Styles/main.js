document.addEventListener('DOMContentLoaded', (event) => {
    const blikjeButton = document.getElementById('blikjeButton');
    const blikjeCount = document.getElementById('blikjeCount');
    const upgradeButtons = document.querySelectorAll('.buyUpgrade');
    let count = 0;
    let blikjesPerSecond = 0;

    const upgrades = {
        blikjesfabriek: { cost: 10, bps: 100 }
    };

    blikjeButton.addEventListener('click', () => {
        count++;
        blikjeCount.textContent = Math.floor(count);
    });

    upgradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeType = button.getAttribute('data-upgrade');
            const upgrade = upgrades[upgradeType];

            if (count >= upgrade.cost) {
                count -= upgrade.cost;
                blikjesPerSecond += upgrade.bps;
                upgrade.cost = Math.ceil(upgrade.cost * 1.02); // Verhoog de prijs met 1.02x en rond af naar beneden
                blikjeCount.textContent = Math.ceil(count);
                button.textContent = `Buy ${upgradeType.charAt(0).toUpperCase() + upgradeType.slice(1)} (${upgrade.cost} blikjes)`;
            } else {
                alert('Not enough blikjes to buy the upgrade!');
            }
        });
    });

    setInterval(() => {
        count += blikjesPerSecond;
        blikjeCount.textContent = Math.floor(count);
    }, 1000);
});
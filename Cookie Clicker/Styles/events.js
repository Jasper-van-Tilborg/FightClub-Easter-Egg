document.addEventListener('DOMContentLoaded', (event) => {
    const cookieButton = document.getElementById('cookieButton');
    const cookieCount = document.getElementById('cookieCount');
    const upgradeButtons = document.querySelectorAll('.buyUpgrade');
    let count = 0;
    let cookiesPerSecond = 0;

    const upgrades = {
        deegroller: { cost: 10, cps: 0.1 },
        oven: { cost: 50, cps: 1 }
    };

    cookieButton.addEventListener('click', () => {
        count++;
        cookieCount.textContent = Math.floor(count);
    });

    upgradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeType = button.getAttribute('data-upgrade');
            const upgrade = upgrades[upgradeType];

            if (count >= upgrade.cost) {
                count -= upgrade.cost;
                cookiesPerSecond += upgrade.cps;
                upgrade.cost = Math.floor(upgrade.cost * 1.02); // Verhoog de prijs met 1.02x en rond af naar beneden
                cookieCount.textContent = Math.floor(count);
                button.textContent = `Buy ${upgradeType.charAt(0).toUpperCase() + upgradeType.slice(1)} (${upgrade.cost} cookies)`;
            } else {
                alert('Not enough cookies to buy the upgrade!');
            }
        });
    });

    setInterval(() => {
        count += cookiesPerSecond;
        cookieCount.textContent = Math.floor(count);
    }, 1000);
});
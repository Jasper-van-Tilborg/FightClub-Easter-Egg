// Typ Enorm Easter Egg
let typedText = "";

document.addEventListener("keydown", (event) => {
  typedText += event.key.toLowerCase();

  if (typedText.includes("enorm")) {
    console.log("Easter Egg geactiveerd!");
    showBlikjeEnorm();
    typedText = "";
  }
});

function showBlikjeEnorm() {
  let blikje = document.createElement("div");
  blikje.id = "blikje-enorm";

  blikje.addEventListener("click", () => {
    window.location.href = "https:www.enorm.com";
  });

  document.body.appendChild(blikje);

  setTimeout(() => {
    blikje.classList.add("fade-in");
  }, 10);
}

// Blikken regen Easter Egg
const enormTrigger = document.getElementById("enorm-trigger");
let regenActief = false;

enormTrigger.addEventListener("click", () => {
  if (regenActief) return;
  regenActief = true;

  startBlikkenRegen();

  setTimeout(() => {
    regenActief = false;
  }, 30000);
});

function startBlikkenRegen() {
  const regenDuur = 28000;
  const maxBlikjesInBeeld = 12;
  let actieveBlikjes = 0;

  const regenInterval = setInterval(() => {
    if (actieveBlikjes < maxBlikjesInBeeld) {
      genereerBlikje(() => {
        actieveBlikjes--;
      });
      actieveBlikjes++;
    }
  }, Math.random() * 500 + 250);

  setTimeout(() => {
    clearInterval(regenInterval);
  }, regenDuur);
}

function genereerBlikje(onVerwijder) {
  const blikje = document.createElement("div");
  blikje.classList.add("blikje");

  const grootte = Math.random() * 150 + 200;
  blikje.style.width = `${grootte}px`;
  blikje.style.height = `${grootte}px`;

  blikje.style.left = getRndInteger(0, window.innerWidth - grootte) + "px";
  blikje.style.top = "-200px";

  document.body.appendChild(blikje);

  let valSnelheid = Math.random() * 5 + 5;
  let rotatieHoek = 0;
  const draaiSnelheid =
    (Math.random() * (4 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1);

  const interval = setInterval(() => {
    const huidigeTop = parseFloat(blikje.style.top);
    if (huidigeTop > window.innerHeight) {
      clearInterval(interval);
      blikje.remove();
      if (onVerwijder) onVerwijder();
    } else {
      blikje.style.top = `${huidigeTop + valSnelheid}px`;

      rotatieHoek += draaiSnelheid;
      blikje.style.transform = `rotate(${rotatieHoek}deg)`;
    }
  }, 16);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Selecteer de benodigde elementen
const logoMetHond = document.getElementById("logo-met-hond");
const logoZonderHond = document.getElementById("logo-zonder-hond");
const hond = document.getElementById("hond");

// Maak een countdown-element
const countdownElement = document.createElement("div");
countdownElement.id = "countdown";
countdownElement.style.position = "absolute";
countdownElement.style.top = "50%";
countdownElement.style.left = "50%";
countdownElement.style.transform = "translate(-50%, -50%)";
countdownElement.style.fontSize = "48px";
countdownElement.style.fontWeight = "bold";
countdownElement.style.color = "#fff";
countdownElement.style.display = "none";
countdownElement.style.fontFamily = "Arial, sans-serif";
document.body.appendChild(countdownElement);

// Controleer of de elementen bestaan
if (logoMetHond && logoZonderHond && hond) {
  // Voeg een klikgebeurtenis toe aan het logo met de hond
  logoMetHond.addEventListener("click", () => {
    // Verberg het logo met de hond en toon het logo zonder de hond
    logoMetHond.style.display = "none";
    logoZonderHond.style.display = "block";

    // Toon de hond en start de animatie
    hond.style.display = "block";
    setTimeout(() => {
      hond.classList.add("hond-animatie");

      // Start de countdown na de animatie
      setTimeout(startCountdown, 500);
    }, 10);
  });
} else {
  console.error(
    "Een of meer elementen konden niet worden gevonden. Controleer de ID's in je HTML."
  );
}

// Start de countdown
function startCountdown() {
  let countdown = 3;
  countdownElement.style.display = "block";
  countdownElement.textContent = countdown;

  const interval = setInterval(() => {
    countdown--;

    if (countdown === 2) {
      // Vervang de normale hond door de spelhond
      vervangHondMetSpelHond();
    }

    if (countdown > 0) {
      countdownElement.textContent = countdown;
    } else {
      clearInterval(interval);
      countdownElement.style.display = "none";
      console.log("Countdown voltooid! Start het spel.");
      startBlikjes();
    }
  }, 1000);
}

// Vervang de normale hond door de spelhond
function vervangHondMetSpelHond() {
  hond.style.display = "none"; // Verberg de normale hond

  const spelHond = document.createElement("div");
  spelHond.id = "spel-hond";
  spelHond.style.position = "absolute";
  spelHond.style.width = "145px";
  spelHond.style.height = "92px";
  spelHond.style.backgroundImage = "url('../images/spel_hond.png')";
  spelHond.style.backgroundSize = "cover";
  spelHond.style.backgroundRepeat = "no-repeat";
  spelHond.style.top = "430px"; // Startpositie van de spelhond
  spelHond.style.left = "328px";
  spelHond.style.zIndex = "110";
  document.body.appendChild(spelHond);

  // Voeg beweging toe aan de spelhond
  document.addEventListener("keydown", (event) => {
    const screenHeight = window.innerHeight;
    const step = screenHeight / 8;
    let currentTop = parseFloat(getComputedStyle(spelHond).top) || 0;

    if (event.key === "ArrowUp") {
      event.preventDefault(); // Voorkom scrollen
      currentTop = Math.max(0, currentTop - step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault(); // Voorkom scrollen
      currentTop = Math.min(
        screenHeight - spelHond.offsetHeight,
        currentTop + step
      );
    }

    spelHond.style.position = "absolute";
    spelHond.style.transition = "top 0.3s ease";
    spelHond.style.top = `${currentTop}px`;
  });
}

// Start de blikjesaanval
function startBlikjes() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  function createBlikje() {
    // Maak een nieuw afbeeldingselement voor het blikje
    const blikje = document.createElement("img");
    blikje.src = "../images/blikjehitbox.png"; // Zorg dat het pad klopt
    blikje.id = "blikje";
    blikje.style.position = "absolute";
    blikje.style.right = "0px";
    blikje.style.top = `${Math.random() * (screenHeight - 50)}px`; // Random Y-positie
    blikje.style.width = "200px";
    blikje.style.height = "94px";
    document.body.appendChild(blikje);

    // Animeren van het blikje
    const speed = Math.random() * 3 + 2; // Willekeurige snelheid
    const interval = setInterval(() => {
      const currentRight = parseFloat(getComputedStyle(blikje).right) || 0;
      blikje.style.right = `${currentRight + speed}px`;

      // Controleer op botsing met de spelhond
      const spelHond = document.getElementById("spel-hond");
      if (spelHond) {
        const blikjeRect = blikje.getBoundingClientRect();
        const spelHondRect = spelHond.getBoundingClientRect();

        if (
          blikjeRect.left < spelHondRect.right &&
          blikjeRect.right > spelHondRect.left &&
          blikjeRect.top < spelHondRect.bottom &&
          blikjeRect.bottom > spelHondRect.top
        ) {
          clearInterval(interval);
          window.location.href = "https://www.enorm.com"; // Stuur door naar enorm.com
        }
      }

      // Verwijder het blikje als het uit beeld is
      if (currentRight > screenWidth) {
        clearInterval(interval);
        blikje.remove();
      }
    }, 16); // ~60 FPS
  }

  // Blikjes genereren op willekeurige momenten
  setInterval(() => {
    createBlikje();
  }, Math.random() * 500 + 500); // Willekeurige tijd tussen 1 en 3 seconden
}

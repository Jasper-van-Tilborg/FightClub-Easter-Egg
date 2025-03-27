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
      hond.classList.add("hond-animatie"); // Voeg de animatieklasse toe
    }, 10);
  });
} else {
  console.error(
    "Een of meer elementen konden niet worden gevonden. Controleer de ID's in je HTML."
  );
}

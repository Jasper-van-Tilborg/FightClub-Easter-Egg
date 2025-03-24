// Typ enorm easter egg
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
    window.location.href = "https://www.enorm.com";
  });

  document.body.appendChild(blikje);

  setTimeout(() => {
    blikje.classList.add("fade-in");
  }, 10);
}

// Selecteer de trigger voor de blikkenregen
const enormTrigger = document.getElementById("enorm-trigger");
let regenActief = false; // Houd bij of de regen actief is

// Voeg een eventlistener toe aan de trigger
enormTrigger.addEventListener("click", () => {
  if (regenActief) return; // Voorkom meerdere klikken
  regenActief = true; // Zet de regen op actief

  // Start de blikkenregen
  startBlikkenRegen();

  // Zet de trigger na 30 seconden weer actief
  setTimeout(() => {
    regenActief = false;
  }, 30000); // 30 seconden
});

// Functie om de blikkenregen te starten
function startBlikkenRegen() {
  const regenDuur = 28000; // 28 seconden
  const maxBlikjesInBeeld = 12; // Maximaal 12 blikjes tegelijk
  let actieveBlikjes = 0; // Houd bij hoeveel blikjes er momenteel in beeld zijn

  const regenInterval = setInterval(() => {
    if (actieveBlikjes < maxBlikjesInBeeld) {
      // Voeg een nieuw blikje toe als er minder dan 12 in beeld zijn
      genereerBlikje(() => {
        actieveBlikjes--;
      });
      actieveBlikjes++;
    }
  }, Math.random() * 500 + 250); // Willekeurige tijd tussen 250ms en 750ms

  // Stop de regen na 28 seconden
  setTimeout(() => {
    clearInterval(regenInterval);
  }, regenDuur);
}

// Functie om een nieuw blikje te genereren
function genereerBlikje(onVerwijder) {
  // Genereer 1 blikje
  const blikje = document.createElement("div");
  blikje.classList.add("blikje");

  // Willekeurige grootte
  const grootte = Math.random() * 150 + 200; // Groottes tussen 50px en 100px
  blikje.style.width = `${grootte}px`;
  blikje.style.height = `${grootte}px`;

  // Willekeurige horizontale positie
  blikje.style.left = getRndInteger(0, window.innerWidth - grootte) + "px";
  blikje.style.top = "-200px"; // Startpositie boven het scherm

  // Voeg het blikje toe aan de body
  document.body.appendChild(blikje);

  // Laat het blikje vallen
  let valSnelheid = Math.random() * 5 + 5; // Willekeurige valsnelheid tussen 5px en 10px per frame
  let rotatieHoek = 0; // Startrotatie
  const draaiSnelheid =
    (Math.random() * (4 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1); // Willekeurige draairichting

  const interval = setInterval(() => {
    const huidigeTop = parseFloat(blikje.style.top);
    if (huidigeTop > window.innerHeight) {
      // Verwijder het blikje als het buiten het scherm is
      clearInterval(interval);
      blikje.remove();
      if (onVerwijder) onVerwijder(); // Verminder het aantal actieve blikjes
    } else {
      // Laat het blikje vallen
      blikje.style.top = `${huidigeTop + valSnelheid}px`;

      // Draai het blikje linksom of rechtsom
      rotatieHoek += draaiSnelheid;
      blikje.style.transform = `rotate(${rotatieHoek}deg)`;
    }
  }, 16); // ~60 frames per seconde
}

// Hulpfunctie om een willekeurig getal te genereren
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

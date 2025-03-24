let iets = document.getElementById("iets");
let regenActief = false; // Houd bij of de regen actief is

iets.addEventListener("click", () => {
  if (regenActief) return; // Voorkom meerdere klikken
  regenActief = true; // Zet de regen op actief

  // Schakel de knop tijdelijk uit
  iets.style.pointerEvents = "none";

  // Start de blikkenregen
  startBlikkenRegen();

  // Zet de knop na 30 seconden weer aan
  setTimeout(() => {
    regenActief = false;
    iets.style.pointerEvents = "auto";
  }, 30000); // 30 seconden
});

function startBlikkenRegen() {
  const regenDuur = 28000; // 28 seconden
  const maxBlikjesInBeeld = 12; // Maximaal 3 blikjes tegelijk
  let actieveBlikjes = 0; // Houd bij hoeveel blikjes er momenteel in beeld zijn

  const regenInterval = setInterval(() => {
    if (actieveBlikjes < maxBlikjesInBeeld) {
      // Voeg een nieuw blikje toe als er minder dan 3 in beeld zijn
      genereerBlikje(() => {
        actieveBlikjes--;
      });
      actieveBlikjes++;
    }
  }, Math.random() * 500 + 250); // Willekeurige tijd tussen 500ms en 1500ms

  // Stop de regen na 28 seconden
  setTimeout(() => {
    clearInterval(regenInterval);
  }, regenDuur);
}

function genereerBlikje(onVerwijder) {
  // Genereer 1 blikje
  const blikje = document.createElement("div");
  blikje.classList.add("blikje");

  // Willekeurige grootte
  const grootte = Math.random() * 250 + 250; // Groottes tussen 300px en 600px
  blikje.style.width = `${grootte}px`;
  blikje.style.height = `${grootte}px`;

  // Willekeurige horizontale positie
  blikje.style.left = getRndInteger(0, window.innerWidth - grootte) + "px";
  blikje.style.top = "-600px"; // Startpositie boven het scherm

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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

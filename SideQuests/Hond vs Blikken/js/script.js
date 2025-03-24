// Selecteer de elementen
const logoMetHond = document.getElementById("logo-met-hond");
const logoZonderHond = document.getElementById("logo-zonder-hond");
const hond = document.getElementById("hond");

// Maak een element voor de countdown
const countdownElement = document.createElement("div");
countdownElement.id = "countdown";
countdownElement.style.position = "absolute";
countdownElement.style.top = "50%";
countdownElement.style.left = "50%";
countdownElement.style.transform = "translate(-50%, -50%)";
countdownElement.style.fontSize = "48px";
countdownElement.style.fontWeight = "bold";
countdownElement.style.color = "#000";
countdownElement.style.display = "none"; // Verberg standaard
document.body.appendChild(countdownElement);

// Variabelen voor de positie van de hond
let hondY = 50; // Startpositie Y van de hond
let isMoving = false; // Lock-mechanisme om dubbele bewegingen te voorkomen

// Controleer of de elementen correct zijn geladen
if (logoMetHond && logoZonderHond && hond) {
  logoMetHond.addEventListener("click", () => {
    // Verander het logo naar de versie zonder hond
    logoMetHond.style.display = "none";
    logoZonderHond.style.display = "block";

    // Laat de hond uit het logo springen
    hond.style.display = "block"; // Zorg ervoor dat de hond zichtbaar wordt
    setTimeout(() => {
      hond.classList.add("hond-animatie");

      // Start de countdown zodra de animatie is voltooid
      setTimeout(startCountdown, 500); // Wacht tot de animatie klaar is
    }, 10); // Kleine vertraging om de animatie te laten werken
  });
} else {
  console.error(
    "Een of meer elementen konden niet worden gevonden. Controleer de ID's in je HTML."
  );
}

// Functie om de countdown te starten
function startCountdown() {
  let countdown = 3; // Start bij 3 seconden
  countdownElement.style.display = "block"; // Toon de countdown
  countdownElement.textContent = countdown;

  const interval = setInterval(() => {
    countdown--;

    if (countdown > 0) {
      countdownElement.textContent = countdown; // Update de countdown
    } else {
      clearInterval(interval); // Stop de countdown
      countdownElement.style.display = "none"; // Verberg de countdown
      console.log("Countdown voltooid! Start het spel.");
      // Hier kun je de logica toevoegen om het spel te starten
    }
  }, 1000); // Update elke seconde
}

// Functie om de hond te laten bewegen met de pijltjestoetsen
document.addEventListener("keydown", (event) => {
  const stapGrootte = 100; // Hoeveel pixels de hond per toetsdruk beweegt

  // Controleer of de toets een pijltjestoets is
  if (event.repeat || isMoving) return; // Voorkom herhaling of dubbele bewegingen

  isMoving = true; // Zet de lock aan

  switch (event.key) {
    case "ArrowUp": // Pijltje omhoog
      hondY = Math.max(0, hondY + stapGrootte); // Zorg dat de hond niet buiten het scherm gaat
      break;
    case "ArrowDown": // Pijltje omlaag
      hondY = Math.min(
        window.innerHeight - hond.offsetHeight,
        hondY + stapGrootte
      );
      break;
    default:
      isMoving = false; // Zet de lock uit als het geen pijltjestoets is
      return;
  }

  // Update de positie van de hond
  hond.style.top = `${hondY}px`;

  // Wacht een korte tijd voordat de lock wordt vrijgegeven
  setTimeout(() => {
    isMoving = false; // Zet de lock uit
  }, 100); // 100ms is de tijd die nodig is om de beweging af te ronden
});

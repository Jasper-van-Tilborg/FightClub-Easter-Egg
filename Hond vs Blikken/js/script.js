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

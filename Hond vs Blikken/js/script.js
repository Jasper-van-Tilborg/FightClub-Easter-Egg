// Selecteer de elementen
const logoMetHond = document.getElementById("logo-met-hond");
const logoZonderHond = document.getElementById("logo-zonder-hond");
const hond = document.getElementById("hond");

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
    }, 10); // Kleine vertraging om de animatie te laten werken
  });
} else {
  console.error(
    "Een of meer elementen konden niet worden gevonden. Controleer de ID's in je HTML."
  );
}

const logoMetHond = document.getElementById("logo-met-hond");
const logoZonderHond = document.getElementById("logo-zonder-hond");
const hond = document.getElementById("hond");

logoMetHond.addEventListener("click", () => {
  // Verander het logo naar de versie zonder hond
  logoMetHond.style.display = "none";
  logoZonderHond.style.display = "block";

  // Laat de hond uit het logo springen
  hond.style.display = "block";
  hond.style.top = "200px"; // Laat de hond naar beneden springen
  hond.style.left = "100px"; // Beweeg de hond iets naar rechts
  hond.style.transform = "scale(1.2)"; // Vergroot de hond een beetje
});

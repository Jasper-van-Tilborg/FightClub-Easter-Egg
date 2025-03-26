const logoMetHond = document.getElementById("logo-met-hond");
const logoZonderHond = document.getElementById("logo-zonder-hond");
const hond = document.getElementById("hond");

const countdownElement = document.createElement("div");
countdownElement.id = "countdown";
countdownElement.style.position = "absolute";
countdownElement.style.top = "50%";
countdownElement.style.left = "50%";
countdownElement.style.transform = "translate(-50%, -50%)";
countdownElement.style.fontSize = "48px";
countdownElement.style.fontWeight = "bold";
countdownElement.style.color = "#000";
countdownElement.style.display = "none";
document.body.appendChild(countdownElement);

if (logoMetHond && logoZonderHond && hond) {
  logoMetHond.addEventListener("click", () => {
    logoMetHond.style.display = "none";
    logoZonderHond.style.display = "block";

    hond.style.display = "block";
    setTimeout(() => {
      hond.classList.add("hond-animatie");

      setTimeout(startCountdown, 500);
    }, 10);
  });
} else {
  console.error(
    "Een of meer elementen konden niet worden gevonden. Controleer de ID's in je HTML."
  );
}

function startCountdown() {
  let countdown = 3;
  countdownElement.style.display = "block";
  countdownElement.textContent = countdown;

  setTimeout(() => {
    hond.style.display = "none";
    voegSpelHondToe();
  }, 1000);

  const interval = setInterval(() => {
    countdown--;

    if (countdown > 0) {
      countdownElement.textContent = countdown;
    } else {
      clearInterval(interval);
      countdownElement.style.display = "none";
      console.log("Countdown voltooid! Start het spel.");
    }
  }, 1000);
}

function voegSpelHondToe() {
  const spelHond = document.createElement("div");
  spelHond.id = "spel-hond";
  document.body.appendChild(spelHond);
}

// Movement Spelhond
document.addEventListener("keydown", (event) => {
  const spelHond = document.getElementById("spel-hond");
  if (!spelHond) return;

  const screenHeight = window.innerHeight;
  const step = screenHeight / 8; // 1/5 of the screen height
  let currentTop = parseFloat(getComputedStyle(spelHond).top) || 0;

  if (event.key === "ArrowUp") {
    currentTop = Math.max(0, currentTop - step); // Move up, but don't go off-screen
  } else if (event.key === "ArrowDown") {
    currentTop = Math.min(
      screenHeight - spelHond.offsetHeight,
      currentTop + step
    ); // Move down, but stay on-screen
  }

  spelHond.style.position = "absolute";
  spelHond.style.transition = "top 0.3s ease"; // Add smooth transition
  spelHond.style.top = `${currentTop}px`;
});

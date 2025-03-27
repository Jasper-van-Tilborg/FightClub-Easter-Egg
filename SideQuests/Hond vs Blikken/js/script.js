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
    }

    if (countdown === 0) {
      startBlikjes(); // Start de blikjes wanneer countdown op 1 staat
    }

    if (countdown === 0) {
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

function startBlikjes() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  function createBlikje() {
    const blikje = document.createElement("div");
    blikje.id = "blik"; // Gebruik een ID in plaats van een class
    blikje.style.position = "absolute";
    blikje.style.right = "0px";
    blikje.style.top = `${Math.random() * (screenHeight - 50)}px`; // Random y-waarde
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

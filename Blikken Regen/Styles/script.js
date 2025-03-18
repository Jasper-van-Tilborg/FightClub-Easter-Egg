let iets = document.getElementById("iets");

iets.addEventListener("click", activeerRegen);

function activeerRegen() {
  document.createElement("div");
  alert("Je hebt op de knop geklikt");
  const para = document.createElement("div");
  para.innerHTML = "";
  document.body.appendChild(para);
}

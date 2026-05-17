function updateOperationalTime() {
  const clock = document.getElementById("currentTime");

  if (!clock) return;

  const now = new Date();

  clock.textContent = now.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function startOperationalClock() {
  updateOperationalTime();
  setInterval(updateOperationalTime, 60000);
}

window.addEventListener("load", () => {
  setTimeout(startOperationalClock, 500);
});

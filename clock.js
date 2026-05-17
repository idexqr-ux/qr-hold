function updateOperationalTime() {
  const clock = document.getElementById("currentTime");

  if (!clock) {
    return;
  }

  const now = new Date();

  const formatted = now.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  clock.textContent = formatted;
}

setTimeout(() => {
  updateOperationalTime();
  setInterval(updateOperationalTime, 60000);
}, 300);

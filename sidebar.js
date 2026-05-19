const sidebarTarget = document.getElementById("hold-sidebar");

if (sidebarTarget) {
  const sidebarFile = sidebarTarget.dataset.sidebar || "sidebar.html";
  const scrollKey = `holdSidebarScroll:${sidebarFile}`;

  fetch(sidebarFile)
    .then(response => response.text())
    .then(html => {
      sidebarTarget.innerHTML = html;

      const sidebar = sidebarTarget.querySelector(".sidebar");

      if (!sidebar) return;

      const restoreScroll = () => {
        const saved = sessionStorage.getItem(scrollKey);

        if (saved !== null) {
          sidebar.scrollTop = Number(saved);
        }
      };

      requestAnimationFrame(() => {
        restoreScroll();

        setTimeout(restoreScroll, 50);
      });

      sidebar.addEventListener("scroll", () => {
        sessionStorage.setItem(scrollKey, sidebar.scrollTop);
      });

      sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          sessionStorage.setItem(scrollKey, sidebar.scrollTop);
        });
      });
    });
}

document.addEventListener("click", function (event) {
  if (event.target.matches(".card-close")) {
    const card = event.target.closest(".action-result-card");
    if (card) {
      card.style.display = "none";
    }
  }
});

document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");

  if (button) {
    const action = button.dataset.action;
    const card = document.getElementById(action + "-card");

    if (card) {
      card.hidden = false;
    }
  }

  if (event.target.matches(".card-close")) {
    const card = event.target.closest(".action-result-card");

    if (card) {
      card.hidden = true;
    }
  }
});

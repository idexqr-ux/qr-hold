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

      const currentPage = window.location.pathname.split("/").pop();

      sidebar.querySelectorAll("a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

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
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const action = button.dataset.action;
  const card = document.getElementById(action + "-card");

  if (card) {
    card.hidden = false;
  }
});

document.addEventListener("click", function (event) {
  if (!event.target.matches(".card-close")) return;

  const card = event.target.closest(".action-result-card");

  if (card) {
    card.hidden = true;
    card.style.display = "";
  }
});

document.addEventListener("click", function (event) {
  const qrButton = event.target.closest("[data-qr]");

  if (!qrButton) return;

  const qrClass = qrButton.dataset.qr;
  const title = qrButton.dataset.title;

  const mapScope = qrButton.closest("[data-map-scope]") || document;

  const card = mapScope.querySelector("#qr-location-card");
  const titleEl = mapScope.querySelector("#qr-location-title");

  mapScope.querySelectorAll(".qr-glow").forEach(marker => {
    marker.classList.remove("active");
  });

  const marker = mapScope.querySelector("." + qrClass);

  if (marker) {
    marker.classList.add("active");
  }

  if (titleEl) {
    titleEl.textContent = title;
  }

  if (card) {
    card.hidden = false;
  }
});

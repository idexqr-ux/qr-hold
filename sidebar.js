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

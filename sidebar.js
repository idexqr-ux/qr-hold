const sidebarTarget = document.getElementById("hold-sidebar");

if (sidebarTarget) {
  const sidebarFile = sidebarTarget.dataset.sidebar || "sidebar.html";
  const scrollKey = `holdSidebarScroll:${sidebarFile}`;

  fetch(sidebarFile)
    .then(response => response.text())
    .then(html => {
      sidebarTarget.innerHTML = html;

      const sidebar = sidebarTarget.querySelector(".sidebar");

      if (sidebar) {
        requestAnimationFrame(() => {
          const savedSidebarScroll = localStorage.getItem(scrollKey);

          if (savedSidebarScroll !== null) {
            sidebar.scrollTop = Number(savedSidebarScroll);
          }
        });

        sidebar.addEventListener("scroll", () => {
          localStorage.setItem(scrollKey, sidebar.scrollTop);
        });
      }
    });
}

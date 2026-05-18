const sidebarTarget = document.getElementById("hold-sidebar");

if (sidebarTarget) {
  const sidebarFile = sidebarTarget.dataset.sidebar || "sidebar.html";

  fetch(sidebarFile)
    .then(response => response.text())
    .then(html => {
      sidebarTarget.innerHTML = html;

      const sidebar = sidebarTarget.querySelector(".sidebar");

      if (sidebar) {
        const savedSidebarScroll =
          localStorage.getItem("holdSidebarScroll");

        if (savedSidebarScroll !== null) {
          sidebar.scrollTop = savedSidebarScroll;
        }

        sidebar.addEventListener("scroll", () => {
          localStorage.setItem(
            "holdSidebarScroll",
            sidebar.scrollTop
          );
        });
      }
    });
}

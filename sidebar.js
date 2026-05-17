const sidebarTarget = document.getElementById("hold-sidebar");

if (sidebarTarget) {
  const sidebarFile = sidebarTarget.dataset.sidebar || "sidebar.html";

  fetch(sidebarFile)
    .then(response => response.text())
    .then(html => {
      sidebarTarget.innerHTML = html;
    });
}

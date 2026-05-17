fetch("sidebar.html")
  .then(response => response.text())
  .then(html => {
    const sidebar = document.getElementById("hold-sidebar");

    if (sidebar) {
      sidebar.innerHTML = html;
    }
  });

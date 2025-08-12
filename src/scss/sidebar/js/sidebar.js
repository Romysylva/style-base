// sidebar.js

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sb-sidebar");
  const toggleBtn = document.querySelector("[data-sidebar-toggle]");
  const overlay = document.querySelector(".sb-sidebar-overlay");

  // Sidebar Toggle
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("sb-sidebar-open");
      overlay?.classList.toggle("active");
    });
  }

  // Close when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("sb-sidebar-open");
      overlay.classList.remove("active");
    });
  }

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll(".sb-sidebar .sb-dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const parent = toggle.closest(".sb-dropdown");
      parent?.classList.toggle("open");
    });
  });

  // Active link highlight
  const links = document.querySelectorAll(".sb-sidebar .sb-nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // Close sidebar on link click (mobile)
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove("sb-sidebar-open");
        overlay?.classList.remove("active");
      }
    });
  });
});

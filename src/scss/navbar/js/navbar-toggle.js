document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".sb-menu-toggle");
  const navLinks = document.querySelector(".sb-nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});

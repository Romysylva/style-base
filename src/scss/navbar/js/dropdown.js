document.addEventListener("click", (e) => {
  const dropdown = e.target.closest(".sb-dropdown");
  document.querySelectorAll(".sb-dropdown").forEach((el) => {
    if (el === dropdown) {
      el.classList.toggle("active");
    } else {
      el.classList.remove("active");
    }
  });
});

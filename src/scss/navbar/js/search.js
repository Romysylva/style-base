document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".sb-search input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      console.log("Search query:", e.target.value);
    });
  }
});

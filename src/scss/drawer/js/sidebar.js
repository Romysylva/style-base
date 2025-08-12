export function initSidebar() {
  const submenuToggles = document.querySelectorAll('.sb-sidebar .has-submenu > a');

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      parent.classList.toggle('open');

      // Optional: close other open menus
      document.querySelectorAll('.sb-sidebar .has-submenu').forEach((item) => {
        if (item !== parent) {
          item.classList.remove('open');
        }
      });
    });
  });
}

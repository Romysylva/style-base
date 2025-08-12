export function initDrawer() {
  const drawer = document.querySelector('.sb-drawer');
  const toggleBtn = document.querySelector('.sb-drawer-toggle');
  const overlay = document.querySelector('.sb-drawer-overlay');

  if (!drawer || !toggleBtn || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

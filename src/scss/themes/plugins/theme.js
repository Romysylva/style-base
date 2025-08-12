export function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('sb-theme', theme);
}

export function initThemeToggle({ enableButton = true } = {}) {
  const savedTheme = localStorage.getItem('sb-theme') || 'light';
  setTheme(savedTheme);

  if (enableButton) {
    const btn = document.createElement('button');
    btn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';
    btn.className = 'sb-theme-toggle';
    btn.style.cssText = `
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      padding: 0.5rem;
      font-size: 1.2rem;
      cursor: pointer;
      background: var(--sb-primary-color);
      color: var(--sb-text-color);
      border: none;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(current);
      btn.innerText = current === 'dark' ? '☀️' : '🌙';
    });
    document.body.appendChild(btn);
  }
}

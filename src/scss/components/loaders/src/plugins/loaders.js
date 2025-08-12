/* loader.js - JavaScript control for loaders and skeletons; integrates with SBToast if available */
export const SBLoader = (function () {
  // Enable js-only loaders
  function enableJS() {
    document.querySelectorAll('.sb-loader--js').forEach(el => el.classList.add('js-enabled'));
  }

  // Create an inline spinner element
  function spinner({ size = 'md', ariaLabel = 'Loading' }) {
    const el = document.createElement('span');
    el.className = 'sb-loader sb-loader-' + size + ' sb-loader--js js-enabled';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', ariaLabel);
    return el;
  }

  // show loading toast (requires SBToast)
  function loadingToast({ title = 'Loading', message = '', position = 'sb-top-right', timeout = 0 } = {}) {
    // build toast content with spinner
    const wrapper = document.createElement('div');
    wrapper.className = 'sb-toast sb-toast--neutral';
    wrapper.innerHTML = `<div class="sb-toast__icon"></div>
      <div class="sb-toast__content"><div class="sb-toast__title">${title}</div><div class="sb-toast__msg">${message}</div></div>
      <button class="sb-toast__close" aria-label="Dismiss">&times;</button>`;
    // insert spinner into icon
    const icon = wrapper.querySelector('.sb-toast__icon');
    const sp = spinner({ size: 'sm', ariaLabel: title });
    icon.appendChild(sp);
    // use SBToast if available for stacking; otherwise manual append
    if (window.SBToast && typeof window.SBToast.show === 'function') {
      return window.SBToast.show({ title, message, variant: 'neutral', timeout, position });
    } else {
      // fallback: attach to body in position
      const pos = position || 'sb-top-right';
      let container = document.querySelector('.sb-toast-wrapper.' + pos);
      if (!container) { container = document.createElement('div'); container.className = 'sb-toast-wrapper ' + pos; document.body.appendChild(container); }
      container.appendChild(wrapper);
      requestAnimationFrame(() => wrapper.classList.add('show'));
      const close = wrapper.querySelector('.sb-toast__close');
      const remove = () => { wrapper.classList.remove('show'); setTimeout(() => wrapper.remove(), 220); };
      close.addEventListener('click', remove);
      if (timeout > 0) setTimeout(remove, timeout);
      return { close: remove, element: wrapper };
    }
  }

  // expose API
  return { enableJS, spinner, loadingToast };
})();

/* toast.js - simple toast system with stacking, auto-dismiss, positions */
export const SBToast = (function () {
  const wrappers = {}; // position => container element

  function getWrapper(pos) {
    if (wrappers[pos]) return wrappers[pos];
    const w = document.createElement('div');
    w.className = 'sb-toast-wrapper ' + pos;
    document.body.appendChild(w);
    wrappers[pos] = w;
    return w;
  }

  function show({ title = '', message = '', variant = 'neutral', timeout = 4000, position = 'sb-top-right' }) {
    const wrapper = getWrapper(position);
    const el = document.createElement('div');
    el.className = 'sb-toast sb-toast--' + variant;
    el.innerHTML = `<div class="sb-toast__icon" aria-hidden="true">i</div>
      <div class="sb-toast__content"><div class="sb-toast__title">${title}</div><div class="sb-toast__msg">${message}</div></div>
      <button class="sb-toast__close" aria-label="Dismiss">&times;</button>`;
    wrapper.appendChild(el);
    wrapper.classList.add('sb-toast-stack');
    requestAnimationFrame(() => el.classList.add('show'));
    const closeBtn = el.querySelector('.sb-toast__close');
    const remove = () => { el.classList.remove('show'); setTimeout(() => el.remove(), 220); };
    closeBtn.addEventListener('click', remove);
    if (timeout > 0) setTimeout(remove, timeout);
    return { close: remove, element: el };
  }

  return { show };
})();

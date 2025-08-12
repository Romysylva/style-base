// src/plugins/modal.js
// SBModal - framework-agnostic modal controller with draggable + robust focus trap
export class SBModal {
  constructor(rootSelectorOrEl, options = {}) {
    this.root = (typeof rootSelectorOrEl === 'string') ? document.querySelector(rootSelectorOrEl) : rootSelectorOrEl;
    if (!this.root) throw new Error('SBModal: root element not found');
    this.dialog = this.root.querySelector('.sb-modal__dialog');
    this.backdrop = this.root.querySelector('.sb-modal__backdrop');
    this.closeButtons = this.root.querySelectorAll('[data-sb-modal-close]');
    this.options = Object.assign({ draggable: false, closeOnBackdrop: true, initialFocus: null }, options);

    this._onKey = this._onKey.bind(this);
    this._onBackdrop = this._onBackdrop.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onFocus = this._onFocus.bind(this);

    this._init();
  }

  _init() {
    this.closeButtons.forEach(btn => btn.addEventListener('click', this._onCloseClick));
    if (this.backdrop && this.options.closeOnBackdrop) this.backdrop.addEventListener('click', this._onBackdrop);
    this.root.setAttribute('aria-hidden', 'true');
    this.root.setAttribute('role', 'dialog');
    this.root.addEventListener('keydown', this._onKey);
    if (this.options.draggable) this._initDrag();
  }

  open(focusSelector) {
    this.prevActive = document.activeElement;
    this.root.classList.add('sb-open');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this._trap = true;
    this._focusables = this._getFocusable();
    const target = focusSelector ? this.root.querySelector(focusSelector) : (this.dialog.querySelector('[autofocus]') || this._focusables[0]);
    if (target) setTimeout(() => target.focus(), 10);
  }

  close() {
    this.root.classList.remove('sb-open');
    this.root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this._trap = false;
    if (this.prevActive && typeof this.prevActive.focus === 'function') this.prevActive.focus();
  }

  _onKey(e) {
    if (!this._trap) return;
    if (e.key === 'Escape') { this.close(); return; }
    if (e.key === 'Tab') {
      this._focusables = this._getFocusable();
      if (!this._focusables.length) { e.preventDefault(); return; }
      const first = this._focusables[0], last = this._focusables[this._focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  _onBackdrop() { if (this.options.closeOnBackdrop) this.close(); }
  _onCloseClick() { this.close(); }

  _getFocusable() {
    const sel = 'a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    return Array.from(this.root.querySelectorAll(sel)).filter(el => el.offsetParent !== null);
  }

  _initDrag() {
    const header = this.dialog.querySelector('.sb-modal__header') || this.dialog;
    header.style.touchAction = 'none';
    let isDown = false, startX = 0, startY = 0, origLeft = 0, origTop = 0;
    // switch dialog to absolute positioning for drag
    const rect = this.dialog.getBoundingClientRect();
    this.dialog.style.position = 'absolute';
    this.dialog.style.left = rect.left + 'px';
    this.dialog.style.top = rect.top + 'px';
    this.dialog.style.transform = '';

    const onDown = (e) => {
      isDown = true;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      startY = (e.touches ? e.touches[0].clientY : e.clientY);
      origLeft = parseFloat(this.dialog.style.left) || rect.left;
      origTop = parseFloat(this.dialog.style.top) || rect.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      const cy = (e.touches ? e.touches[0].clientY : e.clientY);
      const dx = cx - startX, dy = cy - startY;
      let left = origLeft + dx, top = origTop + dy;
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const dw = this.dialog.offsetWidth, dh = this.dialog.offsetHeight;
      left = Math.max(8, Math.min(left, vw - dw - 8));
      top = Math.max(8, Math.min(top, vh - dh - 8));
      this.dialog.style.left = left + 'px';
      this.dialog.style.top = top + 'px';
    };
    const onUp = () => {
      isDown = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };
    header.addEventListener('mousedown', onDown);
    header.addEventListener('touchstart', onDown, { passive: false });
  }
}

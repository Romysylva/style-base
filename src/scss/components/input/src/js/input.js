/* input.js - lightweight interactions for inputs: floating label, clear button, file preview, autocomplete basic */
document.addEventListener('DOMContentLoaded', () => {
  // clear buttons
  document.querySelectorAll('.sb-input__clear').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.closest('.sb-input').querySelector('input, textarea');
      if (target) { target.value = ''; target.dispatchEvent(new Event('input')); target.focus(); }
    });
  });

  // file preview
  document.querySelectorAll('.sb-file-input').forEach(wrapper => {
    const input = wrapper.querySelector('input[type=file]');
    const preview = wrapper.querySelector('.sb-file-preview');
    if (!input) return;
    input.addEventListener('change', () => {
      preview.innerHTML = '';
      Array.from(input.files || []).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        preview.appendChild(img);
      });
    });
  });

  // basic autocomplete (data-list from data-items attribute)
  document.querySelectorAll('.sb-autocomplete').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const list = document.createElement('div'); list.className = 'sb-autocomplete-list'; wrapper.appendChild(list);
    const items = (wrapper.getAttribute('data-items') || '').split(',').map(s => s.trim()).filter(Boolean);
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      list.innerHTML = '';
      if (!q) return;
      items.filter(i => i.toLowerCase().includes(q)).slice(0, 8).forEach(match => {
        const div = document.createElement('div'); div.className = 'sb-autocomplete-item'; div.textContent = match;
        div.addEventListener('click', () => { input.value = match; list.innerHTML = ''; input.focus(); });
        list.appendChild(div);
      });
    });
    document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) list.innerHTML = ''; });
  });
});

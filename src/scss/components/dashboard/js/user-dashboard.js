
document.addEventListener('DOMContentLoaded', () => {
  const avatarInput = document.getElementById('avatarInput');
  const avatarPreviewList = document.getElementById('avatarPreviewList');
  const avatarPreview = document.getElementById('avatarPreview');
  avatarInput && avatarInput.addEventListener('change', () => {
    const file = avatarInput.files && avatarInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Please upload an image');
    const url = URL.createObjectURL(file);
    avatarPreviewList.innerHTML = '';
    const img = document.createElement('img'); img.src = url; img.alt = 'avatar preview'; img.width = 96; img.height = 96;
    avatarPreviewList.appendChild(img);
    const mainImg = avatarPreview.querySelector('img');
    if (mainImg) { mainImg.src = url; }
  });

  document.querySelectorAll('.sb-input__clear[data-toggle]').forEach(btn => {
    const selector = btn.getAttribute('data-toggle');
    btn.addEventListener('click', () => {
      const input = document.querySelector(selector);
      if (!input) return;
      if (input.type === 'password') { input.type = 'text'; btn.textContent = 'Hide'; }
      else { input.type = 'password'; btn.textContent = 'Show'; }
    });
  });

  const themeToggle = document.getElementById('themeToggle');
  const themeSelect = document.getElementById('themeSelect');
  const body = document.body;
  function applyTheme(t) { if (t === 'dark') { body.classList.remove('sb-light'); body.classList.add('sb-dark'); } else { body.classList.remove('sb-dark'); body.classList.add('sb-light'); } }
  themeToggle && themeToggle.addEventListener('click', () => { if (body.classList.contains('sb-dark')) applyTheme('light'); else applyTheme('dark'); });
  themeSelect && themeSelect.addEventListener('change', (e) => { const v = e.target.value; if (v === 'dark') applyTheme('dark'); else applyTheme('light'); });

  document.getElementById('changePasswordBtn') && document.getElementById('changePasswordBtn').addEventListener('click', () => { alert('Password change submitted (demo)'); });
  document.getElementById('saveAll') && document.getElementById('saveAll').addEventListener('click', () => {
    const profile = { name: document.getElementById('name').value, email: document.getElementById('email').value, bio: document.getElementById('bio').value };
    if (!profile.name || !profile.email) { alert('Name and email are required'); return; }
    const btn = document.getElementById('saveAll'); btn.disabled = true; btn.textContent = 'Saving...';
    setTimeout(() => { btn.disabled = false; btn.textContent = 'Save changes'; alert('Settings saved (demo)'); }, 900);
  });
  document.getElementById('deactivateBtn') && document.getElementById('deactivateBtn').addEventListener('click', () => alert('Deactivate flow (demo)'));
  document.getElementById('deleteBtn') && document.getElementById('deleteBtn').addEventListener('click', () => { if (confirm('Are you sure?')) alert('Account deleted (demo)'); });
});
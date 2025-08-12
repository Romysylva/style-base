document.addEventListener('DOMContentLoaded', () => {
  // Line chart
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Visitors', data: [120, 200, 150, 220, 300, 280], borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.08)', fill: true }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // Bar chart
  const bctx = document.getElementById('barChart').getContext('2d');
  new Chart(bctx, {
    type: 'bar',
    data: { labels: ['Products', 'Orders', 'Sales'], datasets: [{ label: 'This month', data: [120, 90, 150], backgroundColor: ['#2563eb', '#10b981', '#f59e0b'] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // simple table search filter
  const table = document.getElementById('usersTable');
  const search = document.getElementById('tableSearch');
  search && search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    Array.from(table.querySelectorAll('tbody tr')).forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  // sidebar toggle for small screens
  const toggle = document.getElementById('sidebarToggle');
  toggle && toggle.addEventListener('click', () => {
    const sb = document.querySelector('.sb-sidebar');
    if (sb.style.display === 'none' || getComputedStyle(sb).display === 'none') { sb.style.display = 'block'; document.querySelector('.sb-main').style.marginLeft = '220px'; }
    else { sb.style.display = 'none'; document.querySelector('.sb-main').style.marginLeft = '0'; }
  });
});
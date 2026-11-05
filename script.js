// Navigation menu toggle
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menu && nav) {
  menu.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Current Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Live GoatCounter View Count in Footer
(function loadViewCount() {
  const viewsEl = document.getElementById('stats-views');
  if (!viewsEl) return;

  // Query GoatCounter API for total site visits
  fetch('https://mohamedsgaballah.goatcounter.com/counter//.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      // Formats number with commas (e.g. 1,420 views)
      if (data && data.count) {
        viewsEl.textContent = Number(data.count.replace(/,/g, '')).toLocaleString();
      } else {
        viewsEl.textContent = data.count || '0';
      }
    })
    .catch(() => {
      // Fallback if blocked by ad-blocker or still initializing
      viewsEl.textContent = 'Active';
    });
})();
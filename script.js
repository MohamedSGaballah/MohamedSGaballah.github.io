// Live GoatCounter View Count in Footer
(function loadViewCount() {
  const viewsEl = document.getElementById('stats-views');
  if (!viewsEl) return;

  // Query GoatCounter for the total site visits
  fetch('https://mohamedsgaballah.goatcounter.com/counter//.json')
    .then(res => {
      if (!res.ok) throw new Error('API restricted or not ready');
      return res.json();
    })
    .then(data => {
      if (data && data.count) {
        // Strip commas if any, then format cleanly
        const cleanNumber = parseInt(data.count.replace(/,/g, ''), 10);
        viewsEl.textContent = isNaN(cleanNumber) ? data.count : cleanNumber.toLocaleString();
      } else {
        viewsEl.textContent = '1';
      }
    })
    .catch(() => {
      // If the API is still blocked or ad-blocker blocked the fetch
      // Fallback: check GoatCounter's total endpoint
      fetch('https://mohamedsgaballah.goatcounter.com/counter/TOTAL.json')
        .then(res => res.json())
        .then(data => {
          if (data && data.count) {
            viewsEl.textContent = data.count;
          }
        })
        .catch(() => {
          // If public API remains unchecked in settings, show 'Live'
          viewsEl.textContent = 'Live';
        });
    });
})();
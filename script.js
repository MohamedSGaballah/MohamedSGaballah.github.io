// script.js - Academic Website Navigation & Real-time Stats

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuButton = document.querySelector('header button.menu');
  const nav = document.querySelector('header nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });

    // Close mobile menu when clicking any nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Automatic Copyright Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Real-Time Visitor Stats Poller (via GoatCounter API)
  async function fetchRealtimeVisitors() {
    try {
      const response = await fetch('https://mohamedsgaballah.goatcounter.com/counter//TOTAL.json');
      if (!response.ok) return;
      const data = await response.json();
      
      const countElement = document.getElementById('stats-views');
      if (countElement && data.count) {
        // Format the count with commas if large
        countElement.textContent = Number(data.count).toLocaleString();
      }
    } catch (error) {
      console.log('Real-time stats sync skipped:', error);
    }
  }

  // Fetch immediately and refresh every 60 seconds
  fetchRealtimeVisitors();
  setInterval(fetchRealtimeVisitors, 60000);
});
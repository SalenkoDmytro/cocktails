const toggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-theme');
  body.classList.toggle('dark-theme', !isDark);
});

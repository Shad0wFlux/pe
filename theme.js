(function() {
  // Force reset legacy light-mode preferences to dark mode once for this update
  if (!localStorage.getItem('theme_auto_dark_v2')) {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('theme_auto_dark_v2', 'true');
  }
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Set html class immediately to avoid white/dark flash during loading
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
  } else {
    document.documentElement.classList.remove('light-mode');
  }

  // Bind interface toggle hooks once DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // If opened via file:// protocol, automatically remove any security/auth loading overlays
    if (window.location.protocol === 'file:') {
      const overlay = document.getElementById("authLoadingOverlay");
      if (overlay) overlay.remove();
    }

    // Synchronize body element class list
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      // Initialize toggle button content with FontAwesome icons
      toggleBtn.innerHTML = savedTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
      
      toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        let newTheme = 'dark';
        if (isLight) {
          document.body.classList.remove('light-mode');
          document.documentElement.classList.remove('light-mode');
          localStorage.setItem('theme', 'dark');
          toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
          newTheme = 'dark';
        } else {
          document.body.classList.add('light-mode');
          document.documentElement.classList.add('light-mode');
          localStorage.setItem('theme', 'light');
          toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
          newTheme = 'light';
        }
        // Dispatch global event for page-specific component updates (e.g. Chart.js)
        window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme: newTheme } }));
      });
    }
  });
})();

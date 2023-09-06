/**
 * Configure the button to switch the dark mode easily
 */
(() => {
  const switchTheme = document.querySelector("#switch-theme");
  const html = document.documentElement;

  // Set initial state
  switchTheme.setAttribute("aria-pressed", !html.classList.contains("dark"));

  switchTheme.addEventListener("click", () => {
    const value = localStorage.getItem(window.SITE_THEME.key);
    const isDarkMode = value
      ? value === window.SITE_THEME.dark
      : isSystemDarkMode;

    if (isDarkMode) {
      window.SITE_THEME.disableDark(switchTheme);
      localStorage.setItem(window.SITE_THEME.key, window.SITE_THEME.light);
    } else {
      window.SITE_THEME.enableDark(switchTheme);
      localStorage.setItem(window.SITE_THEME.key, window.SITE_THEME.dark);
    }
  });
})();

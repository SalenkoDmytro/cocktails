const toggleElement = document.querySelector('.dark-mode-mob-toggle');
const body = document.body;

console.log('toggleElement',toggleElement);
console.log('body',body);
class ThemeToggle {
  darkTheme = 'dark-theme';

  constructor() {
    toggleElement.addEventListener('click', this.toggleTheme);
  }

  setTheme() {
    localStorage.setItem(this.darkTheme, this.darkTheme);
  }

  removeTheme() {
    localStorage.removeItem(this.darkTheme);
  }

  getTheme() {
    return localStorage.getItem(this.darkTheme);
  }

  isDarkThemeOn() {
    return body.classList.contains(this.darkTheme);
  }

  toggleTheme = () => {
    const isDark = this.isDarkThemeOn();
    body.classList.toggle(this.darkTheme, !isDark);

    if (this.getTheme()) {
      this.removeTheme();
    } else {
      this.setTheme();
    }
  };

  setThemeOn = (isOn) => {
    body.classList.toggle(isOn);
  }
}

const toggle = new ThemeToggle();

window.addEventListener('DOMContentLoaded', () => {
  const isOn = Boolean(toggle.getTheme());
  toggleElement.checked = isOn;
  if (isOn) {
    toggle.setThemeOn(toggle.darkTheme)
  }
});
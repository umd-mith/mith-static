// Theme Controller for DaisyUI - Switch between 'mith-light' and 'mith-dark'

type Theme = 'mith-light' | 'mith-dark';

interface ThemeControllerConfig {
  lightTheme?: Theme;
  darkTheme?: Theme;
  storageKey?: string;
}

class ThemeController {
  private readonly lightTheme: Theme;
  private readonly darkTheme: Theme;
  private readonly storageKey: string;
  private mediaQuery: MediaQueryList;

  constructor(config: ThemeControllerConfig = {}) {
    this.lightTheme = config.lightTheme || 'mith-light';
    this.darkTheme = config.darkTheme || 'mith-dark';
    this.storageKey = config.storageKey || 'daisyui-theme';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }
  
  private init(): void {
    // Load saved theme or detect system preference
    const theme = this.getTheme();
    this.setTheme(theme);
    
    // Listen for theme controller changes
    this.attachListeners();
    
    // Listen for system theme changes (only if user hasn't manually set a theme)
    this.watchSystemTheme();
  }
  
  private getSystemTheme(): Theme {
    return this.mediaQuery.matches ? this.darkTheme : this.lightTheme;
  }
  
  public getTheme(): Theme {
    const stored = localStorage.getItem(this.storageKey);
    
    if (stored) {
      // Return user's manual selection
      return (stored === this.darkTheme ? this.darkTheme : this.lightTheme);
    }
    
    // Return system preference
    return this.getSystemTheme();
  }
  
  public setTheme(theme: Theme): void {
    // Set data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage (this marks it as user-selected)
    localStorage.setItem(this.storageKey, theme);
    
    // Update all theme controllers
    this.updateControllers(theme);
  }
  
  public toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === this.lightTheme ? this.darkTheme : this.lightTheme;
    this.setTheme(newTheme);
  }
  
  public resetToSystem(): void {
    // Clear localStorage to use system preference
    localStorage.removeItem(this.storageKey);
    const systemTheme = this.getSystemTheme();
    document.documentElement.setAttribute('data-theme', systemTheme);
    this.updateControllers(systemTheme);
  }
  
  private updateControllers(theme: Theme): void {
    const controllers = document.querySelectorAll<HTMLInputElement>('.theme-controller');
    
    controllers.forEach((controller) => {
      if (controller.type === 'checkbox') {
        // For checkbox inputs, checked means dark theme
        controller.checked = (theme === this.darkTheme);
      } else if (controller.type === 'radio') {
        // For radio inputs, check if value matches current theme
        controller.checked = (controller.value === theme);
      }
    });
  }
  
  private attachListeners(): void {
    // Listen for changes on all theme controllers
    document.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target instanceof HTMLInputElement && target.classList.contains('theme-controller')) {
        if (target.type === 'checkbox') {
          // Checkbox toggles between light and dark
          const newTheme = target.checked ? this.darkTheme : this.lightTheme;
          this.setTheme(newTheme);
        } else if (target.type === 'radio' && target.checked) {
          // Radio sets specific theme
          const value = target.value as Theme;
          this.setTheme(value);
        }
      }
    });
  }
  
  private watchSystemTheme(): void {
    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually selected a theme
      const systemTheme = e.matches ? this.darkTheme : this.lightTheme;
      document.documentElement.setAttribute('data-theme', systemTheme);
      this.updateControllers(systemTheme);
    });
  }
}

// Initialize theme controller when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeController();
  });
} else {
  new ThemeController();
}

// Export for use in modules
export default ThemeController;
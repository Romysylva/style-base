// sb.tokens.js
module.exports = {
  colors: {
    light: {
      surface: "#ffffff",
      text: "#111827",
      muted: "#6b7280",
      primary: "#2563eb",
      border: "#e6eef8"
    },
    dark: {
      surface: "#111827",
      text: "#f9fafb",
      muted: "#9ca3af",
      primary: "#3b82f6",
      border: "#1f2937"
    },
    custom: (themeVars = {}) => ({
      surface: themeVars.surface || "#ffffff",
      text: themeVars.text || "#111827",
      muted: themeVars.muted || "#6b7280",
      primary: themeVars.primary || "#2563eb",
      border: themeVars.border || "#e6eef8"
    })
  },
  radii: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px"
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)"
  },
  typography: {
    fontFamily: "'Inter',  system-ui, sans-serif",
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem"
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700"
    }
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  }
};

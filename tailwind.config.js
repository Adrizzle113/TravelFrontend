module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-accent": "var(--app-accent)",
        "app-border": "var(--app-border)",
        "app-primary": "var(--app-primary)",
        "app-secondary": "var(--app-secondary)",
        "border-transparent": "var(--border-transparent)",
        heading: "var(--heading)",
        stars: "var(--stars)",
        tertiary: "var(--tertiary)",
        "white-smoke": "var(--white-smoke)",
        "white-transparent": "var(--white-transparent)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        accent: "var(--accent-font-family)",
        body: "var(--body-font-family)",
        "body-small": "var(--body-small-font-family)",
        "heading-big": "var(--heading-big-font-family)",
        "heading-medium": "var(--heading-medium-font-family)",
        "heading-small": "var(--heading-small-font-family)",
        "heading-standar": "var(--heading-standar-font-family)",
        "heading-very-big": "var(--heading-very-big-font-family)",
        "icon-big": "var(--icon-big-font-family)",
        "icon-medium": "var(--icon-medium-font-family)",
        "icon-small": "var(--icon-small-font-family)",
        quote: "var(--quote-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        shadow: "var(--shadow)",
        "shadow-shape": "var(--shadow-shape)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};

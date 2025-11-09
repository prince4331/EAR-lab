import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1800px",
      },
    },
    extend: {
      colors: {
        "deep-black": "#0B0F19",
        "electric-blue": "#0F62FE",
        "cyber-teal": "#00C2A8",
        graphite: "#141A26",
        "off-white": "#F7F9FC",
        "pure-white": "#FFFFFF",
        "cool-gray": "#A0AEC0",
        "slate-gray": "#2D3748",
        "red-neon": "#FF4B4B",
        "lime-green": "#00FFB0",
        "neon-blue": "rgba(30, 144, 255, 0.3)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "#00FFB0",
          foreground: "#001711",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "Inter",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-primary": "0 0 16px 0 #0F62FE, 0 0 32px 0 #00C2A8",
        "glow-card": "0 0 12px 0 rgba(15, 98, 254, 0.3)",
        glass: "0 4px 32px 0 rgba(15, 98, 254, 0.08)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.4,0,0.2,1)",
        "slide-up": "slideUp 0.8s cubic-bezier(0.4,0,0.2,1)",
        glow: "glow 1.5s infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 8px 0 #0F62FE" },
          "100%": { boxShadow: "0 0 24px 0 #00C2A8" },
        },
      },
      chart: {
        1: "hsl(var(--chart-1))",
        2: "hsl(var(--chart-2))",
        3: "hsl(var(--chart-3))",
        4: "hsl(var(--chart-4))",
        5: "hsl(var(--chart-5))",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config

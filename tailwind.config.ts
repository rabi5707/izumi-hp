import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        "ink-faint": "var(--ink-faint)",
        rule: "var(--rule)",
        "rule-soft": "var(--rule-soft)",
        accent: "var(--accent)",
      },
      fontFamily: {
        serif: ["var(--f-serif)"],
        sans: ["var(--f-sans)"],
        mono: ["var(--f-mono)"],
      },
      maxWidth: {
        shell: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f13a01"
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtility = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31, 29, 29) transparent",
        }
      }


      addUtilities(newUtility, ["responsive", "hover"])

    }
  ],
};
export default config;

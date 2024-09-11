import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
} satisfies Config;

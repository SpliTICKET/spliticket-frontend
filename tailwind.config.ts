import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	theme: {
		extend: {
			width: {
				"128": "32rem",
				"144": "36rem",
				"160": "40rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
} satisfies Config;

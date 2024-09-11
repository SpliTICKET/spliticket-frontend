import { createI18n } from "vue-i18n";
import type { I18n } from "vue-i18n";
import de_DE from "@/i18n/translations/de_DE.json";
import en_US from "@/i18n/translations/en_US.json";

export const defaultLocale = "de-DE";

export const supportedLocales = {
	"de-DE": { name: "Deutsch" },
	"en-US": { name: "English" },
};

const messages = {
	"de-DE": de_DE,
	"en-US": en_US,
};

let _i18n: I18n;

function setup(options = { locale: defaultLocale }) {
	_i18n = createI18n<typeof de_DE, string>({
		fallbackLocale: defaultLocale,
		locale: "de-DE",
		messages,
		datetimeFormats: {
			"en-US": {
				short: {
					year: "numeric",
					month: "numeric",
					day: "numeric",
				},
				long: {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				},
			},
			"de-DE": {
				short: {
					year: "numeric",
					month: "numeric",
					day: "numeric",
				},
				long: {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				},
			},
		},
	});
	setLocale(options.locale);
	return _i18n;
}

// Sets the active locale
function setLocale(newLocale: string) {
	_i18n.global.locale = newLocale;
}

// Public interface
export default {
	get vueI18n() {
		return _i18n;
	},
	setup,
	setLocale,
};

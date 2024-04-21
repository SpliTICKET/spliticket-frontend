import { createI18n } from "vue-i18n";
import type { I18n } from "vue-i18n";
import de_DE from "@/plugins/i18n/translations/de_DE.json";
import en_US from "@/plugins/i18n/translations/en_US.json";

export const defaultLocale = "de_DE";

export const supportedLocales = {
	de_DE: { name: "Deutsch" },
	en_US: { name: "English" },
};

const messages = {
	de_DE: de_DE,
	en_US: en_US,
};

let _i18n: I18n;

function setup(options = { locale: defaultLocale }) {
	_i18n = createI18n<typeof de_DE, string>({
		fallbackLocale: defaultLocale,
		locale: "de_DE",
		messages,
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

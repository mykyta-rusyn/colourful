import en from './en/en.json';
import uk from './uk/uk.json';

export const translations = {
	en: {
		translation: en,
	},
	uk: {
		translation: uk
	}
};

export type LocalizationKey = keyof typeof translations.en.translation;
export type Languages = keyof typeof translations;
export const languages = Object.keys(translations);

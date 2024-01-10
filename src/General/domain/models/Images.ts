import {ThemeType} from './Theme';

export type SavedImages = {
	localize?: LocalizationImage;
	theme?: ThemeImage
}

export type ImageType = 'language' | 'theme';

export type LocalizationImage = {
	en: string;
	uk: string
}

export type ThemeImage = Record<ThemeType, string>;

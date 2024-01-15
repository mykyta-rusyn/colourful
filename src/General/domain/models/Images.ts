import {ThemeType} from './Theme';

export type SavedImages = | {
  flow: 'localize';
  localizationImage: LocalizationImage
} | {
  flow: 'theme';
  themeImage: ThemeImage
}

export type ImageType = 'language' | 'theme';

export type LocalizationImage = {
	en: string;
	uk: string
}

export type ThemeImage = Record<ThemeType, string>;

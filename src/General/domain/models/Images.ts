import {ThemeType} from './Theme';

export type SavedImages = {
  localizationImage: LocalizationImage;
  themeImage: ThemeImage
}

export type ImageType = 'localization' | 'theme';

export type LocalizationImage = {
	en: string;
	uk: string
}

export type ThemeImage = Record<ThemeType, string>;

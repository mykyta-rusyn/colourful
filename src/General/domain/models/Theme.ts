export type ThemeType = 'light' | 'dark'

export type ThemeColorsKey = keyof ThemeColors;

export type ChangeColor = {
  key: ThemeColorsKey;
  color: string
}

export type ThemeColors = {
	background: string;
	backgroundHeader: string;
	backgroundButton: string;
	themeSwitch: string;
	languageSwitch: string | null;
	textHeader: string;
	textTitle: string;
	textDescription: string;
	border: string
}

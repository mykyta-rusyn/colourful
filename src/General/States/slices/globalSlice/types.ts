import {RootState} from '../../store';

import {ChangeColor, FontFamily, LocalizationImage, Payload, ThemeColors, ThemeImage, ThemeType} from '@colourful/general';

export type State = {
  theme: ThemeType;
  colors: Record<ThemeType, ThemeColors>;
  themeImage?: ThemeImage;
  localizationImage?: LocalizationImage;
  backgroundImage?: string;
  fontFamily: FontFamily
};

export type Actions = {
  changeTheme(state: State, action: Payload<ThemeType>): void;
  toggleTheme(state: State): void;
  changeColor(state: State, action: Payload<ChangeColor | undefined>): void;
  toggleFontFamily(state: State): void;
  changeImages(state: State, action: Payload<ChangeIcons>): void;
  changeBackgroundImage(state: State, action: Payload<string | undefined>): void;
  clearImages(state: State): void
};

type ChangeIcons = | {
  flow: 'localize';
  localizationImage: LocalizationImage
} | {
  flow: 'theme';
  themeImage: ThemeImage
}

export type Selectors = {
  theme(state: RootState): ThemeType;
  colors(state: RootState): ThemeColors;
  themeImage(state: RootState): ThemeImage | undefined;
  localizationImage(state: RootState): LocalizationImage | undefined;
  fontFamily(state: RootState): FontFamily;
  backgroundImage(state: RootState): string | undefined
}

import {RootState} from '../../store';

import {ImageType, LocalizationImage, Payload, SavedImages, ThemeImage} from '@colourful/general';

export type State = {
  themeImage?: ThemeImage;
  localizationImage?: LocalizationImage;
  backgroundImage?: string
};

export type Actions = {
  changeImages(state: State, action: Payload<SavedImages | ImageType | undefined>): void;
  changeBackgroundImage(state: State, action: Payload<string | undefined>): void
};

export type Selectors = {
  themeImage(state: RootState): ThemeImage | undefined;
  localizationImage(state: RootState): LocalizationImage | undefined;
  backgroundImage(state: RootState): string | undefined
}

import {RootState} from '../../store';

import {ChangeColor, Payload, ThemeColors, ThemeType} from '@colourful/general';

export type State = {
  theme: ThemeType;
  colors: Record<ThemeType, ThemeColors>
};

export type Actions = {
  changeTheme(state: State, action: Payload<ThemeType>): void;
  toggleTheme(state: State): void;
  changeColor(state: State, action: Payload<ChangeColor | undefined>): void
};

export type Selectors = {
  theme(state: RootState): ThemeType;
  colors(state: RootState): ThemeColors
}

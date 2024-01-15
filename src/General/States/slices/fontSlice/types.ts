import {RootState} from '../../store';

import {FontFamily, Payload} from '@colourful/general';

export type State = {
  fontFamily: FontFamily
};

export type Actions = {
  toggleFontFamily(state: State): void;
  setFontFamily(state: State, action: Payload<FontFamily | undefined>): void
};

export type Selectors = {
  fontFamily(state: RootState): FontFamily
}

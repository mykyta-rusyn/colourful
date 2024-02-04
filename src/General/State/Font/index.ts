import {FontFamily, Fonts} from '../../domain';
import {Theme} from '../../theme';

import {loadFontFamily, saveFontFamily} from './actions';

import {action, autorun, computed, makeObservable, observable} from 'mobx';

let loaded = false;

class FontState {
	fontFamily: FontFamily = 'Oswald';
	
	public get font(): Fonts[FontFamily] {
		return Theme.fonts[this.fontFamily];
	}

	constructor() {
		makeObservable(this, {
			fontFamily: observable,
			font: computed,
			changeFontFamily: action,
			toggleFontFamily: action
		});

		loadFontFamily().then((fontFamily) => {
			if (fontFamily !== null) {
				this.changeFontFamily(fontFamily as FontFamily);
				loaded = true;
			}
		});
	}

	toggleFontFamily(): void {
		this.fontFamily = this.fontFamily === 'Oswald' ? 'Roboto' : 'Oswald';
	}

	changeFontFamily(fontFamily?: FontFamily): void {
		this.fontFamily = fontFamily ?? 'Oswald';
	}
}

export const fontState = new FontState();

autorun(() => {
	if (loaded) {
		saveFontFamily(fontState.fontFamily);
	}
});

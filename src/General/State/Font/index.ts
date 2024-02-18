import {FontFamily, Fonts} from '../../domain';
import {Theme} from '../../theme';

import {loadFontFamily, saveFontFamily} from './actions';

import {action, computed, makeObservable, observable, runInAction} from 'mobx';

class FontState {
	fontFamily: FontFamily = 'Oswald';
	
	public get font(): Fonts[FontFamily] {
		return Theme.fonts[this.fontFamily];
	}

	constructor() {
		makeObservable(this, {
			fontFamily: observable,
			font: computed,
			removeFontFamily: action,
			toggleFontFamily: action
		});

		this._preloadFontFamily();
	}

	private async _preloadFontFamily() {
		const fontFamily = await loadFontFamily();

		if (fontFamily !== null) {
			runInAction(() => this.fontFamily = fontFamily as FontFamily);
		}
	}

	public toggleFontFamily(): void {
		this.fontFamily = this.fontFamily === 'Oswald' ? 'Roboto' : 'Oswald';
		saveFontFamily(fontState.fontFamily);
	}

	public removeFontFamily(): void {
		this.fontFamily = 'Oswald';
	}
}

export const fontState = new FontState();

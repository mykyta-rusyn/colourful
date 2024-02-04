import {LocalizationImage, ThemeImage} from '../../domain';

import {loadBackgroundImage, loadImages, removeBackgroundImage, removeImages, saveBackgroundImage, saveLocalizationImages, saveThemeImages} from './actions';

import {action, makeObservable, observable} from 'mobx';

let loaded = false;

class ImageState {
	themeImages?: ThemeImage = undefined;
	localizationImages?: LocalizationImage = undefined;
	backgroundImage?: string = undefined;

	constructor() {
		makeObservable(this, {
			backgroundImage: observable,
			localizationImages: observable,
			themeImages: observable,
			changeBackgroundImage: action,
			changeLocalizationImages: action,
			changeThemeImages: action,
		});

		Promise.allSettled([
			loadImages(),
			loadBackgroundImage()
		]).then(([images, background]) => {
			if (images.status === 'rejected' || background.status === 'rejected') {
				return;
			}

			if (images.value.localizationImage !== undefined) {
				this.changeLocalizationImages(images.value.localizationImage);
			}

			if (images.value.themeImage !== undefined) {
				this.changeThemeImages(images.value.themeImage);
			}

			if (background.value !== null) {
				this.changeBackgroundImage(background.value);
			}
		}).then(() => loaded = true);
	}

	async changeLocalizationImages(localizationImages?: LocalizationImage) {
		this.localizationImages = localizationImages;
		if (!loaded) {
			return;
		}
	
		if (imageState.localizationImages !== undefined) {
			await saveLocalizationImages(imageState.localizationImages);
		} else {
			await removeImages('localization');
		}
	}

	async changeThemeImages(themeImages?: ThemeImage) {
		this.themeImages = themeImages;
		if (!loaded) {
			return;
		}
	
		if (imageState.themeImages !== undefined) {
			await saveThemeImages(imageState.themeImages);
		} else {
			await removeImages('theme');
		}
	}

	async changeBackgroundImage(backgroundImage?: string) {
		this.backgroundImage = backgroundImage;
		if (!loaded) {
			return;
		}
	
		if (imageState.backgroundImage !== undefined) {
			await saveBackgroundImage(imageState.backgroundImage);
		} else {
			await removeBackgroundImage();
		}
	}
}

export const imageState = new ImageState();

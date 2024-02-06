import {LocalizationImage, ThemeImage} from '../../domain';

import {loadBackgroundImage, loadImages, removeBackgroundImage, removeImages, saveBackgroundImage, saveLocalizationImages, saveThemeImages} from './actions';

import {action, makeObservable, observable, runInAction} from 'mobx';

class ImageState {
	public themeImages?: ThemeImage = undefined;
	public localizationImages?: LocalizationImage = undefined;
	public backgroundImage?: string = undefined;

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
				runInAction(() => {
					this.localizationImages = images.value.localizationImage;
				});
			}

			if (images.value.themeImage !== undefined) {
				runInAction(() => {
					this.themeImages = images.value.themeImage;
				});
			}

			if (background.value !== null) {
				runInAction(() => {
					this.backgroundImage = background.value!;
				});
			}
		});
	}

	public async changeLocalizationImages(localizationImages?: LocalizationImage) {
		this.localizationImages = localizationImages;
	
		if (imageState.localizationImages !== undefined) {
			saveLocalizationImages(imageState.localizationImages);
		} else {
			removeImages('localization');
		}
	}

	public async changeThemeImages(themeImages?: ThemeImage) {
		this.themeImages = themeImages;

		if (imageState.themeImages !== undefined) {
			saveThemeImages(imageState.themeImages);
		} else {
			removeImages('theme');
		}
	}

	public async changeBackgroundImage(backgroundImage?: string) {
		this.backgroundImage = backgroundImage;

		if (imageState.backgroundImage !== undefined) {
			saveBackgroundImage(imageState.backgroundImage);
		} else {
			removeBackgroundImage();
		}
	}
}

export const imageState = new ImageState();

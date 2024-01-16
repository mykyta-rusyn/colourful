import React from 'react';

import {saveBackgroundImage, saveImages} from '../actions';
import {ImageType, LocalizationImage, SavedImages, ThemeImage} from '../domain';

import {imageState, useAppDispatch, useAppSelector} from '@colourful/states';

type Images = {
  backgroundImage: string | undefined;
  localizationImage: LocalizationImage | undefined;
  themeImage: ThemeImage | undefined;
	changeBackgroundImage: (image?: string) => void;
	changeImages: (images?: SavedImages | ImageType) => void
}

export const useImages = (): Images => {
	const backgroundImage = useAppSelector(imageState.selectors.backgroundImage);
	const localizationImage = useAppSelector(imageState.selectors.localizationImage);
	const themeImage = useAppSelector(imageState.selectors.themeImage);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (backgroundImage) {
			saveBackgroundImage(backgroundImage);
		}
	}, [backgroundImage]);

	React.useEffect(() => {
		if (localizationImage) {
			saveImages([localizationImage.en, localizationImage.uk], 'language');
		}
	}, [localizationImage]);

	React.useEffect(() => {
		if (themeImage) {
			saveImages([themeImage.dark, themeImage.light], 'theme');
		}
	}, [themeImage]);

	const changeBackgroundImage = React.useCallback((image?: string) => {
		dispatch(imageState.actions.changeBackgroundImage(image));
	}, [dispatch]);

	const changeImages = React.useCallback((images?: SavedImages | ImageType) => {
		dispatch(imageState.actions.changeImages(images));
	}, [dispatch]);

	return {
		backgroundImage,
		localizationImage,
		themeImage,
		changeBackgroundImage,
		changeImages,
	};
};
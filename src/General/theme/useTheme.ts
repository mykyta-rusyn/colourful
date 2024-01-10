import React from 'react';

import {ChangeColor, FontFamily, Fonts, SavedImages, ThemeColors, ThemeType} from '../domain';

import {fonts} from './fonts';

import {globalState, useAppDispatch, useAppSelector} from '@colourful/states';

type Theme = {
	activeFont: Fonts[FontFamily];
	backgroundImage: string | undefined;
	fontFamily: FontFamily;
	colors: ThemeColors;
	theme: ThemeType;
	changeTheme: (theme: ThemeType) => void;
	toggleTheme: () => void;
	changeColor: (options?: ChangeColor) => void;
	toggleFontFamily: () => void;
	changeImages: (images?: SavedImages) => void;
	changeBackgroundImage: (image?: string) => void
}

export function useTheme(): Theme {
	const theme = useAppSelector(globalState.selectors.theme);
	const colors = useAppSelector(globalState.selectors.colors);
	const fontFamily = useAppSelector(globalState.selectors.fontFamily);
	const backgroundImage = useAppSelector(globalState.selectors.backgroundImage);
	const activeFont = React.useMemo(() => fonts[fontFamily], [fontFamily]);
	const dispatch = useAppDispatch();

	const changeTheme = React.useCallback((theme: ThemeType) => {
		dispatch(globalState.actions.changeTheme(theme));
	}, [dispatch]);

	const toggleTheme = React.useCallback(() => {
		dispatch(globalState.actions.toggleTheme());
	}, [dispatch]);

	const changeColor = React.useCallback((options?: ChangeColor) => {
		dispatch(globalState.actions.changeColor(options));
	}, [dispatch]);

	const toggleFontFamily = React.useCallback(() => {
		dispatch(globalState.actions.toggleFontFamily());
	}, [dispatch]);

	const changeBackgroundImage = React.useCallback((image?: string) => {
		dispatch(globalState.actions.changeBackgroundImage(image));
	}, [dispatch]);

	const changeImages = React.useCallback((images?: SavedImages) => {
		if (!images) {
			dispatch(globalState.actions.clearImages());

			return;
		}

		if (images.localize !== undefined) {
			dispatch(globalState.actions.changeImages({
				flow: 'localize',
				localizationImage: images.localize
			}));
		}

		if (images.theme !== undefined) {
			dispatch(globalState.actions.changeImages({
				flow: 'theme',
				themeImage: images.theme
			}));
		}
	}, [dispatch]);

	return {
		activeFont,
		backgroundImage,
		colors,
		fontFamily,
		theme,
		changeImages,
		changeTheme,
		toggleFontFamily,
		toggleTheme,
		changeColor,
		changeBackgroundImage
	};
}

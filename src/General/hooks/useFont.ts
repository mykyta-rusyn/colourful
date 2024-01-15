import React from 'react';

import {saveFontFamily} from '../actions';
import {FontFamily, Fonts} from '../domain';
import {Theme} from '../theme';

import {fontState, useAppDispatch, useAppSelector} from '@colourful/states';

type Font = {
	activeFont: Fonts[FontFamily];
	fontFamily: FontFamily;
	toggleFontFamily: () => void;
	setFontFamily: (fontFamily?: FontFamily) => void
}

export const useFont = (): Font => {
	const fontFamily = useAppSelector(fontState.selectors.fontFamily);
	const activeFont = React.useMemo(() => Theme.fonts[fontFamily], [fontFamily]);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		saveFontFamily(fontFamily);
	}, [fontFamily]);

	const toggleFontFamily = React.useCallback(() => {
		dispatch(fontState.actions.toggleFontFamily());
	}, [dispatch]);

	const setFontFamily = React.useCallback((fontFamily?: FontFamily) => {
		dispatch(fontState.actions.setFontFamily(fontFamily));
	}, [dispatch]);

	return {
		activeFont,
		fontFamily,
		setFontFamily,
		toggleFontFamily
	};
};
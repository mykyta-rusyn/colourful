import React from 'react';

import {saveTheme} from '../actions';
import {ChangeColor, ThemeColors, ThemeType} from '../domain';

import {themeState, useAppDispatch, useAppSelector} from '@colourful/states';

type Theme = {
	colors: ThemeColors;
	theme: ThemeType;
	changeTheme: (theme: ThemeType) => void;
	toggleTheme: () => void;
	changeColor: (options?: ChangeColor) => void
}

export function useTheme(): Theme {
	const theme = useAppSelector(themeState.selectors.theme);
	const colors = useAppSelector(themeState.selectors.colors);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		saveTheme(theme);
	}, [theme]);

	const changeTheme = React.useCallback((theme: ThemeType) => {
		dispatch(themeState.actions.changeTheme(theme));
	}, [dispatch]);

	const toggleTheme = React.useCallback(() => {
		dispatch(themeState.actions.toggleTheme());
	}, [dispatch]);

	const changeColor = React.useCallback((options?: ChangeColor) => {
		dispatch(themeState.actions.changeColor(options));
	}, [dispatch]);

	return {
		colors,
		theme,
		changeTheme,
		toggleTheme,
		changeColor,
	};
}

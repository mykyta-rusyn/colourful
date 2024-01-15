import {Actions, Selectors, State} from './types';

import {createSlice} from '@reduxjs/toolkit';

const initialState: State = {
	fontFamily: 'Oswald',
};

const fontSlice = createSlice<State, Actions, 'fontSlice'>({
	name: 'fontSlice',
	initialState,
	reducers: {
		toggleFontFamily(state) {
			state.fontFamily = state.fontFamily === 'Oswald' ? 'Roboto' : 'Oswald';
		},
		setFontFamily(state, action) {
			state.fontFamily = action.payload ?? initialState.fontFamily;
		},
	},
});

export const fontReducer = fontSlice.reducer;

type Slice = {
	actions: typeof fontSlice.actions;
	selectors: Selectors
}

export const fontState: Slice = {
	actions: fontSlice.actions,
	selectors: {
		fontFamily(state) {
			return state.fontReducer.fontFamily;
		},
	}
};

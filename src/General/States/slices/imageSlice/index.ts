import {Actions, Selectors, State} from './types';

import {createSlice} from '@reduxjs/toolkit';

const initialState: State = {};

const imageSlice = createSlice<State, Actions, 'imageSlice'>({
	name: 'imageSlice',
	initialState,
	reducers: {
		changeImages(state, action) {
			function removeLocalization() {
				state.localizationImage = initialState.localizationImage;
			}

			function removeTheme() {
				state.themeImage = initialState.themeImage;
			}

			if (typeof action.payload === 'string' || typeof action.payload === 'undefined') {
				if (!action.payload) {
					removeLocalization();
					removeTheme();
				} else if (action.payload === 'language') {
					removeLocalization();
				} else {
					removeTheme();
				}

				require('@colourful/general').removeImages(action.payload);

				return;
			}

			if (action.payload.flow === 'localize') {
				state.localizationImage = action.payload.localizationImage;
			} else {
				state.themeImage = action.payload.themeImage;
			}
		},
		changeBackgroundImage(state, action) {
			state.backgroundImage = action.payload ?? initialState.backgroundImage;
		},
	},
});

export const imageReducer = imageSlice.reducer;

type Slice = {
	actions: typeof imageSlice.actions;
	selectors: Selectors
}

export const imageState: Slice = {
	actions: imageSlice.actions,
	selectors: {
		localizationImage(state) {
			return state.imageReducer.localizationImage;
		},
		themeImage(state) {
			return state.imageReducer.themeImage;
		},
		backgroundImage(state) {
			return state.imageReducer.backgroundImage;
		},
	}
};

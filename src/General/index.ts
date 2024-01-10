export * from './actions';
export * from './components';
export * from './domain';
export * from './localization';
export {useTheme} from './theme';
import {
	fonts,
	loadFonts,
	styles,
	windowSize
} from './theme';

export const Theme = {
	styles,
	windowSize,
	fonts,
	loadFonts
};

import {StyleSheet} from 'react-native';

import {Theme} from '../../theme';

const width = Theme.windowSize.width * 0.4;

export const styles = StyleSheet.create({
	root: {
		gap: 16,
	},
	image: {
		alignSelf: 'center',
		height: width,
		width,
		borderWidth: 1,
		borderRadius: 15
	}
});

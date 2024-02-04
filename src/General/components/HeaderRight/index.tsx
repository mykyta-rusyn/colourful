import React from 'react';
import {View} from 'react-native';

import {LanguageButton} from './LanguageButton';
import {styles} from './sharedStyles';
import {ThemeButton} from './ThemeButton';

import {Observer} from 'mobx-react-lite';

export const HeaderRight: React.FC = () => {
	return (
		
		<View style={styles.root}>
			<Observer>
				{ThemeButton}
			</Observer>
			<LanguageButton />
		</View>
	);
};

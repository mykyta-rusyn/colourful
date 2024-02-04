import React from 'react';
import {View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {Button} from '../Button';

import {styles} from './styles';

import {themeState} from '@colourful/state';

type Props = {
	title: string;
	pickImage: (index: number) => void;
	image?: string;
	index: number
}

export const ImagePicker: React.FC<Props> = (props) => {

	function onPress() {
		props.pickImage(props.index);
	}

	return (
		<View style={styles.root}>
			<Button
				title={props.title}
				onPress={onPress}
			/>
			{props.image !== undefined ? (
				<Animated.Image
					entering={FadeIn}
					exiting={FadeOut}
					source={{uri: props.image}}
					style={[
						styles.image,
						{borderColor: themeState.colors.border}
					]}
				/>
			) : null}
		</View>
	);
};

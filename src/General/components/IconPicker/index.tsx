import React from 'react';
import {ImageStyle, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {useTheme} from '../../theme';
import {Button} from '../Button';

import {styles} from './styles';

type Props = {
	title: string;
	pickImage: (index: number) => void;
	image?: string;
	index: number
}

export const ImagePicker: React.FC<Props> = (props) => {
	const {colors} = useTheme();
	const imageStyle = React.useMemo(() => (
		StyleSheet.flatten<ImageStyle>([styles.image, {
			borderColor: colors.border
		}])
	), [colors.border]);
	const isImage = React.useMemo(() => props.image !== undefined, [props.image]);

	function onPress() {
		props.pickImage(props.index);
	}

	return (
		<View style={styles.root}>
			<Button
				title={props.title}
				onPress={onPress}
			/>
			{isImage ? (
				<Animated.Image
					entering={FadeIn}
					exiting={FadeOut}
					source={{uri: props.image}}
					style={imageStyle}
				/>
			) : null}
		</View>
	);
};

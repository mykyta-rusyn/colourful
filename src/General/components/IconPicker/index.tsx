import React from 'react';
import {Image, ImageStyle, StyleSheet, View} from 'react-native';

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
				<Image
					source={{uri: props.image}}
					style={imageStyle}
				/>
			) : null}
		</View>
	);
};

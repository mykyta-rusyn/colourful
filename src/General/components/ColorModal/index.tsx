import React from 'react';
import {Modal, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {useLocal} from '../../localization';
import {Button} from '../Button';

import {styles} from './styles';

import ColorPicker, {HueSlider, OpacitySlider, Panel1, PreviewText, returnedResults} from 'reanimated-color-picker';

type Props = {
	initialColor: string | undefined | null;
	onSave: (color: string) => void
}

export const ColorModal: React.FC<Props> = React.memo((props) => {
	const {t} = useLocal();
	const selectedColor = useSharedValue(props.initialColor ?? '#FFFFFF');
	
	const backgroundColorStyle = useAnimatedStyle(() => ({
		backgroundColor: selectedColor.value,
	}));

	const onSaveModal = React.useCallback(() => {
		props.onSave(selectedColor.value);
	}, [props, selectedColor]);

	const onChange = React.useCallback((colors: returnedResults) => {
		selectedColor.value = colors.hex;
	}, [selectedColor]);

	React.useEffect(() => {
		if (props.initialColor) {
			selectedColor.value = props.initialColor;
		}
	}, [props.initialColor, selectedColor]);

	return (
		<Modal
			animationType="slide"
			visible={props.initialColor !== undefined}
		>
			<Animated.View style={[styles.root, backgroundColorStyle]}>
				<View style={styles.pickerContainer}>
					<ColorPicker
						boundedThumb
						sliderThickness={25}
						thumbShape="circle"
						thumbSize={24}
						value={selectedColor.value}
						onChange={onChange}
					>
						<Panel1 style={styles.panelStyle} />
						<HueSlider style={styles.sliderStyle} />
						<OpacitySlider style={styles.sliderStyle} />
						<View style={styles.previewTextContainer}>
							<PreviewText style={styles.previewText} />
						</View>
					</ColorPicker>
				</View>

				<View style={styles.buttons}>
					<Button
						title={t('modal_save')}
						onPress={onSaveModal}
					/>
					<Button
						title={t('discard')}
						onPress={onSaveModal}
					/>
				</View>

			</Animated.View>
		</Modal>
	);
});

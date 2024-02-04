import React from 'react';
import {Modal, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {localize} from '../../localization';
import {Theme} from '../../theme';
import {Button} from '../Button';

import {styles} from './styles';

import ColorPicker, {HueSlider, OpacitySlider, Panel1, PreviewText, returnedResults} from 'reanimated-color-picker';

type Props = {
	initialColor: string | undefined | null;
	onSave: (color: string) => void;
	onDiscard: () => void
}

export const ColorModal: React.FC<Props> = (props) => {
	const selectedColor = useSharedValue(props.initialColor ?? '#FFFFFF');
	
	const backgroundColorStyle = useAnimatedStyle(() => ({
		backgroundColor: selectedColor.value,
	}));

	function onSaveModal() {
		props.onSave(selectedColor.value);
	}

	function onChange(colors: returnedResults) {
		selectedColor.value = colors.hex;
	}

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
			<Animated.View style={[Theme.styles.flex1Center, backgroundColorStyle]}>
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
						title={localize('modal_save')}
						onPress={onSaveModal}
					/>
					<Button
						title={localize('discard')}
						onPress={props.onDiscard}
					/>
				</View>

			</Animated.View>
		</Modal>
	);
};

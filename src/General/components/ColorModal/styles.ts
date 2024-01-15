import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	pickerContainer: {
		alignSelf: 'center',
		width: 300,
		backgroundColor: '#000000',
		padding: 20,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	panelStyle: {
		borderRadius: 16,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	sliderStyle: {
		borderRadius: 20,
		marginTop: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	previewTextContainer: {
		paddingTop: 20,
		marginTop: 20,
		borderTopWidth: 1,
		borderColor: '',
	},
	previewText: {
		color:'#707070'
	},
	openButton: {
		width: '100%',
		borderRadius: 20,
		paddingHorizontal: 40,
		paddingVertical: 10,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttons: {
		top: 16,
		marginHorizontal: 16,
		gap: 8
	},
});
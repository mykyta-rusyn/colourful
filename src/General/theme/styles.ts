import {
	Dimensions,
	ImageStyle,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from 'react-native';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

const {width, height} = Dimensions.get('window');

export const windowSize = {width, height};

const raw = {
	absolute: {
		position: 'absolute',
	},
	absoluteFullCenter: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	absoluteFullCenterVertical: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
	},
	rowBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	rowReverseCenter: {
		alignItems: 'center',
		flexDirection: 'row-reverse',
	},
	columnReverseCenter: {
		flexDirection: 'column-reverse',
		alignItems: 'center',
	},
	flex1RowCenter: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	flex1SpaceBetween: {
		flex: 1,
		justifyContent: 'space-between',
	},
	flex1RowFullCenter: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowFullCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	flex1Reverse: {
		flex: 1,
		flexDirection: 'column-reverse',
	},
	borderWidth1: {
		borderWidth: 1,
	},
	flex0: {
		flex: 0,
	},
	flexGrow1: {
		flexGrow: 1,
	},
	flex1: {
		flex: 1,
	},
	flex1End: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	flex1AlignEnd: {
		flex: 1,
		alignItems: 'flex-end',
	},
	flex1AlignStart: {
		flex: 1,
		alignItems: 'flex-start',
	},
	alignSelfEnd: {
		alignSelf: 'flex-end',
	},
	flex1Center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	justCenter: {
		justifyContent: 'center',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerHorizontal: {
		alignItems: 'center',
	},
	flex1CenterVertical: {
		flex: 1,
		justifyContent: 'center',
	},
	flex1FullWidth: {
		flex: 1,
		width,
	},
	fullSize: {
		width,
		height,
	},
	fullWidth: {
		width,
	},
	heightAsWidth: {
		width,
		height: width,
	},
	scroll: {
		flex: 1,
		minHeight: height,
	},
	flexWithSpace: {
		flex: 1,
		justifyContent: 'space-between',
	},
};

const baseStyles = StyleSheet.create(raw as NamedStyles<typeof raw>);

export const styles = StyleSheet.flatten([baseStyles]);

import {StackScreenProps} from '@react-navigation/stack';

export type NavigationParam = {
  HomeScreen: undefined;
	ColorsScreen: undefined;
	IconsScreen: undefined;
	FontsScreen: undefined;
	BackgroundScreen: undefined
};

export type HomeScreenProps = StackScreenProps<NavigationParam, 'HomeScreen'>;
export type ColorsScreenProps = StackScreenProps<NavigationParam, 'ColorsScreen'>;
export type IconsScreenProp = StackScreenProps<NavigationParam, 'IconsScreen'>;
export type FontsScreenProps = StackScreenProps<NavigationParam, 'FontsScreen'>;
export type BackgroundScreenProps = StackScreenProps<NavigationParam, 'BackgroundScreen'>;

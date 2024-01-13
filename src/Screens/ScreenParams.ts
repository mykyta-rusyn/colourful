import {StackScreenProps} from '@react-navigation/stack';

export type NavigationParam = {
  HomeScreen: undefined;
	ColorsScreen: undefined;
	ImagesScreen: undefined;
	FontsScreen: undefined;
	BackgroundScreen: undefined
};

export type HomeScreenProps = StackScreenProps<NavigationParam, 'HomeScreen'>;
export type ColorsScreenProps = StackScreenProps<NavigationParam, 'ColorsScreen'>;
export type ImagesScreenProp = StackScreenProps<NavigationParam, 'ImagesScreen'>;
export type FontsScreenProps = StackScreenProps<NavigationParam, 'FontsScreen'>;
export type BackgroundScreenProps = StackScreenProps<NavigationParam, 'BackgroundScreen'>;

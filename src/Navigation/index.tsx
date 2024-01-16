import React from 'react';
import {DefaultTheme, NavigationContainer, Theme as NavigationTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Background, HeaderButtons, loadBackgroundImage, loadImages, loadSavedFontFamily, loadSavedLang, loadTheme, Theme, useFont, useImages, useLocal, useTheme} from '@colourful/general';
import {BackgroundScreen, ColorsScreen, FontsScreen, HomeScreen, ImagesScreen, NavigationParam} from '@colourful/screens';
import {hideAsync} from 'expo-splash-screen';
import i18n from 'i18next';

const Stack = createStackNavigator<NavigationParam>();
const navTheme: NavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};

export const Navigator: React.FC = () => {
	const {t} = useLocal();
	const {changeTheme, colors} = useTheme();
	const {activeFont, setFontFamily} = useFont();
	const {backgroundImage, changeBackgroundImage, changeImages} = useImages();
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [isLayout, setIsLayout] = React.useState(true);
	const [isFontLoaded, setIsFontLoaded] = React.useState(false);

	React.useEffect(() => {
		Promise.all([
			loadSavedFontFamily(setFontFamily),
			Theme.loadFonts(setIsFontLoaded),
			loadSavedLang(i18n.changeLanguage),
			loadTheme(changeTheme),
			loadImages(changeImages),
			loadBackgroundImage(changeBackgroundImage)
		])
			.then(() => setIsLoaded(true));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (isFontLoaded && isLoaded && isLayout) {
			hideAsync();
		}
	}, [isFontLoaded, isLayout, isLoaded]);

	const onLayout = React.useCallback(() => {
		setIsLayout(true);
	}, []);

	return (
		<Background onLayout={onLayout}>
			<NavigationContainer theme={navTheme}>
				{isFontLoaded
					? <Stack.Navigator
						screenOptions={{
							headerTitleStyle: {
								color: colors.textHeader,
								fontFamily: activeFont.Bold
							},
							headerStyle: {
								backgroundColor: backgroundImage ? 'transparent' : colors.backgroundHeader,
								shadowColor: backgroundImage ? 'transparent' : undefined,
							},
							cardStyle: {
								backgroundColor: backgroundImage ? 'transparent' : colors.background,
							},
							headerRight: HeaderButtons,
						}}
					>
						<Stack.Screen
							component={HomeScreen}
							name='HomeScreen'
							options={{
								headerTitle: t('home_title'),
							}}
						/>
						<Stack.Screen
							component={ColorsScreen}
							name='ColorsScreen'
							options={{
								headerTitle: t('color_title')
							}}
						/>
						<Stack.Screen
							component={ImagesScreen}
							name='ImagesScreen'
							options={{
								headerTitle: t('icons_title')
							}}
						/>
						<Stack.Screen
							component={FontsScreen}
							name='FontsScreen'
							options={{
								headerTitle: t('fonts_title')
							}}
						/>
						<Stack.Screen
							component={BackgroundScreen}
							name='BackgroundScreen'
							options={{
								headerTitle: t('background_title'),
								headerStyle: {
									backgroundColor: colors.backgroundHeader,
								}
							}}
						/>
					</Stack.Navigator>
					: null
				}
			</NavigationContainer>
		</Background>
	);
};

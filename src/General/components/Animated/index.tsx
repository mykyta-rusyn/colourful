import {ImageBackground, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';

export const AnimatedTouchableOpacity
	= Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedImageBackground
	= Animated.createAnimatedComponent(ImageBackground);
	
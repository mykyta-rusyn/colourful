import AsyncStorage from '@react-native-async-storage/async-storage';

export async function clearStorage(): Promise<void> {
	return await AsyncStorage.getAllKeys()
		.then(AsyncStorage.multiRemove);
}

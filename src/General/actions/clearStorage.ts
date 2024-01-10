import AsyncStorage from '@react-native-async-storage/async-storage';

export async function clearStorage(): Promise<void> {
	const keys = await AsyncStorage.getAllKeys();

	return await AsyncStorage.multiRemove(keys);
}

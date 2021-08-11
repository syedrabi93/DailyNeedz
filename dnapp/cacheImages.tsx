import { Image } from "react-native";
import { Asset } from "expo-asset";
export const cacheImages = (images: string[]) => images.map((image: any) => {
	if (typeof image === "string") {
		return Image.prefetch(image);
	}
	return Asset.fromModule(image).downloadAsync();
});

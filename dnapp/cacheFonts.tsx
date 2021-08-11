import * as Font from "expo-font";

export interface Fonts {
    [name: string]: any;
}
export const cacheFonts = (fonts: Fonts[]) => fonts.map((font: Fonts) => Font.loadAsync(font));

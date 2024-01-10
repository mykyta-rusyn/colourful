export type FontFamily = 'Oswald' | 'Roboto';

export type FontWeight = {
	Bold: FontWeightName;
	Light: FontWeightName;
	Medium: FontWeightName;
	Regular: FontWeightName
}

export type Fonts = Record<FontFamily, FontWeight>;
export type FontWeightName = `${FontFamily}-${keyof FontWeight}`;

export type FontToLoad = {
  [Key in FontFamily]: {
    [FontStyle in keyof FontWeight as `${Key}-${FontStyle}`]: FontWeight[FontStyle];
  };
};

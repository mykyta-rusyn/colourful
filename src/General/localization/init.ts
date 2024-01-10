import {useTranslation} from 'react-i18next';

import {Languages, LocalizationKey} from './translations';

import i18n, {StringMap, TFunctionResult, TOptions} from 'i18next';

export type LocalizationOptions<
  TInterpolationMap extends object = StringMap
> = TOptions<TInterpolationMap> | string | undefined;

export type LocalizationFunc<
  TResult extends TFunctionResult = string,
  TInterpolationMap extends object = StringMap,
> = (
  key: LocalizationKey,
  options?: LocalizationOptions<TInterpolationMap>,
) => TResult;

type Localization = {
  changeLanguage: (language: Languages) => void;
  currentLang: Languages;
  t: LocalizationFunc
};

export function useLocal(): Localization {
	const {i18n} = useTranslation();

	return {
		changeLanguage: i18n.changeLanguage,
		currentLang: i18n.language as Languages,
		t: i18n.t
	};
}

export const localize: LocalizationFunc = i18n.t;

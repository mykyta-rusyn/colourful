import {LocalizationKey} from './translations';

import i18next, {StringMap, TFunctionResult, TOptions} from 'i18next';

type LocalizationOptions<
  TInterpolationMap extends object = StringMap
> = TOptions<TInterpolationMap> | string | undefined;

type LocalizationFunc<
  TResult extends TFunctionResult = string,
  TInterpolationMap extends object = StringMap,
> = (
  key: LocalizationKey,
  options?: LocalizationOptions<TInterpolationMap>,
) => TResult;

export const localize: LocalizationFunc = i18next.t;

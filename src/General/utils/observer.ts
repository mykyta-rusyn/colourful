import {inject, IWrappedComponent, observer as observerImpl} from 'mobx-react';

type States = 'themeState' | 'imageState' | 'fontState';

export function observer<T>(
	component: React.FC<T>,
	states?: Array<States>
): React.FC<T> & IWrappedComponent<T> {
	return inject(...states ?? ['fontState', 'imageState', 'themeState'])(observerImpl(component));
}

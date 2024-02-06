import {inject, IWrappedComponent, observer as observerImpl} from 'mobx-react';

export function observer<T>(component: React.FC<T>): React.FC<T> & IWrappedComponent<T> {
	return inject('themeState', 'imageState', 'fontState')(observerImpl(component));
}

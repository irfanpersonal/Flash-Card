'use client';

import store from './store';
import {Provider} from 'react-redux';

interface ReduxStoreProviderProps {
    children: React.ReactNode
}

const ReduxStoreProvider: React.FunctionComponent<ReduxStoreProviderProps> = ({children}) => {
    return (
        <>
            <Provider store={store}>
                {children}
            </Provider>
        </>
    );
}

export default ReduxStoreProvider;
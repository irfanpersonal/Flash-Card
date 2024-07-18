'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from './store';
import {showCurrentUser} from './_features/user/userThunk';
import {Loading} from './_components';
import {setLocation} from './_features/navigation/navigationSlice';

interface GlobalLoadingProps {
    children: React.ReactNode
}

const GlobalLoading: React.FunctionComponent<GlobalLoadingProps> = ({children}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {globalLoading} = useSelector((store: useSelectorType) => store.user);
    React.useEffect(() => {
        dispatch(setLocation(window.location.pathname));
        dispatch(showCurrentUser());
    }, []);
    if (globalLoading) {
        return (
            <Loading position='center' title='Loading Application'/>
        );
    }
    return (
        <>
            {children}
        </>
    );
}

export default GlobalLoading;
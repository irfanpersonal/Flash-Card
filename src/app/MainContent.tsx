'use client';

import React from 'react';
import {useSelector} from 'react-redux';
import {type useSelectorType} from './store';
import {useRouter} from 'next/navigation';

interface MainContentProps {
    children: React.ReactNode
}

const MainContent: React.FunctionComponent<MainContentProps> = ({children}) => {
    const {location} = useSelector((store: useSelectorType) => store.navigation);
    const router = useRouter();
    React.useEffect(() => {
        if (window.location.pathname !== location) {
            router.push(location);
		}
    }, [location]);
    return (
        <>
            {children}
        </>
    );
}

export default MainContent;
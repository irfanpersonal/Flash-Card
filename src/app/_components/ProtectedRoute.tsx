'use client';

import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';
import {useRouter} from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({children}) => {
    const router = useRouter();
    const {user} = useSelector((store: useSelectorType) => store.user);
    if (!user) {
        router.push('/');
    }
    return children;
}

export default ProtectedRoute;
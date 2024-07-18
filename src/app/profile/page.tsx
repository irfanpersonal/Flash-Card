'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {getUserData, logoutUser} from '../_features/user/userThunk';
import {Loading} from '../_components';
import {type UserType} from '../_features/user/userSlice';
import moment from 'moment';
import Image from 'next/image';
import emptyProfilePicture from '../_images/empty-profile-picture.jpg';
import {useRouter} from 'next/navigation';

const ProfilePage: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const router = useRouter();
    const {userDataLoading, logoutUserLoading} = useSelector((store: useSelectorType) => store.user);
    const user = useSelector((store: useSelectorType) => store.user).user as UserType;
    React.useEffect(() => {
        dispatch(getUserData());
    }, []);
    return (
        <div>
            {userDataLoading ? (
                <Loading title='Loading User Data' position='normal' marginTop='1rem'/>
            ) : (
                <div className="flex flex-col items-center">
                    <Image src={emptyProfilePicture} width={150} height={150} alt={user?.name} priority/>
                    <div className='mt-4'>Name: <span>{user?.name}</span></div>
                    <div className='mt-4'>Email: <span>{user?.email}</span></div>
                    <div className='mt-4'>Country: <span>{user?.country}</span></div>
                    <div className="mt-4">Birthday: <span>{moment(user?.birthday).format('MMMM Do YYYY')}</span></div>
                    <button onClick={() => {
                        dispatch(logoutUser());
                        router.push('/');
                    }} className="outline mt-4 px-4 py-2 bg-black text-white" disabled={logoutUserLoading}>{logoutUserLoading ? 'Logging Out...' : 'Logout'}</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
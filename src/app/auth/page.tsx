'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {RegisterBox, LoginBox} from '../_components';
import {toggleAuthType} from '../_features/user/userSlice';
import {redirect} from 'next/navigation';
import {loginUser, registerUser} from '../_features/user/userThunk';

const AuthPage: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {user, authLoading, wantsToRegister} = useSelector((store: useSelectorType) => store.user);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const formData = new FormData();
        if (wantsToRegister) {
            formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
            formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
            formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
            formData.append('country', (target.elements.namedItem('country') as HTMLInputElement).value);
            formData.append('birthday', (target.elements.namedItem('birthday') as HTMLInputElement).value);
            dispatch(registerUser(formData));
            return;
        }
        formData.append('email', (target.elements.namedItem('email') as HTMLInputElement).value);
        formData.append('password', (target.elements.namedItem('password') as HTMLInputElement).value);
        dispatch(loginUser(formData));
    }
    React.useEffect(() => {
        if (user) {
            redirect('/');
        }
    }, [user]);
    return (
        <div>
            <form className='w-1/2 outline p-4 m-auto' onSubmit={handleSubmit}>
                {wantsToRegister ? (
                    <RegisterBox/>
                ) : (   
                    <LoginBox/>
                )}
                <p onClick={() => {
                    dispatch(toggleAuthType());
                }} className='cursor-pointer my-4 text-center'>{wantsToRegister ? 'Have an account?' : `Don't have an account?`}</p>
                <button className='block w-full outline py-2 px-4 select-none' type="submit" disabled={authLoading}>{authLoading ? 'Submitting' : 'Submit'}</button>
            </form>
        </div>
    );
}

export default AuthPage;
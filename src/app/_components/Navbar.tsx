'use client';

import {useSelector} from 'react-redux';
import {type useSelectorType} from '../store';
import Link from 'next/link';

const Navbar: React.FunctionComponent = () => {
    const {user} = useSelector((store: useSelectorType) => store.user);
    return (
        <nav className="p-4 bg-amber-400 flex justify-between font-bold">
            <div>Flash Card</div>
            {user ? (
                <div>
                    <Link href='/'>Home</Link>
                    <Link className="ml-4" href='/add-pack'>Add Pack</Link>
                    <Link className="ml-4" href='/pack'>Packs</Link>
                    <Link className="ml-4" href='/profile'>Profile</Link>
                </div>
            ) : (
                <div>
                    <Link href='/'>Home</Link>
                    <Link href='/auth' className="ml-4">Register/Login</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
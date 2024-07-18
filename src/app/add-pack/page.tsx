'use client';

import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {addPack} from '../_features/pack/packThunk';

const AddPackPage: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {createPackLoading} = useSelector((store: useSelectorType) => store.pack);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
        dispatch(addPack(formData));
    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col outline w-1/2 mx-auto p-4'>
            <h1 className="text-2xl font-bold mb-4 bg-black text-white w-full text-center">Add Pack</h1>
            <div>
                <label className='block' htmlFor="name">Name</label>
                <input className="px-4 py-2 w-full" id="name" type='text' name='name'/>
            </div>
            <button className="outline p-2 bg-black text-white mt-4 w-full" disabled={createPackLoading}>{createPackLoading ? 'Creating' : 'Create'}</button>
        </form>
    );
}

export default AddPackPage;
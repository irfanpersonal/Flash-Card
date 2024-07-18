'use client';

import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {handleSearchChange, setPacksPage} from '../_features/pack/packSlice';
import {getAllPacks} from '../_features/pack/packThunk';

const SearchPacks: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {allPacksData} = useSelector((store: useSelectorType) => store.pack);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setPacksPage(1));
        dispatch(getAllPacks());
    }
    const handleChange = (event: React.FormEvent) => {
        const nameValue = (event.target as HTMLInputElement).value;
        dispatch(handleSearchChange(nameValue));
    }
    return (
        <form onSubmit={handleSubmit} className="outline p-4 mb-4">
            <input className="w-2/3 py-2 px-4" id="name" type="search" name="search" value={allPacksData.search} onChange={handleChange}/>
            <button className="w-1/3 py-2 px-4 bg-black text-white">Search</button>
        </form>
    );
}

export default SearchPacks;
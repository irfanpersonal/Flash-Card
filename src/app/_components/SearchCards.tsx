'use client';

import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {handleSearchChange} from '../_features/card/cardSlice';
import {getAllCardsForPack} from '../_features/card/cardThunk';
import {setCardPage} from '../_features/card/cardSlice';


interface SearchCardsProps {
    id: string
}

const SearchCards: React.FunctionComponent<SearchCardsProps> = ({id}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {allCardData} = useSelector((store: useSelectorType) => store.card);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setCardPage(1));
        dispatch(getAllCardsForPack(id));
    }
    const handleChange = (event: React.FormEvent) => {
        const nameValue = (event.target as HTMLInputElement).value;
        dispatch(handleSearchChange(nameValue));
    }
    return (
        <form onSubmit={handleSubmit} className="outline p-4 my-4">
            <input className="w-2/3 py-2 px-4" id="name" type="search" name="search" value={allCardData.search} onChange={handleChange}/>
            <button className="w-1/3 py-2 px-4 bg-black text-white">Search</button>
        </form>
    );
}

export default SearchCards;
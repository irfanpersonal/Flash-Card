'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {addCard} from '../_features/card/cardThunk';

interface AddCardProps {
    id: string
}

const AddCard: React.FunctionComponent<AddCardProps> = ({id}) => {
    const [wantsToAddCard, setWantsToAddCard] = React.useState<boolean>(false);
    const toggleWantsToAddCard = () => {
        setWantsToAddCard(currentState => {
            return !currentState;
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        const nameValue = (target.elements.namedItem('name') as HTMLInputElement).value;
        const contentValue = (target.elements.namedItem('content') as HTMLTextAreaElement).value;
        formData.append('name', nameValue);
        formData.append('content', contentValue);
        dispatch(addCard({packId: id, data: formData}));
    }
    const dispatch = useDispatch<useDispatchType>();
    const {addCardLoading} = useSelector((store: useSelectorType) => store.card);
    return ( 
        <div>
            {wantsToAddCard ? (
                <form className="outline p-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2" htmlFor='name'>Name</label>
                        <input className="block w-full p-4" id="name" type="text" name="name" required/>
                    </div>
                    <div>
                        <label className="block my-2" htmlFor="content">Content</label>
                        <textarea className="block mb-4 w-full p-4" id="content" name="content" required></textarea>
                    </div>
                    <button className="py-2 px-4 bg-black text-white mr-4" onClick={toggleWantsToAddCard} type="button">Cancel</button>
                    <button className="py-2 px-4 bg-black text-white" type="submit">Add Card</button>
                </form>
            ) : (
                <button onClick={toggleWantsToAddCard} className="py-2 px-4 bg-black text-white mt-4 select-none" disabled={addCardLoading}>{addCardLoading ? 'Adding Card' : 'Add Card'}</button>
            )}
        </div>
    );
}

export default AddCard;
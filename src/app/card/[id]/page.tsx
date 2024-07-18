'use client';

import React from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../../store';
import {Loading} from '../../_components';
import {deleteSingleCard, editSingleCard, getSingleCard} from '../../_features/card/cardThunk';
import {toggleIsEditing} from '../../_features/card/cardSlice';

interface CardPageProps {
    params: {
        id: string
    },
    searchParams: {
        packId: string
    }
}

const CardPage: React.FunctionComponent<CardPageProps> = ({params, searchParams}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {getSingleCardLoading, singleCard, deleteSingleCardLoading, isEditing, editSingleCardLoading} = useSelector((store: useSelectorType) => store.card);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        const nameValue = (target.elements.namedItem('name') as HTMLInputElement).value;
        const contentValue = (target.elements.namedItem('content') as HTMLTextAreaElement).value;
        formData.append('name', nameValue);
        formData.append('content', contentValue);
        dispatch(editSingleCard({packId: searchParams.packId, cardId: params.id, data: formData}));
    }
    React.useEffect(() => {
        dispatch(getSingleCard({packId: searchParams.packId, cardId: params.id}));
    }, []);
    return (
        <div>
            <Link className="bg-black text-white py-2 px-4 select-none" href={`/pack/${searchParams.packId}`}>Back to Pack</Link>
            {getSingleCardLoading ? (
                <Loading title='Loading Single Card' position='normal' marginTop='1rem'/>
            ) : (
                <div>
                    <div>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input className="block py-2 px-4 mt-4 w-full" id="name" type="text" name="name" defaultValue={singleCard!.name} required/>
                                <textarea className="block py-2 px-4 mt-4 w-full resize-none" id="content" name="conten" defaultValue={singleCard!.content} required></textarea>
                                <div className="mt-4">
                                    <button onClick={() => dispatch(toggleIsEditing())} className="py-2 px-4 bg-black text-white select-none mr-4">Cancel</button>
                                    <button className="py-2 px-4 bg-black text-white select-none">Edit</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h1 className="text-center text-3xl font-bold mt-4">{singleCard!.name}</h1>
                                <p className="text-center mt-4 text-2xl font-bold">{singleCard!.content}</p>  
                            </>
                        )}
                    </div>
                    {!isEditing && (
                        <>
                            <button onClick={() => {
                                dispatch(toggleIsEditing());
                            }} className="py-2 px-4 bg-black text-white select-none mr-4">Edit</button>
                            <button onClick={() => {
                                dispatch(deleteSingleCard({packId: searchParams.packId, cardId: params.id}));
                            }} className={`py-2 px-4 bg-black text-white select-none ${isEditing && 'mt-4'}`} disabled={deleteSingleCardLoading}>{deleteSingleCardLoading ? 'Deleting' : 'Delete'}</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardPage;
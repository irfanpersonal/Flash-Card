'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../../store';
import {Loading, AddCard, SearchCards, CardList, PaginationBox} from '../../_components';
import {deleteSinglePack, editSinglePack, getSinglePack} from '../../_features/pack/packThunk';
import Image from 'next/image';
import packImage from '../../_images/pack-image.jpg';
import moment from 'moment';
import {toggleEditingMode} from '@/app/_features/pack/packSlice';
import {getAllCardsForPack} from '@/app/_features/card/cardThunk';
import {setCardPage} from '@/app/_features/card/cardSlice';

interface SinglePackPageProps {
    params: {
        id: string
    }
}

const SinglePackPage: React.FunctionComponent<SinglePackPageProps> = ({params}) => {
    const dispatch = useDispatch<useDispatchType>();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        const nameValue = (target.elements.namedItem('name') as HTMLInputElement).value;
        formData.append('name', nameValue);
        dispatch(editSinglePack({data: formData, id: params.id}));
    }
    const {getSinglePackLoading, singlePack, deleteSinglePackLoading, editSinglePackLoading, isEditing} = useSelector((store: useSelectorType) => store.pack);
    const {getAllCardsForPackLoading, allCardData} = useSelector((store: useSelectorType) => store.card);
    React.useEffect(() => {
        dispatch(getSinglePack(params.id));
        dispatch(getAllCardsForPack(params.id));
    }, []);
    return (
        <div>
            {getSinglePackLoading ? (
                <Loading title='Loading Single Pack' position='normal' marginTop='1rem'/>
            ) : (
                <>
                    <div className='flex items-start'>
                        <div>
                            <Image className="mr-4" src={packImage} width={150} height={150} alt={singlePack!.name} priority/>
                        </div>
                        <div>
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <input className="py-2 px-4" id="name" type="text" name="name" defaultValue={singlePack!.name} required/>
                                    <button className='py-2 px-4 bg-black text-white mr-4 select-none'>{editSinglePackLoading ? 'Saving' : 'Save'}</button>
                                </form>
                            ) : (
                                <h1>{singlePack!.name}</h1>
                            )}
                            <h1 className="mt-4">Created At: {moment(singlePack!.createdAt).format('MMMM Do YYYY')}</h1>
                            <div className='mt-4'>
                                <button className='py-2 px-4 bg-black text-white mr-4 select-none' onClick={() => {
                                    dispatch(toggleEditingMode());
                                }}>{isEditing ? 'Cancel' : 'Edit'}</button>
                                <button className='py-2 px-4 bg-black text-white select-none' onClick={() => {
                                    dispatch(deleteSinglePack(params.id));
                                }} disabled={deleteSinglePackLoading}>{deleteSinglePackLoading ? 'Deleting' : 'Delete'}</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {getAllCardsForPackLoading ? (
                            <Loading title='Loading All Cards for Pack' position='normal' marginTop='1rem'/>
                        ) : (
                            <>
                                <AddCard id={params.id}/>
                                <SearchCards id={params.id}/>
                                <CardList data={allCardData.cards}/>
                                <PaginationBox data={{page: allCardData.page, numberOfPages: allCardData.numberOfPages, setDataPage: setCardPage, searchData: getAllCardsForPack, id: params.id}}/>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default SinglePackPage;
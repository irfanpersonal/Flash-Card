'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {getAllPacks} from '../_features/pack/packThunk';
import {Loading, SearchPacks, PacksList, PaginationBox} from '../_components';
import {setPacksPage} from '../_features/pack/packSlice';

const PackPage: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {getAllPacksLoading, allPacksData} = useSelector((store: useSelectorType) => store.pack);
    React.useEffect(() => {
        dispatch(getAllPacks());
    }, []);
    return (
        <div>
            {getAllPacksLoading ? (
                <Loading title='Loading All Packs' position='normal' marginTop='1rem'/>
            ) : (
                <div>
                    <SearchPacks/>
                    <PacksList data={allPacksData.packs}/>
                    <PaginationBox data={{page: allPacksData.page, numberOfPages: allPacksData.numberOfPages, setDataPage: setPacksPage, searchData: getAllPacks}}/>
                </div>
            )}
        </div>
    );
}

export default PackPage;
'use client';

import {useDispatch} from 'react-redux';
import {type useDispatchType} from '../store';

interface PaginationBoxProps {
    data: {
        page: number | null,
        numberOfPages: number | null,
        setDataPage: Function,
        searchData: Function,
        id?: string
    }
}

const PaginationBox: React.FunctionComponent<PaginationBoxProps> = ({data}) => {
    const dispatch = useDispatch<useDispatchType>();
    return (
        <div className="text-center">
            {Array.from({length: data.numberOfPages!}, (_, index) => {
                return (
                    <button onClick={() => {
                        const selectedValue = index + 1;
                        dispatch(data.setDataPage(selectedValue));
                        dispatch(data.searchData(data.id));
                    }} className={`mr-4 bg-black ${index + 1 === data.page ? 'text-black' : 'text-white'} p-4 select-none ${index + 1 === data.page && 'bg-yellow-300'}`} key={index + 1}>{index + 1}</button>
                );
            })}
        </div>
    );
}

export default PaginationBox;
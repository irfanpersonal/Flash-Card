import {createSlice} from '@reduxjs/toolkit';
import {addPack, getSinglePack, deleteSinglePack} from '../pack/packThunk';
import {getSingleCard, deleteSingleCard} from '../card/cardThunk';

interface INavigate {
    location: string
}

const initialState: INavigate = {
    location: ''
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPack.fulfilled, (state) => {
            state.location = state.location === '/pack' ? '/pack#' : '/pack';
        }).addCase(getSinglePack.rejected, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(deleteSinglePack.fulfilled, (state) => {
            state.location = state.location === '/pack' ? '/pack#' : '/pack';
        }).addCase(getSingleCard.rejected, (state) => {
            state.location = state.location === '/' ? '/#' : '/';
        }).addCase(deleteSingleCard.fulfilled, (state, action) => {
            const packId = action.meta.arg.packId;
            state.location = state.location === `/pack/${packId}` ? `/pack/${packId}#` : `/pack/${packId}`;
        })
    }
});

export const {setLocation} = navigationSlice.actions;

export default navigationSlice.reducer;
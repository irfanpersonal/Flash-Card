import {createSlice} from '@reduxjs/toolkit';
import {addCard, getAllCardsForPack, getSingleCard, deleteSingleCard, editSingleCard} from './cardThunk';
import {toast} from 'react-toastify';

export type CardType = {
    id: string,
    name: string,
    content: string,
    packId: string,
    userId: string,
    createdAt: string,
    updatedAt: string
};

interface ICard {
    getAllCardsForPackLoading: boolean,
    allCardData: {
        search: string,
        page: number | null,
        cards: CardType[],
        totalCards: number | null,
        numberOfPages: number | null
    },
    addCardLoading: boolean,
    getSingleCardLoading: boolean,
    singleCard: CardType | null,
    deleteSingleCardLoading: boolean,
    isEditing: boolean,
    editSingleCardLoading: boolean
}

const initialState: ICard = {
    getAllCardsForPackLoading: true,
    allCardData: {
        search: '',
        page: 1,
        cards: [],
        totalCards: null,
        numberOfPages: null
    },
    addCardLoading: false,
    getSingleCardLoading: true,
    singleCard: null,
    deleteSingleCardLoading: false,
    isEditing: false,
    editSingleCardLoading: false
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardPage: (state, action) => {
            state.allCardData.page = action.payload; 
        },
        handleSearchChange: (state, action) => {
            state.allCardData.search = action.payload;
        },
        toggleIsEditing: (state) => {
            state.isEditing = !state.isEditing;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCardsForPack.pending, (state) => {
            state.getAllCardsForPackLoading = true;
        }).addCase(getAllCardsForPack.fulfilled, (state, action) => {
            state.getAllCardsForPackLoading = false;
            state.allCardData.cards = action.payload.cards;
            state.allCardData.totalCards = action.payload.totalCards;
            state.allCardData.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllCardsForPack.rejected, (state, action) => {
            state.getAllCardsForPackLoading = false;
        }).addCase(addCard.pending, (state) => {
            state.addCardLoading = true;
        }).addCase(addCard.fulfilled, (state, action) => {
            state.addCardLoading = false;
            toast.success('Added Card!');
        }).addCase(addCard.rejected, (state, action) => {
            state.addCardLoading = false;
            toast.error(action.payload as string);
        }).addCase(getSingleCard.pending, (state) => {
            state.getSingleCardLoading = true;
        }).addCase(getSingleCard.fulfilled, (state, action) => {
            state.getSingleCardLoading = false;
            state.singleCard = action.payload;
        }).addCase(getSingleCard.rejected, (state, action) => {
            state.getSingleCardLoading = true;
            toast.error(action.payload as string);
        }).addCase(deleteSingleCard.pending, (state) => {
            state.deleteSingleCardLoading = true;
        }).addCase(deleteSingleCard.fulfilled, (state, action) => {
            state.deleteSingleCardLoading = false;
            toast.success('Deleted Card!');
        }).addCase(deleteSingleCard.rejected, (state, action) => {
            state.deleteSingleCardLoading = false;
            toast.error(action.payload as string);
        }).addCase(editSingleCard.pending, (state) => {
            state.editSingleCardLoading = true;
        }).addCase(editSingleCard.fulfilled, (state, action) => {
            state.editSingleCardLoading = false;
            state.singleCard!.name = action.payload.name;
            state.singleCard!.content = action.payload.content;
            state.isEditing = false;
            toast.success('Edited Card!');
        }).addCase(editSingleCard.rejected, (state, action) => {
            state.editSingleCardLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {setCardPage, handleSearchChange, toggleIsEditing} = cardSlice.actions;

export default cardSlice.reducer;
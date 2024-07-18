import {createSlice} from '@reduxjs/toolkit';
import {type UserType} from '../user/userSlice';
import {addPack, getAllPacks, getSinglePack, deleteSinglePack, editSinglePack} from './packThunk';
import {toast} from 'react-toastify';

export type PackType = {
    id: string,
    name: string,
    userId: string,
    user: UserType
    createdAt: string,
    updatedAt: string
}

interface IPack {
    createPackLoading: boolean,
    getAllPacksLoading: boolean,
    allPacksData: {
        search: string,
        page: number | null,
        packs: PackType[],
        totalPacks: number | null,
        numberOfPages: number | null
    },
    getSinglePackLoading: boolean,
    singlePack: PackType | null,
    deleteSinglePackLoading: boolean,
    isEditing: boolean,
    editSinglePackLoading: boolean
}

const initialState: IPack = {
    createPackLoading: false,
    getAllPacksLoading: true,
    allPacksData: {
        search: '',
        page: 1,
        packs: [],
        totalPacks: null,
        numberOfPages: null
    },
    getSinglePackLoading: true,
    singlePack: null,
    deleteSinglePackLoading: false,
    isEditing: false,
    editSinglePackLoading: false
};

const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {
        handleSearchChange: (state, action) => {
            state.allPacksData.search = action.payload;
        },
        setPacksPage: (state, action) => {
            state.allPacksData.page = action.payload;
        },
        toggleEditingMode: (state) => {
            state.isEditing = !state.isEditing;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPack.pending, (state) => {
            state.createPackLoading = true;
        }).addCase(addPack.fulfilled, (state) => {
            state.createPackLoading = false;
            toast.success('Created Pack!');
        }).addCase(addPack.rejected, (state, action) => {
            state.createPackLoading = false;
            toast.error(action.payload as string);
        }).addCase(getAllPacks.pending, (state) => {
            state.getAllPacksLoading = true;
        }).addCase(getAllPacks.fulfilled, (state, action) => {
            state.getAllPacksLoading = false;
            state.allPacksData.packs = action.payload.packs;
            state.allPacksData.totalPacks = action.payload.totalPacks;
            state.allPacksData.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllPacks.rejected, (state) => {
            state.getAllPacksLoading = false;
        }).addCase(getSinglePack.pending, (state) => {
            state.getSinglePackLoading = true;
        }).addCase(getSinglePack.fulfilled, (state, action) => {
            state.getSinglePackLoading = false;
            state.singlePack = action.payload;
        }).addCase(getSinglePack.rejected, (state) => {
            state.getSinglePackLoading = true;
        }).addCase(deleteSinglePack.pending, (state) => {
            state.deleteSinglePackLoading = true;
        }).addCase(deleteSinglePack.fulfilled, (state, action) => {
            state.deleteSinglePackLoading = false;
            toast.success('Deleted Pack!');
        }).addCase(deleteSinglePack.rejected, (state, action) => {
            state.deleteSinglePackLoading = false;
            toast.error(action.payload as string);
        }).addCase(editSinglePack.pending, (state) => {
            state.editSinglePackLoading = true;
        }).addCase(editSinglePack.fulfilled, (state, action) => {
            state.editSinglePackLoading = false;
            state.singlePack!.name = action.payload.name;
            state.isEditing = false;
            toast.success('Edited Pack!');
        }).addCase(editSinglePack.rejected, (state, action) => {
            state.editSinglePackLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {handleSearchChange, setPacksPage, toggleEditingMode} = packSlice.actions;

export default packSlice.reducer;
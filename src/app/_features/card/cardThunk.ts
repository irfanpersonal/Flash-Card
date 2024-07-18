import {createAsyncThunk} from '@reduxjs/toolkit';
import {useSelectorType} from '../../store';
import axios from 'axios';

export const getAllCardsForPack = createAsyncThunk('card/getAllCardsForPack', async(packId: string, thunkAPI) => {
    try {
        const {allCardData} = (thunkAPI.getState() as useSelectorType).card;
        const response = await axios.get(`/api/v1/pack/${packId}/card?name=${allCardData.search}&page=${allCardData.page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addCard = createAsyncThunk('card/addCard', async(inputData: {packId: string, data: FormData}, thunkAPI) => {
    try {
        const response = await axios.post(`/api/v1/pack/${inputData.packId}/card`, inputData.data);
        const data = response.data;
        thunkAPI.dispatch(getAllCardsForPack(inputData.packId));
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleCard = createAsyncThunk('card/getSingleCard', async(inputData: {packId: string, cardId: string}, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/pack/${inputData.packId}/card/${inputData.cardId}`);
        const data = response.data;
        return data.card;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSingleCard = createAsyncThunk('card/deleteSingleCard', async(inputData: {packId: string, cardId: string}, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/pack/${inputData.packId}/card/${inputData.cardId}`);
        const data = response.data;
        thunkAPI.dispatch(getAllCardsForPack(inputData.packId));
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSingleCard = createAsyncThunk('card/editSingleCard', async(inputData: {packId: string, cardId: string, data: FormData}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/pack/${inputData.packId}/card/${inputData.cardId}`, inputData.data);
        const data = response.data;
        return data.card;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
import {createAsyncThunk} from '@reduxjs/toolkit';
import {useSelectorType} from '../../store';
import axios from 'axios';

export const addPack = createAsyncThunk('pack/addPack', async(packData: FormData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/pack', packData);
        const data = response.data;
        return data.pack;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getAllPacks = createAsyncThunk('pack/getAllPacks', async(_, thunkAPI) => {
    try {
        const {allPacksData} = (thunkAPI.getState() as useSelectorType).pack;
        const response = await axios.get(`/api/v1/pack?name=${allPacksData.search}&page=${allPacksData.page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSinglePack = createAsyncThunk('pack/getSinglePack', async(packId: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/pack/${packId}`);
        const data = response.data;
        return data.pack;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSinglePack = createAsyncThunk('pack/deleteSinglePack', async(packId: string, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/pack/${packId}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSinglePack = createAsyncThunk('pack/editSinglePack', async(inputData: {data: FormData, id: string}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/pack/${inputData.id}`, inputData.data);
        const data = response.data;
        return data.pack;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
import {createSlice} from '@reduxjs/toolkit';
import {showCurrentUser, registerUser, loginUser, getUserData, logoutUser} from './userThunk';
import {toast} from 'react-toastify';

export type UserType = {
    id: string,
    name: string,
    email: string,
    country: string,
    birthday: string
}

interface IUser {
    globalLoading: boolean,
    user: UserType | null,
    authLoading: boolean,
    wantsToRegister: boolean,
    logoutUserLoading: boolean,
    userDataLoading: boolean
}

const initialState: IUser = {
    globalLoading: true,
    user: null,
    authLoading: false,
    wantsToRegister: true,
    logoutUserLoading: false,
    userDataLoading: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleAuthType: (state) => {
            state.wantsToRegister = !state.wantsToRegister;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(showCurrentUser.pending, (state) => {
            state.globalLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action) => {
            state.globalLoading = false;
            state.user = action.payload;
        }).addCase(showCurrentUser.rejected, (state) => {
            state.globalLoading = false;
        }).addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
        }).addCase(registerUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
        }).addCase(loginUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(getUserData.pending, (state) => {
            state.userDataLoading = true;
        }).addCase(getUserData.fulfilled, (state, action) => {
            state.userDataLoading = false;
            state.user = action.payload;
        }).addCase(getUserData.rejected, (state) => {
            state.userDataLoading = false;
        }).addCase(logoutUser.pending, (state) => {
            state.logoutUserLoading = true;
        }).addCase(logoutUser.fulfilled, (state) => {
            state.logoutUserLoading = false;
            state.user = null;
        }).addCase(logoutUser.rejected, (state, action) => {
            state.logoutUserLoading = false;
            toast.error(action.payload as string);
        })
    }
});

export const {toggleAuthType} = userSlice.actions;

export default userSlice.reducer;
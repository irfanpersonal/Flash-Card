import {configureStore} from '@reduxjs/toolkit';
import navigationSlice from './_features/navigation/navigationSlice';
import userSlice from './_features/user/userSlice';
import packSlice from './_features/pack/packSlice';
import cardSlice from './_features/card/cardSlice';

const store = configureStore({
    reducer: {
        navigation: navigationSlice,
        user: userSlice,
        pack: packSlice,
        card: cardSlice
    }
});

export type useDispatchType = typeof store.dispatch;

export type useSelectorType = ReturnType<typeof store.getState>;

export default store;
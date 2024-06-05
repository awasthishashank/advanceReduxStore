import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correctly importing redux-thunk
import uiReducer from './ui-Slice';
import cartReducer from './cart-Slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;

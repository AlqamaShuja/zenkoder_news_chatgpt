import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Slices/auth.slice';
import NewsSlice from "./Slices/news.slice";
import SubsReducer from './Slices/subs.slice';

const rootReducer = combineReducers({
    auth: AuthReducer,
    subscription: SubsReducer,
    news: NewsSlice
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
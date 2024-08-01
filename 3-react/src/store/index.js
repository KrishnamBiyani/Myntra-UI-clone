import {configureStore} from "@reduxjs/toolkit"
import itemsSlice from "./itemsSlice"
import fetchStausSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";

const myntraStore=configureStore({
    reducer:{
        items:itemsSlice.reducer,
        fetchStatus:fetchStausSlice.reducer,
        bag:bagSlice.reducer
    }
});

export default myntraStore;
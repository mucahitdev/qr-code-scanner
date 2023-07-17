import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    saveHistory: boolean;
    saveLocalStorage: boolean;
}

const initialState: AuthState = {
    saveHistory: true,
    saveLocalStorage: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSaveHistory: (state, action: PayloadAction<boolean>) => {
            state.saveHistory = action.payload;
        }
    }
});

export const { setSaveHistory } = authSlice.actions;

export default authSlice.reducer;
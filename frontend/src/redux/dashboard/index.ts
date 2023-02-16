import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stats } from "./dashboardThunk";

interface AuthState {
    stats: {
        loading: boolean;
        pending: number;
        processing: number;
        intransit: number;
        delivered: number;
    };
}

const initialState: AuthState = {
    stats: {
        loading: false,
        pending: 0,
        processing: 0,
        intransit: 0,
        delivered: 0
    },
};

const slice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(stats.pending, state => {
                state.stats.loading = true;
            })
            .addCase(stats.fulfilled, (state, action) => {
                state.stats.loading = false;
                state.stats = {
                    loading: false,
                    ...action.payload
                }
            })
            .addCase(stats.rejected, state => {
                state.stats.loading = false;
            });
    },
});

const { reducer, actions } = slice;

// export const { updateAuth, logOut } = actions

export default reducer;

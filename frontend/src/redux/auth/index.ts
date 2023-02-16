import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, getUsers } from "./authThunk";

export interface User {
    id: string;
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordType: "TEMP" | "PERM";
    role: "ADMIN" | "SUPERADMIN";
    status: "ACTIVE" | "BLOCKED";
    createdAt: Date;
    updatedAt: Date;
}

interface AuthState {
    isLoading: boolean;
    processing: boolean;
    isAuth: boolean;
    user: User | null;
    users: User[];
}

const initialState: AuthState = {
    isLoading: false,
    processing: false,
    isAuth: false,
    user: null,
    users: [],
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAuth: (state: AuthState, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        logOut: (state: AuthState) => {
            state.isAuth = false;
            sessionStorage.clear();
        },
    },
    extraReducers(builder) {
        builder
            // .addCase(register.pending, state => {
            //     state.processing = true;
            // })
            // .addCase(register.fulfilled, (state, action) => {
            //     state.processing = false;
            //     state.isAuth = true;
            //     state.user = action.payload;
            // })
            // .addCase(register.rejected, state => {
            //     state.processing = false;
            //     state.isAuth = false;
            // })
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, state => {
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(getUsers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, state => {
                state.isLoading = false;
                state.users = [];
            });
        // .addCase(socioLogin.pending, (state) => {
        //     state.isAuth = false;
        //     state.isLoading = true;
        // })
        // .addCase(socioLogin.fulfilled, (state, action) => {
        //     state.isAuth = true;
        //     state.user = action.payload;
        //     state.isLoading = false;
        // })
        // .addCase(socioLogin.rejected, (state) => {
        //     state.isAuth = false;
        //     state.isLoading = false;
        // })
        // .addCase(logOut.fulfilled, state => {
        //     state.isAuth = false;
        //     state.user = null;
        //     state.processing = false;
        // })
        // .addCase(updateProfile.pending, state => {
        //     state.processing = true;
        // })
        // .addCase(updateProfile.fulfilled, (state, action) => {
        //     state.processing = false;
        //     state.user = { ...state.user, ...action.payload };
        // })
        // .addCase(updateProfile.rejected, state => {
        //     state.processing = false;
        // });
    },
});

const { reducer, actions } = slice;

export const { updateAuth, logOut } = actions;

export default reducer;

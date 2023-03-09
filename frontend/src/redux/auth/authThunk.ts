import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { httpRequest } from "redux/http";
import { updateAuth } from ".";

export const login = createAsyncThunk(
    "auth/login",
    async (data: { userName: string; password: string }, { rejectWithValue, dispatch }): Promise<any> => {
        try {
            const result = await httpRequest({ url: "auth/login", method: "POST", body: data });
            if (!result.status) throw new Error(result.message);

            notification.success({ message: "Login Sucessful" });
            sessionStorage.setItem("x-access-token", result.data.token);

            setTimeout(() => {
                dispatch(updateAuth(true));
            }, 1000);

            return result.data.user;
        } catch ({ message }) {
            notification.error({ message: "Login Failed", description: message });
            return rejectWithValue("oops !!! something went wrong, please try again.");
        }
    }
);

type ChangePasswordPayload = {
    data: { oldpassword: string; newpassword: string };
    successFuc: () => void;
};

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ data, successFuc }: ChangePasswordPayload, { rejectWithValue }): Promise<any> => {
        try {
            const result = await httpRequest({ url: "auth/change-password", method: "PATCH", body: data });
            if (!result.status) throw new Error(result.message);

            notification.success({ message: "Password Changed Successfully" });

            successFuc();

            console.log('result ', result);

            return result;
        } catch ({ message }) {
            notification.error({ message: "Operation Failed", description: message });
            return rejectWithValue("oops !!! something went wrong, please try again.");
        }
    }
);

export const getUsers = createAsyncThunk("auth/users", async (_, { rejectWithValue }): Promise<any> => {
    try {
        const result = await httpRequest({ url: "auth/users" });
        return result.data;
    } catch ({ message }) {
        return rejectWithValue("oops !!! something went wrong, please try again.");
    }
});

// export const updateProfile = createAsyncThunk(
//     "auth/updateProfile",
//     async ({ userId, data }: { userId: any; data: any }, { rejectWithValue }): Promise<any> => {
//         try {
//             let result = await Auth.updateProfile(userId, data);
//             notification.success({ placement: "top", message: "Changes saved sucessfully" });
//             return result;
//         } catch (err: any) {
//             notification.error({
//                 message: "An error occurred",
//                 description: "oops !!! something went wrong, please try again.",
//             });
//             return rejectWithValue("oops !!! something went wrong, please try again.");
//         }
//     }
// );

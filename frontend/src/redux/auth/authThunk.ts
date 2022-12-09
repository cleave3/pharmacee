import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { httpRequest } from "redux/http";
import { updateAuth } from ".";
// import { Auth } from "../../firebase/auth";
// import { RegisterInput, LoginInput } from "../../firebase/types";
import { formatError } from "../../utils";

// export const register = createAsyncThunk(
//     "auth/register",
//     async (data: RegisterInput, { rejectWithValue }): Promise<any> => {
//         try {
//             let result = await Auth.signUpWithEmailAndPassword(data);
//             notification.success({ placement: "top", message: "Registration Sucessful" });
//             return result;
//         } catch (error: any) {
//             notification.error({ message: "Registration Failed", description: formatError(error.code) });
//             return rejectWithValue("oops !!! something went wrong, please try again.");
//         }
//     }
// );

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

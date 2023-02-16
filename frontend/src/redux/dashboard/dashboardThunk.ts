import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "redux/http";

export const stats = createAsyncThunk("dashboard/stats", async (_, { rejectWithValue }): Promise<any> => {
    try {
        const result = await httpRequest({ url: "inventory/stats" });
        return result.data;
    } catch ({ message }) {
        return rejectWithValue("oops !!! something went wrong, please try again.");
    }
});

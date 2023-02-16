import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "redux/http";
import { mapFilter } from "utils";
import { InventoryState } from ".";

export const getInventory = createAsyncThunk(
    "inventory/getInventory",
    async (filter: InventoryState["filter"], { rejectWithValue }): Promise<any> => {
        try {
            const query = mapFilter(filter);
            const result = await httpRequest({ url: `inventory${query}` });
            return result.data;
        } catch ({ message }) {
            return rejectWithValue("oops !!! something went wrong, please try again.");
        }
    }
);

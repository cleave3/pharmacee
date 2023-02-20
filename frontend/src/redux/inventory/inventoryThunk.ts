import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { httpRequest } from "redux/http";
import { mapFilter } from "utils";
import { InventoryPayload, InventoryState } from ".";

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

export const saveItem = createAsyncThunk(
    "inventory/saveItem",
    async (
        { data, successFuc }: { data: InventoryPayload; successFuc: () => void },
        { rejectWithValue }
    ): Promise<any> => {
        try {
            const result = await httpRequest({ url: `inventory/add`, method: "POST", body: data });

            console.log('result ', result);

            if (!result.status) throw new Error(result.message);

            successFuc();

            notification.success({ message: "Item added successfully" });

            return result.data;
        } catch ({ message }) {
            console.log("message ", message);
            notification.error({ message, description: "oops !!! something went wrong, please try again." });
            return rejectWithValue("oops !!! something went wrong, please try again.");
        }
    }
);
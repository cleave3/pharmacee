import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../auth";
import { getInventory, saveItem } from "./inventoryThunk";

export type InventoryPayload = {
    title: string;
    fee: number;
    senderName: string;
    senderPhone: string;
    senderAddress: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    description: string;
    comment: string;
};

export type Inventory = {
    id: number;
    title: string;
    trackingId: string;
    status: string;
    payment: string;
    fee: number;
    senderName: string;
    senderPhone: string;
    senderAddress: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    description: string;
    comment: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    creator: User;
    inventoryHistory: {
        id: number;
        inventoryId: number;
        status: string;
        comment: string;
        userId: string;
        createdAt: string;
        initiator: User;
    }[];
};

export interface InventoryState {
    isLoading: boolean;
    isProcessing: boolean;
    page: number;
    limit: number;
    loaded: number;
    total: number;
    filter: {
        page: number;
        limit: number;
        trackingId: string;
        status: string;
        userId: string;
        title: string;
        start: string;
        end: string;
        otherFilter: string;
        payment: string;
    };
    inventory: Inventory[];
    selected?: Inventory;
    showForm: boolean;
}

const initialState: InventoryState = {
    isLoading: false,
    isProcessing: false,
    page: 1,
    limit: 10,
    loaded: 0,
    total: 0,
    filter: {
        page: 1,
        limit: 10,
        trackingId: "",
        status: "",
        userId: "",
        title: "",
        start: "",
        end: "",
        otherFilter: "",
        payment: "",
    },
    inventory: [],
    selected: null,
    showForm: false,
};

const slice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Record<keyof InventoryState["filter"], any>>) => {
            state.filter = action.payload;
        },
        resetFilter: state => {
            state.filter = initialState.filter;
        },
        selectInventory: (state, action: PayloadAction<InventoryState["selected"]>) => {
            state.selected = action.payload;
        },
        toggleForm: (state, action: PayloadAction<{ visible: boolean }>) => {
            state.showForm = action.payload.visible;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getInventory.pending, state => {
                state.isLoading = true;
            })
            .addCase(
                getInventory.fulfilled,
                (
                    state,
                    action: PayloadAction<Pick<InventoryState, "inventory" | "limit" | "loaded" | "page" | "total">>
                ) => {
                    state.isLoading = false;
                    state.page = action.payload.page;
                    state.limit = action.payload.limit;
                    state.loaded = action.payload.loaded;
                    state.total = action.payload.total;
                    state.inventory = action.payload.inventory;
                }
            )
            .addCase(getInventory.rejected, state => {
                state.isLoading = false;
                state.inventory = [];
            })
            .addCase(saveItem.pending, state => {
                state.isProcessing = true;
            })
            .addCase(saveItem.fulfilled, (state, action: PayloadAction<Inventory>) => {
                state.isProcessing = false;
                state.total += 1;
                state.inventory = [action.payload, ...state.inventory];
                state.showForm = false;
            })
            .addCase(saveItem.rejected, state => {
                state.isProcessing = false;
            });
    },
});

const { reducer, actions } = slice;

export const { setFilter, selectInventory, resetFilter, toggleForm } = actions;

export default reducer;

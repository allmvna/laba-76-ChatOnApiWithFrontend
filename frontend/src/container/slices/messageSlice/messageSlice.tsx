import axiosAPI from "../../../axiosAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface IMessage {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

interface MessageState {
    messages: IMessage[];
    isLoading: boolean;
    error: boolean;
}

const initialState : MessageState = {
    messages: [],
    isLoading: false,
    error: false,
};

export const fetchMessages = createAsyncThunk<IMessage[]>(
    'message/fetchMessages',
    async () => {
        const { data } = await axiosAPI.get<IMessage[]>('/messages');
        return data;
    }
);

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            });
    },

});

export const messageReducer = messageSlice.reducer;
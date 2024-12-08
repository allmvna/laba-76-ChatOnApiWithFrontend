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

export const postMessages = createAsyncThunk('message/postMessages', async (message: IMessage) => {
    const { data } = await axiosAPI.post('/messages/add', message);
    return { ...message, id: data.id };
});


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(postMessages.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(postMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push(action.payload);
            })
            .addCase(postMessages.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });

    },

});

export const messageReducer = messageSlice.reducer;
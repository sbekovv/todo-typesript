import { createSlice } from "@reduxjs/toolkit";
import { getTodosThunk } from "./todoThunk";
export interface Todos {
    title: string;
    id: string;
    complete: boolean;
    date: string;
}

type StateType = {
    isLoading: boolean;
    todos: Todos[];
};

const initialState: StateType = {
    todos: [],
    isLoading: false,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getTodosThunk.fulfilled, (state, { payload }) => {
                state.todos = payload;
                state.isLoading = false;
            })
            .addCase(getTodosThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodosThunk.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default todoSlice;
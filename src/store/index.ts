import { configureStore, createSlice } from "@reduxjs/toolkit";

// Uma das coisas que o create slice retorna é o reducer
// const { reducer } = createSice
const todoSlice = createSlice({
  name: "todo",
  initialState: ['Estudar Redux', 'Estudar Zustand'],
  reducers: {}
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  },
});
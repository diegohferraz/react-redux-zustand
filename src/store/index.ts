import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

// Uma das coisas que o create slice retorna é o reducer
// const { reducer } = createSice
const todoSlice = createSlice({
  name: "todo",
  initialState: ['Acordar', 'Estudar Redux', 'Estudar Zustand'],
  reducers: { //Aqui vao as acoes que o usuario pode fazer
    // O type vai ser todo/add
    add: (state, action) => { // Toda acao recebe o estado atual e a acao que foi disparada
      state.push(action.payload)
    },
    remove: (state, action) => {
      state.splice(action.payload, 1)
    }
  }
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  },
});

export const { add, remove } = todoSlice.actions;

// Tipagem do estado global da aplicacao, necessario para usar o useSelector tipado pelo TS
export type RootState = ReturnType<typeof store.getState>; // Retorna o formato do estado
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
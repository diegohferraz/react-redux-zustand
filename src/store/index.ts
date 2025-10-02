// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { useSelector, type TypedUseSelectorHook } from "react-redux";

// // Uma das coisas que o create slice retorna é o reducer
// // const { reducer } = createSice
// const todoSlice = createSlice({
//   name: "todo",
//   initialState: ['Acordar', 'Estudar Redux', 'Estudar Zustand'],
//   reducers: { //Aqui vao as acoes que o usuario pode fazer
//     // O type vai ser todo/add
//     add: (state, action) => { // Toda acao recebe o estado atual e a acao que foi disparada
//       state.push(action.payload)
//     },
//     remove: (state, action) => {
//       state.splice(action.payload, 1)
//     }
//   }
// });

// export const store = configureStore({
//   reducer: {
//     todo: todoSlice.reducer
//   },
// });

// export const { add, remove } = todoSlice.actions;

// // Tipagem do estado global da aplicacao, necessario para usar o useSelector tipado pelo TS
// export type RootState = ReturnType<typeof store.getState>; // Retorna o formato do estado
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook, useDispatch } from "react-redux";
import { player } from "./slices/player";

// Para compor o estado global da aplicacao, podemos ter varios slices
// Cada slice e responsavel por uma parte do estado
// Por exemplo, podemos ter um slice para o player, outro para o carrinho de compras, outro para o usuario, etc
// Cada slice tem seu proprio reducer, que e uma funcao que recebe o estado atual e a acao que foi disparada
// E retorna o novo estado
// O configureStore recebe um objeto com a propriedade reducer, que e um objeto com os reducers de cada slice
// O Redux vai juntar todos os reducers em um unico reducer, que vai ser usado para criar o store
// O store e o objeto que guarda o estado global da aplicacao
// E permite que a gente dispare acoes para modificar esse estado
// O store tambem permite que a gente acesse o estado atual da aplicacao
// E se inscreva para receber notificacoes quando o estado mudar
export const store = configureStore({
  reducer: {
    player
  },
})

// Precisamos tipar o estado global da aplicacao para usar o useSelector com TypeScript
// O useSelector e um hook que permite que a gente acesse o estado global da aplicacao
// E selecione uma parte desse estado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
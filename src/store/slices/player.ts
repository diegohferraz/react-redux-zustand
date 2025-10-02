import { createSlice } from "@reduxjs/toolkit";

// Aqui vamos usar o createSlice para criar um pedaço do estado global da aplicação
// Esse pedaço do estado vai ser responsável por guardar as informações do player
// Como o curso, os módulos, as lições, etc
// O createSlice recebe um objeto com 3 propriedades: name, initialState e reducers
// name: nome do slice
// initialState: estado inicial do slice
// reducers: ações que podem ser feitas no slice
// Cada ação é uma função que recebe o estado atual e a ação que foi disparada
// E retorna o novo estado
// O createSlice retorna um objeto com 2 propriedades: reducer e actions
// reducer: função que vai ser usada para criar o store
// actions: objeto com as ações que foram criadas no slice
const playerSlice = createSlice({
  name: "player",
  initialState: {
    course: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
            { id: 'D83-55LUdKE', title: 'Componente: Header', duration: '06:33' },
            { id: 'W_ATsETujaY', title: 'Componente: Sidebar', duration: '09:12' },
            { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
            { id: '8KBq2vhwbac', title: 'Form de comentários', duration: '11:34' },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
            { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            { id: 'h5JA3wfuW1k', title: 'Interações no JSX', duration: '06:33' },
            { id: '1G0vSTqWELg', title: 'Utilizando estado', duration: '09:12' },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  },
  reducers: {
    // Aqui vai criar uma action chamada play que no redux tools vai aparecer como player/play
    play: (state, action) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    }
  },
})

export const player = playerSlice.reducer;
export const { play } = playerSlice.actions;
import { type PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

// Para fazer chamadas assíncronas, como buscar dados de uma API, podemos usar o createAsyncThunk
// O createAsyncThunk recebe dois parâmetros: o nome da ação e uma função assíncrona que retorna uma promessa
// O Redux Toolkit vai criar automaticamente três ações para cada thunk: pending, fulfilled e rejected
// Pending: quando a ação é disparada
// Fulfilled: quando a promessa é resolvida com sucesso
// Rejected: quando a promessa é rejeitada com um erro
// Podemos usar essas ações no extraReducers do createSlice para atualizar o estado com base no status da chamada assíncrona
export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get('/courses/1')

    return response.data
  }
)

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
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Aqui vai criar uma action chamada play que no redux tools vai aparecer como player/play
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },
    next: (state) => { // eu posso optar por nao receber a action se eu nao for usar
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    }
  },
  // Aqui vamos usar o extraReducers para lidar com as ações criadas pelo createAsyncThunk
  // O extraReducers recebe uma função que recebe um builder
  // O builder tem métodos para adicionar casos para cada ação criada pelo thunk
  // Cada caso recebe o estado atual e a ação que foi disparada
  // E retorna o novo estado
  // O extraReducers é usado para lidar com ações que não foram criadas no slice
  // Como as ações criadas pelo createAsyncThunk
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  },
})

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

// Aqui estamos criando um hook personalizado para pegar o módulo e a lição atual
// Esse hook vai usar o useAppSelector para acessar o estado global da aplicação
// E retornar o módulo e a lição atual
export const useCurrentLesson = () => {
  //   // O appselector me retorna o estado global da aplicação
  //   // Dentro dele eu posso manipular e acessar qualquer informação que eu tenha salvo no estado global
  //   // Aqui eu estou pegando o módulo e a lição atual que estão sendo assistidos
  //   // E depois, estou pegando a lição específica dentro do módulo
  return useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
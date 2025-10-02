import { describe, expect, it } from 'vitest'
import { player as reducer, play, next } from "./player";

// Para criar os testes unitarios precisamos de um estado inicial que seja previsivel
// Assim conseguimos testar as funcionalidades do reducer
// O estado inicial deve ser o mais simples possivel, com poucos modulos e poucas lições
// Assim conseguimos prever o comportamento do reducer
// E conseguimos testar as funcionalidades do reducer
const exampleState = {
  course: {
    modules: [
      {
        id: '1',
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
        ],
      },
      {
        id: '2',
        title: 'Estrutura da aplicação',
        lessons: [
          { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe('player slice', () => {
  it('should be able to play', () => {
    // Aqui estamos simulando o comportamento do redux
    // O reducer recebe o estado atual e a ação que foi disparada
    // E retorna o novo estado
    const state = reducer(exampleState, play([1, 2]))
    // depois de disparar a ação play com os parametros 1 e 2
    // o estado atual deve ser atualizado para o modulo 1 e a lição 2
    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer({
      ...exampleState,
      currentLessonIndex: 1
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is not next lesson available', () => {
    const state = reducer({
      ...exampleState,
      currentModuleIndex: 1,
      currentLessonIndex: 1
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
});
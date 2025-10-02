import ReactPlayer from 'react-player'
import { useAppSelector } from "../store";

export function Video() {
  const lesson = useAppSelector(state => {
    // O appselector me retorna o estado global da aplicação
    // Dentro dele eu posso manipular e acessar qualquer informação que eu tenha salvo no estado global
    // Aqui eu estou pegando o módulo e a lição atual que estão sendo assistidos
    // E depois, estou pegando a lição específica dentro do módulo
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]

    return currentLesson
  })

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        src={`https://www.youtube.com/watch?v=${lesson.id}`}
      />
    </div>
  );
}
import { ChevronDown } from "lucide-react";
import * as Collapsible from '@radix-ui/react-collapsible';

import { Lesson } from "./Lesson";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  // Esse é o hook que é responsavel por disparar as ações
  // Toda vez que queremos alterar o estado global da aplicação, precisamos disparar uma ação
  // E para isso, usamos o useDispatch para pegar a função dispatch do Redux
  // E depois, usamos essa função para disparar a ação que queremos
  // A ação é um objeto que tem uma propriedade type, que é uma string que identifica a ação
  const dispatch = useAppDispatch()
  //Selecionamos somente os dados que nos interessam para evitar re-renderizações desnecessárias
  //Se usássemos o useAppSelector para selecionar o módulo inteiro, toda vez que qualquer coisa mudasse no módulo, ele iria re-renderizar
  //Mas como estamos selecionando apenas as lições, ele só irá re-renderizar se as lições mudarem
  //Isso é importante para performance, principalmente em aplicações maiores
  //Além disso, o Redux já faz um trabalho de memoização para evitar re-renderizações desnecessárias
  //Então, se o estado do módulo não mudar, ele não irá re-renderizar mesmo que o componente pai re-renderize
  //Isso é uma vantagem do Redux em relação ao Context API, que não faz esse trabalho de memoização
  //E acaba re-renderizando tudo que está dentro do Provider, mesmo que o estado não tenha mudado
  //O que pode causar problemas de performance em aplicações maiores
  //Então, sempre que possível, devemos usar o useAppSelector para selecionar apenas o que precisamos
  //E evitar re-renderizações desnecessárias
  const lessons = useAppSelector(state => {
    return state.player.course?.modules[moduleIndex].lessons
  })
  const { currentModuleIndex, currentLessonIndex } = useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    return { currentModuleIndex, currentLessonIndex }
  })

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={isCurrent}
                onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
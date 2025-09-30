import { useAppSelector } from "../store"

export function TodoList() {
  const todos = useAppSelector(state => state.todo)

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  )
}
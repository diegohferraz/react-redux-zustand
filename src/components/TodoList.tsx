import { useAppSelector } from "../store"

export function TodoList() {
  const todos = useAppSelector(state => state.todo)

  return (
    <ul className="bg-amber-700 p-4 rounded shadow-md mb-4">
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  )
}
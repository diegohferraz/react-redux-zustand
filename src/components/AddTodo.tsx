import { useState } from "react"

export function AddTodo() {
  const [newTodo, setNewTodo] = useState("")

  function handleAddTodo(event: React.FormEvent) {
    event.preventDefault()
    console.log("Adicionando nova tarefa:", newTodo)
    setNewTodo("")
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Digite sua tarefa"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  )
}
import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Todo } from '../model'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [updatedTodo, setUpdatedTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  type HandleEventFnProp = (id: number, e?: React.FormEvent) => void
  const handleDone: HandleEventFnProp = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)))
  }
  const handleDelete: HandleEventFnProp = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleSubmit: HandleEventFnProp = (id, e) => {
    e?.preventDefault()
    setTodos(todos.map((t) => (t.id === id ? { ...t, todo: updatedTodo } : todo)))
    setEditMode(!editMode)
  }
  useEffect(() => {
    setUpdatedTodo(todo.todo)
  }, [todos])

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus()
    }
  }, [editMode])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos-single"
          onSubmit={(e) => handleSubmit(todo.id, e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editMode ? (
            <input
              ref={inputRef}
              className={`todos-single-text ${todo.isDone ? 'strike' : ''}`}
              defaultValue={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
            />
          ) : (
            <span className={`todos-single-text ${todo.isDone ? 'strike' : ''}`}>{todo.todo}</span>
          )}

          <div className="todos-icons">
            <span
              className="icon"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <i className="fa-solid fa-trash-can"></i>
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <i className="fa-solid fa-check"></i>
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo

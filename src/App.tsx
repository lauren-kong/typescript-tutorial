import React, { useState } from 'react'
import './App.css'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { Todo } from './model'
const App = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add,
      active = todos,
      complete = completedTodos

    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else if (source.droppableId === 'TodosRemove') {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (add && destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else if (add && destination.droppableId === 'TodosRemove') {
      complete.splice(destination.index, 0, add)
    }

    setTodos(active)
    setCompletedTodos(complete)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App

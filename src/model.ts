export interface Todo {
  id: number
  todo: string
  isDone: boolean
}



// import { useReducer } from "react"

// export const ADD_TODO = 'add-todo'
// export const DEL_TODO = 'del-todo'
// export const EDIT_TODO = 'edit-todo'
// export const DONE_TODO = 'done-todo'

// type Actions = 
// {type: 'add-todo', payload: Todo} |
// {type: 'del-todo', payload: {id: number}} |
// {type: 'edit-todo', payload: {id: number}} |
// {type: 'done-todo', payload: {id: number}} 

// const TodoReducer = (state:Todo[], action:Actions) => {
//   switch(action.type){
//     case ADD_TODO:
//       return [...state, {id: Date.now(), todo: action.payload.todo, isDone: false}]
//     case DEL_TODO:
//       return state.filter(td => td.id !== action.payload.id)
//     case EDIT_TODO:
//       return state.map(td => td.id === action.payload.id ? {...td, todo: action.payload.todo} : td)
//     case DONE_TODO:
//       return state.map(td => td.id === action.payload.id ? {...td, isDone: !td.isDone} : td)
//     default:
//       return state
//     }
// }


// const ReducerExample:React.FC = () => {
//   const [state, dispatch] = useReducer(TodoReducer,[])
//   return <div></div>
// } 
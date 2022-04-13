
import {v1} from 'uuid'
import {TodoListType} from '../AppWithReducers'
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";


type ActionType = {
    type: string
    [key: string]: any
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodoListType>
}

export let todolistId1 = v1();
export let todolistId2 = v1();

let initialState: Array<TodoListType> = [
    /*    {
            id: todolistId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all"
        }*/
]
export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = state.filter((tl) => tl.id !== action.id)
            return newState
        }
        case 'ADD-TODOLIST': {
            let copyState = [{id: action.todolist.item.id, title: action.todolist.item.title,addedDate: action.todolist.item.addedDate
                ,order: action.todolist.item.order,filter: "all"},...state]
            return copyState
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let newState = [...state]
            newState.map((t) => {
                if (t.id === action.id) {
                    t.title = action.title
                    return t
                } else {
                    return t
                }
            })
            return newState
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let newState = [...state]
            newState.map((t) => {
                if (t.id === action.id) {
                    t.filter = action.filter
                    return t
                }else{
                    return t
                }
            })
            return newState
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl: any) => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state

    }
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (todolist: any) => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const ChangeNameTodolistAC = (todolistId: string, newTodolistTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle}
}
export const ChangeFilterTodolistAC = (todolistId: string, filter: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
export const setTodolistAC = (todolists:Array<TodoListType>):SetTodolistsActionType => {
    return ({type: "SET-TODOLISTS", todolists})
}

export const fetchTodolistTC = () => {
    return  (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res: any) => {
                dispatch(setTodolistAC(res.data))

            })
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch:Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res)=>{
                dispatch(AddTodolistAC(res.data.data))
            })
    }
}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch:Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(()=>{
                dispatch(RemoveTodolistAC(todolistId))
            })
    }
}
export const updateTodolistTC = (todolistId: string, title: string) => {
    return (dispatch:Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(()=>{
                dispatch(ChangeNameTodolistAC(todolistId, title))
            })
    }
}







import {v1} from 'uuid'
import {TasksStateType} from '../AppWithReducers'
import {TaskType} from "../Todolist";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";
import {AppRootStateType} from "./store";

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
let initialState: TasksStateType = {
    /*    [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ],*/
};

export const taskReducer = (state: TasksStateType = initialState, action: any) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todolistTasks = [...state[action.TodolistId]]
            let NewState = {
                ...state,
                [action.TodolistId]: todolistTasks.filter((t) => t.id !== action.id)
            }
            return NewState
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;

        }
        case 'CHANGE-STATUS': {
            let todolistTasks = state[action.todolistId]
            let Task = todolistTasks.find(t=>t.id === action.id)
            if(Task){
                Task.status = action.isDone?2:0
            }
            state[action.todolistId] = [...todolistTasks]
            return({...state})
        }
        case 'CHANGE-TITLE': {
            let todolistTasks = state[action.todolistId]
            let task = todolistTasks.find(t=>t.id === action.id)
            if(task){
                task.title = action.newTitle
            }
            state[action.todolistId] = [...todolistTasks]
            return({...state})
        }
        case 'ADD-TODOLIST': {
            let NewState = {...state, [action.todolist.item.id]: []}
            debugger
            return NewState
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id];
            return newState
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl: any) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }


        default:
            return state
    }
}
export let RemoveTaskActionCreator = (Id: string, TodoListId: string) => {
    return ({type: 'REMOVE-TASK', id: Id, TodolistId: TodoListId})
}
export let addTaskActionCreator = (task: TaskType) => {
    return ({type: 'ADD-TASK', task})
}
export let changeTaskStatusActionCreator = (id: string, isDone: boolean, todolistId: string) => {
    return ({type: 'CHANGE-STATUS', id: id, isDone: isDone, todolistId: todolistId})
}
export let changeTaskTitleActionCreator = (NewValue: string, todolistId: string, id: string) => {
    return ({type: 'CHANGE-TITLE', id: id, newTitle: NewValue, todolistId: todolistId})
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res: any) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
        })
    }
}
export const removeTaskTC = (todolistId: string, id:string) => {
    return (dispatch:Dispatch)=>{
        taskAPI.deleteTask(todolistId, id)
            .then(()=>{
                const action = RemoveTaskActionCreator(id, todolistId)
                dispatch(action)
            })
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todolistId, title)
            .then((res)=>{
                debugger
                dispatch(addTaskActionCreator(res.data.data.item))
            })
    }
}
export const updateTaskTC = (NewValue: string, todolistId: string, id: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.updateTask(todolistId, id, NewValue)
            .then(() => {
                dispatch(changeTaskTitleActionCreator(NewValue, todolistId, id))
            })
    }
}
export const updateTaskStatusTC = (id: string,  isDone: boolean, todolistId: string) => {
    return (dispatch: Dispatch, getState: ()=>AppRootStateType) => {
        const state=getState();
        const task: any = state.tasks[todolistId].find(t=>t.id===id)
        if(!task){
            console.warn("Task is not found")
            return
        }
        const model = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: isDone?2:0
        }
        taskAPI.updateTaskStatus(todolistId, id, model)
            .then((res)=>{
                dispatch(changeTaskStatusActionCreator( id, isDone, todolistId))
            })
    }
}






import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance= axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '81cb1eba-d16e-447b-b8c3-7c17cf6feee4'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title:string){
        const promise = instance.put<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}`,{title:title})
        return promise
    },
    getTodolists(){
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodolist(title: string){
        const promise = instance.post<ResponseType<{}>>(`todo-lists`,{title:title})
        return promise
    },
    deleteTodolist(todolistId: string){
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    }
}

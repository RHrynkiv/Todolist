import axios from 'axios'


const instance= axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e0c04a17-3bae-430a-ba6b-9e96e9991aaf'
    }
})

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string){
        const promise = instance.post(`todo-lists/${todolistId}/tasks`,{title:title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string){
        const promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTask(todolistId: string, taskId: string, NewValue: string){
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,{title: NewValue})
        return promise
    },
    updateTaskStatus(todolistId: string, taskId: string, model: any){
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,{...model})
        return promise
    }
}

import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        taskAPI.getTasks("fb1bbcd0-4b0b-42c3-9cb5-29d5d8fbd342")
            .then((res)=>{
                setState(res.data.items)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        taskAPI.createTask("fb1bbcd0-4b0b-42c3-9cb5-29d5d8fbd342",'NewTask')
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = "65ebfea4-60cc-4c96-984b-c3441115cff6"
        const taskId = "df09b0f5-b81b-4b51-b2a1-641285dd8827"
        taskAPI.deleteTask(todolistId, taskId)
            .then((res)=>{
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = "65ebfea4-60cc-4c96-984b-c3441115cff6";
        const taskId = "e3a01539-a6de-4b32-b736-8f591fb5e8fd";
        taskAPI.updateTask(todolistId, taskId, 'Roma')
            .then((res)=>{
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
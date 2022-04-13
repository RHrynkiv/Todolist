import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        todolistAPI.getTodolists()
            .then((res)=>{
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
       todolistAPI.createTodolist('NEW')
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = "dc6a98f5-236c-4bc5-bdfd-a1cf4d44de9c"
       todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = "a70ef02c-22d4-4135-b528-b9e8fe27770c";
        todolistAPI.updateTodolist(todolistId,'Some New Title')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
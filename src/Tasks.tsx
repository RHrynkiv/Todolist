import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import {EditableSpan, TaskType} from './Todolist';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    error: string|null
    removeTask:(id: string,todolistId: string) => void
    onChangeSpan: (Title:string, todolistId:string, id:string) => void
    changeTaskStatus:(id: string, IsDone: boolean, todolistId: string)=>void
}
export const Task = (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeSpan = useCallback((Title: string) => {
        props.onChangeSpan(Title, props.todolistId, props.task.id)
    },[props.onChangeSpan,props.todolistId,props.task.id])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }
    return <div key={props.todolistId} className={props.task.isDone ? "is-done" : ''}>
        <Checkbox color="primary" onChange={onChangeHandler} checked={props.task.status === 0?false:true}
                  className={props.error ? "error" : ""}/>
        <EditableSpan value={props.task.title} onChange={onChangeSpan}/>
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </div>
}





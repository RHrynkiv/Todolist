import {Button, IconButton, TextField} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {FilterValuesType} from './AppWithReducers';
import {Task} from './Tasks';
import {fetchTaskTC} from "./state/task.reducer";
import {useDispatch} from "react-redux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    status?: number
}
type PropsType = {
    id: string
    key: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistsId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (id: string) => void
    onChangeSpan: (newValue: string, todolistsId: string, id: string) => void
    onChangeTodolistTitle: (newTitle: string, todolistsId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch();

    useEffect(() => {
        let thunk = fetchTaskTC(props.id)
        dispatch(thunk)
    }, [])

    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((t: any) => t.status === 0)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t: any) => t.status === 2)
    }
    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);

    const onChangeTodolistTitle = useCallback((title: string) => {
        props.onChangeTodolistTitle(title, props.id)
    }, [props.onChangeTodolistTitle, props.id])
    return <div>
        <div><EditableSpan value={props.title} onChange={onChangeTodolistTitle}/><IconButton
            onClick={() => props.removeTodolist(props.id)}><Delete/></IconButton></div>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Task removeTask={props.removeTask}
                              todolistId={props.id}
                              onChangeSpan={props.onChangeSpan}
                              changeTaskStatus={props.changeTaskStatus}
                              error={error}
                              task={t}/>)
                })
            }
        </ul>
        <div>
            <Button color="default" variant={props.filter === 'all' ? "outlined" : 'text'}
                    onClick={onAllClickHandler}>All</Button>
            <Button color="primary" variant={props.filter === 'active' ? "outlined" : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color="secondary" variant={props.filter === 'completed' ? "outlined" : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>

})


export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}
export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [EditMode, setEditMode] = useState<boolean>(false)

    let [Title, setTitle] = useState(props.value)


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(Title)
    }
    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    // @ts-ignore
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activateViewMode();
        }
    }
    return (
        EditMode ?
            <TextField variant="outlined" value={Title} onKeyPress={onKeyPressHandler} onChange={ChangeTitle} autoFocus
                       onBlur={activateViewMode}/> :
            <span onDoubleClick={activateEditMode}>{props.value}</span>
    );
})




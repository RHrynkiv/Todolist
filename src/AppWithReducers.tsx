import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    ChangeFilterTodolistAC, createTodolistTC, deleteTodolistTC, fetchTodolistTC, updateTodolistTC
} from './state/todolists.reducer';
import {
    createTaskTC,
    removeTaskTC, updateTaskStatusTC, updateTaskTC
} from './state/task.reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {NavLink} from 'react-router-dom';
import {FormHelperText} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string;
    title: string;
    filter: string;
    order?: number,
    startData?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export default App;


function App() {

    useEffect(() => {
        let thunk = fetchTodolistTC()
        dispatch(thunk)
    }, [])
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(todolistId, id)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = createTaskTC(todolistId, title)
        dispatch(thunk)
    }, [dispatch])

    const onChangeSpan = useCallback((newValue: string, todolistId: string, id: string) => {
        const thunk = updateTaskTC(newValue, todolistId, id)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const thunk = updateTaskStatusTC(id, isDone, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const thunk = deleteTodolistTC(id)
        dispatch(thunk);
    }, [dispatch])

    const onChangeTodolistTitle = useCallback((Title: string, todolistId: string) => {
        const thunk = updateTodolistTC(todolistId, Title)
        dispatch(thunk);
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistsId: string) => {
        const action = ChangeFilterTodolistAC(todolistsId, value)
        dispatch(action)
    }, [dispatch])

    const AddTodolist = useCallback((title: string) => {
        const thunk = createTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])
    return (
        <div className="App">
            <div>
                <Header/>
                <Container>
                    <Grid container style={{padding: "20px"}}>
                        <AddItemForm addItem={AddTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map((tl) => {
                                let allTodolistTasks = tasks[tl.id];
                                let tasksForTodolist = allTodolistTasks;

                                return (
                                    <Grid item key={tl.id}>
                                        <Paper style={{padding: "10px"}}>
                                            <Todolist id={tl.id}
                                                      key={tl.id}
                                                      title={tl.title}
                                                      tasks={tasksForTodolist}
                                                      removeTask={removeTask}
                                                      changeFilter={changeFilter}
                                                      addTask={addTask}
                                                      changeTaskStatus={changeStatus}
                                                      filter={tl.filter}
                                                      removeTodolist={removeTodolist}
                                                      onChangeSpan={onChangeSpan}
                                                      onChangeTodolistTitle={onChangeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Container>
            </div>
            <div className={"footer"}>
                {isLoggedIn ? null: <div className="error">Click the "Login" button</div>}
            </div>
        </div>
    );
}

export const Header = () => {
    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                TodoList
            </Typography>
            <Button color="inherit"><NavLink
                style={{color: "white", textDecorationLine: "inherit", fontSize: "16px"}}
                to={"/login"}>Login</NavLink></Button>
        </Toolbar>
    </AppBar>
}

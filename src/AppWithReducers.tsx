import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeNameTodolistAC, createTodolistTC, deleteTodolistTC, fetchTodolistTC,
    RemoveTodolistAC, updateTodolistTC
} from './state/todolists.reducer';
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator, createTaskTC,
    removeTaskTC, updateTaskStatusTC, updateTaskTC
} from './state/task.reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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
    },[])
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
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
    );
}

import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from '@material-ui/core';
/*
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string;
    title: string;
    filter: string;
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {



    let todolistId1 = v1();
    let todolistId2 = v1();
    let [tasks, setTasks] = useState({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ],
        });
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter((t) => t.id != id)
        setTasks({...tasks})
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks})
    }
    function onChangeSpan(newValue: string, todolistId: string, id: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newValue;
            setTasks({...tasks})
        }
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all"
        }
    ])
    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }
    function onChangeTodolistTitle(Title: string, todolistId: string) {
        let todolist = todolists.find((td) => td.id === todolistId);
        if (todolist) {
            todolist.title = Title;
            setTodolists([...todolists]);
        }

    }
    function changeFilter(value: FilterValuesType, todolistsId: string) {
        let todolist = todolists.find((tl) => tl.id === todolistsId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function AddTodolist(title: string) {
        let NewTodolistId = v1();
        let NewTodolist: TodoListType = {id: NewTodolistId, title: title, filter: "all"}
        setTodolists([NewTodolist, ...todolists])
        setTasks({
            ...tasks,
            [NewTodolistId]: []
        })
    }
    let tasksForTodolist = tasks;
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
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks;
                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true)
                            }
                            return (
                                <Grid item>
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


export default App;*/

import { TasksStateType } from "../AppWithReducers";
import {addTaskActionCreator, changeTaskStatusActionCreator,
    changeTaskTitleActionCreator, RemoveTaskActionCreator, taskReducer } from "./task.reducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists.reducer";
let startState:TasksStateType = {};

beforeEach(()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})


test('correct task should be deleted from correct array',()=>{
    const endState = taskReducer(startState,  RemoveTaskActionCreator("2", "todolistId2"))

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });


})

test('correct task should be added to correct array', () => {
    const endState: TasksStateType  = /*taskReducer(startState, addTaskActionCreator("juce"))*/{}

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const endState: TasksStateType = taskReducer(startState, changeTaskStatusActionCreator("2", false, "todolistId2"))

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"][0].isDone).toBe(false)
});

test('title of specified task should be changed', () => {
   const endState: TasksStateType = taskReducer(startState, changeTaskTitleActionCreator('coffee',"todolistId2",'3'))

    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId2"][2].title).toBe("coffee")
});

test('new array should be added when new todolist is added', () => {
   const endState: TasksStateType = taskReducer(startState, AddTodolistAC("new todolist"))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const endState: TasksStateType = taskReducer(startState, RemoveTodolistAC("todolistId2"))
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



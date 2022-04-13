import {applyMiddleware, combineReducers, createStore} from "redux";
import { taskReducer } from "./task.reducer";
import { todolistsReducer } from "./todolists.reducer";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

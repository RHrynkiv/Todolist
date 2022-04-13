import { Dispatch } from 'redux'
import {authAPI} from "../api/todolist-api";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }
        })

}


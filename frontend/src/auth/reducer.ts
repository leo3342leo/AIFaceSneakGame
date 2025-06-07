import {IAuthState} from './state';
import { IAuthActions } from './actions';

const initialState = {
    isAuthenticated: (localStorage.getItem('token') !=null),
    msg:""
}

export function authReducer(state:IAuthState = initialState,action: IAuthActions){
    switch (action.type) {
        case "@auth/LOGIN":
            return {
                ...state,
                isAuthenticated:true,
                msg:""
            }
        case "@auth/LOGIN_FAILED":
            return {
                ...state,
                isAuthenticated:false,
                msg:action.msg
            }
        case "@auth/LOGOUT":
            return {
                ...state,
                isAuthenticated:false,
                msg:""
            }
        default:
            return state;
    }
}
import { ThunkDispatch } from '../store';
import {login} from './actions';
import {loginFailed} from './actions';
import {logout} from './actions';
import { push } from 'connected-react-router';




const {REACT_APP_API_SERVER} = process.env;


export function loginThunk(username:string,password:string){
    return async (dispatch:ThunkDispatch) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/userLogin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password})
        });
        const result =  await res.json();
        if(res.status === 200){
            localStorage.setItem('token',result.token);
            dispatch(login());
            dispatch(push('/'))
        }else{
            dispatch(loginFailed(result.msg));
        }
    }
}

export function loginFacebookThunk(accessToken:string){
    return async (dispatch:ThunkDispatch) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/userLogin/facebook`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({accessToken})
        });
        const result =  await res.json();
        if(res.status === 200){
            localStorage.setItem('token',result.token);
            dispatch(login());
            dispatch(push('/'));
        }else{
            dispatch(loginFailed(result.msg));
        }
    }
}
export function logoutThunk(){
    return async (dispatch:ThunkDispatch) =>{
        localStorage.removeItem('token');
        dispatch(logout());
    }
}
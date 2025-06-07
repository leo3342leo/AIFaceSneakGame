

export function login(){
    return {
        type: "@auth/LOGIN" as "@auth/LOGIN"
    }
}

export function loginFailed(msg:string){
    return{
        type:"@auth/LOGIN_FAILED" as "@auth/LOGIN_FAILED",
        msg
    }
}

export function logout(){
    return {
        type: "@auth/LOGOUT" as "@auth/LOGOUT"
    }
}

type actionCreators = typeof login |typeof loginFailed| typeof logout;

export type IAuthActions = ReturnType<actionCreators>
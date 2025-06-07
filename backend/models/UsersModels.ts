

export interface User{
    username:string,
    password:string
}

declare global{
    namespace Express{
        interface Request{
            user?: User
        }
    }
}
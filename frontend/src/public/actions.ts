
export function getHiScore(hiScore:number){
    return{
        type:"GET_HI_SCORE" as "GET_HI_SCORE",
        hiScore
    }
}

export function failed(msg:string){
    return{
        type:"FAILED" as "FAILED",
        msg
    }
}

type actionCreators = typeof getHiScore |
                      typeof failed
export type IHomeActions = ReturnType<actionCreators>
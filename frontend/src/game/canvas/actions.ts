import { Directions } from "../util/enums"



export function initGame(){
    return{
        type:"INIT_GAME" as "INIT_GAME"
    }
    
}

export function setFood(){
    return{
        type:"SET_FOOD" as "SET_FOOD"
    }
}

export function nextStep(){
    return{
        type:"NEXT_STEP" as "NEXT_STEP",
    }
}

export function changeDirection(d:Directions){
    return{
        type:"CHANGE_DIRECTION" as "CHANGE_DIRECTION",
        d
    }
}

export function timeCountdown(){
    return{
        type:"TIME_COUNTDOWN" as "TIME_COUNTDOWN"
    }
}

export function addTime(s:number){
    return{
        type:"ADD_TIME" as "ADD_TIME",
        s
    }
}

export function resetGame(){
    return{
        type:"RESET_GAME" as "RESET_GAME"
    }
}

export function updateHiScore(id:number,score:number){
    return{
        type:"UPDATE_HISCORE" as "UPDATE_HISCORE",
        score,
        id
    }
}

export function failed(msg:string){
    return{
        type:"FAILED" as "FAILED",
        msg
    }
}

type actionCreators = typeof nextStep | 
                      typeof initGame | 
                      typeof setFood | 
                      typeof changeDirection |
                      typeof updateHiScore |
                      typeof timeCountdown |
                      typeof resetGame |
                      typeof failed |
                      typeof addTime
export type ICanvasActions = ReturnType<actionCreators>
import {IHomeActions} from './actions'
import { IHomeState } from './state'

const initialState = {
    hi_score:0,
}

export const homeReducer = (state:IHomeState = initialState, action:IHomeActions) =>{
    switch(action.type){
        case "GET_HI_SCORE":
            return{
                ...state,
                hi_score:action.hiScore
            }
        case "FAILED":
            return{
                ...state,
                msg:action.msg
            }
        default:
            return state;
    }
}
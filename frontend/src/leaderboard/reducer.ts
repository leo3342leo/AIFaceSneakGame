import {ILeaderBoardActions} from './action';
import { ILeaderboardState } from './state';

const initialState = {
    ranking:[]
}

export const leaderBoardReducer = (state:ILeaderboardState = initialState, action:ILeaderBoardActions) =>{
    switch(action.type){
        case "ALL_USER":
            return {
                ...state,
                ranking:action.players
            }
        default:
             return state
        };
}

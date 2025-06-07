import { IPlayer } from "./state";


export function allUser(players:IPlayer[]){
    return {
        type:"ALL_USER" as "ALL_USER",
        players
    }
}

type actionCreators = typeof allUser;

export type ILeaderBoardActions = ReturnType<actionCreators>
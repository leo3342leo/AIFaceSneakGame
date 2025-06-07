export interface IPlayer{
    username:string
    hi_score:number
}

export interface ILeaderboardState{
    ranking:IPlayer[]
}
import Knex from "knex";





export class LeaderService{

    constructor(private knex:Knex){}

    // getElo = async ()=>{

    // }

    getHiScore = async ()=>{
        return this.knex.select('username','hi_score').from('users').orderBy('hi_score','desc')
    }

    
}
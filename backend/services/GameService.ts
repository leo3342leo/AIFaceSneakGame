import Knex from "knex";


export class GameService{
    
    constructor(private knex:Knex){}


    getScore = async (id:number)=>{
        return this.knex.select('hi_score').from('users').where('id',id);
    }

    updateHiScore = async(id:number,score:number)=>{
        return this.knex('users').where({id:id}).update({hi_score:score},['id','hi_score']);
    }
}
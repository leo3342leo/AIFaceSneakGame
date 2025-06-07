import Knex from "knex";
import { hashPassword } from '../hash';

export class UsersService{
    
    constructor(private knex:Knex){}

    getUser = async (id:number)=>{
        return this.knex.select('*').from('users').where('id',id);
    }

    getUserByUsername = async (username:string)=>{
        return this.knex.select('*').from('users').where('username',username);
    }
    async createUser(username:string,password:string){
        return (await this.knex.insert({
            username:username,
            password: await hashPassword(password)
        }).into('users').returning('*'))[0];
    }
    getUserProfile = async (id:number)=>{
        return this.knex.select('id','username','hi_score','elo').from('users').where('id',id);
    }
}
import { LeaderService } from "../services/leaderService";
import express from 'express';
import {Request,Response} from 'express'

export class LeaderRouter{
    
    
    constructor(private leaderService:LeaderService){}

    router(){
        const router = express.Router()
        // router.get('/',this.hi);
        router.get('/',this.leaderBoard);
        return router;
    }   
    // private hi = async (req:Request,res:Response)=>{
    //     res.json({msg:"hello"})
    // }

    private leaderBoard = async (req:Request,res:Response)=>{
        try{
            const board = (await this.leaderService.getHiScore())
            return res.json(board)
        }catch(e){
            return res.status(401).json({msg:"Cannot fetch data"})
        }
    }

}

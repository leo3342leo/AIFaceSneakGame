import {GameService} from '../services/GameService';
import express from 'express';
import {Request, Response} from 'express';

export class GameRouter{
    constructor(private gameService:GameService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getScore);
        router.post('/',this.updateScore);
        return router;
    }

    private getScore = async (req:Request,res:Response)=>{
        try{
            const hiScore = (await this.gameService.getScore((req.user as any).id));
            return res.json(hiScore)
        }catch(e){
            return res.status(500).json({msg:e.toString()})
        }
    }

    private updateScore = async(req:Request,res:Response)=>{
        try{
            const {score} = req.body;
            const hiScore = (await this.gameService.updateHiScore(((req.user as any).id),score));
            return res.json(hiScore)
        }catch(e){
            return res.status(500).json({msg:e.toString()})
        }
    }

}
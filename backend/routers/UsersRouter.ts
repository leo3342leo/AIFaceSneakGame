import express from 'express';
import {Request, Response} from 'express';
import { UsersService } from '../services/UsersService';
import { checkPassword } from '../hash';
import jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import fetch from 'node-fetch';
import { isLoggedIn } from '../guard';


export class  UsersRouter{
    
    constructor(private userService:UsersService){

    }
    
    router(){
        const router = express.Router();
        // router.get('/',this.greeting);
        router.post('/userLogin',this.post);
        router.post('/userLogin/facebook',this.facebook);
        router.post('/profile',isLoggedIn,this.getProfile);
        return router;
    }

    // private greeting = (req:Request,res:Response)=>{
    //     res.json({msg:'hello'})
    // }
    private post = async (req:Request,res:Response)=>{
        try{ 
            if(!req.body.username || !req.body.password){
                res.status(401).json({msg:"not right you XXXXXX"});
                return;
            }
            const {username,password} = req.body;
            const user = (await this.userService.getUserByUsername(username))[0];
            if(!user){
                return res.status(401).json({msg:"wrong"})
            }

            if(await checkPassword(password,user.password)){
                const payload ={
                    id:user.id
                };
                const token = jwtSimple.encode(payload,jwt.jwtSecret);
                return res.json({token:token})
            }else{
                return res.status(401).json({msg:"wrong"})
            }
        }catch(e){
            console.log(e)
            return res.status(500).json({msg:e.toString()})
        }
    }

    private facebook = async (req:Request,res:Response)=>{
        try{
            if (!req.body.accessToken ) {
                res.status(401).json({msg:"Wrong AccessToken"});
                return;
            }
            const {accessToken} = req.body;
            const fetchResponse =await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if(result.error){
                res.status(401).json({msg:"Wrong Access Token!"});
                return ;
            }
            let user = (await this.userService.getUserByUsername(result.name))[0];
            if(!user){
                user = await this.userService.createUser(result.name,Math.random().toString(36).substring(2));
            }
            const payload = {
                id: user.id
            };
            const token = jwtSimple.encode(payload,jwt.jwtSecret);
            return res.json({token:token});
        }catch(e){
            console.log(e)
            return res.status(500).json({msg:e.toString()})
        }
    }

    private getProfile = async (req:Request,res:Response)=>{
        try{
            const result = (await this.userService.getUserProfile((req.user as any).id))
            return res.json(result)
        }catch(e){
            return res.status(401).json({msg:"wrong"})
        }
    }
}

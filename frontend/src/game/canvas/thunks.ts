import { ThunkDispatch } from "../../store";
import { updateHiScore, failed } from "./actions";

const {REACT_APP_API_SERVER} = process.env;

export function updateHiScoreThunk(score:number){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/score/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                score
            })
        });
        const result = await res.json();

        if(result){
            dispatch(updateHiScore(result.id,result.score));
        }else{
            dispatch(failed(result.msg))
        }
    }
}
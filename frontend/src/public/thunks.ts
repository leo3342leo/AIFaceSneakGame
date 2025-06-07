import { ThunkDispatch } from "../store";
import { getHiScore, failed } from "./actions";

const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER

export function getHiScoreThunk(){
    return async (dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/score/`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if(result){
            dispatch(getHiScore(result[0].hi_score));
        }else{
            dispatch(failed(result.msg))
        }
    }
}
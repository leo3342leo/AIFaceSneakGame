import { ThunkDispatch } from '../store';
import { allUser } from './action';


const {REACT_APP_API_SERVER} = process.env;


export function allUserThunk(){
    return async (dispatch:ThunkDispatch) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/legend/`);
        const result = await res.json();
        if (res.status === 200) {
            dispatch(allUser(result));
          }
    }
}

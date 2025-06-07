import { ICanvasActions } from './actions';
import { GridElem, Directions } from "../util/enums";
import { ICanvasState } from "./state";
import produce from 'immer';

const initialState = {
    grid: Array(26).fill(Array(26).fill(GridElem.EMPTY)),
    COLS: 26,
    ROWS: 26,
    width: 25,
    height: 25,
    direction: Directions.NONE,
    snakeQueue: [{x:3,y:0},{x:2,y:0},{x:1,y:0},{x:0,y:0}],
    score: 0,
    eatFood: false,
    time:30,
}

export const canvasReducer = produce((state:ICanvasState, action:ICanvasActions)=>{
    switch(action.type){
        case "INIT_GAME":
            state.grid = state.grid.map((r,i)=>{
                if(state.snakeQueue.map(p=>p.x).includes(i)){
                    return r.map((c,i)=>{
                        if(state.snakeQueue.map(p=>p.y).includes(i)){
                            return GridElem.SNAKE
                        }else{
                            return c
                        }
                    })
                }else{
                    return r
                }
            });
            return;
        case "SET_FOOD":
            const empty = [];
            for (let x=0; x<state.COLS; x++){
                for(let y=0; y<state.ROWS; y++){
                    if(state.grid[x][y] === GridElem.EMPTY){
                        empty.push({x:x,y:y})
                    }
                }
            }
            const randPos = empty[Math.floor(Math.random() * empty.length)]
            state.grid = state.grid.map((r,i)=>{
                if(i === randPos.x){
                    return r.map((c,i)=>{
                        if(i === randPos.y){
                            return GridElem.FOOD
                        }else{
                            return c;
                        }
                    })
                }else{
                    return r;
                }
            });
            state.eatFood = false;
            return;
        case "NEXT_STEP":
            for (const s of state.snakeQueue) {
                state.grid[s.x][s.y] = GridElem.EMPTY;
            }
            const snakeHead = Object.assign({}, state.snakeQueue[0]);
            switch(state.direction){
                case Directions.LEFT:
                    state.snakeQueue.unshift(snakeHead)
                    snakeHead.x--;
                    break;
                case Directions.UP:
                    state.snakeQueue.unshift(snakeHead)
                    snakeHead.y--;
                    break;
                case Directions.RIGHT:
                    state.snakeQueue.unshift(snakeHead)
                    snakeHead.x++;
                    break;
                case Directions.DOWN:
                    state.snakeQueue.unshift(snakeHead)
                    snakeHead.y++;
                    break;
                case Directions.NONE:
                    break;
            };
            if(0 > snakeHead.x){
                snakeHead.x = state.COLS-1;
            }
            if(snakeHead.x > state.ROWS-1){
                snakeHead.x = 0;
            }
            if(0 > snakeHead.y){
                snakeHead.y = state.COLS-1;
            }
            if(snakeHead.y > state.ROWS-1){
                snakeHead.y = 0;
            }
            if(state.grid[snakeHead.x].indexOf(GridElem.FOOD) === snakeHead.y){
                state.score++;
                state.eatFood = true;
            }else{
                if(state.direction !== Directions.NONE){
                    state.snakeQueue.pop()
                }
            }
            for(const n of state.snakeQueue){
                state.grid[n.x][n.y] = GridElem.SNAKE
            }
            return;
        case "CHANGE_DIRECTION":
            if(action.d === Directions.LEFT && state.direction === Directions.RIGHT){
                return state;
            }
            if(action.d === Directions.UP && state.direction === Directions.DOWN){
                return state;
            }
            if(action.d === Directions.RIGHT && state.direction === Directions.LEFT){
                return state;
            }
            if(action.d === Directions.DOWN && state.direction === Directions.UP){
                return state;
            }
            state.direction = action.d
            return;
        case "TIME_COUNTDOWN":
            if(state.time < 0){
                state.time = 0
            }
            if(state.time - 0.01 > 0.0001){
                state.time = state.time-0.1
            }
            return;
        case "ADD_TIME":
            state.time += action.s;
            return;
        case "RESET_GAME":
            return initialState;
        case "FAILED":
            return {
                ...state,
                msg:action.msg
            }
        default:
            return state;
    }
},initialState);
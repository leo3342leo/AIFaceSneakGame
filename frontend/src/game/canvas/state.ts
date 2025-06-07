import { GridElem, Directions } from "../util/enums";
import {Position} from '../util/position';


export interface ICanvasState {
    grid: GridElem[][]
    COLS:number
    ROWS:number
    width:number
    height:number
    direction: Directions
    snakeQueue:Array<Position>
    score:number
    eatFood:boolean
    time:number
}
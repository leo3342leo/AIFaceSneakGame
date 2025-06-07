export class Position{

    x:number
    y:number

    constructor(x:number,y:number){
        this.x = x,
        this.y = y
    }

    static copy (position: Position){
        return new Position (position.x, position.y);
    }
}
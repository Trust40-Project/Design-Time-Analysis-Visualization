import {IPosition} from './IPosition';

export class Position implements IPosition{
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number){
        this.x = x;
    }

    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
}

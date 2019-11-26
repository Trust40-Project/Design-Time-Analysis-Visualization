import {IPosition} from './IPosition';

/**
 * A point in a two dimensional room.
 * @implements IPosition
 * @see IPosition
 * @author Malte Reimann
 */
export class Position implements IPosition{
    private _x: number = 0;
    private _y: number = 0;

    /**
     * Creates a new position in a two dimensional room.
     * @param x horizontal coordinate.
     * @param y vertical coordinate.
     */
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    /**
     * @returns the horizontal coordinate.
     */
    public get x(): number {
        return this._x;
    }
    /**
     * Set the horizontal coordinate.
     * @param value of new horizontal coordinate.
     */
    public set x(value: number) {
        this._x = value;
    }

    /**
     * @returns the vertical coordinate.
     */
    public get y(): number {
        return this._y;
    }
    /**
     * Set the vertical coordinate.
     * @param value of new vertical coordinate.
     */
    public set y(value: number) {
        this._y = value;
    }

    public toString(): string{
        return this.x + "," + this.y;
    }
}

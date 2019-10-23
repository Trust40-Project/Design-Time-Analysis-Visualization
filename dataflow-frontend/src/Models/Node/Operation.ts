import { INode } from "./INode";
import {Position} from "../Position/Position";
import { IDatum } from "../Edge/IEdge";
import { IPosition } from "../Position/IPosition";


export class Operation implements INode {
   private _id: number = 0;
    
   private _position: IPosition = new Position(0, 0);
    
   private _name: string = 'Operation';
    
  
    constructor(id: number = 0, position: Position = new Position(0,0), name: string = 'Operation') {
        this.id = id;
        this.position = position;
        this.name = name;
       

    }

   

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get position(): IPosition {
        return this._position;
    }
    public set position(value: IPosition) {
        this._position = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

   
    
}
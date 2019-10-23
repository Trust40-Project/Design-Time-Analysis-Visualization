import { IPosition } from "../Position/IPosition";
import { IDatum } from "../Edge/IEdge";

export interface INode{
    id:number;
    position: IPosition;
    name: string;
}
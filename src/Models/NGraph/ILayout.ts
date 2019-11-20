import { IPosition } from "../Position/IPosition";
import { INode } from "./INode";
import { IGraph } from "./IGraph";

export interface ILayout<T extends (number|string), D>{
    getNodePosition(nodeId:T):IPosition;
    step():boolean;
    setNodePosition(nodeId:T, x:number, y:number):void;
    getLinkPosition(linkId:string):{from:IPosition, to:IPosition};
    getGraphRect():{x1:number,x2:number, y1:number, y2:number };
    pinNode(node:INode<T, D>, isPinned: boolean):void;
    isNodePinned(node:INode<T,D>):boolean;
    dispose():void;
}
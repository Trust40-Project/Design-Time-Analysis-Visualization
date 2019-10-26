import { INode } from "../NGraph/INode";
import { IFlowChart } from "./IFlowChart";
import { IOperation } from "../Operation/IOperation";


export interface ISoftwareComponent{
    id: number;
    name: string;
    nodes:Array<INode<number, IOperation>>;
}
import { INode } from "../Node/INode";
import { IFlowChart } from "./IFlowChart";


export interface ISoftwareComponent extends IFlowChart{
    rank: number;
    name: string;
}
import { INode } from "../Node/INode";
import { IEdge } from "../Edge/IEdge";

export interface IFlowChart{
    nodes: INode[];
    edges: IEdge[];
}
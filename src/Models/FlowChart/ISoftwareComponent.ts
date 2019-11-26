import { INode } from "../NGraph/INode";
import { IFlowChart } from "./IFlowChart";
import { IOperation } from "../Operation/IOperation";

/**
 * A software component is a set of operations that are operated on data moving through the software component.
 * @see INode
 * @see IOperation
 * @author Malte Reimann
 * 
 */
export interface ISoftwareComponent {
    id: number;
    name: string;
    nodes: Array<INode<number, IOperation>>;
}
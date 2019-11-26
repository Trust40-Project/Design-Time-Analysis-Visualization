import { IGraph } from "../NGraph/IGraph";
import { IOperation } from "../Operation/IOperation";
import { IDatum } from "../Datum/IDatum";
import { ILayout } from "../NGraph/ILayout";
import { ISoftwareComponent } from "./ISoftwareComponent";

/**
 * A flow chart is a graph for different software components with a certain layout.
 * @author Malte Reimann
 * @see IGraph
 * @see ILayout
 * @see ISoftwareComponent
 * @see IOperation
 * @see IDatum
 */
export interface IFlowChart{
    graph: IGraph<number, IOperation ,IDatum >;
    layout:ILayout<number, IOperation>;
    softwareComponents: Array<ISoftwareComponent>;
}
import { IGraph } from "../NGraph/IGraph";
import { IOperation } from "../Operation/IOperation";
import { IDatum } from "../Datum/IDatum";
import { ILayout } from "../NGraph/ILayout";
import { ISoftwareComponent } from "./ISoftwareComponent";

export interface IFlowChart{
    graph: IGraph<number, IOperation ,IDatum >;
    layout:ILayout<number, IOperation>;
    softwareComponents: Array<ISoftwareComponent>;
}
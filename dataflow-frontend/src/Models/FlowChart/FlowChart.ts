import { IFlowChart } from "./IFlowChart";
import { IGraph } from "../NGraph/IGraph";
import { IOperation } from "../Operation/IOperation";
import { IDatum } from "../Datum/IDatum";
import { ILayout } from "../NGraph/ILayout";
import { ISoftwareComponent } from "./ISoftwareComponent";

export class FlowChart implements IFlowChart {
    private _graph: IGraph<number, IOperation, IDatum>; 
    private _softwareComponents: ISoftwareComponent[];
    private _layout: ILayout<number, IOperation>;

    constructor(graph: IGraph<number,IOperation,IDatum>, softwareComponents: ISoftwareComponent[], layout: ILayout<number, IOperation>){
        this._graph = graph;
        this._softwareComponents = softwareComponents;
        this._layout = layout;
    }

    public get graph(): IGraph<number, IOperation, IDatum> {
        return this._graph;
    }
    public set graph(value: IGraph<number, IOperation, IDatum>) {
        this._graph = value;
    }
    public get layout(): ILayout<number, IOperation> {
        return this._layout;
    }
    public set layout(value: ILayout<number, IOperation>) {
        this._layout = value;
    }
    public get softwareComponents(): ISoftwareComponent[] {
        return this._softwareComponents;
    }
    public set softwareComponents(value: ISoftwareComponent[]) {
        this._softwareComponents = value;
    }


}
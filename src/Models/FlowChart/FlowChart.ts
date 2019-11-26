import { IFlowChart } from "./IFlowChart";
import { IGraph } from "../NGraph/IGraph";
import { IOperation } from "../Operation/IOperation";
import { IDatum } from "../Datum/IDatum";
import { ILayout } from "../NGraph/ILayout";
import { ISoftwareComponent } from "./ISoftwareComponent";

/**
 * Flow chart implementation for managing the representation of a flow chart for software components.
 * @implements IFlowChart
 * @see IGraph
 * @see ILayout
 * @see ISoftwareComponent
 * @author Malte Reimann
 */
export class FlowChart implements IFlowChart {
    private _graph: IGraph<number, IOperation, IDatum>;
    private _softwareComponents: ISoftwareComponent[];
    private _layout: ILayout<number, IOperation>;

    /**
     * Creates a new flow chart.
     * @param graph containing the nodes and edges of this flow chart.
     * @param softwareComponents represented by this flow chart.
     * @param layout describing at what positions to draw the nodes of this flow chart.
     */
    constructor(graph: IGraph<number, IOperation, IDatum>, softwareComponents: ISoftwareComponent[], layout: ILayout<number, IOperation>) {
        this._graph = graph;
        this._softwareComponents = softwareComponents;
        this._layout = layout;
    }

    /**
     * @returns the graph representing this flow chart.
     */
    public get graph(): IGraph<number, IOperation, IDatum> {
        return this._graph;
    }
    /**
     * Set the graph of this flow chart.
     * @param value the new graph.
     */
    public set graph(value: IGraph<number, IOperation, IDatum>) {
        this._graph = value;
    }
    /**
     * @returns the layout of this flow chart containing the informations on where to draw the nodes of this flow chart.
     */
    public get layout(): ILayout<number, IOperation> {
        return this._layout;
    }
    /**
     * Set the layout of this flow chart.
     * @param value the new layout.
     */
    public set layout(value: ILayout<number, IOperation>) {
        this._layout = value;
    }
    /**
     * @returns all the software components represented by this flow chart.
     */
    public get softwareComponents(): ISoftwareComponent[] {
        return this._softwareComponents;
    }
    /**
     * Set the software components of this flow chart.
     * @param value containg all the software components this flow chart represents.
     */
    public set softwareComponents(value: ISoftwareComponent[]) {
        this._softwareComponents = value;
    }


}
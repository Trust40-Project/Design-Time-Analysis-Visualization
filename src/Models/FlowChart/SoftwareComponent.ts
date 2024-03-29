import { ISoftwareComponent } from "./ISoftwareComponent";
import { INode } from "../NGraph/INode";
import { IOperation } from "../Operation/IOperation";

/**
 * Implementation for a data structure containing the software components that make up a software system.
 * @implements ISoftwareComponent
 * @see INode
 * @see IOperation
 * @author Malte Reimann
 */
export class SoftwareComponent implements ISoftwareComponent {
    private static idCount: number = 0;
    private _id: number = SoftwareComponent.idCount;
    private _name: string = '';
    private _nodes: Array<INode<number, IOperation>> = [];
    private _color: string;



    /**
     * 
     * Creates a new software component including a certain set of operations.
     * @param name of this software component.
     * @default name 'software component'.
     * @param nodes representing the different operations in this software component.
     * @default nodes []
     * @param id an unique identifier for this software component.
     * @default id manage internally.
     */
    constructor(name: string = 'software component', nodes: Array<INode<number, IOperation>> = [], id: number = SoftwareComponent.idCount, ) {
        this.name = name;
        this._id = id;
        this.nodes = nodes;
        SoftwareComponent.idCount++;
        this._color = this.calcColor();
    }





    /**
     * @returns all the nodes each containing an operation of this software component.
     */
    public get nodes(): Array<INode<number, IOperation>> {
        return this._nodes;
    }
    /**
     * Set the nodes of operations for this software component.
     * @param value containig all the nodes of operations.
     */
    public set nodes(value: Array<INode<number, IOperation>>) {
        this._nodes = value;
    }

    /**
     * @retunrs an unique identifier for this software component.
     */
    public get id(): number {
        return this._id;
    }


    /**
     * @returns the name of this software component.
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Set the name of this software component.
     * @param value of the new name.
     */
    public set name(value: string) {
        this._name = value;
    }

    public getColor(): string {
        return this._color;
    }


    private calcColor(): string {
        switch (this.id % 15) {
            case 0:
                return 'red';

            case 1:
                return 'orange';

            case 2:
                return 'yellow';

            case 3:
                return 'pink';

            case 4:
                return 'blue';

            case 5:
                return 'red-dark';

            case 6:
                return 'orange-dark';

            case 7:
                return 'yellow-dark';

            case 8:
                return 'pink-dark';

            case 9:
                return 'blue-dark';

            case 10:
                return 'red-light';

            case 11:
                return 'orange-light';

            case 12:
                return 'yellow-light';

            case 13:
                return 'pink-light';

            case 14:
                return 'blue-light';

            default:
                return 'primary';

        }
    }


}
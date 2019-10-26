import { ISoftwareComponent } from "./ISoftwareComponent";
import { INode } from "../NGraph/INode";
import { IOperation } from "../Operation/IOperation";

export class SoftwareComponent implements ISoftwareComponent{
    private static idCount: number = 0;
    private _id: number = SoftwareComponent.idCount;    
    private _name: string = '';
    private _nodes: Array<INode<number, IOperation>> = [];
    
    

    constructor(id: number = SoftwareComponent.idCount, name: string='software component', nodes: Array<INode<number, IOperation>> = []){
        this.name = name;
        this.id = id;
        this.nodes = nodes;
        SoftwareComponent.idCount++;
    }

    

  

    public get nodes(): Array<INode<number, IOperation>> {
        return this._nodes;
    }
    public set nodes(value: Array<INode<number, IOperation>>) {
        this._nodes = value;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }


    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }


}
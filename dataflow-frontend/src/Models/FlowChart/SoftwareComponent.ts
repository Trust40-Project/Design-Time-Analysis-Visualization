import { ISoftwareComponent } from "./ISoftwareComponent";
import { INode } from "../Node/INode";
import { IEdge } from "../Edge/IEdge";
import { Datum } from "../Edge/Datum";

export class SoftwareComponent implements ISoftwareComponent{
    private _edges: IEdge[] = [];
    private _rank: number = 0;    
    private _name: string = '';
    private _nodes: Array<INode> = [];
    

    constructor(rank: number, name: string, nodes: Array<INode>, edges: Array<IEdge>){
        this.name = name;
        this.rank = rank;
        this.nodes = nodes;
        this.edges = edges;
    }

    public get edges(): IEdge[] {
        return this._edges;
    }
    public set edges(value: IEdge[]) {
        this._edges = value;
    }

    public get nodes(): Array<INode> {
        return this._nodes;
    }
    public set nodes(value: Array<INode>) {
        this._nodes = value;
    }

    public get rank(): number {
        return this._rank;
    }
    public set rank(value: number) {
        this._rank = value;
    }


    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }


}
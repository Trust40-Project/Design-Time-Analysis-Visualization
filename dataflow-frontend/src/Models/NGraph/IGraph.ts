import { INode } from "./INode";
import { ILink } from "./ILink";

export interface IGraph<T extends (number | string), D, E>{
    addNode(nodeId: T, data: D): INode<T, D>;
    addLink(fromId:T, toId:T, data: E):ILink<T,E>;
    removeLink(link: ILink<T,E>): boolean;
    removeNode(nodeId: T): boolean;
    getNode(nodeId: T): (INode<T,D>| undefined);
    getNodesCount():number;
    getLinksCount(): number;
    getLinks(nodeId:T): Array<ILink<T, E>>;
    forEachNode(callback: (node: INode<T, D>)=>void): void;
    forEachLinkedNode(nodeId: T, callback: (node:INode<T,D>, link:ILink<T,E>) => (void|boolean), oriented: boolean): void;
    forEachLink(callback: (nodeId: T)=> void): void;
    beginUpdate():void;
    endUpdate(): void;
    clear():void;
    getLink(fromId: T, toId:T):ILink<T,E>;

}
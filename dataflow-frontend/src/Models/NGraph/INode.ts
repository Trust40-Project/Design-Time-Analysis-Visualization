import { ILink } from "./ILink";

export interface INode<T extends(number | string), D>{
    id:T;
    links: Array<ILink<T, any>>;
    data: D;
}
import { ILink } from "./ILink";
/**
 * A node as used in NGraph library reverse engineered to use strong typing when using the library.
 * @see https://github.com/anvaka/ngraph
 * @see https://github.com/anvaka/ngraph.graph
 * @author anvaka
 */
export interface INode<T extends(number | string), D>{
    id:T;
    links: Array<ILink<T, any>>;
    data: D;
}
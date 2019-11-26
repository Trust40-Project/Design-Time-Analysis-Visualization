/**
 * A link/edge as used in NGraph library reverse engineered to use strong typing when using the library.
 * @see https://github.com/anvaka/ngraph
 * @see https://github.com/anvaka/ngraph.graph
 * @author anvaka
 */
export interface ILink<T extends (number | string), D>{
    fromId: T;
    toId:T;
    data: D;
    id: string;

}
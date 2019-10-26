export interface ILink<T extends (number | string), D>{
    fromId: T;
    toId:T;
    data: D;
    id: string;

}
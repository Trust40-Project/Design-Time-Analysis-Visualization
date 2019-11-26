import { IPosition } from "../Position/IPosition";
import { INode } from "./INode";
import { IGraph } from "./IGraph";

/**
 * A layout as used in NGraph library reverse engineered to use strong typing when using the library.
 * @see https://github.com/anvaka/ngraph
 * @see https://github.com/anvaka/ngraph.forcelayout
 * @author anvaka
 */
export interface ILayout<T extends (number|string), D>{
    /**
     * For a given `nodeId` returns position
     */
    getNodePosition(nodeId:T):IPosition;
     /**
     * Performs one step of iterative layout algorithm
     *
     * @returns {boolean} true if the system should be considered stable; False otherwise.
     * The system is stable if no further call to `step()` can improve the layout.
     */
    step():boolean;
    /**
     * Sets position of a node to a given coordinates
     * @param {string} nodeId node identifier
     * @param {number} x position of a node
     * @param {number} y position of a node
     * @param {number=} z position of node (only if applicable to body)
     */
    setNodePosition(nodeId:T, x:number, y:number):void;
    /**
     * @returns {Object} Link position by link id
     * @returns {Object.from} {x, y} coordinates of link start
     * @returns {Object.to} {x, y} coordinates of link end
     */
    getLinkPosition(linkId:string):{from:IPosition, to:IPosition};
    /**
     * @returns {Object} area required to fit in the graph. Object contains
     * `x1`, `y1` - top left coordinates
     * `x2`, `y2` - bottom right coordinates
     */
    getGraphRect():{x1:number,x2:number, y1:number, y2:number };
    /*
     * Requests layout algorithm to pin/unpin node to its current position
     * Pinned nodes should not be affected by layout algorithm and always
     * remain at their position
     */
    pinNode(node:INode<T, D>, isPinned: boolean):void;
    /**
     * Checks whether given graph's node is currently pinned
     */
    isNodePinned(node:INode<T,D>):boolean;
    /**
     * Request to release all resources
     */
    dispose():void;
}
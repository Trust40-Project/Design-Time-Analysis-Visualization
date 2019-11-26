import { INode } from "./INode";
import { ILink } from "./ILink";

/**
 * A graph as used in NGraph library reverse engineered to use strong typing when using the library.
 * @see https://github.com/anvaka/ngraph
 * @see https://github.com/anvaka/ngraph.graph
 * @author anvaka
 */
export interface IGraph<T extends (number | string), D, E> {
    /**
     * Adds node to the graph. If node with given id already exists in the graph
     * its data is extended with whatever comes in 'data' argument.
     *
     * @param nodeId the node's identifier. A string or number is preferred.
     * @param [data] additional data for the node being added. If node already
     *   exists its data object is augmented with the new one.
     *
     * @return {node} The newly added node or node with given id if it already exists.
     */
    addNode(nodeId: T, data: D): INode<T, D>;
    /**
     * Adds a link to the graph. The function always create a new
     * link between two nodes. If one of the nodes does not exists
     * a new node is created.
     *
     * @param fromId link start node id;
     * @param toId link end node id;
     * @param [data] additional data to be set on the new link;
     *
     * @return {link} The newly created link
     */
    addLink(fromId: T, toId: T, data: E): ILink<T, E>;
    /**
     * Removes link from the graph. If link does not exist does nothing.
     *
     * @param link - object returned by addLink() or getLinks() methods.
     *
     * @returns true if link was removed; false otherwise.
     */
    removeLink(link: ILink<T, E>): boolean;
    /**
     * Removes node with given id from the graph. If node does not exist in the graph
     * does nothing.
     *
     * @param nodeId node's identifier passed to addNode() function.
     *
     * @returns true if node was removed; false otherwise.
     */
    removeNode(nodeId: T): boolean;
    /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */
    getNode(nodeId: T): (INode<T, D> | undefined);
    /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */
    getNodesCount(): number;
    /**
     * Gets total number of links in the graph.
     * @return number of links in the graph.
     */
    getLinksCount(): number;
    /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Array of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */
    getLinks(nodeId: T): Array<ILink<T, E>>;
    /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */
    forEachNode(callback: (node: INode<T, D>) => void): void;
    /**
     * Invokes callback on every linked (adjacent) node to the given one.
     *
     * @param nodeId Identifier of the requested node.
     * @param {Function(node, link)} callback Function to be called on all linked nodes.
     *   The function is passed two parameters: adjacent node and link object itself.
     * @param oriented if true graph treated as oriented.
     */
    forEachLinkedNode(nodeId: T, callback: (node: INode<T, D>, link: ILink<T, E>) => (void | boolean), oriented: boolean): void;
    /**
     * Enumerates all links in the graph
     *
     * @param {Function(link)} callback Function to be called on all links in the graph.
     *   The function is passed one parameter: graph's link object.
     *
     * Link object contains at least the following fields:
     *  fromId - node id where link starts;
     *  toId - node id where link ends,
     *  data - additional data passed to graph.addLink() method.
     */
    forEachLink(callback: (nodeId: T) => void): void;
    /**
     * Suspend all notifications about graph changes until
     * endUpdate is called.
     */
    beginUpdate(): void;
    /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */
    endUpdate(): void;
    /**
     * Removes all nodes and links from the graph.
     */
    clear(): void;
    /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one. null otherwise.
     */
    getLink(fromId: T, toId: T): ILink<T, E>;

}
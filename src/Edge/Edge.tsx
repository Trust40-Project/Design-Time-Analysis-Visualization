import React from 'react';
import './Edge.css';
import { IDatum } from '../Models/Datum/IDatum';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';
import { anchorFactory, IAnchor, IAnchorPosition } from '../Models/Position/Anchor';
import { Node } from '../Node/Node';

type EdgeProps = {
    /**
     * Where the edge is supposed to start on the screen.
     */
    from: IPosition,
    /**
     * Where the edge is supposed to end on the screen.
     */
    to: IPosition,
    /**
     * For react to keep track of changes.
     */
    key: number,
    /**
     * Callback to globally turn edge animation on and off.
     */
    onEdgeAnimationToggle: () => void,
    /**
     * Whether or not to animate this edge.
     */
    edgeAnimationOn: boolean

}

/**
 * A directed edge visually connects two nodes. 
 * Either with or without an animation.
 * @param param0 the edge props for this edge.
 * @see EdgeProps
 * @author Malte Reimann
 */
const Edge: React.FC<EdgeProps> = ({ from, to, onEdgeAnimationToggle, edgeAnimationOn }) => {


    const points = getArrowPathPoints(from, to, 4);
    return (

        <svg style={{ position: "absolute", top: 0, left: 0, width: "1em", height: "1em", overflow: "visible" }} viewBox="0 0 1 1">

            <defs>
                <marker id="arrowhead" markerWidth="16" markerHeight="16"
                    orient="auto" refY="4">
                    <path className="edgeArrowHead" onClick={onEdgeAnimationToggle} d="M 2.586 1.172 l 2.828 2.828 l -2.828 2.828" />
                </marker>
            </defs>
            <polyline onClick={onEdgeAnimationToggle} className={edgeAnimationOn ? "edge edgeAnimation" : "edge"} points={points} />
        </svg>
    );
    


}



export default Edge;



/**
 * Calculates points on the edge line with a certain display.
 * The points can be used to display arrow heads at.
 * @param from where the line starts.
 * @param to where the line goes to.
 * @param distance in between two points.
 * @retunrs the points in a string rady to use with svg polyline points.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
 */
function getArrowPathPoints(from: IPosition, to: IPosition, distance: number): string {
    let result: string = from.x + ',' + from.y;
    let lambda: number = 0;
    while (lambda < 0.85 && lambda >= 0) {

        lambda = lambda + (distance / Math.sqrt((Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2))));
        let next = new Position(from.x + lambda * (to.x - from.x), from.y + lambda * (to.y - from.y));
        result += ' ' + next.x + ',' + next.y;

    }

    return result;

}
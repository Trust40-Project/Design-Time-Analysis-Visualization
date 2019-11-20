import React from 'react';
import './Edge.css';
import { IDatum } from '../Models/Datum/IDatum';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';
import { anchorFactory, IAnchor, IAnchorPosition } from '../Models/Position/Anchor';
import { Node } from '../Node/Node';

type EdgeProps = {
    from: IPosition,
    to: IPosition,
    nodeWidth: number,
    nodeHeight: number,
    key: number,
    onEdgeAnimationToggle: () => void,
    edgeAnimationOn: boolean

}

const Edge: React.FC<EdgeProps> = ({ from, to, nodeWidth, nodeHeight, onEdgeAnimationToggle, edgeAnimationOn }) => {


    //const anchorPositions = getAnchorDirections(from, to, nodeWidth, nodeHeight);
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
    /**            <path onClick={onEdgeAnimationToggle} className={edgeAnimationOn ? "edge edgeAnimation" : "edge"} style={{ zIndex: 0 }} d={"M " + (from.x) + " " + (from.y) + " L " + (to.x) + " " + (to.y)} stroke="var(--color-border)" strokeWidth="0.4" strokeLinecap="round" fill="none" ></path>
     */


}



export default Edge;


function getAnchorDirections(from: IPosition, to: IPosition, width: number, height: number): IAnchorPosition {
    const anchor: IAnchor = anchorFactory(from, to, width, height);
    return anchor.getAnchorPositions();
}

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
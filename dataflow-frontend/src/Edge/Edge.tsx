import React from 'react';
import './Edge.css';
import { IDatum } from '../Models/Datum/IDatum';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';
import { anchorFactory, IAnchor, IAnchorPosition } from '../Models/Position/Anchor';
import {Node} from '../Node/Node';

type EdgeProps = {
    from: IPosition,
    to:IPosition,
    key: string
}

const Edge: React.FC<EdgeProps> = ({ from, to, key }) => {

    console.log("from -> to");
    console.dir(from);
    console.dir(to);
    console.log("__");
    const anchorPositions = getAnchorDirections(from, to);

    return (

        <svg style={{position:"absolute", top: 0, left:0, width:"1em", height:"1em", overflow:"visible"}} viewBox="0 0 1 1">
             <path style={{zIndex:0}}  d={"M "+(anchorPositions.from.x)+ " "+ (anchorPositions.from.y)+" L "+(anchorPositions.to.x) + " " +(anchorPositions.to.y)} stroke="var(--color-border)" strokeWidth="0.1" strokeLinecap="round" fill="none" ></path>
        </svg>
    );



}



export default Edge;


function getAnchorDirections(from: IPosition, to: IPosition):IAnchorPosition {
   const anchor:IAnchor = anchorFactory(from, to, Node.width, Node.height);
   return anchor.getAnchorPositions();
}   
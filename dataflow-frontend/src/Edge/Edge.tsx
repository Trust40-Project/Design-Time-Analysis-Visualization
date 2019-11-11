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
    nodeWidth: number,
    nodeHeight: number,
    key: number,
    onEdgeAnimationToggle: () => void,
    edgeAnimationOn:boolean
    
}

const Edge: React.FC<EdgeProps> = ({ from, to,nodeWidth, nodeHeight, onEdgeAnimationToggle,edgeAnimationOn }) => {

    
    //const anchorPositions = getAnchorDirections(from, to, nodeWidth, nodeHeight);

    return (

        <svg style={{position:"absolute", top: 0, left:0, width:"1em", height:"1em", overflow:"visible"}} viewBox="0 0 1 1">
             <path onClick={onEdgeAnimationToggle} className={edgeAnimationOn? "edge edgeAnimation": "edge"} style={{zIndex:0}}  d={"M "+(from.x)+ " "+ (from.y)+" L "+(to.x) + " " +(to.y)} stroke="var(--color-border)" strokeWidth="0.4" strokeLinecap="round" fill="none" ></path>
        </svg>
    );



}



export default Edge;


function getAnchorDirections(from: IPosition, to: IPosition, width:number, height:number):IAnchorPosition {
   const anchor:IAnchor = anchorFactory(from, to, width, height);
   return anchor.getAnchorPositions();
}   
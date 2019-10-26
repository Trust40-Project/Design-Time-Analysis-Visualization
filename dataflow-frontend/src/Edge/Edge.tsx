import React from 'react';
import './Edge.css';
import { IDatum } from '../Models/Datum/IDatum';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';

type EdgeProps = {
    from: IPosition,
    to:IPosition,
    key: string
}

const Edge: React.FC<EdgeProps> = ({ from, to, key }) => {



    return (

        <svg style={{position:"absolute", top: 0, left:0, width:"1em", height:"1em", overflow:"visible"}} viewBox="0 0 1 1">
             <path style={{zIndex:0}}  d={"M "+(from.x)+ " "+ (from.y)+" L "+(to.x) + " " +(to.y)} stroke="black" strokeWidth="0.1" fill="none" ></path>
        </svg>
    );



}



export default Edge;


function getAnchorDirections(from: IPosition, to: IPosition) {
   const posAfterTranslation = new Position(from.x - to.x, from.y-to.y);

}   
import React from 'react';
import './Edge.css';
import { IPosition } from '../Models/Position/IPosition';

type EdgeProps = {
    startPosition: IPosition,
    endPosition: IPosition
}

const Edge : React.FC<EdgeProps> = ({startPosition, endPosition}) => {
    return (
        <div>

        </div>
    );;
    
}

export default Edge;
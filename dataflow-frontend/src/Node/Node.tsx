import React from 'react';
import './Node.css'
import { INode } from '../Models/Node/INode';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';


type NodeProps = {
    node: INode,
    key: number
}

export class Node extends React.Component<NodeProps> {
    static width: number = 10;
    static height: number = 5;
    

    render(){
        const node: INode = this.props.node;
        const position: IPosition = node.position;
        console.dir(position);
        const leftTopCorner: IPosition = new Position((position.x - (Node.width/2)), (position.y - (Node.height/2)));


        return (
            /**width: Node.width + 'vw', height: Node.height + 'vh', */
            <div className='node' style={{ top: leftTopCorner.y + 'vh', left: leftTopCorner.x + 'vw'}}>{node.name}</div>
        );
    }
}
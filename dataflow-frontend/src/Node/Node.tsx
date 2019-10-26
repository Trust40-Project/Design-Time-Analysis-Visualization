import React from 'react';
import './Node.css'
import { INode } from '../Models/NGraph/INode';
import { IPosition } from '../Models/Position/IPosition';
import { Position } from '../Models/Position/Position';
import { IOperation } from '../Models/Operation/IOperation';
import { IDatum } from '../Models/Datum/IDatum';
import { ILayout } from '../Models/NGraph/ILayout';
import { IGraph } from '../Models/NGraph/IGraph';
import Edge from '../Edge/Edge';
import { JSXElement } from '@babel/types';
import { ILink } from '../Models/NGraph/ILink';


type NodeProps = {
    node: INode<number, IOperation>,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>

}

export class Node extends React.Component<NodeProps> {
    static width: number = 10;
    static height: number = 5;
    

    render(){
        const node: INode<number, IOperation> = this.props.node;
        const layout : ILayout<number, IOperation> = this.props.layout;
        const position: IPosition = layout.getNodePosition(node.id);
        const leftTopCorner: IPosition = new Position((position.x - (Node.width/2)), (position.y - (Node.height/2)));
        const edges = this.props.graph.getLinks(node.id).filter( value => value.fromId === node.id);
        const toDisplay: JSX.Element[] = [];
        toDisplay.push(
            <div className='node' key={node.id} style={{top: leftTopCorner.y + 'em', left:leftTopCorner.x +'em', zIndex:5}}>{node.data.name}</div>

        );

        edges.forEach(value => {console.dir(value); toDisplay.push(<Edge from={layout.getNodePosition(value.fromId)} to={layout.getNodePosition(value.toId)} key={value.id}></Edge>)});
            return toDisplay;
        /*
        return (
            /**width: Node.width + 'vw', height: Node.height + 'vh', top: leftTopCorner.y + 'vh', left: leftTopCorner.x + 'vw'*/
            /**<div className='node' style={{gridColumn: position.x+'/'+(position.x+1), gridRow: position.y + '/'+(position.y +1) }}>{node.data.name}</div>*/
/*
        );*/
    }
}
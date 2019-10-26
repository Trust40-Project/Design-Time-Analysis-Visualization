import React from 'react';
import './SoftwareComponent.css';
import {ISoftwareComponent} from '../Models/FlowChart/ISoftwareComponent';
import {Node} from '../Node/Node';
import Edge from '../Edge/Edge';
import { INode } from '../Models/NGraph/INode';
import { ILayout } from '../Models/NGraph/ILayout';
import { IOperation } from '../Models/Operation/IOperation';
import { IGraph } from '../Models/NGraph/IGraph';
import { IDatum } from '../Models/Datum/IDatum';

type SoftwareComponentProps = {
    component: ISoftwareComponent,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>
}

export class SoftwareComponent extends React.Component<SoftwareComponentProps>{
    
    renderNodes() {
        const component = this.props.component;
       const layout = this.props.layout;
       const graph = this.props.graph;

       const nodes = component.nodes.map((value: INode<number, IOperation>, index: number, array: INode<number, IOperation>[]) =>
           <Node node={value} key={value.id} layout={layout} graph={graph}></Node>
        );

        return nodes;
    }
/*
    renderEdges(){
       const edges = this.props.component.edges.map((value: IEdge, index: number, array: IEdge[]) =>
           <Edge datum={value} key={value.id}></Edge>
       );
       return edges;
    }*/
    render(){
       // const edges = this.renderEdges();
        return this.renderNodes();
        
    }
}
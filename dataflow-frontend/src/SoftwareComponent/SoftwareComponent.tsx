import React from 'react';
import './SoftwareComponent.css';
import {ISoftwareComponent} from '../Models/FlowChart/ISoftwareComponent';
import {Node} from '../Node/Node';
import Edge from '../Edge/Edge';
import { INode } from '../Models/Node/INode';
import { IEdge } from '../Models/Edge/IEdge';

type SoftwareComponentProps = {
    component: ISoftwareComponent,
    key: number,
}

export class SoftwareComponent extends React.Component<SoftwareComponentProps>{
    
    renderNodes() {
       const nodes = this.props.component.nodes.map((value: INode, index: number, array: INode[]) =>
           <Node node={value} key={value.id}></Node>
        );
        console.dir(nodes);

        return nodes;
    }

    renderEdges(){
       const edges = this.props.component.edges.map((value: IEdge, index: number, array: IEdge[]) =>
           <Edge datum={value} key={value.id}></Edge>
       );
       return edges;
    }
    render(){
        const edges = this.renderEdges();
        const nodes = this.renderNodes();
        return (
        <div className="softwarecomponent">
            {nodes}
            {edges}
        </div>
        );
    }
}
import React from 'react';
import { IDatum } from '../Models/Datum/IDatum';
import { ISoftwareComponent } from '../Models/FlowChart/ISoftwareComponent';
import { IGraph } from '../Models/NGraph/IGraph';
import { ILayout } from '../Models/NGraph/ILayout';
import { INode } from '../Models/NGraph/INode';
import { IOperation } from '../Models/Operation/IOperation';
import { Node } from '../Node/Node';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';
import './SoftwareComponent.css';

type SoftwareComponentProps = {
    component: ISoftwareComponent,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>,
    selectedNodeId: (number|undefined),
    onSelectedNodeChange: (nodeId:number)=>void,
    onEdgeAnimationToggle: () => void,
    edgeAnimationOn: boolean,
    onHoverNodeChange: (nodeId: (number|undefined)) => void,
    hoverNodeId: (number|undefined),
    revealEffectService: RevealEffectService
}

/**
 * A component representing a part of a software system that is grouped together.
 * @see ISoftwareComponent
 * @author Malte Reimann
 */
export class SoftwareComponent extends React.Component<SoftwareComponentProps>{
    
    /**
     * @returns all the node components to display in this software component.
     */
    renderNodes(): JSX.Element[] {
        const component = this.props.component;
       const layout = this.props.layout;
       const graph = this.props.graph;
       const color = this.props.component.getColor();

       const nodes = component.nodes.map((value: INode<number, IOperation>, index: number, array: INode<number, IOperation>[]) =>
            <Node
                node={value} 
                key={value.id} 
                layout={layout} 
                graph={graph} 
                isSelected={this.props.selectedNodeId === value.id} 
                onSelectedNodeChange={this.props.onSelectedNodeChange}
                onEdgeAnimationToggle={this.props.onEdgeAnimationToggle}
                edgeAnimationOn={this.props.edgeAnimationOn}
                onHoverNodeChange={this.props.onHoverNodeChange}
                hoverNodeId={this.props.hoverNodeId}
                nodeRevealEffectService={this.props.revealEffectService}
                color={color}
            ></Node>
        );

        return nodes;
    }

    render(){
        return this.renderNodes();
    }
}
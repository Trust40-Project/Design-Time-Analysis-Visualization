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
import { JSXElement, identifier } from '@babel/types';
import { ILink } from '../Models/NGraph/ILink';
import { DataContainer } from '../DataContainer/DataContainer';
import {Depths} from '@uifabric/fluent-theme/lib/fluent/FluentDepths'
import { IRevealChild } from '../RevealEffect/RevealEffect';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';
import { getId } from '@uifabric/utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

type NodeProps = {
    node: INode<number, IOperation>,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>,
    isSelected: boolean,
    onSelectedNodeChange: (nodeId: number) => void,
    onEdgeAnimationToggle: () => void,
    edgeAnimationOn:boolean,
    onHoverNodeChange: (nodeId: (number|undefined)) => void,
    hoverNodeId: (number|undefined),
    nodeRevealEffectService: RevealEffectService

}

/**
 * The state of a node defines its width and height dependent on whether or not it is selected.
 */
type NodeState  = {
    width: number,
    height: number,
}

/**
 * Represents a datum node.
 * @author Malte Reimann
 */
export class Node extends React.Component<NodeProps, NodeState> {
    private readonly revealEffectService: RevealEffectService = new RevealEffectService();
    private nodeBorder: HTMLElement|null = null;
    

    constructor(props: NodeProps) {
        super(props);
        this.state = {
            width: this.props.isSelected ? 32 : 9.7,
            height: this.props.isSelected ? 20 : 5,
        }
        this.handleSelectedNodeChange = this.handleSelectedNodeChange.bind(this);
        this.drawBorderRevealHighlight = this.drawBorderRevealHighlight.bind(this);
        this.removeBorderRevealHighlight = this.removeBorderRevealHighlight.bind(this);
        this.drawRevealHighlight = this.drawRevealHighlight.bind(this);
        this.removeRevealHighlight = this.removeRevealHighlight.bind(this);

    }

    drawBorderRevealHighlight(event:React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeBorder = document.getElementById('node-border-'+this.props.node.id);
        if(nodeBorder){
            event.target = nodeBorder; 
            this.props.nodeRevealEffectService.drawBorderRevealHighlight(event);
        }
    }

    removeBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeBorder = document.getElementById('node-border-'+this.props.node.id);
        if(nodeBorder){
            event.target = nodeBorder; 
           this.revealEffectService.removeBorderRevealHighlight(event);
           this.props.nodeRevealEffectService.removeBorderRevealHighlight(event);

        }
    }

    drawRevealHighlight(event:React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeContainer = document.getElementById('node-container-'+this.props.node.id);
        if(nodeContainer){
            event.target = nodeContainer; 
            this.props.nodeRevealEffectService.addRevealHighlight(event);
        }
    }

    removeRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeContainer = document.getElementById('node-container-'+this.props.node.id);
        if(nodeContainer){
            event.target = nodeContainer; 
            this.props.nodeRevealEffectService.removeReveal(event);
        }
    }

    handleSelectedNodeChange(selectedNodeId:number, event:React.MouseEvent<HTMLElement, MouseEvent>) {
       
       this.props.onSelectedNodeChange(selectedNodeId);

       this.removeRevealHighlight(event);
       this.removeBorderRevealHighlight(event);
       
    }


    componentDidUpdate(prevProps: Readonly<NodeProps>, prevState: Readonly<NodeState>) {
        if (prevProps.isSelected !== this.props.isSelected) {
            this.setState({
                width: this.props.isSelected ? 32 : 9.7,
                height: this.props.isSelected ? 20 : 5,
            });
        }

    }

    componentDidMount(){
        if(this.nodeBorder){
            /**
             * Register the border of this node to add reveal effect to it on hover.
             */
            this.props.nodeRevealEffectService.addBorderElement(this.nodeBorder);
        }
    }

    render() {
        const node: INode<number, IOperation> = this.props.node;
        const layout: ILayout<number, IOperation> = this.props.layout;
        const position: IPosition = layout.getNodePosition(node.id);
        const leftTopCorner: IPosition = new Position((position.x - (this.state.width / 2)), (position.y - (this.state.height / 2)));
        const edges = this.props.graph.getLinks(node.id).filter(value => value.fromId === node.id);
        const toDisplay: JSX.Element[] = [];
        const cssLargeNodeClass: string = this.props.isSelected ? 'largenode' : '';
        const cssNodeSelectedButtonClass: string = this.props.isSelected? 'nodeSelectedButton':'';

        edges.forEach(value => toDisplay.push(
            <Edge 
                from={layout.getNodePosition(value.fromId)}
                to={layout.getNodePosition(value.toId)}
                key={value.data.id}  
                onEdgeAnimationToggle={this.props.onEdgeAnimationToggle} 
                edgeAnimationOn={this.props.edgeAnimationOn}
            ></Edge>
        ));




        return (

            <section>
                <div className={"nodeArea "+cssLargeNodeClass} style={{ top: leftTopCorner.y + 'em', left: leftTopCorner.x + 'em' }}>
                    <div ref = {ref => this.nodeBorder = ref} id={"node-border-"+node.id} className={"nodeBorder "+ ((this.props.hoverNodeId === node.id)? 'nodeHover':'')}>
                        <div id={"node-container-"+node.id} onMouseLeave={this.removeRevealHighlight} onMouseMove={this.drawRevealHighlight} className={"nodeContainer "}>
                            <button tabIndex={node.id} onClick={this.handleSelectedNodeChange.bind(this, node.id)} className={"nodeButton blur "+cssNodeSelectedButtonClass}>
                                {this.renderNodeTitle()}
                            </button>
                            {this.renderNodeContent()}
                        </div>
                    </div>
                </div>
                {toDisplay}
            </section>
            

        );

       
    }

    /**
     * @returns the title for this node in the right size.
     */
    private renderNodeTitle(): JSX.Element{
        if(!this.props.isSelected){
            return <p>{this.props.node.data.name}</p>
        } else {
            return <h3>{this.props.node.data.name}</h3>
        }
    }



    /**
     * @returns the content to render within the node depending on the selected state of this node.
     */
    private renderNodeContent(): (JSX.Element|null) {
        const node: INode<number, IOperation> = this.props.node;

        if (!this.props.isSelected) {
            return null;
        } else {

            const links = this.props.graph.getLinks(node.id);
            const input = links.filter(value => value.toId === node.id);
            const output = links.filter(value => value.fromId === node.id);

            return (
                <div className='nodeContent'>



                        <DataContainer onHoverNodeChange={this.props.onHoverNodeChange} revealEffectService={this.revealEffectService} isInput={true} onSelectedNodeChange={this.handleSelectedNodeChange} links={input} titleName="Input"></DataContainer>

                        <DataContainer onHoverNodeChange={this.props.onHoverNodeChange} revealEffectService={this.revealEffectService} isInput={false} onSelectedNodeChange={this.handleSelectedNodeChange} links={output} titleName="Output"></DataContainer>
                </div>

            );
           
        }
    }
}
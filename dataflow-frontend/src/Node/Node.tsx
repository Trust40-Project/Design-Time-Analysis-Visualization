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
type NodeProps = {
    node: INode<number, IOperation>,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>,
    isSelected: boolean,
    onSelectedNodeChange: (nodeId: number) => void,
    onEdgeAnimationToggle: () => void

}

type NodeState  = {
    width: number,
    height: number,
}


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
        //this.handleClickRipple = this.handleClickRipple.bind(this);
    }

    drawBorderRevealHighlight(event:React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeBorder = document.getElementById('node-border-'+this.props.node.id);
        if(nodeBorder){
            event.target = nodeBorder; 
            this.revealEffectService.drawBorderRevealHighlight(event);
           // RevealEffectService.getRevealEffectService().drawBorderRevealHighlight(event);

        }
    }

    removeBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeBorder = document.getElementById('node-border-'+this.props.node.id);
        if(nodeBorder){
            event.target = nodeBorder; 
           // RevealEffectService.getRevealEffectService().removeReveal(event);
           this.revealEffectService.removeReveal(event);

        }
    }

    drawRevealHighlight(event:React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeContainer = document.getElementById('node-container-'+this.props.node.id);
        if(nodeContainer){
            event.target = nodeContainer; 
            //RevealEffectService.getRevealEffectService().addRevealHighlight(event);
            this.revealEffectService.addRevealHighlight(event);
        }
    }

    removeRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>){
        const nodeContainer = document.getElementById('node-container-'+this.props.node.id);
        if(nodeContainer){
            event.target = nodeContainer; 
            //RevealEffectService.getRevealEffectService().removeReveal(event);
            this.revealEffectService.removeReveal(event);
        }
    }

    handleSelectedNodeChange(selectedNodeId:number, event:React.MouseEvent<HTMLElement, MouseEvent>) {
       /* const button =document.getElementById('node-button-'+this.props.node.id);
        if(button){
            event.target = button;
                    this.handleClickRipple(event);

        }
        */
       this.props.onSelectedNodeChange(selectedNodeId);

      // this.props.onSelectedNodeChange(this.props.node.id);
       this.removeRevealHighlight(event);
       this.removeBorderRevealHighlight(event);
    }
/*
    handleClickRipple(event:React.MouseEvent<HTMLButtonElement,MouseEvent>){
       /* if(this.props.onClickRipple){
            this.props.onClickRipple(event);
        }*//*
        RevealEffectService.getRevealEffectService().handleClickRipple(event);
    }
*/

    componentDidUpdate(prevProps: Readonly<NodeProps>, prevState: Readonly<NodeState>) {
        if (prevProps.isSelected !== this.props.isSelected) {
            this.setState({
                width: this.props.isSelected ? 32 : 9.7,
                height: this.props.isSelected ? 20 : 5,
            });
        }

    }

    componentDidMount(){
       // const nodeBorder: HTMLElement|null = document.querySelector('node-border-'+this.props.node.id);
     
        if(this.nodeBorder){
            this.revealEffectService.addBorderElement(this.nodeBorder);
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
                nodeWidth={this.state.width}
                nodeHeight={this.state.height}   
                onEdgeAnimationToggle={this.props.onEdgeAnimationToggle} 
            ></Edge>
        ));




        return (

            <section>
                <div  onMouseLeave={this.removeBorderRevealHighlight} onMouseMove={this.drawBorderRevealHighlight} className={"nodeArea "+cssLargeNodeClass} style={{ top: leftTopCorner.y + 'em', left: leftTopCorner.x + 'em' }}>
                    <div ref = {ref => this.nodeBorder = ref} id={"node-border-"+node.id} className="nodeBorder">
                        <div id={"node-container-"+node.id} onMouseLeave={this.removeRevealHighlight} onMouseMove={this.drawRevealHighlight} className="nodeContainer">
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

        /*
        <section>            
                <div className="nodeArea" style={{ top: leftTopCorner.y + 'em', left: leftTopCorner.x + 'em' }}>
                <button tabIndex={node.id} onClick={this.handleSelectedNodeChange} className={cssClass + ' blur border'} >
                        {this.renderNodeContent()}
                </button>
                
            </div>
            {toDisplay}
            </section>
            */
        /*
        return (
            /**width: Node.width + 'vw', height: Node.height + 'vh', top: leftTopCorner.y + 'vh', left: leftTopCorner.x + 'vw'*/
        /**<div className='node' style={{gridColumn: position.x+'/'+(position.x+1), gridRow: position.y + '/'+(position.y +1) }}>{node.data.name}</div>*/
        /*
                );*/
    }

    renderNodeTitle(){
        if(!this.props.isSelected){
            return <p>{this.props.node.data.name}</p>
        } else {
            return <h3>{this.props.node.data.name}</h3>
        }
    }


    renderNodeContent() {
        const node: INode<number, IOperation> = this.props.node;

        if (!this.props.isSelected) {
            return null;
        } else {

            const links = this.props.graph.getLinks(node.id);
            const input = links.filter(value => value.toId === node.id);
            const output = links.filter(value => value.fromId === node.id);

            return (
                <div className='nodeContent'>
                        <DataContainer revealEffectService={this.revealEffectService} isInput={true} onSelectedNodeChange={this.handleSelectedNodeChange} links={input} titleName="Input"></DataContainer>

                        <DataContainer revealEffectService={this.revealEffectService} isInput={false} onSelectedNodeChange={this.handleSelectedNodeChange} links={output} titleName="Output"></DataContainer>
                </div>

            );
            /**
             * <div className='nodeContainer'>
                    <header className='nodeTitle'>
                        <h2>{node.data.name}</h2>
                    </header>
                    <div className='nodeContent'>
                        <DataContainer isInput={true} onSelectedNodeChange={this.props.onSelectedNodeChange} links={input}></DataContainer>
                        <DataContainer isInput={false} onSelectedNodeChange={this.props.onSelectedNodeChange} links={output}></DataContainer>
                    </div>
                </div>
             */
        }
    }
}
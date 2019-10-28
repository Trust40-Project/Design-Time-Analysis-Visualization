import React, { MouseEvent } from 'react';
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
type NodeProps = {
    node: INode<number, IOperation>,
    key: number,
    layout: ILayout<number, IOperation>,
    graph: IGraph<number, IOperation, IDatum>,
    isSelected: boolean,
    onSelectedNodeChange: (nodeId: number) => void

}

type NodeState = {
    width: number,
    height: number
}

export class Node extends React.Component<NodeProps, NodeState> {

    constructor(props: NodeProps) {
        super(props);
        this.state = {
            width: this.props.isSelected ? 29.1 : 9.7,
            height: this.props.isSelected ? 18 : 2.6,
        }
        this.handleSelectedNodeChange = this.handleSelectedNodeChange.bind(this);
    }


    handleSelectedNodeChange(event: MouseEvent<HTMLButtonElement>) {
        this.props.onSelectedNodeChange(this.props.node.id);
    }


    componentDidUpdate(prevProps: Readonly<NodeProps>, prevState: Readonly<NodeState>) {
        if (prevProps.isSelected !== this.props.isSelected) {
            this.setState({
                width: this.props.isSelected ? 29.1 : 9.7,
                height: this.props.isSelected ? 18 : 2.6,
            });
        }

    }

    render() {
        const node: INode<number, IOperation> = this.props.node;
        const layout: ILayout<number, IOperation> = this.props.layout;
        const position: IPosition = layout.getNodePosition(node.id);
        const leftTopCorner: IPosition = new Position((position.x - (this.state.width / 2)), (position.y - (this.state.height / 2)));
        const edges = this.props.graph.getLinks(node.id).filter(value => value.fromId === node.id);
        const toDisplay: JSX.Element[] = [];
        const cssClass: string = this.props.isSelected ? 'largenode' : 'node';



        edges.forEach(value => toDisplay.push(
            <Edge 
                from={layout.getNodePosition(value.fromId)}
                to={layout.getNodePosition(value.toId)}
                key={value.data.id}
                nodeWidth={this.state.width}
                nodeHeight={this.state.height}    
            ></Edge>
        ));




        return (
            <section>
                <button tabIndex={node.id} onClick={this.handleSelectedNodeChange} className={cssClass + ' blur border'} style={{ top: leftTopCorner.y + 'em', left: leftTopCorner.x + 'em' }}>
                    {this.renderNodeContent()}
                </button>
                {toDisplay}
            </section>
        );
        /*
        return (
            /**width: Node.width + 'vw', height: Node.height + 'vh', top: leftTopCorner.y + 'vh', left: leftTopCorner.x + 'vw'*/
        /**<div className='node' style={{gridColumn: position.x+'/'+(position.x+1), gridRow: position.y + '/'+(position.y +1) }}>{node.data.name}</div>*/
        /*
                );*/
    }


    renderNodeContent() {
        const node: INode<number, IOperation> = this.props.node;

        if (!this.props.isSelected) {
            return (<p>{node.data.name}</p>);
        } else {

            const links = this.props.graph.getLinks(node.id);
            const input = links.filter(value => value.toId === node.id);
            const output = links.filter(value => value.fromId === node.id);

            return (
                <div className='nodeContainer'>
                    <header className='nodeTitle'>
                        <h2>{node.data.name}</h2>
                    </header>
                    <div className='nodeContent'>
                        <DataContainer isInput={true} onSelectedNodeChange={this.props.onSelectedNodeChange} links={input}></DataContainer>
                        <DataContainer isInput={false} onSelectedNodeChange={this.props.onSelectedNodeChange} links={output}></DataContainer>
                    </div>
                </div>

            );
        }
    }
}
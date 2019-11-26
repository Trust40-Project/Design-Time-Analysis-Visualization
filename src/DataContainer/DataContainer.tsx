import './DataContainer.css'
import React from 'react';
import { ILink } from '../Models/NGraph/ILink';
import { IDatum } from '../Models/Datum/IDatum';
import DataTile from '../DataTile/DataTile';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';

type DataContainerProps={
    /**
     * Links contain all the data to display in this data container.
     */
    links: ILink<number, IDatum>[],
    /**
     * If one clicks on a data tile he/she should be navigated to the clicked node that represents that data tile.
     */
    onSelectedNodeChange:(nodeId: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    /**
     * Whether or not the data in this container is input or output.
     */
    isInput:boolean,
    /**
     * The titles is displayed above all the data tiles.
     */
    titleName:string,
    revealEffectService: RevealEffectService,
    /**
     * When hovering over a data tile the corresponding node is supposed to be highlighted.
     */
    onHoverNodeChange: (nodeId: (number|undefined)) => void,
    drawBorderRevealHighlight: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    removeBorderRevealHighlight: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}
/**
 * DataContainer is a wrapper class containing on column of DataTile 
 * @see DataTile
 * @author Malte Reimann
 */
export class DataContainer extends React.Component<DataContainerProps>{

   

    render(){
        const links = this.props.links;
        const dataTiles = links.map((value: ILink<number, IDatum>, index: number, array: ILink<number, IDatum>[]) =>
            <DataTile onHoverNodeChange={this.props.onHoverNodeChange} revealEffectService={this.props.revealEffectService} onSelectedNodeChange={this.props.onSelectedNodeChange} key={value.data.id} link={value} isInput={this.props.isInput}>

            </DataTile>
           
        );

        return(
            <div onMouseLeave={(e: React.MouseEvent<HTMLElement, MouseEvent>) => this.props.removeBorderRevealHighlight(e)} onMouseMove={(e: React.MouseEvent<HTMLElement, MouseEvent>) => this.props.drawBorderRevealHighlight(e)} className='dataContainer'>
                <h5 className="titleName">{this.props.titleName}</h5>
                <div className='dataTilesContainer'>
                        {dataTiles}
                </div>
            </div>
        );
    }
}
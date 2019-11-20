import './DataContainer.css'
import React from 'react';
import { ILink } from '../Models/NGraph/ILink';
import { IDatum } from '../Models/Datum/IDatum';
import DataTile from '../DataTile/DataTile';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';

type DataContainerProps={
    links: ILink<number, IDatum>[],
    onSelectedNodeChange:(nodeId: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    isInput:boolean,
    titleName:string,
    revealEffectService: RevealEffectService,
    onHoverNodeChange: (nodeId: (number|undefined)) => void
}
export class DataContainer extends React.Component<DataContainerProps>{

    constructor(props: DataContainerProps){
        super(props);
    }

   

    render(){
        const links = this.props.links;
        const dataTiles = links.map((value: ILink<number, IDatum>, index: number, array: ILink<number, IDatum>[]) =>
            <DataTile onHoverNodeChange={this.props.onHoverNodeChange} revealEffectService={this.props.revealEffectService} onSelectedNodeChange={this.props.onSelectedNodeChange} key={value.data.id} link={value} isInput={this.props.isInput}>

            </DataTile>
           
        );

        return(
            <div onMouseLeave={(e: React.MouseEvent<HTMLElement, MouseEvent>) => this.props.revealEffectService.removeBorderRevealHighlight(e)} onMouseMove={(e: React.MouseEvent<HTMLElement, MouseEvent>) => this.props.revealEffectService.drawBorderRevealHighlight(e)} className='dataContainer'>
                <h5 className="titleName">{this.props.titleName}</h5>
                <div className='dataTilesContainer'>
                        {dataTiles}

                </div>
            </div>
        );
    }
}
import './DataContainer.css'
import React from 'react';
import { ILink } from '../Models/NGraph/ILink';
import { IDatum } from '../Models/Datum/IDatum';
import DataTile from '../DataTile/DataTile';

type DataContainerProps={
    links: ILink<number, IDatum>[]
}
export class DataContainer extends React.Component<DataContainerProps>{

    constructor(props: DataContainerProps){
        super(props);
    }


    render(){
        const links = this.props.links;
        const dataTiles = links.map((value: ILink<number, IDatum>, index: number, array: ILink<number, IDatum>[]) =>
            <DataTile key={value.data.id} datum={value.data}>

            </DataTile>
           
        );

        return(
            <div className='dataContainer'>
                {dataTiles}
            </div>
        );
    }
}
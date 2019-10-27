import React from 'react';
import './DataTile.css';
import { IDatum } from '../Models/Datum/IDatum';

type DataTileProps={
    datum: IDatum,
    key:number
}
const DataTile: React.FC<DataTileProps> = ({datum, key}) => {
    
   return(
       <div className='dataTile'>
           {datum.name + ' '+datum.privacyLevel}
       </div>
   );
}

export default DataTile;
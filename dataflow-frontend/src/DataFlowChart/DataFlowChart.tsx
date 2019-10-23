import React from 'react';
import './DataFlowChart.css';
import { ISoftwareComponent } from '../Models/SoftwareComponent/ISoftwareComponent';
import { SoftwareComponent as SoftwareComponentModel } from '../Models/FlowChart.ts/SoftwareComponent';
import {SoftwareComponent} from '../SoftwareComponent/SoftwareComponent';
import { Operation } from '../Models/Node/Operation';
import { Position } from '../Models/Position/Position';
import { Datum } from '../Models/Edge/Datum';
import { PrivacyLevels } from '../Models/PrivacyLevel/PrivacyLevels';
import { isNode } from '@babel/types';
import { INode } from '../Models/Node/INode';

class DataFlowChart extends React.Component {
    render(){
        const components = [];

        softwareComponents.forEach((component) =>{
            components.push(
                <SoftwareComponent
                    component={component}
                    key={component.rank}
                ></SoftwareComponent>
            );
        })
        
        return(
            <div className="componentContainer">
                {softwareComponents}
            </div>
        );

    }
}

const worker: INode = new Operation(1, new Position(10, 10), "Worker");
const workerLocations: INode = new Operation(2, new Position(10, 10), "WorkerLocations");
const filter: INode = new Operation(3, new Position(10, 10), "filter");
const project: INode = new Operation(4, new Position(10, 10), "project");
const filter1: INode =  new Operation(5, new Position(10, 10), "filter");
const project1: INode = new Operation(6, new Position(10, 10), "project");
const calcDist: INode = new Operation(7, new Position(10, 10), "calcDist");
const supervisor: INode = new Operation(8, new Position(10, 10), "Supervisor");
const workplaces: INode = new Operation(9, new Position(10, 10), "Workplaces");


const softwareComponents: Array<ISoftwareComponent> = [
   new SoftwareComponentModel(1, 'Location', [
       worker,
       workerLocations,
       filter,
       project,
       filter1,
       project1,
       calcDist,
       supervisor,
       workplaces

   ],[
       new Datum("WorkerId", PrivacyLevels.PUBLIC, supervisor, filter),
       new Datum("WorkplaceId", PrivacyLevels.PUBLIC, supervisor, filter1),
       new Datum("WorkerLocation", PrivacyLevels.SENSITIVE, worker, workerLocations),
       new Datum("WorkerLocation[]", PrivacyLevels.SENSITIVE, workerLocations, filter),
       new Datum("WorkerLocation", PrivacyLevels.SENSITIVE, filter, project),
       new Datum("Location", PrivacyLevels.SENSITIVE, project, calcDist),
       new Datum("Workplace[]", PrivacyLevels.PUBLIC, workplaces, filter1),
       new Datum("Workplace", PrivacyLevels.PUBLIC, filter1, project1),
       new Datum("Location", PrivacyLevels.PUBLIC, project1, calcDist),
       new Datum("Distance", PrivacyLevels.PRIVATE, calcDist, supervisor)
   ])
];
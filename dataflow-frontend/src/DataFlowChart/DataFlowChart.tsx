import React from 'react';
import './DataFlowChart.css';
import { ISoftwareComponent } from '../Models/FlowChart/ISoftwareComponent';
import { SoftwareComponent as SoftwareComponentModel } from '../Models/FlowChart/SoftwareComponent';
import {SoftwareComponent} from '../SoftwareComponent/SoftwareComponent';
import { Operation } from '../Models/Node/Operation';
import { Position } from '../Models/Position/Position';
import { Datum } from '../Models/Edge/Datum';
import { PrivacyLevels } from '../Models/PrivacyLevel/PrivacyLevels';
import { isNode } from '@babel/types';
import { INode } from '../Models/Node/INode';

export class DataFlowChart extends React.Component {
    render(){
        const components: JSX.Element[] = [];

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
                {components}
            </div>
        );

    }
}
/*
const worker: INode = new Operation(1, new Position(40, 20), "Worker");
const workerLocations: INode = new Operation(2, new Position(60, 0), "WorkerLocations");
const filter: INode = new Operation(3, new Position(60, 40), "filter");
const project: INode = new Operation(4, new Position(40, 40), "project");
const filter1: INode =  new Operation(5, new Position(60, 80), "filter");
const project1: INode = new Operation(6, new Position(40, 80), "project");
const calcDist: INode = new Operation(7, new Position(20, 60), "calcDist");
const supervisor: INode = new Operation(8, new Position(80, 60), "Supervisor");
const workplaces: INode = new Operation(9, new Position(60, 120), "Workplaces");*/

const worker: INode = new Operation(1, new Position(2, 1), "Worker");
const workerLocations: INode = new Operation(2, new Position(3, 1), "WorkerLocations");
const filter: INode = new Operation(3, new Position(3, 2), "filter");
const project: INode = new Operation(4, new Position(2, 2), "project");
const filter1: INode =  new Operation(5, new Position(3, 4), "filter");
const project1: INode = new Operation(6, new Position(2, 4), "project");
const calcDist: INode = new Operation(7, new Position(1, 3), "calcDist");
const supervisor: INode = new Operation(8, new Position(4, 3), "Supervisor");
const workplaces: INode = new Operation(9, new Position(3, 5), "Workplaces");



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
       new Datum(1,"WorkerId", PrivacyLevels.PUBLIC, supervisor, filter),
       new Datum(2,"WorkplaceId", PrivacyLevels.PUBLIC, supervisor, filter1),
       new Datum(3,"WorkerLocation", PrivacyLevels.SENSITIVE, worker, workerLocations),
       new Datum(4,"WorkerLocation[]", PrivacyLevels.SENSITIVE, workerLocations, filter),
       new Datum(5,"WorkerLocation", PrivacyLevels.SENSITIVE, filter, project),
       new Datum(6,"Location", PrivacyLevels.SENSITIVE, project, calcDist),
       new Datum(7,"Workplace[]", PrivacyLevels.PUBLIC, workplaces, filter1),
       new Datum(8,"Workplace", PrivacyLevels.PUBLIC, filter1, project1),
       new Datum(9,"Location", PrivacyLevels.PUBLIC, project1, calcDist),
       new Datum(10,"Distance", PrivacyLevels.PRIVATE, calcDist, supervisor)
   ])
];
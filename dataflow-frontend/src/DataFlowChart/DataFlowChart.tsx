import React from 'react';
import './DataFlowChart.css';
import { ISoftwareComponent } from '../Models/FlowChart/ISoftwareComponent';
import { SoftwareComponent as SoftwareComponentModel } from '../Models/FlowChart/SoftwareComponent';
import {SoftwareComponent} from '../SoftwareComponent/SoftwareComponent';
import { Operation } from '../Models/Operation/Operation';
import { Position } from '../Models/Position/Position';
import { Datum } from '../Models/Datum/Datum';
import { PrivacyLevels } from '../Models/PrivacyLevel/PrivacyLevels';
import { isNode } from '@babel/types';
import { INode } from '../Models/NGraph/INode';
import { IGraph } from '../Models/NGraph/IGraph';
import { IOperation } from '../Models/Operation/IOperation';
import { IDatum } from '../Models/Datum/IDatum';
import { FlowChart } from '../Models/FlowChart/FlowChart';
import {IFlowChart} from '../Models/FlowChart/IFlowChart';
import { ILayout } from '../Models/NGraph/ILayout';

export class DataFlowChart extends React.Component {
    render(){
        const components: JSX.Element[] = [];
        mockFlowChart.softwareComponents.forEach((component) =>{
            components.push(
                <SoftwareComponent
                    component={component}
                    key={component.id}
                    layout={mockFlowChart.layout}
                    graph={mockFlowChart.graph}
                >
                </SoftwareComponent>
            );
        })
        
        
        return(
            <div>
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

const worker: IOperation = new Operation(undefined, "Worker");
const workerLocations: IOperation = new Operation(undefined, "WorkerLocations");
const filter: IOperation = new Operation(undefined, "filter");
const project: IOperation = new Operation(undefined, "project");
const filter1: IOperation =  new Operation(undefined, "filter");
const project1: IOperation = new Operation(undefined, "project");
const calcDist: IOperation = new Operation(undefined, "calcDist");
const supervisor: IOperation = new Operation(undefined, "Supervisor");
const workplaces: IOperation = new Operation(undefined, "Workplaces");

const mockFlowChart: IFlowChart = createMockGraph();
/*
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
];*/

function createMockGraph(){
    var createGraph = require('ngraph.graph');
    var graph: IGraph<number, IOperation, IDatum> = createGraph();
    var softwareComponentLocation:ISoftwareComponent = new SoftwareComponentModel(undefined,'Location Service');

    var workerNode = graph.addNode(worker.id, worker);
    softwareComponentLocation.nodes.push(workerNode);

    var workerLocationsNode = graph.addNode(workerLocations.id, workerLocations);
    softwareComponentLocation.nodes.push(workerLocationsNode);

    var workplacesNode = graph.addNode(workplaces.id, workplaces);
    softwareComponentLocation.nodes.push(workplacesNode);

    var filterNode = graph.addNode(filter.id, filter);
    softwareComponentLocation.nodes.push(filterNode);

    var projectNode = graph.addNode(project.id, project);
    softwareComponentLocation.nodes.push(projectNode);

    var project1Node = graph.addNode(project1.id, project1);
    softwareComponentLocation.nodes.push(project1Node);

    var filter1Node = graph.addNode(filter1.id, filter1);
    softwareComponentLocation.nodes.push(filter1Node);

    var supervisorNode = graph.addNode(supervisor.id, supervisor);
    softwareComponentLocation.nodes.push(supervisorNode);

    var calcDisttNode = graph.addNode(calcDist.id, calcDist);
    softwareComponentLocation.nodes.push(calcDisttNode);


    graph.addLink(supervisor.id, filter.id, new Datum("WorkerId", PrivacyLevels.PUBLIC));
    graph.addLink(supervisor.id, filter1.id, new Datum("WorkplaceId", PrivacyLevels.PUBLIC));
    graph.addLink(worker.id, workerLocations.id,new Datum("WorkerLocation", PrivacyLevels.SENSITIVE) );
    console.log(workerLocations.id +"-->"+filter.id);
    graph.addLink(workerLocations.id, filter.id,       new Datum("WorkerLocation[]", PrivacyLevels.SENSITIVE));
    graph.addLink(filter.id, project.id, new Datum("WorkerLocation", PrivacyLevels.SENSITIVE));
    graph.addLink(project.id, calcDist.id,new Datum("Location", PrivacyLevels.SENSITIVE) );
    graph.addLink(workplaces.id, filter1.id,new Datum("Workplace[]", PrivacyLevels.PUBLIC) );
    graph.addLink(filter1.id, project1.id,new Datum("Workplace", PrivacyLevels.PUBLIC) );
    graph.addLink(project1.id, calcDist.id, new Datum("Location", PrivacyLevels.PUBLIC));
    graph.addLink(calcDist.id, supervisor.id,new Datum("Distance", PrivacyLevels.PRIVATE) );

    var physicsSettings = {
        springLength: 10,
        springCoeff: 0.0008,
        gravity: -0.5,
        theta: 0.5,
        dragCoeff: 0.02,
        timeStep: 5
      };
      // graph is an instance of `ngraph.graph` object.
      var layout:ILayout<number, IOperation> = require('ngraph.forcelayout')(graph, physicsSettings);
      for (var i = 0; i < 100; ++i) {
        layout.step();
      }

      var smallestx:number = 0;
      var smallesty:number = 0;

      graph.forEachNode(function (node){
        var pos = layout.getNodePosition(node.id);
        if(pos.x < smallestx){
            smallestx = pos.x;
        }
        if(pos.y < smallesty){
            smallesty = pos.y;
        }
      });
      if(smallestx < 10 || smallesty < 10){
          graph.forEachNode(function (node) {
            var pos = layout.getNodePosition(node.id);
              if(smallestx< 10){
                  layout.setNodePosition(node.id,pos.x + Math.abs(smallestx)+10, pos.y );
              }
              pos = layout.getNodePosition(node.id);
              if(smallesty< 10){
                layout.setNodePosition(node.id,pos.x, pos.y + Math.abs(smallesty) + 10); 

              }
          });
      }

     var flowChart: IFlowChart = new FlowChart(graph, [softwareComponentLocation], layout);
      return flowChart;



}
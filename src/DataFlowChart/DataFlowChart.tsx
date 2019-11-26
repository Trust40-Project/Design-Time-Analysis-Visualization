import React from 'react';
import { Datum } from '../Models/Datum/Datum';
import { IDatum } from '../Models/Datum/IDatum';
import { FlowChart } from '../Models/FlowChart/FlowChart';
import { IFlowChart } from '../Models/FlowChart/IFlowChart';
import { ISoftwareComponent } from '../Models/FlowChart/ISoftwareComponent';
import { SoftwareComponent as SoftwareComponentModel } from '../Models/FlowChart/SoftwareComponent';
import { IGraph } from '../Models/NGraph/IGraph';
import { ILayout } from '../Models/NGraph/ILayout';
import { IOperation } from '../Models/Operation/IOperation';
import { Operation } from '../Models/Operation/Operation';
import { PrivacyLevels } from '../Models/PrivacyLevel/PrivacyLevels';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';
import { SoftwareComponent } from '../SoftwareComponent/SoftwareComponent';
import './DataFlowChart.css';


type DataFlowChartState = {
    /**
     * The currently selected node.
     */
    selectedNodeId: (number|undefined),
    /**
     * Whether or not to display an animation at the graph edges.
     */
    edgeAnimationOn: boolean,
    /**
     * The node to highlight.
     */
    hoverNodeId: (number|undefined)
}

/**
 * A data flow chart is used to display the different software components in a software system.
 * @author Malte Reimann
 */
export class DataFlowChart extends React.Component<{},DataFlowChartState> {
    private revealEffectService = new RevealEffectService();
    constructor(props:Readonly<{}>){
        super(props);
        this.state = {
            selectedNodeId: undefined,
            edgeAnimationOn: true,
            hoverNodeId: undefined
            
        }

        this.handleSelectedNodeChange = this.handleSelectedNodeChange.bind(this);
        this.handelEdgeAnimationToggle = this.handelEdgeAnimationToggle.bind(this);
        this.handleHoverNodeChange = this.handleHoverNodeChange.bind(this);
        this.drawBorderRevealHighlight = this.drawBorderRevealHighlight.bind(this);
    }

    drawBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>){
        this.revealEffectService.drawBorderRevealHighlight(event);
    }

    handleSelectedNodeChange(nodeId: number){
        this.setState({
            selectedNodeId:(nodeId === this.state.selectedNodeId)?undefined: nodeId,
        });
    }

    handleHoverNodeChange(nodeId: (number|undefined)){
        this.setState({
            hoverNodeId: nodeId
        });
    }

    handelEdgeAnimationToggle():void{
        const currentAnimationState = this.state.edgeAnimationOn;
        this.setState({
            edgeAnimationOn: !currentAnimationState
        });
    }

    render(){
        const components: JSX.Element[] = [];
        const selectedNodeId = this.state.selectedNodeId;
        const hoverNodeId = this.state.hoverNodeId;
        const edgeAnimationOn = this.state.edgeAnimationOn;
        mockFlowChart.softwareComponents.forEach((component) =>{
            components.push(
                <SoftwareComponent
                    component={component}
                    key={component.id}
                    layout={mockFlowChart.layout}
                    graph={mockFlowChart.graph}
                    selectedNodeId={selectedNodeId}
                    onSelectedNodeChange={this.handleSelectedNodeChange}
                    onEdgeAnimationToggle={this.handelEdgeAnimationToggle}
                    edgeAnimationOn={edgeAnimationOn}
                    onHoverNodeChange={this.handleHoverNodeChange}
                    hoverNodeId={hoverNodeId}
                    revealEffectService={this.revealEffectService}
                >
                </SoftwareComponent>
            );
        })
        
        
        return(
            <div className="dataFlowChartContainer" onMouseMove={this.drawBorderRevealHighlight}>
                {components}

                
            </div>
        );

    }
}


/**
 * Create a mock graph based on the presentation.
 */

const worker: IOperation = new Operation(undefined, "worker");
const workerLocations: IOperation = new Operation(undefined, "workerLocations");
const filter: IOperation = new Operation(undefined, "filter");
const project: IOperation = new Operation(undefined, "project");
const filter1: IOperation =  new Operation(undefined, "filter");
const project1: IOperation = new Operation(undefined, "project");
const calcDist: IOperation = new Operation(undefined, "calcDist");
const supervisor: IOperation = new Operation(undefined, "supervisor");
const workplaces: IOperation = new Operation(undefined, "workplaces");

const mockFlowChart: IFlowChart = createMockGraph();


function createMockGraph(){
    let createGraph = require('ngraph.graph');
    let graph: IGraph<number, IOperation, IDatum> = createGraph();
    let softwareComponentLocation:ISoftwareComponent = new SoftwareComponentModel('Location Service');

    let workerNode = graph.addNode(worker.id, worker);
    softwareComponentLocation.nodes.push(workerNode);

    let workerLocationsNode = graph.addNode(workerLocations.id, workerLocations);
    softwareComponentLocation.nodes.push(workerLocationsNode);

    let workplacesNode = graph.addNode(workplaces.id, workplaces);
    softwareComponentLocation.nodes.push(workplacesNode);

    let filterNode = graph.addNode(filter.id, filter);
    softwareComponentLocation.nodes.push(filterNode);

    let projectNode = graph.addNode(project.id, project);
    softwareComponentLocation.nodes.push(projectNode);

    let project1Node = graph.addNode(project1.id, project1);
    softwareComponentLocation.nodes.push(project1Node);

    let filter1Node = graph.addNode(filter1.id, filter1);
    softwareComponentLocation.nodes.push(filter1Node);

    let supervisorNode = graph.addNode(supervisor.id, supervisor);
    softwareComponentLocation.nodes.push(supervisorNode);

    let calcDisttNode = graph.addNode(calcDist.id, calcDist);
    softwareComponentLocation.nodes.push(calcDisttNode);


    graph.addLink(supervisor.id, filter.id, new Datum("workerId","min(Input, OFFICIAL)", PrivacyLevels.PUBLIC));
    graph.addLink(supervisor.id, filter1.id, new Datum("workplaceId","min(Input, OFFICIAL)", PrivacyLevels.PUBLIC));
    graph.addLink(worker.id, workerLocations.id,new Datum("workerLocation","min(Input, OFFICIAL)", PrivacyLevels.SENSITIVE) );
    graph.addLink(workerLocations.id, filter.id,       new Datum("workerLocation[]","min(Input, OFFICIAL)", PrivacyLevels.SENSITIVE));
    graph.addLink(filter.id, project.id, new Datum("worker Location","min(Input, OFFICIAL)", PrivacyLevels.SENSITIVE));
    graph.addLink(project.id, calcDist.id,new Datum("location","min(Input, OFFICIAL)", PrivacyLevels.SENSITIVE) );
    graph.addLink(workplaces.id, filter1.id,new Datum("workplace[]","min(Input, OFFICIAL)", PrivacyLevels.PUBLIC) );
    graph.addLink(filter1.id, project1.id,new Datum("workplace","min(Input, OFFICIAL)", PrivacyLevels.HIGHLYSENSITIVE) );
    graph.addLink(project1.id, calcDist.id, new Datum("location","min(Input, OFFICIAL)", PrivacyLevels.PUBLIC));
    graph.addLink(calcDist.id, supervisor.id,new Datum("distance","min(Input, OFFICIAL)", PrivacyLevels.INTERNALUSE) );

    const physicsSettings = {
        springLength: 20,
        springCoeff: 0.0008,
        gravity: -0.5,
        theta: 0.5,
        dragCoeff: 0.02,
        timeStep: 5
      };
      // graph is an instance of `ngraph.graph` object.
      let layout:ILayout<number, IOperation> = require('ngraph.forcelayout')(graph, physicsSettings);

      /**
       * Repeat the force layout to get a good layout.
       */
      let stable = false;
      for (let i = 0; i < 100 && !stable; ++i) {
        stable = layout.step();
      }


      /**
       * Because the screen on a website is the {(x, y) ∈ R^2 | x >= 0 && y >= 0} 
       * we might need to shift the layout so that all nodes are visible.
       */
      let smallestx:number = 0;
      let smallesty:number = 0;

      graph.forEachNode(function (node){
        let pos = layout.getNodePosition(node.id);
        if(pos.x < smallestx){
            smallestx = pos.x;
        }
        if(pos.y < smallesty){
            smallesty = pos.y;
        }
      });
      if(smallestx < 20 || smallesty < 20){
          graph.forEachNode(function (node) {
            let pos = layout.getNodePosition(node.id);
              if(smallestx< 20){
                  layout.setNodePosition(node.id,pos.x + Math.abs(smallestx)+20, pos.y );
              }
              pos = layout.getNodePosition(node.id);
              if(smallesty< 20){
                layout.setNodePosition(node.id,pos.x, pos.y + Math.abs(smallesty) + 20); 

              }
          });
      }

     return new FlowChart(graph, [softwareComponentLocation], layout);



}
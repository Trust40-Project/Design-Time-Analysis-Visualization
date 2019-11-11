import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost, ITooltipStyleProps, ITooltipHostStyles, ITooltipStyles } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import React from 'react';
import { IDatum } from '../Models/Datum/IDatum';
import { ILink } from '../Models/NGraph/ILink';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';
import './DataTile.css';
import {IComponentStyles} from '@uifabric/foundation';
import { PrivacyLevels } from '../Models/PrivacyLevel/PrivacyLevels';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


const InputIcon = () => <Icon iconName="Export" />;
const OutputIcon = () => <Icon iconName="Import"/>;
const LockIcon = () => <Icon iconName="Lock" />;

type DataTileProps = {
    link: ILink<number, IDatum>,
    key: number,
    onSelectedNodeChange: (nodeId: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    isInput: boolean,
    revealEffectService: RevealEffectService,
    onHoverNodeChange: (nodeId: (number|undefined)) => void
}

function drawBorderReveal(id:string, event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const dataTile = document.getElementById(id);
    if(dataTile){
        event.target = dataTile;
        //TODO
        //RevealEffectService.getRevealEffectService().drawBorderRevealHighlight(event);
    }
}

function removeBorderReveal(id:string, event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const dataTile = document.getElementById(id);
    if(dataTile){
        event.target = dataTile;
        //TODO
        //RevealEffectService.getRevealEffectService().removeReveal(event);
    }
}

  

const DataTile: React.FC<DataTileProps> = ({ link, onSelectedNodeChange, isInput, revealEffectService, onHoverNodeChange }) => {

    
    const tooltipId = getId('text-tooltip');
    return (

        <div className="dataTile">
            <div className="dataTileContent">
                <div onMouseLeave={(e: React.MouseEvent<HTMLElement, MouseEvent>) => revealEffectService.removeReveal(e)} onMouseMove={(e: React.MouseEvent<HTMLElement, MouseEvent>) => revealEffectService.drawBorderRevealHighlight(e)} className="iconContainer">
                    <div ref = {ref => {if(ref) revealEffectService.addBorderElement(ref);}} id={'icon-oval-border-'+link.data.id} className="iconOvalBorder">
                        <div className="iconOval">
                        <span>
                            
                        <TooltipHost
                                    content={PrivacyLevels[link.data.privacyLevel] + " = " + link.data.privacyLevelCalculation}
                                    id={tooltipId}
                                    tooltipProps={{ styles:{ subText:{color:'var(--color-text-default)'}}, style: { overflowY: 'auto' },maxWidth:"16em"}}
                                   
                                    calloutProps={{backgroundColor:'var(--color-tertiary)', styles:{beakCurtain:{backgroundColor:'var(--color-tertiary)'}}}}
                                >
                                    <LockIcon aria-describedby={tooltipId} />

                                </TooltipHost>
                        </span>

                        <span>
                            {isInput? <InputIcon/>: <OutputIcon/>}
                        </span>
                    </div>
                    </div>
                    
                </div>
                <div className="dataTileCanvas">
                    <div ref = {ref => {if(ref) revealEffectService.addBorderElement(ref);}} id={'data-tile-canvas-'+link.data.id} className="dataTileBorder">
                        <button onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onHoverNodeChange(isInput ? link.fromId : link.toId)} 
                                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onHoverNodeChange(undefined)}
                                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    onHoverNodeChange(undefined);
                                    onSelectedNodeChange(isInput ? link.fromId : link.toId, e);
                                }} 
                                title={link.data.name} 
                                className="dataTileButton">
                                    <h5 className="dataName">
                                        {link.data.name}
                                    </h5>


                                </button>
                    </div>
                    
                </div>
               

            </div>
        </div>
    );

    /**
     * below title action
     * <div className="ms-TooltipHost host_74a2b74b">
                                                                <div className="hidden" id="dtc-id-overlay-panel-description-label-object-instance-id-60b7f4b1-89e4-48e8-8ef5-20778c0e6850" >
                                                                    Stage has 1 job, 1 task. Click the button to view stage jobs and tasks.
                                                                </div>
                                                                <a tabIndex={-1} className="description-container" role="button" aria-disabled="false" aria-labelledby="dtc-id-overlay-panel-description-label-object-instance-id-60b7f4b1-89e4-48e8-8ef5-20778c0e6850" data-is-focusable="false">
                                                                    <i className="cd-environment-description-error bowtie-icon bowtie-status-error-outline left">
                                                                        i
                                                                    </i>
                                                                    1 job, 1 task
                                                                    </a>
                                                                </div>
     */

    /**
     * right side icon:
     * <div className="post-approvals-container" style={{ marginLeft: '-18px' }}>
                                        <div className="ms-TooltipHost host_74a2b74b overlay-panel-selectable-tooltip">
                                            <div tabIndex={-1} className="overlay-panel-selectable post-approvals flex-item" aria-selected="false" aria-controls="dtc-id-overlay-component-right-pane" aria-label="Post-deployment conditions" data-is-focusable="false">
                                                <div className="dtc-circle-container cd-post-approvals">
                                                    <div className="dtc-circle dtc-canvas-element-border cd-post-approvals-circle" style={{ width: '36px', height: '36px' }}>
                                                        <span className="bowtie-icon bowtie-user"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
     */
    /* return(
      <div className="dtc-disjoint-graph-container"><div className="dtc-canvas-container">
          <div className="dtc-graph-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="svg-surface" focusable="false" width="316px" height="176px" />
              <div className="div-node" style={{left: '0px', top: 0, width: '236px' ,height: '80px', position: 'absolute'}}><div><div><div className="cd-environment-node-parent">
                 <div tabIndex={-1} className="dtc-inner-focus-zone" role="group" aria-label="Stage 1 stage" data-is-grid-focusable="true" data-dtc-inner-focus-zone="true"><div className="ms-FocusZone" role="presentation" data-focuszone-id="FocusZone537"><div className="cd-environment-node zoom-in-out-animation-enter zoom-in-out-animation-enter-active"><div className="ms-TooltipHost host_74a2b74b overlay-panel-selectable-tooltip"><div tabIndex={-1} className="overlay-panel-selectable pre-deployment-conditions flex-item" aria-selected="false" aria-controls="dtc-id-overlay-component-right-pane" aria-label="Pre-deployment conditions" data-is-focusable="false"><div className="dtc-modified-oval cd-triggers-and-approvals-container" style={{width: '36px', height: '62px'}}><div className="dtc-modified-oval-content dtc-canvas-element-border cd-pre-deployment-conditions-node" style={{borderRadius: '36px'}}><div><div className="cd-triggers"><span className="bowtie-icon bowtie-trigger-approval"></span></div><div className="cd-approvals"><span className="bowtie-icon bowtie-user"></span></div></div></div></div></div></div><div className="core-properties-container flex-item" style={{marginLeft: '-18px'}}><div tabIndex={-1}><div tabIndex={-1} className="overlay-panel-selectable core-properties show-shadow" aria-selected="false" aria-controls="dtc-id-overlay-component-right-pane" aria-label="Stage properties" data-is-focusable="false"><div className="cd-environment-core-properties-container"><div className="cd-environment-core-properties dtc-canvas-element-border" style={{width: '200px', height: '80px'}}><div className="content"><div className="name-container"><div className="ms-TooltipHost host_74a2b74b">Stage 1</div></div><div className="ms-TooltipHost host_74a2b74b"><div className="hidden" id="dtc-id-overlay-panel-description-label-object-instance-id-60b7f4b1-89e4-48e8-8ef5-20778c0e6850" >Stage has 1 job, 1 task. Click the button to view stage jobs and tasks.</div><a tabIndex={-1} className="description-container" role="button" aria-disabled="false" aria-labelledby="dtc-id-overlay-panel-description-label-object-instance-id-60b7f4b1-89e4-48e8-8ef5-20778c0e6850" data-is-focusable="false"><i className="cd-environment-description-error bowtie-icon bowtie-status-error-outline left"></i>1 job, 1 task</a></div></div></div></div></div></div></div><div className="post-approvals-container" style={{marginLeft: '-18px'}}><div className="ms-TooltipHost host_74a2b74b overlay-panel-selectable-tooltip"><div tabIndex={-1} className="overlay-panel-selectable post-approvals flex-item" aria-selected="false" aria-controls="dtc-id-overlay-component-right-pane" aria-label="Post-deployment conditions" data-is-focusable="false"><div className="dtc-circle-container cd-post-approvals"><div className="dtc-circle dtc-canvas-element-border cd-post-approvals-circle" style={{width: '36px', height: '36px'}}><span className="bowtie-icon bowtie-user"></span></div></div></div></div></div></div></div></div>
  
          </div></div></div></div></div></div></div>
  );*/
}

export default DataTile;
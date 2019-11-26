import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import React from 'react';
import { IDatum } from '../Models/Datum/IDatum';
import { ILink } from '../Models/NGraph/ILink';
import { RevealEffectService } from '../RevealEffect/RevealEffectService';
import './DataTile.css';


const InputIcon = () => <Icon iconName="Export" />;
const OutputIcon = () => <Icon iconName="Import"/>;

type DataTileProps = {
    /**
     * Contains the dataum this tile is supposed to represent.
     */
    link: ILink<number, IDatum>,
    /**
     * For react to keep track of changes.
     */
    key: number,
    /**
     * If clicked on this data tile navigate to the node the datum goes to/comes from.
     */
    onSelectedNodeChange: (nodeId: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    /**
     * Whether or not this datum is input or output of an operation.
     */
    isInput: boolean,
    /**
     * Reveal effect service this data tile can register with.
     */
    revealEffectService: RevealEffectService,
    /**
     * When hovering over this data tile the corresponding node/operation should be highlighted.
     */
    onHoverNodeChange: (nodeId: (number|undefined)) => void
}



  
/**
 * A data tile is a function component that represents an operation/node as a list item.
 * @param param0 the data tile props for this data tile.
 * @see DataTileProps
 * @author Malte Reimann
 */
const DataTile: React.FC<DataTileProps> = ({ link, onSelectedNodeChange, isInput, revealEffectService, onHoverNodeChange }) => {

    
    const tooltipId = getId('text-tooltip');
    return (

        <div className="dataTile">
            <div className="dataTileContent">
                <div   className="iconContainer">
                    <div ref = {ref => {if(ref) revealEffectService.addBorderElement(ref);}} id={'icon-oval-border-'+link.data.id} className="iconOvalBorder">
                        <div className="iconOval">
                        <span>
                            
                        <TooltipHost
                                    content={link.data.privacyLevel.name + (isInput? '' :' = ' + link.data.privacyLevelCalculation)}
                                    id={tooltipId}
                                    tooltipProps={{ styles:{ subText:{color:'var(--color-text-default)'}}, style: { overflowY: 'auto' },maxWidth:"16em"}}
                                   
                                    calloutProps={{backgroundColor:'var(--color-tertiary)', styles:{beakCurtain:{backgroundColor:'var(--color-tertiary)'}}}}
                                >
                                    {link.data.privacyLevel.getIcon()}

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
}

export default DataTile;
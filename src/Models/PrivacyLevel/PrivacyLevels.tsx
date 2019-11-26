import { Icon } from "office-ui-fabric-react/lib/Icon";
import React from "react";
import { IPrivacyLevel } from "./IPrivacyLevel";

/**
 * The different available privacy levels for the trust project.
 */
export enum PrivacyLevels{
    /**
     * There are no restrictions.
     */
    PUBLIC,
    /**
     * Only intended to use within the company.
     */
    INTERNALUSE,
    /**
     * Can only be accessed by certain people.
     */
    SENSITIVE,
    /**
     * Can only be accessed by a small group of people.
     */
    HIGHLYSENSITIVE
}

/**
 * A representation for the public privacy level.
 * There are no restrictions.
 * @implements IPrivacyLevel
 * @see IPrivacyLevel
 * @see PrivacyLevels
 * @author Malte Reimann
 */
export class PrivacyLevelPublic implements IPrivacyLevel{
   private static _name: string = "public";    
    
   /**
    * @returns the name of this privacy level.
    */
   public get name(): string {
        return PrivacyLevelPublic._name;
    }
   
    /**
     * @returns a circle with a check mark inside.
     */
   public getIcon(): JSX.Element {
        return <Icon iconName="Completed"/>;

    }


}

/**
 * A representation for the internal use privacy level.
 * Only intended to use within the company.
 * @implements IPrivacyLevel
 * @see IPrivacyLevel
 * @see PrivacyLevels
 * @author Malte Reimann
 */
export class PrivacyLevelInternalUse implements IPrivacyLevel{
    private static _name: string = "internal use";    
     
    /**
    * @returns the name of this privacy level.
    */
    public get name(): string {
         return PrivacyLevelInternalUse._name;
     }
    
     /**
      * @returns a circle with a house inside.
      */
    public getIcon(): JSX.Element {
         return  <div style={{ display:'grid', gridTemplateRows: '1fr', gridAutoColumns:'1fr', alignItems:'center', justifyItems:'center'}}>
            <Icon style={{position:'relative', top:0, left: 0, fontSize: '0.6em',lineHeight:'0.6em', gridRow:'1/2', gridColumn:'1/2'}} iconName="HomeSolid"/>

            <Icon style={{position:'relative', top:0,  gridRow:'1/2', gridColumn:'1/2'}} iconName="CircleRing"/>

         </div> ;
 
     }
 
 
 }

 /**
 * A representation for the sensitive privacy level.
 * Can only be accessed by certain people.
 * @implements IPrivacyLevel
 * @see IPrivacyLevel
 * @see PrivacyLevels
 * @author Malte Reimann
 */
 export class PrivacyLevelSensitive implements IPrivacyLevel{
    private static _name: string = "sensitive";    
     
    /**
    * @returns the name of this privacy level.
    */
    public get name(): string {
         return PrivacyLevelSensitive._name;
     }
    
     /**
      * @returns a circle with an exclamation mark (!) inside.
      */
    public getIcon(): JSX.Element {
         return <Icon iconName="Error"/>;
 
     }
 
 
 }

 /**
 * A representation for the highly sensitive privacy level.
 * Can only be accessed by a small group of people.
 * @implements IPrivacyLevel
 * @see IPrivacyLevel
 * @see PrivacyLevels
 * @author Malte Reimann
 */
 export class PrivacyLevelHighlySensitive implements IPrivacyLevel{
    private static _name: string = "highly sensitive";    
     
    /**
    * @returns the name of this privacy level.
    */
    public get name(): string {
         return PrivacyLevelHighlySensitive._name;
     }
    
     
     /**
      * @returns a circle with a line through.
      */
    public getIcon(): JSX.Element {
         return <Icon iconName="Blocked"/>;
 
     }
 
 
 }


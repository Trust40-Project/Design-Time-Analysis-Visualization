import { Icon } from "office-ui-fabric-react/lib/Icon";
import React from "react";
import { IPrivacyLevel } from "./IPrivacyLevel";

export enum PrivacyLevels{
    PUBLIC,
    INTERNALUSE,
    SENSITIVE,
    HIGHLYSENSITIVE
}

export class PrivacyLevelPublic implements IPrivacyLevel{
   private static _name: string = "public";    
    
   public get name(): string {
        return PrivacyLevelPublic._name;
    }
   
    
   public getIcon(): JSX.Element {
        return <Icon iconName="Completed"/>;

    }


}

export class PrivacyLevelInternalUse implements IPrivacyLevel{
    private static _name: string = "internal use";    
     
    public get name(): string {
         return PrivacyLevelInternalUse._name;
     }
    
     
    public getIcon(): JSX.Element {
         return  <div style={{ display:'grid', gridTemplateRows: '1fr', gridAutoColumns:'1fr', alignItems:'center', justifyItems:'center'}}>
            <Icon style={{position:'relative', top:0, left: 0, fontSize: '0.6em',lineHeight:'0.6em', gridRow:'1/2', gridColumn:'1/2'}} iconName="HomeSolid"/>

            <Icon style={{position:'relative', top:0,  gridRow:'1/2', gridColumn:'1/2'}} iconName="CircleRing"/>

         </div> ;
 
     }
 
 
 }

 export class PrivacyLevelSensitive implements IPrivacyLevel{
    private static _name: string = "sensitive";    
     
    public get name(): string {
         return PrivacyLevelSensitive._name;
     }
    
     
    public getIcon(): JSX.Element {
         return <Icon iconName="Error"/>;
 
     }
 
 
 }

 export class PrivacyLevelHighlySensitive implements IPrivacyLevel{
    private static _name: string = "highly sensitive";    
     
    public get name(): string {
         return PrivacyLevelHighlySensitive._name;
     }
    
     
    public getIcon(): JSX.Element {
         return <Icon iconName="Blocked"/>;
 
     }
 
 
 }


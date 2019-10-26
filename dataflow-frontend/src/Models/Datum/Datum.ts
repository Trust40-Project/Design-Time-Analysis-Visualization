import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { INode } from "../NGraph/INode";
import { Operation } from "../Operation/Operation";
import { IDatum } from "./IDatum";

export class Datum implements IDatum {
    
  private _name: string = 'Datum';
    
   private _privacyLevel: PrivacyLevels = PrivacyLevels.PRIVATE;
   
  

   constructor(name: string = 'Datum', privacyLevel: PrivacyLevels= PrivacyLevels.PRIVATE){
       
        this.name = name;
       this.privacyLevel = privacyLevel;
       
   }

   public get name(): string {
    return this._name;
}


public set name(value: string) {
    this._name = value;
}

   public get privacyLevel(): PrivacyLevels {
    return this._privacyLevel;
}
public set privacyLevel(value: PrivacyLevels) {
    this._privacyLevel = value;
}

 

    
}
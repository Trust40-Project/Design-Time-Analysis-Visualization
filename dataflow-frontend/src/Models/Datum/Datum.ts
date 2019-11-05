import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { INode } from "../NGraph/INode";
import { Operation } from "../Operation/Operation";
import { IDatum } from "./IDatum";

export class Datum implements IDatum {
    public get privacyLevelCalculation(): string {
        return this._privacyLevelCalculation;
    }
    public set privacyLevelCalculation(value: string) {
        this._privacyLevelCalculation = value;
    }
    private static idCount:number = 0;
    private _id: number = Datum.idCount;
    
  private _name: string = 'Datum';
  private _privacyLevelCalculation: string = '';

    
   private _privacyLevel: PrivacyLevels = PrivacyLevels.PRIVATE;

   
  

   constructor(name: string = 'Datum',privacyLevelCalculation:string ='', privacyLevel: PrivacyLevels= PrivacyLevels.PRIVATE, id:number = Datum.idCount){
       
        this.name = name;
        this.privacyLevelCalculation = privacyLevelCalculation;
       this.privacyLevel = privacyLevel;
       this._id = id;
       
       Datum.idCount++;
       
   }

   public get name(): string {
    return this._name;
}
public get id(): number {
    return this._id;
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
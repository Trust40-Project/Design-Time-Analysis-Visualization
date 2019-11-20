import { PrivacyLevels, PrivacyLevelPublic } from "../PrivacyLevel/PrivacyLevels";
import { INode } from "../NGraph/INode";
import { Operation } from "../Operation/Operation";
import { IDatum } from "./IDatum";
import { IPrivacyLevel } from "../PrivacyLevel/IPrivacyLevel";
import { PrivacyLevelFactory, PrivacyLevelFactoryShield } from "../PrivacyLevel/PrivacyLevelFactory";

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

    
   private _privacyLevel: IPrivacyLevel = new PrivacyLevelPublic();

   
  

   constructor(name: string = 'Datum',privacyLevelCalculation:string ='', privacyLevel: PrivacyLevels= PrivacyLevels.PUBLIC, id:number = Datum.idCount){
       
        this.name = name;
        this.privacyLevelCalculation = privacyLevelCalculation;
       this.privacyLevel = new PrivacyLevelFactory().getPrivacyLevel(privacyLevel);
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

   public get privacyLevel(): IPrivacyLevel {
    return this._privacyLevel;
}
public set privacyLevel(value: IPrivacyLevel) {
    this._privacyLevel = value;
}

 

    
}
import { IDatum, IEdge } from "./IEdge";
import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { INode } from "../Node/INode";
import { Operation } from "../Node/Operation";

export class Datum implements IDatum {
     private static idCount: number = 0;
    private _id: number = Datum.idCount;
    
  private _name: string = 'Datum';
    
   private _privacyLevel: PrivacyLevels = PrivacyLevels.PRIVATE;
   
   private _from: INode = new Operation();    
   
   private _to: INode = new Operation();

   constructor(id: number = Datum.idCount, name: string = 'Datum', privacyLevel: PrivacyLevels= PrivacyLevels.PRIVATE, from: INode = new Operation(), to: INode = new Operation()){
       
        this.name = name;
       this.privacyLevel = privacyLevel;
       this.from = from;
       this.to = to;
       this.id = id;
       Datum.idCount ++;
   }

   public get name(): string {
    return this._name;
}

public get id(): number {
    return this._id;
}
public set id(value: number) {
    this._id = value;
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

   public get from(): INode {
    return this._from;
}
public set from(value: INode) {
    this._from = value;
}

    public get to(): INode {
        return this._to;
    }
    public set to(value: INode) {
        this._to = value;
    }



    
}
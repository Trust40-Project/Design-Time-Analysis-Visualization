import { IOperation } from "./IOperation";


export class Operation implements IOperation {
    private static idCount: number = 0;

   private _id: number = Operation.idCount;
    
   
   private _name: string = 'Operation';
    
  
    constructor(id: number = Operation.idCount, name: string = 'Operation') {
        this.id = id;
        this.name = name;
        Operation.idCount++;

    }

   

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
   
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

   
    
}
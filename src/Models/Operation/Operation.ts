import { IOperation } from "./IOperation";

/**
 * A simple operation.
 * @implements IOperation
 * @see IOperation
 * @author Malte Reimann
 */
export class Operation implements IOperation {
    private static idCount: number = 0;

   private _id: number = Operation.idCount;
    
   
   private _name: string = 'Operation';
    
  
   /**
    * Creates a new operation with a name and optionally an id.
    * @param id an unique identifier.
    * @default id managed internally if not provided.
    * @param name to display that represents this operation.
    * @default name = 'Operation'
    */
    constructor(id: number = Operation.idCount, name: string = 'Operation') {
        this._id = id;
        this.name = name;
        Operation.idCount++;

    }

   
    /**
     * @returns the unique identifier for this operation.
     */
    public get id(): number {
        return this._id;
    }
   
    /**
     * @returns the name for this operation.
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Set the name of this operation.
     * @param value of the new name.
     */
    public set name(value: string) {
        this._name = value;
    }

   
    
}
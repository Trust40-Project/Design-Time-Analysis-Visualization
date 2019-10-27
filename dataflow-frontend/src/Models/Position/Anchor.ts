import { IPosition } from "./IPosition";
import { Position } from "./Position";

export interface IAnchorPosition{
    from:IPosition,
    to: IPosition
}
export function anchorFactory(from: IPosition, to:IPosition, width:number, height: number):IAnchor{
    const posAfterTranslation:IPosition = new Position(from.x - to.x, from.y-to.y);
    console.log("anchor factory");
    console.dir(from);
    console.dir(to);
    console.dir(posAfterTranslation);
    if(posAfterTranslation.y <= -posAfterTranslation.x && posAfterTranslation.y > posAfterTranslation.x){
        console.log("right left");
        console.log("....");
        return new rightLeftAnchor(from, to, width, height);
    } else if(posAfterTranslation.y < -posAfterTranslation.x && posAfterTranslation.y <= posAfterTranslation.x){
        console.log("bottom top");
        console.log("....");
        return new bottomTopAnchor(from, to,width, height);
    } else if(posAfterTranslation.y >= -posAfterTranslation.x && posAfterTranslation.y < posAfterTranslation.x){
        console.log("left right");
        console.log("....");
        return new leftRightAnchor(from, to, width, height);
    } else{
        console.log("top bottom");
        console.log("....");
        return new topBottomAnchor(from, to, width, height);
    }
    
}

export interface IAnchor{
    getAnchorPositions():IAnchorPosition;
}

export class rightLeftAnchor implements IAnchor{
    
    private from:IPosition;
    private to:IPosition;
    private width:number;
    private height:number;

    constructor(from:IPosition, to:IPosition, width:number, height:number){
        this.from = from;
        this.to = to;
        this.width = width;
        this.height = height;
    }

    
    getAnchorPositions(): IAnchorPosition {
       let fromAnchor = new Position((this.from.x + (this.width/2)), this.from.y);
       let toAnchor = new Position((this.to.x - (this.width/2)), this.to.y);
       return {from:fromAnchor, to:toAnchor};
    }
}

export class leftRightAnchor implements IAnchor{
    
    private from:IPosition;
    private to:IPosition;
    private width:number;
    private height:number;

    constructor(from:IPosition, to:IPosition, width:number, height:number){
        this.from = from;
        this.to = to;
        this.width = width;
        this.height = height;
    }

    
    getAnchorPositions(): IAnchorPosition {
       let fromAnchor = new Position((this.from.x - (this.width/2)), this.from.y);
       let toAnchor = new Position((this.to.x + (this.width/2)), this.to.y);
       return {from:fromAnchor, to:toAnchor};
    }
}

export class bottomTopAnchor implements IAnchor{
    
    private from:IPosition;
    private to:IPosition;
    private width:number;
    private height:number;

    constructor(from:IPosition, to:IPosition, width:number, height:number){
        this.from = from;
        this.to = to;
        this.width = width;
        this.height = height;
    }

    
    getAnchorPositions(): IAnchorPosition {
       let fromAnchor = new Position(this.from.x, (this.from.y + (this.height/2)));
       let toAnchor = new Position(this.to.x, (this.to.y - (this.height/2)));
       return {from:fromAnchor, to:toAnchor};
    }
}

export class topBottomAnchor implements IAnchor{
    
    private from:IPosition;
    private to:IPosition;
    private width:number;
    private height:number;

    constructor(from:IPosition, to:IPosition, width:number, height:number){
        this.from = from;
        this.to = to;
        this.width = width;
        this.height = height;
    }

    
    getAnchorPositions(): IAnchorPosition {
       let fromAnchor = new Position(this.from.x, (this.from.y - (this.height/2)));
       let toAnchor = new Position(this.to.x, (this.to.y + (this.height/2)));
       return {from:fromAnchor, to:toAnchor};
    }
}
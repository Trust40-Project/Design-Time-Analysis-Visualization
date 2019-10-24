import { INode } from "../Node/INode";
import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";

export interface IEdge{
    from: INode;
    to: INode;
    id: number;
}

export interface IDatum extends IEdge{
    name: string;
    privacyLevel: PrivacyLevels;
}
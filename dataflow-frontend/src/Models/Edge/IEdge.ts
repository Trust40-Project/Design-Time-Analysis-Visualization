import { INode } from "../Node/INode";
import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";

export interface IDatum{
    name: string;
    privacyLevel: PrivacyLevels;
}

export interface IEdge{
    from: INode;
    to: INode;
}
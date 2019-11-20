import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { IPrivacyLevel } from "../PrivacyLevel/IPrivacyLevel";

export interface IDatum{
    privacyLevel: IPrivacyLevel;
    name: string;
    id:number;
    privacyLevelCalculation: string;
}
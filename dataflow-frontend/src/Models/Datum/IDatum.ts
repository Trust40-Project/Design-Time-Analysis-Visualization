import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";

export interface IDatum{
    privacyLevel: PrivacyLevels;
    name: string;
    id:number;
    privacyLevelCalculation: string;
}
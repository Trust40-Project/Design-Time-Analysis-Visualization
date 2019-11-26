import { PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { IPrivacyLevel } from "../PrivacyLevel/IPrivacyLevel";

/**
 * Represents a datum at a certain operation within a software component.
 * @see IPrivacyLevel
 * @see IOperation
 * @author Malte Reimann
 */
export interface IDatum{
    /**
     * The privacy level stores information about the sensitivity of this datum.
     */
    privacyLevel: IPrivacyLevel;
    /**
     * Display name for the datum.
     */
    name: string;
    /**
     * Unique identifier.
     */
    id:number;
    /**
     * How this privacy level has been calculated based on the operation and the input on this operation.
     */
    privacyLevelCalculation: string;
}
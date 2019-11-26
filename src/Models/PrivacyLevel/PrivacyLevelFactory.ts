import { PrivacyLevels, PrivacyLevelPublic, PrivacyLevelInternalUse, PrivacyLevelSensitive, PrivacyLevelHighlySensitive } from "./PrivacyLevels";
import { IPrivacyLevel } from "./IPrivacyLevel";

/**
 * This factory creates the right privacy level based on the PrivacyLevels.
 * @see IPrivacyLevel
 * @see PrivacyLevels
 * @author Malte Reimann
 */
export class PrivacyLevelFactory {
    /**
     * Returns a new privacy level.
     * This way the backend only needs to know the different 
     * privacy levels without which privacy level is supposed to return which icon.
     * @param privacyLevel to get the privacy level object for.
     */
    public getPrivacyLevel(privacyLevel: PrivacyLevels): IPrivacyLevel {
        switch (privacyLevel) {
            case PrivacyLevels.PUBLIC:
                return new PrivacyLevelPublic();
                break;
            case PrivacyLevels.INTERNALUSE:
                return new PrivacyLevelInternalUse();
                break;
            case PrivacyLevels.SENSITIVE:
                return new PrivacyLevelSensitive();
                break;
            case PrivacyLevels.HIGHLYSENSITIVE:
                return new PrivacyLevelHighlySensitive();
                break;
            default:
                return new PrivacyLevelPublic();
                break;
        }
    }
}

import { PrivacyLevels, PrivacyLevelPublic, PrivacyLevelInternalUse, PrivacyLevelSensitive, PrivacyLevelHighlySensitive, PrivacyLevelPublicShield, PrivacyLevelInternalUseShield, PrivacyLevelSensitiveShield, PrivacyLevelHighlySensitiveShield } from "./PrivacyLevels";
import { IPrivacyLevel } from "./IPrivacyLevel";

export class PrivacyLevelFactory {
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

export class PrivacyLevelFactoryShield{
    public getPrivacyLevel(privacyLevel: PrivacyLevels): IPrivacyLevel {
        switch (privacyLevel) {
            case PrivacyLevels.PUBLIC:
                return new PrivacyLevelPublicShield();
                break;
            case PrivacyLevels.INTERNALUSE:
                return new PrivacyLevelInternalUseShield();
                break;
            case PrivacyLevels.SENSITIVE:
                return new PrivacyLevelSensitiveShield();
                break;
            case PrivacyLevels.HIGHLYSENSITIVE:
                return new PrivacyLevelHighlySensitiveShield();
                break;


            default:
                return new PrivacyLevelPublicShield();
                break;
        }
    }
}
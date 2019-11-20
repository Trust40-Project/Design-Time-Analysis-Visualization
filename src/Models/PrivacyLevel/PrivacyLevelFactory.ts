import { PrivacyLevels, PrivacyLevelPublic, PrivacyLevelInternalUse, PrivacyLevelSensitive, PrivacyLevelHighlySensitive} from "./PrivacyLevels";
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

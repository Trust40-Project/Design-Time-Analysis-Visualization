/**
 * A privacy level is a classification for the access to something.
 * @author Malte Reimann
 */
export interface IPrivacyLevel{
    name: string;

    /**
     * @returns an icon representing this privacy level.
     * 
     */
    getIcon(): JSX.Element;
}
import { IPrivacyLevel } from "../PrivacyLevel/IPrivacyLevel";
import { PrivacyLevelFactory } from "../PrivacyLevel/PrivacyLevelFactory";
import { PrivacyLevelPublic, PrivacyLevels } from "../PrivacyLevel/PrivacyLevels";
import { IDatum } from "./IDatum";

/**
 * Inplements a certain datum.
 * @see IDatum
 * @see IPrivacyLevel
 * @implements IDatum
 * @author Malte Reimann
 */
export class Datum implements IDatum {

    private static idCount: number = 0;
    private _id: number = Datum.idCount;

    private _name: string = 'Datum';
    private _privacyLevelCalculation: string = '';


    private _privacyLevel: IPrivacyLevel = new PrivacyLevelPublic();




    /**
     * Creates a new datum.
     * @param name to be displayed for this datum. 
     * @default 'Datum'
     * @param privacyLevelCalculation how this datum's privacy level is calculated.
     * @default ''
     * @param privacyLevel of this datum.
     * @default PrivacyLevels.PUBLIC
     * @param id an unique identifier.
     * @default id if not provided managed internally
     */
    constructor(name: string = 'Datum', privacyLevelCalculation: string = '', privacyLevel: PrivacyLevels = PrivacyLevels.PUBLIC, id: number = Datum.idCount) {

        this.name = name;
        this.privacyLevelCalculation = privacyLevelCalculation;
        /**
         * Create an actual privacy level based on the privacy level enum.
         */
        this.privacyLevel = new PrivacyLevelFactory().getPrivacyLevel(privacyLevel);
        this._id = id;
        Datum.idCount++;

    }

    /**
     * @returns the name for this datum.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Set the name of this datum.
     * @param value the new name is supposed to be.
     */
    public set name(value: string) {
        this._name = value;
    }
    /**
     * @returns the unique id for this datum.
     */
    public get id(): number {
        return this._id;
    }


    /**
     * @returns the privacy level of this datum.
     */
    public get privacyLevel(): IPrivacyLevel {
        return this._privacyLevel;
    }
    /**
     * Set the privacy level of this datum.
     * @param value to set the privacy level to.
     */
    public set privacyLevel(value: IPrivacyLevel) {
        this._privacyLevel = value;
    }


    /**
     * @returns how the privacy level of this datum is calculated.
     */
    public get privacyLevelCalculation(): string {
        return this._privacyLevelCalculation;
    }
    /**
     * Set how the privacy level of this datum is calculated.
     * @param value for the new privacy calculation.
     */
    public set privacyLevelCalculation(value: string) {
        this._privacyLevelCalculation = value;
    }



}
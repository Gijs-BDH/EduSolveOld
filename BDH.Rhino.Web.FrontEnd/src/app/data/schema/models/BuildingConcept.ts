import { DataModel } from "@app/modules/project-editor/models/DataModel";

export class BuildingConcept extends DataModel {
    constructor( 
        public id: string,
        public name: string,
        public createdBy: string,
        public company: string,
        public bvoPerUnit: number,
        public m3PerUnit: number,
        public width: number,
        public depth: number,
        public height: number,
        public glazingFactor : number,
        public woningenPerUnit: number,
        public productieKostenPerUnit: number,
        public isPrivate: boolean,
        public isFavorited: boolean){
            super();
        }
}

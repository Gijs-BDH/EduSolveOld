import { IsPoint2d } from '@app/shared/models/IsPoint2d';
import { Project } from './Project';


export class ProjectInformation{
    constructor(public name : string, public baseTile : IsPoint2d[], public project : Project){
        
    }
}


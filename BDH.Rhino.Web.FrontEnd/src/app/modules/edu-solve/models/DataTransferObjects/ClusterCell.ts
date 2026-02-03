//point is xyz from the api grid, which is xy aligned
//to align with the 'real world' grid, transform xy to world using the gridcellproviderservice

import { IsPoint3d } from "@app/shared/models/IsPoint3d";

export class ClusterCell {
    nortFacades: boolean[] = [];
    eastFacades: boolean[] = [];
    southFacades: boolean[] = [];
    westFacades: boolean[] = [];

    constructor(public point: IsPoint3d) {
    }
}

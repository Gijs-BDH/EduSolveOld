import { PopulatedLineResponse } from './PopulatedLineResponse';


export interface PopulatedTileResponse {
    lines: PopulatedLineResponse[];
    usedSeed: number;
}

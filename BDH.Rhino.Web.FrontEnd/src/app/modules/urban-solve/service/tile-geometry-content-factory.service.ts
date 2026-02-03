import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '@env';
import { Tile } from '../models/Tile';
import { IsLine2d } from "../../../shared/models/IsLine2d";
import { PopulatedTileBulkResponse } from '../models/DataTransferObjects/PopulatedTileBulkResponse';
import { PopulatedTileResponse } from '../models/DataTransferObjects/PopulatedTileResponse';

@Injectable({
    providedIn: 'root'
})
export class TileGeometryContentFactoryService {

    baseUrl = environment.apiUrl + "/GenerativeDesign";

    constructor(private httpClient: HttpClient) { }

    fetchCatalog(tile: Tile, useSeed: boolean, lines: IsLine2d[]): Observable<PopulatedTileResponse> {
        if (!tile.properties.catalog!) {
            throw Error("Selecteer eerst een geldig bouwconcept catalogus.");
        }

        var body = {
            "tile": tile.points,
            "lines": lines,
            "seed": useSeed ? tile.properties.seed ?? null : null,
            "catalogId": tile.properties.catalog.id,
            "minimumLineLength": tile.properties.minimumLineLength,
            "lineMargin": tile.properties.safeMargin,
            "deflation": tile.properties.deflation
        };

        return this.httpClient
            .post<PopulatedTileResponse>(this.baseUrl + "/tile", body);
    }

    fetchCatalogBulk(tile: Tile, lines: IsLine2d[], solutions: number) {
        if (!tile.properties.catalog!) {
            throw Error("Selecteer eerst een geldig bouwconcept catalogus.");
        }

        var body = {
            "tile": tile.points,
            "lines": lines,
            "catalogId": tile.properties.catalog.id,
            "minimumLineLength": tile.properties.minimumLineLength,
            "lineMargin": tile.properties.safeMargin,
            "deflation": tile.properties.deflation
        }

        return this.httpClient
            .post<PopulatedTileBulkResponse[]>(this.baseUrl + "/tile/bulk?solutions=" + solutions, body);
    }
}



import { Injectable } from '@angular/core';
import { GridConfigurationService } from './grid-configuration.service';
import { EduSolveDataService } from './edu-solve-data.service';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { Point2d } from '@app/shared/models/Point2d';
import { BouwconceptConfigurationService } from './bouwconcept-configuration.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//This service is responsible for providing the grid cells geometry.
//Two types of grids exist, and two types of alignments exist
//The first of the two types of grid is the "main" grid. It is the grid on which clusters are placed. Cluser cells have length and width dimensions equal to one cell of the grid
//The second grid type is the construction grid. This grid is always smaller than the main grid, and the main grid is always a whole multiple of the construction grid. One cell of this grid contains one floor element of the chosen construction principle.
//The first alignment is called XY. This is because the algorithm to place the school on this grid does not care about rotation, only the grid itself, so it expects all gridcells to align neatly on the world xy grid.
//The second alignment, however, is the grid as we see on our screen, after choosing a rotation in the main polygon. 
//The first (XY) alignment is achieved by first rotating the main polygon the chosen rotation * -1 around its center of gravity, then placing the grid (XY) and removing cells outside of the polygon
//To get the second alignment, we take the XY grid and rotate it back for the chosen rotation around the center of gravity of the base polygon.
//When sending the grid to the API for running the algorithms, the XY grid must always be sent, not the world oriented one.

@Injectable({
    providedIn: 'root'
})
export class GridCellsProviderService {

    public get centerOfGravity() : IsPoint2d{
        var centerofGravity = this.polygonTools.centerOfGravity(this.data.basePolygonPoints);
        return centerofGravity;
    }

    constructor(private gridconfig: GridConfigurationService, private data : EduSolveDataService, private polygonTools : PolygonToolsService, private concept : BouwconceptConfigurationService) {

    }

    pointXyToWorld(point : IsPoint2d){
        return this.polygonTools.rotatePoint(point, this.centerOfGravity, this.gridconfig.gridRotation)
    }

    pointWorldToXy(point : IsPoint2d){
        return this.polygonTools.rotatePoint(point, this.centerOfGravity, -this.gridconfig.gridRotation)
    }

    getTilesXY() {
        if (!this.data.project) {
            return [];
        }

        var rotated = this.data.basePolygonPoints.map(p => this.pointWorldToXy(p));
        var tileRaster = this.polygonTools.tileRaster(rotated, this.gridconfig.gridSize, this.gridconfig.gridSizeY, this.gridconfig.gridShift);

        return tileRaster;
    }

    getTilesConceptXY() {
        if (!this.data.project) {
            return [];
        }

        if (!this.concept.selectedProduct?.spanLength || !this.concept.selectedProduct?.spanWidth) {
            return [];
        }


        var tiles = this.getTilesXY().map(t => this.getConstructionTilesInMainTileXY(t))
        return tiles;
    }

    getConstructionTilesInMainTileXY(t : IsPoint2d[]){
        var tiles = [];

        var sizeX = this.concept.selectedProduct!.spanLength / 1000;
        var sizeY = this.concept.selectedProduct!.spanWidth / 1000;

        var nx = Math.round(this.gridconfig.gridSize / sizeX);
        var ny = Math.round(this.gridconfig.gridSizeY / sizeY);

        for (var x = 0; x < nx; x++) {
            for (var y = 0; y < ny; y++) {
                var px = t[0].x + (x * sizeX);
                var py = t[0].y + (y * sizeY);
                var tile: IsPoint2d[] = [
                    new Point2d(px, py),
                    new Point2d(px + sizeX, py),
                    new Point2d(px + sizeX, py + sizeY),
                    new Point2d(px, py + sizeY),
                    new Point2d(px, py)
                ]

                tiles.push(tile);
            }
        }

        return tiles;
    }

    getTilesWorld() {
        if (!this.data.project) {
            return [];
        }

        return this.getTilesXY().map(tile => tile.map(p => this.pointXyToWorld(p)));;
    }

    getTilesConceptWorld() {
        if (!this.data.project) {
            return [];
        }

        return this.getTilesConceptXY()
            .map(tile => tile.map(p => p.map(_p => this.pointXyToWorld(_p))));
    }

    getTileCentersXY() {
        return this.getTilesXY()
            .map(tile => this.polygonTools.average(tile));
    }

    getTileCentersWorld() {
        return this.getTilesWorld()
            .map(tile => this.polygonTools.average(tile));
    }

    getObstaclesXY(){
        if(!this.data.project){
            throw new Error("Cannot get obstacles for an empty project.")
        }

        return this.data.obstacles.map(i => this.pointWorldToXy(i.location));
    }
}

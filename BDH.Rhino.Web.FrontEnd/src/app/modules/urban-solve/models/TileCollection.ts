import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { Tile } from "./Tile";
import { TilePoperties } from "./TileProperties";


export class TileCollection {
    private tiles: Tile[];

    constructor(tile: Tile[] | Tile | null = null) {
        this.tiles = [];

        if (tile != null) {
            if (Array.isArray(tile)) {
                this.tiles = tile;
            } else {
                this.tiles.push(tile);
            }
        }
    }

    projectProperties(other: TileCollection) {
        this.tiles.forEach(tile => {
            var otherTiles = other.getTiles();
            for (var i = 0; i < otherTiles.length; i++) {
                var otherTile = otherTiles[i];

                if (otherTile.pointIsInTile(tile.getCenter())) {
                    tile.properties = otherTile.properties.copy();
                    return;
                }
            }

            tile.properties = TilePoperties.createDefault(tile.properties.bouwConcept);
        });

        return this;
    }

    getTiles(): Tile[] {
        return this.tiles;
    }

    enumeratePoints(): IsPoint2d[][] {
        var array: IsPoint2d[][] = [];

        this.tiles.forEach(tile => {
            array.push(tile.points);
        });

        return array;
    }
}

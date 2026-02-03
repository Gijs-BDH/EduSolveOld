import { Tile } from "../Tile";
import { SelectableModelProxy } from "@app/modules/project-editor/models/SelectableModelProxy";


export class TileProxy extends SelectableModelProxy {
    constructor(public tile: Tile) {
        super(tile);
    }
}

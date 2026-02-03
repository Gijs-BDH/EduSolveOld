import { KeyElement } from "./KeyElement";
import { SelectionBatch } from "./SelectionBatch";

export class BatchSelection{
    selectedIds: SelectionBatch[];

    constructor(){
        this.selectedIds = [];
    }

    addId(tile: KeyElement, id: string){
        var tileFound = false;
        for(var i = 0; i < this.selectedIds.length; i++){
            var tileId = this.selectedIds[i].tile.uuid;

            if(tileId == tile.uuid){
                if(!this.selectedIds[i].ids.find(o => o == id)){
                    this.selectedIds[i].ids.push(id);
                }

                tileFound = true;
                break;
            }
        }

        if(!tileFound){
            this.selectedIds.push({
                tile: tile,
                ids: [id]
            });
        }
    }

    remove(tile: KeyElement, id: string){
        for(var i = 0; i < this.selectedIds.length; i++){
            if(this.selectedIds[i].tile.uuid != tile.uuid){
                continue;
            }

            for(var j = 0; j < this.selectedIds[i].ids.length; j++){
                var idToMatch = this.selectedIds[i].ids[j];
                if(idToMatch == id){
                    this.selectedIds[i].ids.splice(j, 1);
                    j--;
                }
            }
        }
    }

    setSingle(tile: KeyElement, id: string){
        this.clear();

        this.addId(tile, id);
    }

    clear(){
        for(var i = 0; i<this.selectedIds.length; i++){
            this.selectedIds[i].ids = [];
        }
    }

    copy(){
        var copy = new BatchSelection();

        for(var i = 0; i < this.selectedIds.length; i++){
            var tileId = this.selectedIds[i].tile;
            var tileIds = this.selectedIds[i].ids;

            for(var j = 0; j < tileIds.length; j ++){
                var id = tileIds[j];
                copy.addId(tileId, id);
            }
        }

        return copy;
    }

    mergeInto(other: BatchSelection){
        for(var i = 0; i < this.selectedIds.length; i++){
            var tileId = this.selectedIds[i].tile;
            var tileIds = this.selectedIds[i].ids;

            for(var j = 0; j < tileIds.length; j ++){
                var id = tileIds[j];
                other.addId(tileId, id);
            }
        }
    }

    subtractFrom(other: BatchSelection){
        for(var i = 0; i < this.selectedIds.length; i++){
            var tileId = this.selectedIds[i].tile;
            var tileIds = this.selectedIds[i].ids;

            for(var j = 0; j < tileIds.length; j ++){
                var id = tileIds[j];
                other.remove(tileId, id);
            }
        }
    }

    find(tile: KeyElement){
        for(var i = 0; i<this.selectedIds.length; i++){
            var tileId = this.selectedIds[i].tile.uuid;

            if(tile.uuid == tileId){
                return this.selectedIds[i].ids;
            }
        }

        return [];
    }
}


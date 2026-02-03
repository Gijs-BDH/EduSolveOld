import { DownloadObject } from "./Interfaces/DownloadObject";

//This class stores the mesh of an object with an id in a dictionary. Useful for storing geometries of building concepts which are stored on the server that you don't want to constantly download.
//Maybe an external service is better bit this works for now.

export class BuildingConceptGeometryDictionary<TMesh> {
    private collection: DownloadObject<TMesh>[] = [];

    public add(id: string, object: TMesh) {
        if (this.collection.find(i => i.id == id)) {
            //throw new Error("An object with this id has already been loaded.");
            return;
        }

        this.collection.push({ id: id, object: object });
    }

    public get(id: string): TMesh {
        var entry = this.collection.find(i => i.id == id);

        if (!entry) {
            throw new Error("Geometry could not be found.");
        }

        return entry.object;
    }

    public has(id : string) : boolean{
        return this.collection.find(i => i.id == id) != undefined;
    }
}

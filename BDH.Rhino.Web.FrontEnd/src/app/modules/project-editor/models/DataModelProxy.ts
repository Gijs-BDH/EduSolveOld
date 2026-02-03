import * as THREE from "three";

//empty class but not redundant
//implement this class by any user model you want to add to the 3d scene
//note for future developer: instead of extending THREE.Group, maybe THREE.Group should be a generic type implementation, so that you can move away from THREE.JS to Babylon.js for example. 
//eg; DataModelProxy<TGeometry> -> DataModelProxy<THREE.Group>
//I am too lazy to refactor though.

export class DataModelProxy extends THREE.Group {

}

import { DeconstructedMatrix, MatrixTools } from "../Interfaces/MatrixTools";
import { IsVector3d } from "../Interfaces/IsVector3d";
import * as THREE from 'three'
import { Euler } from "three";

export class MatrixToolsThree implements MatrixTools{
    deconstruct(matrix: number[]): DeconstructedMatrix {
        var position = new THREE.Vector3();
        var quaternion = new THREE.Quaternion();
        var scale = new THREE.Vector3();

        var trueMatrix = new THREE.Matrix4();

        trueMatrix.set(
            matrix[0], matrix[4], matrix[8], matrix[12],
            matrix[1], matrix[5], matrix[9], matrix[13],
            matrix[2], matrix[6], matrix[10], matrix[14],
            matrix[3], matrix[7], matrix[11], matrix[15]
        )

        var rotation = new THREE.Euler().setFromQuaternion(quaternion);
        trueMatrix.decompose(position, quaternion, scale);

        return {
            position: position,
            rotation : rotation,
            scale : scale
        }
    }

    construct(scale : IsVector3d) : number[] {
        var euler = new Euler(scale.x, scale.y, scale.z);
        var matrix = new THREE.Matrix4().makeRotationFromEuler(euler);

        return matrix.elements;
    }
}
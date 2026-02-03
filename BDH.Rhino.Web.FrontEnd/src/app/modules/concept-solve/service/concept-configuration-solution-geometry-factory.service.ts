import { Injectable } from '@angular/core';
import { DataModelProxy } from "@app/modules/project-editor/models/DataModelProxy";
import { ConceptConfigurationResponse } from '../Model/ConceptConfigurationResponse';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { Box3 } from 'three';
import { Point2d } from '@app/shared/models/Point2d';
import { Vector2d } from "@app/shared/models/Vector2d";
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class ConceptConfigurationSolutionGeometryFactoryService {

    private spacing : number = 0.1;

    constructor(private conceptGeometryLoader : BuildingConceptGeometryLoaderService) {

    }

    create(solution : ConceptConfigurationResponse[]): DataModelProxy {
        var proxy = new DataModelProxy();
        var positionX = 0;

        solution.forEach(solution => {
            var columnWidth = 1;
            for(var columnIndex = 0; columnIndex < solution.solution.length; columnIndex++){
                var column = solution.solution[columnIndex];
                var positionY = 0;
                var maxWidth = 0;
                
                for(var rowIndex = 0; rowIndex < column.length; rowIndex ++){
                    var occupiedBy = column[rowIndex].occupiedBy;
                    
                    var mesh = this.conceptGeometryLoader.getOrThrow(occupiedBy.id).clone(true);
                    var meshBox = new Box3().setFromObject(mesh);
    
                    columnWidth = ((meshBox.max.x - meshBox.min.x) / occupiedBy.columnSpan) + this.spacing;
                    maxWidth = Math.max(maxWidth, columnWidth);
    
                    var rowHeight = ((meshBox.max.y - meshBox.min.y) / occupiedBy.rowSpan) + this.spacing;
                    positionY += rowHeight
    
                    if(column[rowIndex].originFor){
                        mesh.position.set(positionX, positionY, 0);
                        proxy.add(mesh);
                    }
                }
    
                positionX += maxWidth;
            }

            positionX += columnWidth;
        })

        

        return proxy;
    }

    createForLine(startPoint : IsPoint2d, endPoint : IsPoint2d, solution : ConceptConfigurationResponse[]){
        var proxy = new DataModelProxy();
        var position = new Point2d(startPoint.x, startPoint.y);
        var angle = calculateCurrentAngle(startPoint, endPoint);
        var vector = Vector2d.fromPoints(endPoint, startPoint);
        var inwards = vector.rotate(Math.PI / 2);

        solution.forEach(solution => {
            var columnWidth = 1;
            for(var columnIndex = 0; columnIndex < solution.solution.length; columnIndex++){
                var column = solution.solution[columnIndex];
                var maxWidth = 0;
                var positionY = 0;
    
                for(var rowIndex = 0; rowIndex < column.length; rowIndex ++){
                    var occupiedBy = column[rowIndex].occupiedBy;
                    
                    var mesh = this.conceptGeometryLoader.getOrThrow(occupiedBy.id).clone(true);
                    var meshBox = new Box3().setFromObject(mesh);
                    var meshDepth = (meshBox.max.z - meshBox.min.z) / 2;
                    columnWidth = ((meshBox.max.x - meshBox.min.x) / occupiedBy.columnSpan) + this.spacing;
                    maxWidth = Math.max(maxWidth, columnWidth);
                    var positionCentered = position.add(inwards.setLength(meshDepth));
                    if(column[rowIndex].originFor){
                        mesh.position.set(positionCentered.x, positionY, positionCentered.y);
                        mesh.rotation.y = angle;
                        proxy.add(mesh);
                    }
    
                    var rowHeight = ((meshBox.max.y - meshBox.min.y) / occupiedBy.rowSpan) + this.spacing;
                    positionY += rowHeight
                }
    
                position = position.add(vector.setLength(maxWidth));
            }

            position = position.add(vector.setLength(columnWidth));
        })
        

        return proxy;
    }
}


export function calculateCurrentAngle(point1 : IsPoint2d, point2 : IsPoint2d){
    var from0 = { x: point2.x - point1.x, y: point2.y - point1.y };
    return Math.atan2(from0.y, from0.x) * -1
}

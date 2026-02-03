import { Injectable } from '@angular/core';
import { Point2d } from '@app/shared/models/Point2d';
import { Way } from '@app/modules/urban-solve/models/Way';
import { Polygon, Feature, Properties, LineString, FeatureCollection, MultiPolygon } from '@turf/turf';
import { IsPoint2d } from '../models/IsPoint2d';
import * as turf from '@turf/turf';

@Injectable({
  providedIn: 'root'
})
export class PolygonClipperService {

    clip(inputPolygons: IsPoint2d[][], polylines: Way[]) {
        polylines.forEach(polyline => {
            var lines = [polyline];

            lines.forEach(line => {
                for (var i = 0; i < inputPolygons.length; i++) {
                    var polygonToSplit = inputPolygons[i];

                    var polygonGeoJson: Polygon = {
                        "type": "Polygon",
                        "coordinates": [polygonToSplit.map(i => { return [i.x, i.y]; })]
                    };
                    var polygonFeature: Feature<Polygon, Properties> = {
                        "type": "Feature",
                        "geometry": polygonGeoJson,
                        "properties": {}
                    };


                    var polylineGeojson: LineString = {
                        "type": "LineString",
                        "coordinates": line.points.map(ele => { return [ele.x, ele.y]; })
                    };
                    var polylineFeature: Feature<LineString, Properties> = {
                        "type": "Feature",
                        "geometry": polylineGeojson,
                        "properties": {}
                    };

                    try {
                        var cut: FeatureCollection<Polygon, Properties> = this.polygonCut(polygonFeature, polylineFeature, line.diameter);

                        //cut succesful, remove original, place the two split at end of array, move iterator back one step
                        inputPolygons.splice(i, 1);

                        for (var j = 0; j < cut.features.length; j++) {
                            var feature = cut.features[j];
                            var featurePoints = feature.geometry.coordinates[0]
                                .map(ele => { return new Point2d(ele[0], ele[1]) });

                            inputPolygons.push(featurePoints);
                        }

                        i--;
                    }
                    catch {
                        //.. fail silently
                    }
                }
            });
        });
    }

    private polygonCut(
        polygon: Feature<Polygon, Properties>,
        line: Feature<LineString, Properties>,
        width: number): FeatureCollection<Polygon, Properties> {

        const THICK_LINE_UNITS = 'degrees';
        const THICK_LINE_WIDTH = width / 2;


        var lineCoords = turf.getCoords(line);
        if ((turf.booleanWithin(turf.point(lineCoords[0]), polygon) ||
            (turf.booleanWithin(turf.point(lineCoords[lineCoords.length - 1]), polygon)))) {
            throw "error";
        }

        var clippingPolygonCoordinates = [];
        var lineLeft = turf.lineOffset(line, THICK_LINE_WIDTH, { units: THICK_LINE_UNITS });
        var lineRight = turf.lineOffset(line, -THICK_LINE_WIDTH, { units: THICK_LINE_UNITS });

        for (var i = 0; i < lineLeft.geometry.coordinates.length; i++) {
            clippingPolygonCoordinates.push(lineLeft.geometry.coordinates[i]);
        }

        for (var i = lineRight.geometry.coordinates.length - 1; i >= 0; i--) {
            clippingPolygonCoordinates.push(lineRight.geometry.coordinates[i]);
        }

        clippingPolygonCoordinates.push(lineLeft.geometry.coordinates[0]);
        var clippingPolygonLineString = turf.lineString(clippingPolygonCoordinates);
        var clippingPolygon = turf.lineToPolygon(clippingPolygonLineString);

        var clipped: Feature<Polygon | MultiPolygon> | null = turf.difference(polygon, clippingPolygon);
        if (clipped == null) {
            throw "";
        }

        var clippedGeomtries: any = clipped.geometry;
        var remainingGeometries: any[] = [];
        clippedGeomtries.coordinates.forEach((geometry: any) => {
            var remainingPolygon = turf.polygon(geometry);
            remainingGeometries.push(remainingPolygon);
        });

        if (remainingGeometries.length > 0) {
            var retVal: FeatureCollection<any, Properties> = turf.featureCollection(remainingGeometries);
            return retVal;
        }

        throw "error";
    }
}

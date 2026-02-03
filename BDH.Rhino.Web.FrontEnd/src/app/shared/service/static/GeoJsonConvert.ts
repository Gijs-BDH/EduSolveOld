import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { Point2d } from "../../models/Point2d";
import { Polygon, Feature, LineString } from "@turf/helpers";
import { Properties } from "@turf/turf";


export class GeoJsonConvert {
    public static toGeoJson(points: IsPoint2d[]): Feature<Polygon, Properties> {
        var polygonGeoJson: Polygon = {
            "type": "Polygon",
            "coordinates": [points.map(i => { return [i.x, i.y]; })]
        };
        var polygonFeature: Feature<Polygon, Properties> = {
            "type": "Feature",
            "geometry": polygonGeoJson,
            "properties": {}
        };

        return polygonFeature;
    }

    public static fromGeoJson(json: Feature<Polygon, Properties>): Point2d[] {
        return json.geometry.coordinates[0]
            .map(ele => { return new Point2d(ele[0], ele[1]); });
    }

    public static toLineString(points: IsPoint2d[], properties: {}): Feature<LineString, Properties> {
        var polylineGeojson: LineString = {
            "type": "LineString",
            "coordinates": points.map(ele => { return [ele.x, ele.y]; })
        };
        var polylineFeature: Feature<LineString, Properties> = {
            "type": "Feature",
            "geometry": polylineGeojson,
            "properties": properties
        };

        return polylineFeature;
    }

    public static fromLineString(feature: Feature<LineString, Properties>): IsPoint2d[] {
        return feature.geometry.coordinates
            .map(ele => { return new Point2d(ele[0], ele[1]); });
    }
}

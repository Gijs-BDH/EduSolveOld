import { WMSMapLayerOptions } from "./WMSMapLayerOptions";
import { WMTSMapLayerOptions } from "./WMTSMapLayerOptions";
import { XYZMapLayerOptions } from "./XYZMapLayerOptions";

export interface MapLayer{
    type : string;
    name: string;
    options: WMTSMapLayerOptions | WMSMapLayerOptions | XYZMapLayerOptions;
}



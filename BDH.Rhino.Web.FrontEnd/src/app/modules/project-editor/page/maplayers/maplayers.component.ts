import { Component, OnInit } from '@angular/core';
import { MapLayer } from '@lib/ExtendedBagViewer/mapLayer';
import { UrbanSolveViewerService } from '../../../urban-solve/service/urban-solve-viewer.service';
import { BagViewerService } from '../../service/bag-viewer.service';

@Component({
  selector: 'app-maplayers',
  templateUrl: './maplayers.component.html',
  styleUrls: ['./maplayers.component.scss']
})
export class MaplayersComponent implements OnInit {
    public layers : MapLayer[]

    constructor(private shell :BagViewerService) {
        this.layers = shell.bagViewer.getCapabilities();
    }

    ngOnInit(): void {
        var layerSetting = localStorage.getItem('layer');
        if(layerSetting){
            var layer = this.layers.find(l => l.name == layerSetting);
            if(layer){
                this.setLayer(layer);
            }
        }
    }

    setLayer(layer : MapLayer){
        localStorage.setItem("layer", layer.name);
        this.shell.bagViewer.setCapabitlies(layer);
    }

    layerIsActive(layer : MapLayer){
        return this.shell.bagViewer.activeLayer().name == layer.name
    }
}

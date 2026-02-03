import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UrbanSolveViewerService } from '../service/urban-solve-viewer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TilepropertiesComponent } from './tileproperties/tileproperties.component';
import { GenericMassComponentComponent } from './generic-mass-component/generic-mass-component.component';
import { TileSplitterComponent } from './tile-splitter/tile-splitter.component';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';
import { UrbanSolveDataService } from '../service/urban-solve-data.service';
import { ShellSelectorService } from '@app/modules/project-editor/service/shell-selector.service';
import { UrbanSolveShellService } from '../service/urban-solve-shell.service';
import { BouwkostenBasisTypologieService } from '@app/data/service/bouwkosten-basis-typologie.service';

@Component({
    selector: 'app-urban-solve',
    templateUrl: './urban-solve.component.html',
    styleUrls: ['./urban-solve.component.scss']
})
export class UrbanSolveComponent implements OnInit {
    title = 'generativeDesignProjectEditor';

    color?: string;

    selected = new FormControl(0);

    public get projectIsActive(): boolean {
        return this.data.projectInformation != null;
    }

    constructor(
        public viewer: UrbanSolveViewerService,
        public data: UrbanSolveDataService,
        public conceptDictionary: BuildingConceptPropertiesDictionaryService,
        private snackBar: MatSnackBar,
        private typologyService: BouwkostenBasisTypologieService,
        private shellSelector: ShellSelectorService,
        private shell: UrbanSolveShellService) {



    }

    @ViewChildren(TilepropertiesComponent) tilePropertiesChild!: TilepropertiesComponent;
    @ViewChildren(GenericMassComponentComponent) genericMassChild!: GenericMassComponentComponent;
    @ViewChildren(TileSplitterComponent) tileSplitterProperties!: TileSplitterComponent;

    ngOnInit() {
        this.shellSelector.setShell(this.shell);

        this.conceptDictionary.refresh().subscribe();

        this.focus();
    }

    deleteAll() {
        this.data.clear();
        this.viewer.rebuildSceneGeometries();
    }



    addMass() {
        this.snackBar.open("Druk op enter zodra u klaar bent.", "Ok")
        this.typologyService.get().subscribe(val => {
            this.shell.startDrawingGenericMass(val[0]);
        })
    }

    addTileSplitter() {
        this.shell.startDrawingTileSplitter().configureOnCommit(points => {
            this.data.addWay(points, 2.5);
            this.shell.drawProjectToCanvas();
        });
    }

    focus() {
        if (!this.data.projectInformation) {
            return;
        }

        this.shell.zoomAll();
    }
}



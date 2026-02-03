import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';
import { EduSolveShellService } from '@app/modules/edu-solve/service/edu-solve-shell.service';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { PersistenceService } from '@app/modules/edu-solve/service/persistence.service';
import { Project } from '@app/modules/edu-solve/models/Project';
import { SolverService } from '@app/modules/edu-solve/service/solver.service';
import { EduSolveDataService } from '@app/modules/edu-solve/service/edu-solve-data.service';
import { GridConfigurationService } from '@app/modules/edu-solve/service/grid-configuration.service';
import { SchoolDataModel } from '../../models/SchoolDataModel';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';
import { UrbanSolveViewerService } from '../../service/urban-solve-viewer.service';
import { GridCellsProviderService } from '@app/modules/edu-solve/service/grid-cells-provider.service';

@Component({
    selector: 'app-tileproperties',
    templateUrl: './tileproperties.component.html',
    styleUrls: ['./tileproperties.component.scss']
})
export class TilepropertiesComponent implements OnInit {
    strategies = [
        "Strokenbouw",
        "Hofjesbouw"
    ]

    public get publicConcepts(): BuildingConcept[] {
        return this.propertiesDictinary.items
    }

    public schoolProjectsCached: Project[] = [];

    showPublicConcepts: boolean = true;
    showPersonalConcepts: boolean = true;
    busy: boolean = false;
    expanded: boolean = false;
    verdiepingen: number = 0;

    constructor(
        public shell: UrbanSolveShellService,
        private schoolShell: EduSolveShellService,
        private data: UrbanSolveDataService,
        private router: Router,
        private route: ActivatedRoute,
        private propertiesDictinary: BuildingConceptPropertiesDictionaryService,
        public shoolPersistence: PersistenceService,
        private schoolSolver: SolverService,
        private schoolGrid: GridConfigurationService,
        private schoolData: EduSolveDataService,
        private viewer: UrbanSolveViewerService,
        private gridCellProvider : GridCellsProviderService) {

    }

    ngOnInit(): void {
        this.shoolPersistence.fetchProjects().subscribe((ps) => {
            this.schoolProjectsCached = ps;
        })
    }


    startDrawingPolygon() {
        this.shell.startDrawingPolygon();
    }


    removeContents() {
        if (!window.confirm("Met deze actie verwijdert u alle geometrie op de geselecteerde tegel. Dit kan niet ongedaan gemaakt worden. Wilt u doorgaan?")) {
            return;
        }

        this.shell.removeInPolygon(this.shell.selectedTile!.points);

        this.viewer.rebuildSceneGeometries();
        this.viewer.ensureRerender();
    }

    exportToSchoolProject() {
        this.schoolShell.setProjectData({
            name: this.data.projectInformation!.name,
            id: "-1",
            basePolygon: this.shell.selectedTile!.points,
            versies: [],
            owner: "",
            // clusters: []
        });

        this.router.navigate(['../edu-solve'], { relativeTo: this.route });
    }

    importSchoolProject(project: Project, versionid: string) {
        this.shoolPersistence.fetchVersion(versionid).subscribe({
            next: (res) => {

                this.schoolGrid.setFromVersion(res);
                this.schoolData.setProject(project);
                this.schoolData.setVersion(res, this.gridCellProvider);
                var tiles = this.gridCellProvider.getTilesWorld();
                var school = new SchoolDataModel(tiles);

                var cells = this.schoolSolver.prepareCells();

                this.schoolSolver
                    .setToData(cells, this.schoolGrid.gridSize, this.schoolGrid.gridSizeY, this.schoolData, this.gridCellProvider)
                    .subscribe(generatedSchool => {
                        school.response = generatedSchool;
                        this.shell.drawProjectToCanvas();
                    })

                this.data.addSchool(school);
            }
        });
    }
}


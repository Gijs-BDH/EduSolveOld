import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { TileGeometryContentFactoryService } from '@app/modules/urban-solve/service/tile-geometry-content-factory.service';
import { PopulatedTileBulkResponse } from '@app/modules/urban-solve/models/DataTransferObjects/PopulatedTileBulkResponse';
import { UrbanSolveDataService } from '@app/modules/urban-solve/service/urban-solve-data.service';
import { UrbanSolveShellService } from '@app/modules/urban-solve/service/urban-solve-shell.service';
import { ParCoordsPlotter } from '@lib/parcoords';

@Component({
  selector: 'app-bulk-solution',
  templateUrl: './bulk-solution.component.html',
  styleUrls: ['./bulk-solution.component.scss']
})
export class BulkSolutionComponent implements OnInit {

    displayedColumns: string[] = ['seed', 'apply', 'numberOfHouses', 'lineLengths', 'glassArea', 'bvo', 'productieKosten', 'volume'];
    dataSource!: MatTableDataSource<PopulatedTileBulkResponse>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) 
        private dialog: PopulatedTileBulkResponse[],
        private contentFactory : TileGeometryContentFactoryService,
        private shell : UrbanSolveShellService,
        private geometryLoader : BuildingConceptGeometryLoaderService,
        private data : UrbanSolveDataService
    ){
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit(): void {

        //really annoying hack. don't know what else to do. src:
        //https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized
        //data cannot be set in afterviewinit because thats the wrong lifecyclehook which causes the expressionhaschangedafterishasbeencheckederror
        //but also, the data cannot be set before the paginator and sorter have been set, because then the loading will take forever.
        //the paginator and sorter are not available in the oninit lifecyclehook.
        setTimeout(() => {
            this.dataSource.data = this.dialog;
        }, 1000);

        new ParCoordsPlotter<PopulatedTileBulkResponse>().plot(this.dialog, "numberOfHouses", ["seed"], (ele) => {
            this.dataSource.data = ele;
        }, "example");
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    async click(variant: PopulatedTileBulkResponse) {
        if(!this.shell.selectedTile?.properties.catalog){
            return;
        }

        this.shell.removeInPolygon(this.shell.selectedTile.points);
        var linesInTile = this.data
            .getCatalogs()
            .map(i => { return { start : i.startPoint, end : i.endPoint} })
            .filter(v => this.shell.selectedTile!.pointIsInTile(v.start) || this.shell.selectedTile!.pointIsInTile(v.end));
        
        var catalog = this.shell.selectedTile?.properties.catalog;
        for(var i = 0; i < catalog.buildingConcepts.length; i++){
            var concept =  catalog.buildingConcepts[i];
            var _ = await this.geometryLoader.getOrDownload(concept.id);
        }

        this.shell.selectedTile.properties.seed = variant.seed;

        this.contentFactory
            .fetchCatalog(this.shell.selectedTile!, true, linesInTile)
            .subscribe({
                next: (res) => {
                    res.lines.forEach(building => {
                        var model = this.data.addCatalog(catalog, building.line.start, building.line.end);
                        model.configuration = building.solution
                    })
                    this.shell.drawProjectToCanvas(true);
                },
                error: (err) => {
                    window.alert("An error occured." + err.message);
                }
            })
        
    }

}



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from '@app/data/service/catalog.service';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { TileGeometryContentFactoryService } from '@app/modules/urban-solve/service/tile-geometry-content-factory.service';
import { PopulatedTileBulkResponse } from '@app/modules/urban-solve/models/DataTransferObjects/PopulatedTileBulkResponse';
import { UrbanSolveDataService } from '@app/modules/urban-solve/service/urban-solve-data.service';
import { UrbanSolveShellService } from '@app/modules/urban-solve/service/urban-solve-shell.service';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';
import { BulkSolutionComponent } from './bulk-solution/bulk-solution.component';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { SolverService } from '@app/modules/concept-solve/service/solver.service';

@Component({
  selector: 'app-catalog-solver',
  templateUrl: './catalog-solver.component.html',
  styleUrls: ['./catalog-solver.component.scss']
})
export class CatalogSolverComponent implements OnInit {

    loading$ = new BehaviorSubject<boolean>(false);
    results$ = new ReplaySubject<PopulatedTileBulkResponse[]>();
    resultsCached : any[] = [];
    useSeed : boolean = false;

    catalogus$;

    public get tile(){
        return this.shell.selectedTile!;
    }

    constructor(
        private shell : UrbanSolveShellService,
        private catalogService : CatalogService,
        private contentFactory : TileGeometryContentFactoryService,
        private data : UrbanSolveDataService,
        private geometryLoader : BuildingConceptGeometryLoaderService,
        private solver : SolverService,
        private dialog : MatDialog){

            this.catalogus$ = catalogService.getPublic();
            this.results$.subscribe((res) => this.resultsCached = res);

        }   
        
    ngOnInit(): void {
        this.catalogService.getPublic().subscribe({ 
            next : (res) => { 
                if(!this.tile.properties.catalog && res.length){
                    this.tile.properties.catalog = res[0] 
                }
            }
        });
    }

    public compareWith(first : BuildingConceptCatalog, second : BuildingConceptCatalog){
        return first.id == second.id;
    }


    async generateContentCatalog() : Promise<void>{
        if(!this.tile.properties.catalog){
            return;
        }

        this.loading$.next(true)
        this.shell.removeInPolygon(this.shell.selectedTile!.points);
        var linesInTile = this.data
            .getCatalogs()
            .map(i => { return { start : i.startPoint, end : i.endPoint} })
            .filter(v => this.shell.selectedTile!.pointIsInTile(v.start) || this.shell.selectedTile!.pointIsInTile(v.end));

        var catalog = this.tile.properties.catalog;
        for(var i = 0; i < catalog.buildingConcepts.length; i++){
            var concept =  catalog.buildingConcepts[i];
            var _ = await this.geometryLoader.getOrDownload(concept.id);
        }

      
        this.contentFactory
            .fetchCatalog(this.shell.selectedTile!, this.useSeed, linesInTile)
            .subscribe({
                next: (res) => {
                    res.lines.forEach(building => {
                        var model = this.data.addCatalog(catalog, building.line.start, building.line.end);
                        model.configuration = building.solution;
                        if(building.usedSeed){
                            model.useSeed = true;
                            model.usedSeed = building.usedSeed;
                        }
                    })
                    this.shell.drawProjectToCanvas(true);
                },
                error: (err) => {
                    window.alert("An error occured." + err.message);
                }
            })
            .add(() => this.loading$.next(false))
    }
    
    async solveAgain(){
        if(!this.shell.selectedTile){
            return;
        }

        var linesInTile = this.data
            .getCatalogs()
            .filter(c => this.shell.selectedTile!.pointIsInTile(c.startPoint) || this.shell.selectedTile!.pointIsInTile(c.endPoint));

        for(var i = 0; i < linesInTile.length; i ++){
            var line = linesInTile[i];

            var catalog = line.catalog;
            for(var j = 0; j < catalog.buildingConcepts.length; j++){
                var concept =  catalog.buildingConcepts[j];
                var _ = await this.geometryLoader.getOrDownload(concept.id);
            }

            await this.solver.solveAgain(line);
        }
    }

    async solveBulk() {

        if(!this.tile.properties.catalog){
            return;
        }

        var n = window.prompt("Hoeveel varianten wilt u?");
        if(!n){
            return;
        }

        var num = Number.parseInt(n);
        if(!num){
            window.alert("Dat lijkt niet op een getal.");
            return;
        }

        if(num < 1 || num > 10000){
            window.alert("Alleen waardes kleiner dan 10000 zijn toegestaan.");
            return;
        }

        this.results$.next([]);
        this.loading$.next(true)
        this.shell.removeInPolygon(this.shell.selectedTile!.points);
        var linesInTile = this.data
            .getCatalogs()
            .map(i => { return { start : i.startPoint, end : i.endPoint} })
            .filter(v => this.shell.selectedTile!.pointIsInTile(v.start) || this.shell.selectedTile!.pointIsInTile(v.end));
            
        var catalog = this.tile.properties.catalog;
        for(var i = 0; i < catalog.buildingConcepts.length; i++){
            var concept =  catalog.buildingConcepts[i];
            var _ = await this.geometryLoader.getOrDownload(concept.id);
        }

      
        this.contentFactory
            .fetchCatalogBulk(this.shell.selectedTile!, linesInTile, num)
            .pipe(map(v => { 
                this.loading$.next(false);
                this.results$.next(v)
            }))
            .subscribe();
    }       

    cleanup() {
        this.results$.next([]);
    }

    explore(){
        var options = {
            width:'80vw',
            height:'780px',
            data: this.resultsCached
        };

        this.dialog.open(BulkSolutionComponent, options);
    }
}


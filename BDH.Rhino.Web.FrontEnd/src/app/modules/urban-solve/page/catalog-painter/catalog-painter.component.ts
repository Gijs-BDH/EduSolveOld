import { Component } from '@angular/core';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';
import { CatalogDataModel } from '../../models/CatalogDataModel';
import { CatalogService } from '@app/data/service/catalog.service';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { SolverService } from '@app/modules/concept-solve/service/solver.service';
import { map } from 'rxjs';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';

@Component({
  selector: 'app-catalog-painter',
  templateUrl: './catalog-painter.component.html',
  styleUrls: ['./catalog-painter.component.scss']
})
export class CatalogPainterComponent {

    catalog$;
    
    observeCatalogName(id : string){
        return this.catalogService.getById(id).pipe(map(v => v.name));
    }

    public get selectedCatalog() : CatalogDataModel | undefined{
        var catalog = this.data.getCatalogs().find(c => c.isSelected);
        return catalog;
    }

    constructor(private shell : UrbanSolveShellService, 
        private catalogService : CatalogService, 
        private data : UrbanSolveDataService,
        public solver : SolverService)
    {
        
        this.catalog$ = catalogService.getPublic();

    }

    async drawCatalog(catalog : BuildingConceptCatalog){
        
        this.shell.startDrawingCatalog().configureOnCommit(pnts => {
            var model = this.data.addCatalog(catalog, pnts[0], pnts[1]);
            this.solver.solveAgain(model);
        });

    }

    solveAgain(model : CatalogDataModel){
        this.solver.solveAgain(model);
    }

   
    remove(model : CatalogDataModel){
        this.data.removeGeneric(model);
        this.shell.drawProjectToCanvas();
    }
}


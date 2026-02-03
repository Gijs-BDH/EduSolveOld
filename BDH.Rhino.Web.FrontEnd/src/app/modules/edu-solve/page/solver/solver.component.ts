import { Component } from '@angular/core';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { SolverService } from '../../service/solver.service';
import { BulkSolveResultsService } from '@app/shared/service/bulk-solve-results.service';
import { GridCellsProviderService } from '../../service/grid-cells-provider.service';

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.scss']
})
export class SolverComponent {


    public get canSolve() {
        return this.shell.projectActive && this.data.clusters.length > 0;
    }


    constructor(
        private shell : EduSolveShellService, 
        public data : EduSolveDataService, 
        private solver : SolverService, 
        private grid : GridConfigurationService,
        public bulkService : BulkSolveResultsService,
        private cellProvider : GridCellsProviderService){


    }


    solve(){ 
        
        if(!this.data.clusters.length || !this.shell.projectActive){
            window.alert("There is nothing to solve.");
            return;
        }

        this.solver.setToShell(this.data, this.shell, this.grid.gridSize, this.grid.gridSizeY, this.cellProvider).subscribe({
            error: (err) => window.alert(err.message)
        })
    }

    solveBulk(){ 
        if(!this.data.clusters.length || !this.shell.projectActive){
            window.alert("There is nothing to solve.");
            return;
        }

        var solutions = window.prompt("Hoeveel varianten wilt u?");
        if(!solutions){
            return;
        }

        var parsed = parseInt(solutions);
        if (isNaN(parsed)) {
            window.alert("Dat is geen geldig getal.");
            return;
        }

        if(parsed < 1 || parsed > 10000){
            window.alert("Dit aantal valt niet binnen het geldige bereik van 1 tot en met 10000");
            return;
        }

        var cells = this.solver.prepareCells();
        this.bulkService
            .fetch(cells, this.data.clusters, this.grid.gridSize, this.grid.gridSizeY, this.data.allowDisconnected, parsed)
            .subscribe();
    }
}


import { Injectable } from '@angular/core';
import { Cluster } from '@app/modules/edu-solve/models/Cluster';
import { GenerateSchoolBulkResponse } from '@app/modules/edu-solve/models/DataTransferObjects/GenerateSchoolBulkResponse';
import { GridCellsProviderService } from '@app/modules/edu-solve/service/grid-cells-provider.service';
import { SolverService } from '@app/modules/edu-solve/service/solver.service';
import { BehaviorSubject, map } from 'rxjs';
import { IsPoint2d } from '../models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class BulkSolveResultsService {

    public readonly results$ = new BehaviorSubject<GenerateSchoolBulkResponse[]>([]);
    public readonly loading$ = new BehaviorSubject<boolean>(false);

    public cached : GenerateSchoolBulkResponse[] = [];

    constructor(private solver : SolverService, private cellProvider : GridCellsProviderService) {

        this.results$.subscribe((res) => this.cached = res);

    }

    fetch(cells : IsPoint2d[], clusters : Cluster[], gridSize : number, gridSizeY : number, allowDisconnected : boolean, solutions : number) {
        this.results$.next([]);
        this.loading$.next(true);
        
        return this.solver.solveBulk(cells, clusters, gridSize, gridSizeY, allowDisconnected, solutions, this.cellProvider)
            .pipe(map(v => this.results$.next(v)))
            .pipe(map(() => this.loading$.next(false)));
    }

    clean(){
        this.results$.next([]);
    }
}



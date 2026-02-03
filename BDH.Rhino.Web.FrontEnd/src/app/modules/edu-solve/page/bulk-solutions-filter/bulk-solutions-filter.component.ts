import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SolverService } from '../../service/solver.service';
import { ParCoordsPlotter } from '@lib/parcoords'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { GenerateSchoolBulkResponse } from '../../models/DataTransferObjects/GenerateSchoolBulkResponse';
import { GridCellsProviderService } from '../../service/grid-cells-provider.service';

@Component({
    selector: 'app-bulk-solutions-filter',
    templateUrl: './bulk-solutions-filter.component.html',
    styleUrls: ['./bulk-solutions-filter.component.scss']
})
export class BulkSolutionsFilterComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['seed', 'apply', 'footprint', 'gevel', 'corners', 'height', 'bboxArea', 'bboxRatio', 'deltaFootprint'];
    dataSource!: MatTableDataSource<GenerateSchoolBulkResponse>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) 
        private dialog: GenerateSchoolBulkResponse[],
        private dataservice : EduSolveDataService,
        private solver : SolverService,
        private shell : EduSolveShellService,
        private grid : GridConfigurationService,
        private gridCellProvider : GridCellsProviderService) {

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
        

        new ParCoordsPlotter<GenerateSchoolBulkResponse>().plot(this.dialog, "footprint", ["seed"], (ele) => {
            this.dataSource.data = ele;
        }, "example");

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    click(variant: GenerateSchoolBulkResponse) {

        var seed = variant.seed;
        this.dataservice.seed = seed;
        this.dataservice.useSeed = true;
        this.solver.setToShell(this.dataservice, this.shell, this.grid.gridSize, this.grid.gridSizeY, this.gridCellProvider).subscribe();
        
    }
}



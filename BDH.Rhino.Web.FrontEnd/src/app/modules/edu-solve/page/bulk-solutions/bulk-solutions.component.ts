import { Component } from '@angular/core';
import { BulkSolveResultsService } from '@app/shared/service/bulk-solve-results.service';
import { MatDialog } from '@angular/material/dialog';
import { BulkSolutionsFilterComponent } from '../bulk-solutions-filter/bulk-solutions-filter.component';

@Component({
    selector: 'app-bulk-solutions',
    templateUrl: './bulk-solutions.component.html',
    styleUrls: ['./bulk-solutions.component.scss']
})
export class BulkSolutionsComponent {

    results$;
    loading$;

    constructor(
        private bulkSolveResults: BulkSolveResultsService,
        private dialog : MatDialog) {

        this.results$ = this.bulkSolveResults.results$;
        this.loading$ = this.bulkSolveResults.loading$;

    }

    cleanup() {
        this.bulkSolveResults.clean();
    }

    explore(){
        var options = {
            width:'80vw',
            height:'780px',
            data: this.bulkSolveResults.cached
        };

        this.dialog.open(BulkSolutionsFilterComponent, options);
    }
}

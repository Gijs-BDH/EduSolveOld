import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfitRapport } from '../../models/DataTransferObjects/ProfitRapport';
import { PersistenceService } from '../../service/persistence.service';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { TypologyOpbrensten } from '../../models/DataTransferObjects/TypologyOpbrensten';

@Component({
  selector: 'app-profit-modal-content',
  templateUrl: './profit-modal-content.component.html',
  styleUrls: ['./profit-modal-content.component.scss']
})
export class ProfitModalContentComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public rapport: ProfitRapport,
    private dialogRef: MatDialogRef<ProfitModalContentComponent>,
    private persistenceService: PersistenceService,
    private currentData: UrbanSolveDataService) {


  }

  ngOnInit(): void {
    this.persistenceService.fetchVersion(this.currentData.projectInformation!.id,
      this.currentData.projectVersionInformation!.id).subscribe(data => {
        if (data.profitReport == null || data.profitReport == '') {
          return;
        }

        var profitReportFromDatabase = JSON.parse(data.profitReport) as ProfitRapport;
        if (profitReportFromDatabase != null) {

          for (var i = 0; i < this.rapport.builtTypes.length; i++) {
            var buildType = this.rapport.builtTypes[i];

            var buildTypeFromDatabase: TypologyOpbrensten | null;
            buildTypeFromDatabase = null;

            for (var j = 0; j < profitReportFromDatabase.builtTypes.length; j++) {
              if (buildType.typologyName == profitReportFromDatabase.builtTypes[j].typologyName) {
                buildTypeFromDatabase = profitReportFromDatabase.builtTypes[j];
                break;
              }
            }

            if (buildTypeFromDatabase != null) {
              buildType.percentSocial = buildTypeFromDatabase.percentSocial;
              buildType.grossIncomePerUnit = buildTypeFromDatabase.grossIncomePerUnit;
            }
          }

          this.rapport.winstmarge = profitReportFromDatabase.winstmarge;          
        }
      });
  }

  save() {
    this.persistenceService.saveVersionReport(this.currentData.projectInformation!.id,
      this.currentData.projectVersionInformation!.id,
      JSON.stringify(this.rapport))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { BouwkostenRapportService } from '../../service/bouwkosten-rapport.service';
import { BouwkostenRapport } from '../../models/Bouwkosten/BouwkostenRapport';
import { GebouwdInEenProject } from '../../models/Bouwkosten/GebouwdInEenProject';
import { TypologyDescriptor } from '../../models/Bouwkosten/TypologyDescriptor';
import { BouwconceptDescriptor } from '../../models/Bouwkosten/BouwconceptDescriptor';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfitModalContentComponent } from '../profit-modal-content/profit-modal-content.component';
import { BouwkostenModalContentComponent } from '../bouwkosten-modal-content/bouwkosten-modal-content.component';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';
import { ProfitCalculatorService } from '../../service/profit-calculator.service';
import { ProfitRapport } from '../../models/DataTransferObjects/ProfitRapport';
import { map, mergeMap } from 'rxjs';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';


@Component({
    selector: 'app-bouwkosten',
    templateUrl: './bouwkosten.component.html',
    styleUrls: ['./bouwkosten.component.scss']
})
export class BouwkostenComponent {


    public info(): GebouwdInEenProject {
        var conceptDescriptors: BouwconceptDescriptor[] = [];
        var massDescriptors: TypologyDescriptor[] = [];

        this.shell.getGenericMasses().forEach(m => {
            var volume = m.depth * m.height * m.width;

            var found = massDescriptors.find(e => e.typology.name == m.typology.name);
            if (found) {
                found.volume += volume;
                return;
            }

            var descriptor = new TypologyDescriptor(m.typology);
            descriptor.volume = volume;
            massDescriptors.push(descriptor);
        })

        this.data.getCatalogs().forEach(catalog => {
            if(!catalog.configuration){
                return;
            }

            catalog.configuration.forEach(solutions => {
                solutions.solution.forEach(column => {
                    column.forEach(cell => {
                        var concept = cell.originFor;
                        if(!concept){
                            return;
                        }

                        var found = conceptDescriptors.find(e => e.concept.id == concept!.id);
                        if (found) {
                            found.number++;
                            return;
                        }
            
                        var descriptor = new BouwconceptDescriptor(this.propertiesDictionary.getByIdOrThrow(concept.id));
                        conceptDescriptors.push(descriptor);
                    })
                });
            })
        });


        return {
            typologySummaries: massDescriptors,
            conceptSummaries: conceptDescriptors
        };
    }

    constructor(
        private shell: UrbanSolveShellService,
        private bouwkostenRapportService: BouwkostenRapportService,
        private profitRapportService : ProfitCalculatorService,
        private data : UrbanSolveDataService,
        private propertiesDictionary : BuildingConceptPropertiesDictionaryService,
        public dialog: MatDialog) {

    }





    fetchReport() {
        this.bouwkostenRapportService.fetch(this.info()).subscribe({
            next: (res) => {
                this.openReport(res);
            },
            error: (err) => window.alert(err.message)
        })
    }

    openReport(data: BouwkostenRapport) {
        const config = new MatDialogConfig();
        config.data = data;
        config.width = '80vw';
        const dialogRef = this.dialog.open(BouwkostenModalContentComponent, config);

        dialogRef.afterClosed();
    }

    fetchProfit() {
        this.bouwkostenRapportService.fetch(this.info())
            .pipe(mergeMap(bouwkosten => {
                    return this.profitRapportService.fetch(this.info(), bouwkosten.totaalUitgaven, this.data.projectArea())
                })
            )
            .subscribe({
                next: (res) => { this.openProfit(res); },
                error: (err) => { window.alert(err.message) }
            });
    }

    openProfit(data: ProfitRapport) {
        const config = new MatDialogConfig();
        config.data = data;
        config.width = '80vw';
        const dialogRef = this.dialog.open(ProfitModalContentComponent, config);

        dialogRef.afterClosed();
    }
}




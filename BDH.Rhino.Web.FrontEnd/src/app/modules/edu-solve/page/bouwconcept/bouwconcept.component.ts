import { Component, OnInit } from '@angular/core';
import { ConstructionConceptService } from '../../../../data/service/construction-concept.service';
import { MatSelectChange } from '@angular/material/select';
import { BouwconceptConfigurationService } from '../../service/bouwconcept-configuration.service';
import { ConstructionConceptProducer } from '@data/schema/models/ConstructConceptProducer';
import { ConstructionConcept } from '@data/schema/models/ConstructionConcept';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';

@Component({
  selector: 'app-bouwconcept',
  templateUrl: './bouwconcept.component.html',
  styleUrls: ['./bouwconcept.component.scss']
})
export class BouwconceptComponent implements OnInit {

    
    public get selectedManufacturer() : ConstructionConceptProducer | undefined{
        return this.config.selectedManufacturer;
    }

    public get products(): ConstructionConcept[] {
        return this.config.selectedManufacturer?.products ?? [];
    }

    constructor(private shell : EduSolveShellService, private dataService : ConstructionConceptService, public config: BouwconceptConfigurationService){

    }   

    ngOnInit(): void {

        this.dataService.getManufacturers().subscribe(v => {
            this.config.manufacturers = v;
            this.config.setManufacturer(v[0].id)
            this.config.set(this.config.selectedManufacturer!.products[0].id);
            this.shell.drawProjectToCanvas();
        });
        
    }


    public manufacturerChanged(event : MatSelectChange){

        this.config.setManufacturer(event.value.id);

        this.shell.setSchool(undefined);
        this.shell.drawProjectToCanvas();
        
    }

    public productChanged(event : MatSelectChange){

        this.config.set(event.value.id);
        
        this.shell.setSchool(undefined);
        this.shell.drawProjectToCanvas();

    }

}

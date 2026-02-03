import { Component } from '@angular/core';
import { TransformControlsService } from '@app/modules/project-editor/service/transform-controls.service';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';
import { BouwkostenBasisTypologieService } from '@app/data/service/bouwkosten-basis-typologie.service';

@Component({
  selector: 'app-generic-mass-component',
  templateUrl: './generic-mass-component.component.html',
  styleUrls: ['./generic-mass-component.component.scss']
})

export class GenericMassComponentComponent {

  publicConcepten$;

  expanded: boolean = false;

  constructor(public shell: UrbanSolveShellService, private transformControls: TransformControlsService, bouwkostenTypologyService: BouwkostenBasisTypologieService) {
    this.publicConcepten$ = bouwkostenTypologyService.get();
  }

  typologyChange() {
    if (!this.shell.selectedMass) {
      return;
    }

    if (this.shell.selectedMass!.typology.maximaleHoogte > 0
         && this.shell.selectedMass.height > this.shell.selectedMass!.typology.maximaleHoogte) {
      this.shell.selectedMass.height = this.shell.selectedMass!.typology.maximaleHoogte;
    }
}

  change() {
    var attatedTo = this.shell.selectedMass;
    if (!attatedTo) {
      return;
    }

    this.transformControls.detach(true);
    this.shell.drawProjectToCanvas();

    var modelProxy = this.shell.findMassProxy(attatedTo);
    if (!modelProxy) {
      return;
    }

    this.transformControls.attach(modelProxy);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BouwkostenRapport } from '../../models/Bouwkosten/BouwkostenRapport';

@Component({
  selector: 'app-bouwkosten-modal-content',
  templateUrl: './bouwkosten-modal-content.component.html',
  styleUrls: ['./bouwkosten-modal-content.component.scss']
})
export class BouwkostenModalContentComponent {

    rapport : BouwkostenRapport;

    constructor(
        @Inject(MAT_DIALOG_DATA) data : BouwkostenRapport,
        private dialogRef : MatDialogRef<BouwkostenModalContentComponent>){
            this.rapport = data;
        }
        
    close(){
        this.dialogRef.close();
    }
}

import { Injectable } from '@angular/core';
import { BaseShell } from '../models/BaseShell';
import { BagViewerService } from './bag-viewer.service';

//provides an injectable services that can switch between applications
//work in progress.

@Injectable({
    providedIn: 'root'
})
export class ShellSelectorService {

    private shell: BaseShell | undefined;

    public get selectedShell(): BaseShell | undefined {
        return this.shell;
    }

    constructor(private bagViewer : BagViewerService) {

    }

    public setShell(shell: BaseShell) {
        if(this.selectedShell){
            this.selectedShell.drawProjectToCanvas();
        }
        this.bagViewer.removeUserElements();
        this.shell = shell;
        shell.drawProjectToCanvas();
    }
}

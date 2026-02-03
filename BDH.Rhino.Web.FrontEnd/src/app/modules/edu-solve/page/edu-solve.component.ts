import { Component, OnInit  } from '@angular/core';
import { ShellSelectorService } from '@app/modules/project-editor/service/shell-selector.service';
import { EduSolveShellService } from '../service/edu-solve-shell.service';

@Component({
  selector: 'app-edu-solve',
  templateUrl: './edu-solve.component.html',
  styleUrls: ['./edu-solve.component.scss']
})
export class EduSolveComponent implements OnInit {
    public get projectIsActive(){
        return this.viewer.projectActive;
    }

    constructor(private viewer : EduSolveShellService, private shellSelector : ShellSelectorService){
        
    }

    ngOnInit(): void {
        this.shellSelector.setShell(this.viewer);

        if(this.viewer.projectActive){
            this.viewer.zoomAll();
        }
    }
}

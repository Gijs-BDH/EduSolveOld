import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProjectEditorComponent } from './page/project-editor.component';


const routes: Routes = [
    {
        path: '',
        component: ProjectEditorComponent,
        children: [
            {
                path: 'urban-solve',
                loadChildren: () =>
                    import('../urban-solve/urban-solve.module').then(m => m.UrbanSolveModule),
            },
            {
                path: 'edu-solve',
                loadChildren: () =>
                    import('../edu-solve/edu-solve.module').then(m => m.EduSolveModule),
            }
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { CompaniesComponent } from './modules/companies/page/companies.component';
import { HomeComponent } from './modules/home/page/home.component';
import { LandingComponent } from './modules/landing/page/landing.component';
import { NotFoundComponent } from './modules/not-found/page/not-found.component';
import { ProfileComponent } from './modules/profile/page/profile.component';
import { UsersComponent } from './modules/users/page/users.component';
import { AdminAuthGuard } from '@app/core/auth/AdminAuthGuard';
import { ProductenComponent } from './modules/producten/page/producten.component';
import { CatalogusComponent } from './modules/catalogus/page/catalogus.component';
import { ConceptSolveComponent } from './modules/concept-solve/page/concept-solve.component';
import { PageComponent } from './modules/projecten/page/page.component';

const routes: Routes = [

    {
        path: '',
        component: ContentLayoutComponent,
        children: [
            {
                path: '',
                component : LandingComponent
            },
            {
                path: 'home',
                component : HomeComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'producten',
                component: ProductenComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/producten/producten.module').then(m => m.ProductenModule)
            },
            {
                path: 'projecten',
                component: PageComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/projecten/projecten.module').then(m => m.ProjectenModule)
            },
            {
                path: 'concept-solve',
                component: ConceptSolveComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/concept-solve/concept-solve.module').then(m => m.ConceptSolveModule)
            },
            {
                path: 'catalogus',
                component: CatalogusComponent,
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/catalogus/catalogus.module').then(m => m.CatalogusModule)
            },
            {
                path: 'companies',
                component : CompaniesComponent,
                canActivate: [AdminAuthGuard],
                loadChildren: () =>
                    import('./modules/companies/companies.module').then(m => m.CompaniesModule)
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AdminAuthGuard],
                loadChildren: () =>
                    import('./modules/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'not-found',
                component : NotFoundComponent,
                loadChildren: () =>
                    import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: 'project-editor',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./modules/project-editor/project-editor.module').then(m => m.ProjectEditorModule),
            },
            {
                path: 'construction-concepts',
                canActivate:[AdminAuthGuard],
                loadChildren:() =>
                    import('./modules/construction-concepts/construction-concepts.module').then(m => m.ConstructionConceptsModule)
            }
        ]
    },
    {
        path: "**",
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
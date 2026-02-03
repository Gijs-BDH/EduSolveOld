import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';


import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AppConfigService } from './shared/service/app-config.service';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

export function initializeApp(appConfigService: AppConfigService) {
    return (): Promise<any> => {
        return appConfigService.load();
    }
}

@NgModule({
    declarations: [
        AppComponent,

        ContentLayoutComponent,
        HeaderComponent,
        NavComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        AuthModule.forRoot(),

        CoreModule,
        SharedModule,

        AppRoutingModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        },
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfigService], multi: true
        }
    ]
})

export class AppModule { }
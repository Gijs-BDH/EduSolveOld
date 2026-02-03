import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ThemeService } from '@app/core/service/theme.service';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public isDarkTheme$!: Observable<boolean>;


    constructor(public auth: AuthService, private themeService: ThemeService) {

    }

    ngOnInit() {
        this.isDarkTheme$ = this.themeService.getDarkTheme();
    }

    toggleTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
    }


    logOut() {
        this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
    }

    login(){
        this.auth.loginWithRedirect();
    }
}

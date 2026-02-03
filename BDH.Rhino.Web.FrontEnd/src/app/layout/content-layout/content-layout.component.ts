import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { ThemeService } from '@core/service/theme.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
    currentTheme: string = '';

    public isDarkTheme$!: Observable<boolean>;

    currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
        map((isDarkTheme: boolean) => {
            const darkClassName = 'darkMode';
            this.currentTheme = isDarkTheme ? darkClassName : '';

            if (isDarkTheme) {
                this.overlayContainer.getContainerElement().classList.add(darkClassName);
            } else {
                this.overlayContainer.getContainerElement().classList.remove(darkClassName);
            }

            return this.currentTheme;
        })
    );

    constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) { }

    ngOnInit(): void {
        if (this.overlayContainer && this.currentTheme) {
            this.overlayContainer
                .getContainerElement().classList.add(this.currentTheme);
        }

        this.isDarkTheme$ = this.themeService.getDarkTheme();
    }

    toggleTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
    }
}
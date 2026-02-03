import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

    block = true;

    constructor(private auth: AuthService) {       
        
        
    }

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe({
            next: (is) => {
                if(is){
                    this.block = false;
                }
            }
        })
    }

    enter() {
        var options = {
            appState : {
                target: "http://localhost:4200/project-editor"
            }
        }
        this.auth.loginWithRedirect(options)
    }
    
    continueAsGuest(){
        this.block = false;
    }
}

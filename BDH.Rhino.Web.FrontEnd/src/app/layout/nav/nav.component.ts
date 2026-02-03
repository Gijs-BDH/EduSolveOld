import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '@app/data/service/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { inject } from '@lib/tween/test/unit/nodeunit';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    constructor(public auth : AuthService, public users : UserService, public sidenav : MatSidenav ){

    }

    login(){
        this.auth.loginWithRedirect();
    }

}

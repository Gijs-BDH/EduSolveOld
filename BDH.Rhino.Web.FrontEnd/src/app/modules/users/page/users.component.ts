import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, ReplaySubject, share, switchMap } from 'rxjs';
import { User } from '@app/data/schema/models/User'
import { UserService } from '@app/data/service/user.service';
import { GetUsersRepsonse } from '@app/data/schema/responses/getUsersResponse';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

    public users$ : Observable<GetUsersRepsonse>;
    private refresh$ = new ReplaySubject(1);

    public displayedColumns: string[] = ['email', 'company', 'isAdmin', 'edit', 'remove'];

    constructor(public auth : AuthService, public userService : UserService, private dialog : MatDialog){
        this.users$ = this.refresh$.pipe(
            switchMap(() => userService.get()),
            share()
        ) ;

        this.refresh();

        this.dialog.afterAllClosed.subscribe({
            next : () => this.refresh()
        })
    }

    edit(user : User){
        this.dialog.open(EditComponent, { data: user, width:'40vw' })
    }

    refresh(){
        this.refresh$.next({});
    }

    remove(user : User){
        if(!window.confirm(`Weet u zeker dat u de gebruiker ${user.emailAddress} wilt verwijderen?`)){
            return;
        }

        this.userService.delete(user.emailAddress).subscribe({
            next : res => this.refresh(),
            error : err => window.alert("Er is een fout opgetreden." + err.message)
        });
    }

    newUser(){
        this.dialog.open(NewComponent, { width:'40vw'});
    }
}

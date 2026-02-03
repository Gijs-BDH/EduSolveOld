import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '@env';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../schema/models/User';
import { EditUserRequest } from '../schema/requests/EditUserRequest';
import { GetUsersRepsonse } from '../schema/responses/getUsersResponse';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl : string = environment.apiUrl + "/users";  

    currentUserIsAdmin$ : Observable<boolean>;
    companyOfCurrentUser$: Observable<string>;

    constructor(private http: HttpClient, auth : AuthService) { 
        
        this.currentUserIsAdmin$ = auth.user$.pipe(
            switchMap(user => {
                if(!user || !user.email){
                    return of(false);
                }

                return this.getByEmail(user.email).pipe(
                    switchMap(_user => {
                        if(!_user){
                            return of(false);
                        }

                        return of(_user.isAdmin);
                    })
                )
            }));


        this.companyOfCurrentUser$ = auth.user$.pipe(
            switchMap(user => {
                if(!user|| !user.email){
                    return of("");
                }

                return this.getByEmail(user.email).pipe(
                    switchMap(_user => {
                        if(!_user){
                            return of("");
                        }

                        return _user.company
                    })
                )
            })
        );
    }

    //CREATE
    add(name : string, company : string, isAdmin : boolean){
        var body = {
            Email : name,
            IsAdmin : isAdmin,
            Company : company
        };

        return this.http.post(this.baseUrl, body);
    }

    //READ
    get(){
        return this.http.get<GetUsersRepsonse>(this.baseUrl);
    }

    getByEmail(email : string){
        var body = {
            email : email
        }
        return this.http.post<User>(this.baseUrl + "/email", body);
    }

    //UPDATE
    edit(email: string, isAdmin: boolean, company : string){
        var request : EditUserRequest = {
            email : email,
            isAdmin : isAdmin,
            company : company
        }

        var url = this.baseUrl + "/edit";
        return this.http.post(url, request);
    }

    //DELETE
    delete(email : string){
        var url = this.baseUrl + "?emailAddress=" + email;

        return this.http.delete(url);
    }
}


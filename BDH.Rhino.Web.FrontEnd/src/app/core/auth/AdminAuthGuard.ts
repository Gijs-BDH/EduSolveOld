import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "@app/data/service/user.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class  AdminAuthGuard implements CanActivate {

    constructor(private users : UserService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {

        return this.users.currentUserIsAdmin$;
    }

}


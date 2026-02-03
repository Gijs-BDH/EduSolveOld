import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '@env';
import { map, mergeMap, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserFavoritesService {

    private url : string = environment.apiUrl + "/userfavorites";

    constructor(private httpClient : HttpClient, private authService : AuthService) {
    }


    favorite(bouwconceptId : string){
        var url = this.url + "?id=" + bouwconceptId;

        return this.httpClient.post<boolean>(url, {});
    }

    unfavorite(bouwconceptId : string){
        var url = this.url + "?id=" + bouwconceptId;

        return this.httpClient.delete<boolean>(url, {});
    }

    getFavorites(){
        return this.authService.isAuthenticated$
            .pipe(mergeMap(v => {
                if(!v){
                    return of([]);
                }

                return this.httpClient.get<string[]>(this.url);
            }))
    }

    userHasFavorited(bouwconceptId : string){
        return this.getFavorites()
            .pipe(map(v => v.find(u => u == bouwconceptId) !== null));
    }
}

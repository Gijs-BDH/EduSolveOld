// import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthHttpInterceptor } from '@auth0/auth0-angular';
// import { Observable } from 'rxjs';
// import { environment } from '@env';

// const whiteList : string[] = [
//     environment.apiUrl + '/bouwkosten',
//     environment.apiUrl + '/bouwconcepten/public',
//     environment.apiUrl + '/bouwconcepten/geometry/',
//     environment.apiUrl + '/bouwconcepten/get/',
//     environment.apiUrl + '/generativedesign'
// ]

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthHttpInterceptorExtended extends AuthHttpInterceptor {

//     override intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         var preventDefault = whiteList.find(i => req.url.toLowerCase().startsWith(i));
//         if (preventDefault) {
//             return next.handle(req);
//         }
//         else {
//             return super.intercept(req, next);
//         }
//     }
// }
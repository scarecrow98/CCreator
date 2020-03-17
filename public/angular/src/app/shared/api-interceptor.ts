import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private apiUrl: string = 'http://localhost:8000';

    constructor(private route: ActivatedRoute) { }

    /**
     * override metódus
     * Ezen a metóduson minden HTTP kérés keresztül megy, amit az app-ból indítunk.
     * Ez arra jó, hogy egy helyen tudjunk globálisan módosítgatni a kimenő kéréseket.
     * pl.: egységesen itt tudjuk beállítani minden kérésnek, hogy mi az URL, ahonnan adatokat kérünk le.
     * @param req 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //berakom a JWT tokent a kérés fejlécébe, az Authorization header-be
        const jwtToken = localStorage.getItem('jwt-token') || '';

        //fogom a http kérész url-jét, és átalakítom olymódon, hogy eléfűzöm a php szerverünk url-jét.
        //pl.: az /account/login-ból --> http://localhost:8000/account/clone lesz
        request = request.clone({
            url: this.apiUrl + request.url,
            setHeaders: {
                Authorization: 'Bearer ' + jwtToken
            }
        });

        return next.handle(request);
    }

}
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { AppService } from '../services/app.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    /**
     * Lumen API címe
     */
    private apiUrl: string = 'https://rf.govern.hu/api/public';
    // private apiUrl: string = 'http://localhost:8000';

    /**
     * Elküldött, de még vissza nem érkezett kérések száma.
     * LoaderService-nek kell.
     */
    private pendingRequests: number = 0;

    constructor(private router: Router, private loaderService: LoaderService, private noficationService: NotificationService, private appService: AppService) { }

    /**
     * override metódus
     * Ezen a metóduson minden HTTP kérés keresztül megy, amit az app-ból indítunk.
     * Ez arra jó, hogy egy helyen tudjunk globálisan módosítgatni a kimenő kéréseket.
     * pl.: egységesen itt tudjuk beállítani minden kérésnek, hogy mi az URL, ahonnan adatokat kérünk le.
     * @param req 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //url-nől kiszedem az app azonosítót, amit elküldök header-ben a szervernek
        //hogy tudja, melyik adatbázishoz kell csatlakozzon
        const appSlug = this.appService.getAppSlug();


        //berakom a JWT tokent a kérés fejlécébe, az Authorization header-be
        const jwtToken = localStorage.getItem('jwt-token') || '';

        //fogom a http kérész url-jét, és átalakítom olymódon, hogy eléfűzöm a php szerverünk url-jét.
        //pl.: az /account/login-ból --> http://localhost:8000/account/clone lesz
        request = request.clone({
            url: this.apiUrl + request.url,
            setHeaders: {
                Authorization: 'Bearer ' + jwtToken,
                AppSlug: appSlug
            }
        });

        this.pendingRequests++;
        this.loaderService.setLoading(true);

        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    this.decreasePendingRequests();

                    //központi hibakezelés
                    if (res.body.success && res.body.message && res.body.message != '') {
                        this.noficationService.success(res.body.message);
                    }

                    if (!res.body.success && res.body.message && res.body.message != '') {
                        this.noficationService.error(res.body.message);
                    }
                }
            }),
            catchError(err => {
                this.noficationService.error('Szerverhiba történt!')
                this.decreasePendingRequests();
                throw err;
            })
        );
    }

    decreasePendingRequests(): void {
        this.pendingRequests--;
        if (this.pendingRequests) {
            this.loaderService.setLoading(false);
        }
    }

}
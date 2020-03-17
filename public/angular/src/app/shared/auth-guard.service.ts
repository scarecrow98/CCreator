import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Ez a guard az /app/*, illetve dashboard jellegű routokat védi azáltal, hogy ha ilyen routra nagiválunk (tehát valamelyik alkalmazást akarjuk megnyitni)
 * ez elküld egy kérést a szervernek, és lekéri, hogy be van-e lépve a user.
 * Ha a szerver status-ban booleant küld vissza az alaján, hogy be van-e lépve a user.
 * Ha nincs akkor login oldalra redirectelünk, ha igen, akkor hagyjuk megnyitni a kért routeot
 */
export class AuthGuardService implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.accountService.isAuthenticated().pipe(
            map(res => {
                if (res.status) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}

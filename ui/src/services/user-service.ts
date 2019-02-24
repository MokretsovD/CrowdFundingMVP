import { User, LoginRequest } from 'src/generated/user';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { ConfigService } from './config-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnDestroy  {
    private userSubject$: BehaviorSubject<User | null>;
    userObservable: Observable<User | null>;
    constructor(private configService: ConfigService, private http: HttpClient) {
        this.userSubject$ = new BehaviorSubject<User | null>(null);
        this.userObservable = this.userSubject$.asObservable();
    }

    login(username: string, password: string) {
        const body: LoginRequest = {
            username,
            password
        };

        return this.configService.getConfig().pipe(
            switchMap(config => this.http.post<User>(`${config.baseUrl}/auth`,
                body)),
            tap(user => this.userSubject$.next(user)));
    }
    logout() {
        // TODO: destroy the token on the server side
        this.userSubject$.next(null);
    }
    ngOnDestroy(): void {
        this.userSubject$.complete();
    }
}

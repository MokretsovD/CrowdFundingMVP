import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    public username: string;
    public password: string;
    public returnUrl = '';
    public returnParams: any;
    private loadingSubscription: Subscription | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private loadService: NgxUiLoaderService) { }

    ngOnInit(): void {
        const { returnUrl, ...returnParams} = this.route.snapshot.queryParams;
        this.returnUrl = returnUrl;
        this.returnParams = returnParams;
    }
    ngOnDestroy() {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
    onSubmit() {
        this.loadService.start();
        this.loadingSubscription = this.userService
            .login(this.username, this.password)
            .pipe(
                tap(() => this.router.navigate([this.returnUrl ? this.returnUrl : 'projects'], {
                    queryParams: this.returnParams
                })),
                finalize(() => {
                    this.loadService.stop();
            })).subscribe();
    }
}

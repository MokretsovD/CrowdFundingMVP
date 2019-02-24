import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from 'src/services/projects-service';
import { Subscription, of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, tap, catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/generated/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user-service';
import { ProjectDetails } from 'src/generated/project';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    public projectDetails: ProjectDetails;
    private projectId: string;
    private user: User;
    public amount: number;
    private updateSubscription: Subscription | undefined;
    private getSubscription: Subscription | undefined;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private projectsService: ProjectsService,
        private loadService: NgxUiLoaderService) { }

    ngOnInit(): void {
        this.projectId = this.route.snapshot.paramMap.get('id');
        const amountString = this.route.snapshot.queryParamMap.get('amount');
        this.amount = amountString ? parseInt(amountString, 10) : 0;
        this.updateProject();
    }

    ngOnDestroy() {
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
        if (this.getSubscription) {
            this.getSubscription.unsubscribe();
        }
    }

    updateProject() {
        if (this.getSubscription) {
            this.getSubscription.unsubscribe();
        }

        this.getSubscription = this.userService.userObservable.pipe(
            switchMap(user => {
                this.user = user;
                this.loadService.start();
                return this.projectsService.getProject(user ? user.token : '', this.projectId);
            }),
            tap(data => this.projectDetails = data),
            catchError((error) => {
                alert(error);
                return of();
            }),
            tap(() => this.loadService.stop()),
        ).subscribe();
    }

    onSubmit() {
        if (this.user == null) {
            this.router.navigate(['register'], { queryParams: { returnUrl: `projects/${this.projectId}`, amount: `${this.amount}` } });
            return;
        }
        this.loadService.start();
        this.updateSubscription = this.projectsService
            .backupProject(this.user.name, this.projectId, this.amount)
            .pipe(
                tap(() => this.updateProject()),
                catchError((error) => {
                    alert(error);
                    return of();
                }),
                // .pipe(tap(() => this.router.navigate([this.returnUrl || 'projects'])))
                finalize(() => this.loadService.stop()))
            .subscribe();
    }
}

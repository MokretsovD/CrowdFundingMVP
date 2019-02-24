import { Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/generated/project';
import { ProjectsService } from 'src/services/projects-service';
import { User } from 'src/generated/user';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/services/user-service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public projects: Project[] = [];
    public user: User;
    constructor(public userService: UserService, public projectService: ProjectsService, private loadService: NgxUiLoaderService) { }

    ngOnInit(): void {
        this.subscription = this.userService.userObservable
            .pipe(
                tap((user) => this.user = user),
                tap(() => this.loadService.start()),
                switchMap(() => this.projectService.getProjects(this.user ? this.user.token : null)),
                tap(projects => this.projects = projects),
                catchError((error) => {
                    alert(error);
                    return of();
                }),
                tap(() => this.loadService.stop()))
            .subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

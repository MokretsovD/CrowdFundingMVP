import { Injectable } from '@angular/core';
import { Project, ProjectDetails } from 'src/generated/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config-service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    constructor(private configService: ConfigService, private http: HttpClient) { }
    getProjects(userToken: string) {
        const headers = new HttpHeaders({userToken: userToken || ''});
        return this.configService.getConfig().pipe(
            switchMap(config =>
                this.http.get<Project[]>(`${config.baseUrl}/projects`, { headers })));
    }

    getProject(userToken: string, projectId: string) {
        const headers = new HttpHeaders({userToken});
        return this.configService.getConfig().pipe(
            switchMap(config =>
                this.http.get<ProjectDetails>(`${config.baseUrl}/projects/${projectId}`, { headers })));
    }

    backupProject(userToken: string, projectId: string, amount: number) {
        const headers = new HttpHeaders({userToken});
        return this.configService.getConfig().pipe(
            switchMap(config =>
                this.http.put<ProjectDetails>(`${config.baseUrl}/projects/${projectId}`, amount, { headers })));
    }
}

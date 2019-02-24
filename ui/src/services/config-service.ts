import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    configUrl = 'assets/config.json';
    constructor(private http: HttpClient) { }
    getConfig() {
        // TODO: implement caching logic
        return this.http.get<Config>(this.configUrl);
    }
}

export interface Config {
    baseUrl: string;
}

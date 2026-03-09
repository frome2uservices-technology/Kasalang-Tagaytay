import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { AppConfig, CmsServiceConfig } from "../../services/config-service/config";

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {

    private config!: AppConfig;

    constructor (
        private readonly http: HttpClient
    ) {}

    public load(): Promise<void> {
        return firstValueFrom(
            this.http.get<AppConfig>('assets/config/config.json')
        ).then(config => {
            this.config = config;
        });
    }

    public get settings(): AppConfig {
        return this.config;
    }

    public get cmsServiceConfig(): CmsServiceConfig {
        return this.config.cmsService;
    }

    public get webMaintenanceConfig(): boolean {
        return this.config.webMaintenance;
    }
}
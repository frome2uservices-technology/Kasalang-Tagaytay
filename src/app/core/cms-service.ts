import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './config.service';
import { Observable } from 'rxjs';
import { CmsHeaderComponents } from '../models/header/cms-header-components.model';
import { CmsExpoComponents } from '../models/home/cms-expo-components.model';
import { CmsExperienceComponents } from '../models/about/cms-experience-component.model';
import { CmsRecapComponents } from '../models/home/cms-recap-components.model';
import { CmsFaqComponents } from '../models/faq/cms-faq-component.model';

@Injectable({
  providedIn: 'root',
})
export class CmsService {

  private readonly cmsBaseURL: string = '';
  private readonly cmsHeaderComponentURL: string = '';
  private readonly cmsExpoComponentURL: string = '';
  private readonly cmsExperienceComponentURL: string = '';
  private readonly cmsRecapComponentURL: string = '';
  private readonly cmsFaqComponentURL: string = '';

  constructor(
    private readonly config: AppConfigService,
    private readonly http: HttpClient
  ) {
    this.cmsBaseURL = this.config.cmsServiceConfig.baseURL;
    this.cmsHeaderComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.headerComponent}`;
    this.cmsExpoComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.expoComponent}`;
    this.cmsExperienceComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.experienceComponent}`;
    this.cmsRecapComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.recapComponent}`;
    this.cmsFaqComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.faqComponent}`;
  }
  
  public getCmsHeaderComponents(): Observable<CmsHeaderComponents> {
    return this.http.get<CmsHeaderComponents>(`${this.cmsHeaderComponentURL}`);
  }

  public getCmsExpoComponents(): Observable<CmsExpoComponents> {
    return this.http.get<CmsExpoComponents>(`${this.cmsExpoComponentURL}`);
  }

  public getCmsExperienceComponents(): Observable<CmsExperienceComponents> {
    return this.http.get<CmsExperienceComponents>(`${this.cmsExperienceComponentURL}`);
  }

  public getCmsRecapComponents(): Observable<CmsRecapComponents> {
    return this.http.get<CmsRecapComponents>(`${this.cmsRecapComponentURL}`);
  }

  public getCmsFaqComponents(): Observable<CmsFaqComponents> {
    return this.http.get<CmsFaqComponents>(`${this.cmsFaqComponentURL}`);
  }
}

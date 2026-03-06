import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { AppConfigService } from './config.service';
import { Observable, tap } from 'rxjs';
import { CmsHeaderComponents } from '../models/header/cms-header-components.model';
import { CmsExpoComponents } from '../models/home/cms-expo-components.model';
import { CmsExperienceComponents } from '../models/about/cms-experience-component.model';
import { CmsRecapComponents } from '../models/home/cms-recap-components.model';
import { CmsFaqComponents } from '../models/faq/cms-faq-component.model';
import { CmsPerksComponents } from '../models/be-part/cms-perks-component.model';
import { CmsRaffleComponents } from '../models/be-part/cms-raffle-component.model';

@Injectable({
  providedIn: 'root',
})
export class CmsService {

  // URL
  private readonly cmsBaseURL: string = '';
  private readonly cmsHeaderComponentURL: string = '';
  private readonly cmsExpoComponentURL: string = '';
  private readonly cmsExperienceComponentURL: string = '';
  private readonly cmsRecapComponentURL: string = '';
  private readonly cmsFaqComponentURL: string = '';
  private readonly cmsPerksComponentURL: string = '';
  private readonly cmsRaffleComponentURL: string = '';

  // SIGNALS
  public headerCms: WritableSignal<CmsHeaderComponents | null> = signal<CmsHeaderComponents | null>(null);
  public expoCms: WritableSignal<CmsExpoComponents | null> = signal<CmsExpoComponents | null>(null);
  public experienceCms: WritableSignal<CmsExperienceComponents | null> = signal<CmsExperienceComponents | null>(null);
  public recapCms: WritableSignal<CmsRecapComponents | null> = signal<CmsRecapComponents | null>(null);
  public faqCms: WritableSignal<CmsFaqComponents | null> = signal<CmsFaqComponents | null>(null);
  public perksComponent: WritableSignal<CmsPerksComponents | null> = signal<CmsPerksComponents | null>(null);
  public raffleComponent: WritableSignal<CmsRaffleComponents | null> = signal<CmsRaffleComponents | null>(null);

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
    this.cmsPerksComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.perksComponent}`;
    this.cmsRaffleComponentURL = `${this.cmsBaseURL}${this.config.cmsServiceConfig.componentURL.raffleComponent}`;
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

  public getCmsPerksComponents(): Observable<CmsPerksComponents> {
    return this.http.get<CmsPerksComponents>(`${this.cmsPerksComponentURL}`);
  }

  public getCmsRaffleComponents(): Observable<CmsRaffleComponents> {
    return this.http.get<CmsRaffleComponents>(`${this.cmsRaffleComponentURL}`);
  }
}

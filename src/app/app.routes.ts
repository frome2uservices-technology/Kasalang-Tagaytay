import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutExpoComponent } from './components/about-expo/about-expo-component/about-expo-component';
import { BePartComponent } from './components/be-part/be-part-component/be-part-component';
import { FaqComponent } from './components/faq/faq-component/faq-component';
import { SuppliersComponent } from './components/suppliers/suppliers-component/suppliers-component';
import { ReservationComponent } from './components/reservation/reservation-component/reservation-component';
import { UrlPages } from './shared/constants/page-urls.constants';

export const routes: Routes = [
    {path: UrlPages.HOME, component: HomeComponent, data: { animation: 'HomePage' }},
    {path: UrlPages.ABOUT_EXPO, component: AboutExpoComponent, data: { animation: 'AboutExpoPage' }},
    {path: UrlPages.BE_PART, component: BePartComponent, data: { animation: 'BePartPage' }},
    {path: UrlPages.FAQ, component: FaqComponent, data: { animation: 'FaqPage' }},
    {path: UrlPages.SUPPLIERS, component: SuppliersComponent, data: { animation: 'SupplierPage' }},
    {path: UrlPages.MY_RESERVATION, component: ReservationComponent, data: { animation: 'MyReservationPage' }},
    {path: UrlPages.WILD_CARD, component: HomeComponent, data: { animation: 'HomePage' }}
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-component/home-component';
import { AboutExpoComponent } from './components/about-expo/about-expo-component/about-expo-component';
import { BePartComponent } from './components/be-part/be-part-component/be-part-component';
import { FaqComponent } from './components/faq/faq-component/faq-component';
import { SuppliersComponent } from './components/suppliers/suppliers-component/suppliers-component';

export const routes: Routes = [
    {path: '', component: HomeComponent, data: { animation: 'HomePage' }},
    {path: 'about-expo', component: AboutExpoComponent, data: { animation: 'AboutExpoPage' }},
    {path: 'be-part', component: BePartComponent, data: { animation: 'BePartPage' }},
    {path: 'faq', component: FaqComponent, data: { animation: 'FaqPage' }},
    {path: 'suppliers', component: SuppliersComponent, data: { animation: 'SupplierPage' }},
    {path: '**', component: HomeComponent, data: { animation: 'HomePage' }}
];

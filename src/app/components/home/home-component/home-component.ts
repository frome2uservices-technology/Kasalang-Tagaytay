import { Component } from '@angular/core';
import { ExpoComponent } from '../expo-component/expo-component';
import { RecapComponent } from '../recap-component/recap-component';
import { ExperienceComponent } from '../../about-expo/experience-component/experience-component';

@Component({
  selector: 'app-home-component',
  imports: [
    ExpoComponent,
    RecapComponent,
    ExperienceComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  constructor() {}
  
}

import { Component } from '@angular/core';
import { PerksComponent } from '../perks-component/perks-component';
import { RaffleComponent } from '../raffle-component/raffle-component';

@Component({
  selector: 'app-be-part-component',
  imports: [
    PerksComponent,
    RaffleComponent
  ],
  templateUrl: './be-part-component.html',
  styleUrl: './be-part-component.scss',
})
export class BePartComponent {

}

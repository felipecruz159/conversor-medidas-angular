import { Component } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {
  options = [
    { text: 'Temperatura', image: 'assets/thermostat_white_24dp.svg' },
    { text: 'Comprimento', image: 'assets/straighten_white_24dp.svg' },
    { text: 'Peso', image: 'assets/balance_white_24dp.svg' },
    { text: 'Tempo', image: 'assets/schedule_white_24dp.svg' },
  ];

}

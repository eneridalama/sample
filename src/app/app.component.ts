import { Component } from '@angular/core';
import { barberService } from './shared/barberService.model';
import { BARBER_SERVICES } from './shared/BARBER_SERVICES';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Barber Booking App';

  services: barberService[] = BARBER_SERVICES;
  firstname: string = '';
  lastname: string = '';
  number: number = 0;
  date: Date = new Date();
  hour: Date = new Date();
  selectedService = [];
}
